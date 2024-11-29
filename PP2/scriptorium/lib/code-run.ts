const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

function fileEnd(lang: string) {
    // returns the file extension for each programming language
    switch(lang) {
        case "c":
            return ".c";
        case "go":
            return ".go";
        case "java":
            return ".java";
        case "javascript":
            return ".js";
        case "perl":
            return ".pl";
        case "python":
            return ".py";
        case "r":
            return ".r";
        case "ruby":
            return ".rb";
        case "rust":
            return ".rs";
        case "swift":
            return ".swift";
        case "cpp":
            return ".cpp";
        default:
            return "";
    }
}


function args(lang: string) {
    // returns the file extension for each programming language

    // ChatGPT given switch statement with all arrays empty except for python: 
    // Can you complete this switch statement for the rest of the programming languages?
    switch (lang) {
        case "c":
            return [ "/bin/sh", "-c", "gcc /app/code.c -o /app/code.out && /app/code.out" ];
        case "go":
            return [ "/bin/sh", "-c", "go build /app/code.go && /app/code.out" ];
        case "java":
            return [ "/bin/sh", "-c", "javac /app/code.java && java -cp /app code" ];
        case "javascript":
            return [ "/bin/sh", "-c", "node /app/code.js" ];
        case "perl":
            return ['perl', '/app/code.pl'];
        case "python":
            return ['python3', '/app/code.py'];
        case "r":
            return ['Rscript', '/app/code.r'];
        case "ruby":
            return ['ruby', '/app/code.rb'];
        case "rust":
            return [ "/bin/sh", "-c", "rustc /app/code.rs -o /app/code.out && /app/code.out"];
        case "swift":
            return ['swift', '/app/code.swift'];
        case "cpp":
            return [ "/bin/sh", "-c", "g++ /app/code.cpp -o /app/code.out && /app/code.out" ];
        default:
            return "";
    }
}


async function runDocker(command: string, args: string[], stdin: string[]) {
    try {
        let stdout = "";
        let stderr = "";

        // spawn the process
        const process = spawn(command, args);

        // writes each input to the standard of the spawned process
        if (stdin.length > 0) {   
            stdin.forEach(input => {
                process.stdin.write(input + '\n');  // writes each input followed by a newline
            });
            process.stdin.end();
        }

        // capture stdout and stderr
        process.stdout.on("data", (data: Buffer) => stdout += data.toString());
        process.stderr.on("data", (data: Buffer) => stderr += data.toString());
        process.on('SIGTERM', () => {
            alert("Process Took Too Long")
            process.kill(process.pid, 'SIGKILL');
        });

        let crash = false;

        const timeout = setTimeout(() => {
            console.log("Process took too long, sending SIGKILL...");
            process.kill('SIGKILL'); // Immediately terminate the process if timeout exceeds
            crash = true;
        }, 10000);

        // wait for the process to close
        const code = await new Promise((resolve) => {
            process.on('close', resolve);
        });

        process.on('close', () => {
            clearTimeout(timeout);  // Clear the timeout once process closes
        });

        if (crash) {
            return [-1, "", "Code took too long"];
        }

        // return output
        return [code, stdout, stderr];
        
    } catch (error) {
        // return error if caught
        return [-1, "", error];
    }
}

async function fileRun(lang: string, code: string, inputs = []) {
    // array of supported languages
    const langSupport = ['c', 'cpp', 'go', 'java', 'javascript', 'perl', 'python', 'r', 'ruby', 'rust', 'swift'];

    if (!langSupport.includes(lang)) {
        // Language is not supported
        return [-2, "unsupported language", ""];
    }

    // gets file extension of current language
    const fileExtension = fileEnd(lang);

    // creates code file with date (stops any overlap)
    const codeFile = path.resolve("code-" + Date.now() + fileExtension);

    try {
        // write code to temporary file
        fs.writeFileSync(codeFile, code);

        // define docker image based on language
        const dockerImage = "runtime-" + lang;

        // construct global docker args
        const starterArgs = [
            'run', // creates new container then runs function
            '--rm', // delete container on completion
            '-i', // allow for input
            '-v', // mounts file
            `${codeFile}:/app/code` + fileExtension, // file to mount
            '--memory=10m', // sets maximum memory usage
            '--stop-timeout', '10', // kills program after 30 seconds
            dockerImage // docker image to create container of
        ];
        
        // gets full docker run arguments
        const dockerArgs = starterArgs.concat(args(lang));
        
        // sends command, args, and inputs to run to helper function
        let output = await runDocker("docker", dockerArgs, inputs);

        // deletes code file (if it exists)
        if (fs.existsSync(codeFile)){
            fs.unlinkSync(codeFile);
        }

        // deletes base code file (if it exists)
        if (fs.existsSync(path.resolve('code'))){
            fs.unlinkSync(path.resolve('code'));
        }

        return output;

    } catch (error) {
        // clean up in case of error
        if (fs.existsSync(codeFile)){
            fs.unlinkSync(codeFile);
        }

        if (fs.existsSync(path.resolve('code'))){
            fs.unlinkSync(path.resolve('code'));
        }
        
        // returns special error case
        return [-3, error, ''];
    }
}

module.exports = { fileRun };
