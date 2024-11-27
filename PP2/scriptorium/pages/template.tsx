import React, { useState } from "react";
import CodeEditorComponent from "@/components/editor/Coding";
import OutputComponent from "@/components/editor/Output";
import TemplateInfo from "@/components/editor/TemplateInfo"; 
import Header from "@/components/header";


const Template: React.FC = () => {
  const [output, setOutput] = useState("");
  const [code, setCode] = useState("// Start coding here!"); // Maintain the current code
  const [language, setLanguage] = useState("javascript");
  const [inputValue, setInputValue] = useState(""); // State for user input


  const dummyOutput = "This is a sample output fr\n\n\n\n\naaaa\na\na\na\nana\na\na\na\na\na\na\na\na\naom ";

  const stdout = "This is the standard output.\nHello, world!";
  const stderr =dummyOutput;

  const dummyAuthor = "John Doe";
  const dummyForked = "Original Template";
  const dummyTags = ["JavaScript", "React", "CSS"];
  const dummyBlogs = [
    { title: "Blog Post 1", description: "Description of Blog Post 1" },
    { title: "Blog Post 2", description: "Description of Blog Post 2" },
    { title: "Blog Post 3", description: "Description of Blog Post 3" },
    { title: "Blog Post 2", description: "Description of Blog Post 2" },
    { title: "Blog Post 2", description: "Description of Blog Post 2" },
    { title: "Blog Post 2", description: "Description of Blog Post 2" },
    { title: "Blog Post 2", description: "Description of Blog Post 2" },
  ];
  const templateName = "My awesome template";

  const handleRun = () => {
    console.log("Running code with input:", inputValue);
    console.log("Code to execute:", code);

    // Simulate code execution (replace this with actual logic/API call)
    const simulatedOutput = `Executed ${language} code with input: "${inputValue}"`;
    setOutput(simulatedOutput); // Set the output
  };
  const handleSave = () => {
    console.log("Saving code:", code);
    alert("Code saved!");
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900">
      {/* Header */}
      <Header />
  
      {/* Main Content */}
      <div className="flex items-center justify-center flex-1">

        <div className="bg-white dark:bg-gray-800 w-[90%] h-[80vh] shadow-lg px-10 py-6 rounded-lg overflow-hidden">

          {/* Left and Right Columns */}
          <div className="flex flex-col lg:flex-row h-full w-full space-y-6 lg:space-y-0 lg:space-x-6">
          
            {/* Left Side: Code Editor */}
            <div className="flex-[1.2] flex flex-col space-y-4 overflow-auto">
              <CodeEditorComponent
                language={language}
                code={code} // Pass the code state
                setCode={setCode} // Pass the function to update the code state
                onRun={handleRun}
                onSave={handleSave}
                onLanguageChange={handleLanguageChange}
                showForkButton={true}
                onFork={handleSave}
                title={templateName}
              />
            </div>
    
            {/* Right Side: Output and Template Info */}
            <div className="flex-[0.8] flex flex-col space-y-6 overflow-auto mt-4 lg:mt-0 lg:ml-4">
            {/* Input Section */}
               <textarea
                  id="user-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg w-full resize-none overflow-auto h-[150px]"
                  placeholder="Enter your input here"
                ></textarea>


              {/* Output Section */}
              <div className="flex-1 flex flex-col border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2">
              <OutputComponent stdout={stdout} stderr={stderr} />
              </div>
    
              {/* Template Info Section */}
              <div
                className={`mt-4 lg:mt-0 flex flex-col ${
                  dummyOutput ? "flex-1" : "flex-[0.7]"
                } border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2`}
              >
                <TemplateInfo
                  author={dummyAuthor}
                  forked={dummyForked}
                  tags={dummyTags}
                  blogs={dummyBlogs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default Template;
