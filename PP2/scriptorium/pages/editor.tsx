import React, { useState } from "react";
import CodeEditorComponent from "@/components/editor/Coding";
import OutputComponent from "@/components/editor/Output";
import Header from "@/components/header";

const Editor: React.FC = () => {
  const [code, setCode] = useState("// Start coding here!");
  const [inputValue, setInputValue] = useState(""); // State for user input
  const [output, setOutput] = useState(""); // State for code output
  const [language, setLanguage] = useState("javascript"); // State for selected language


  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    console.log("Language changed to:", newLanguage);
  };
  
  const dummyOutput = "This is a sample output fr\n\n\n\n\naaaa\na\na\na\nana\na\na\na\na\na\na\na\na\naom ";

  // Handle code execution
  const handleRun = () => {
    console.log("Running code with input:", inputValue);
    console.log("Code to execute:", code);

    // Simulate code execution (replace this with actual logic/API call)
    const simulatedOutput = `Executed ${language} code with input: "${inputValue}"`;
    setOutput(simulatedOutput); // Set the output
  };

  const handleSave = (code: string) => { // takes to creation
    console.log("Saving code:", code);
    alert("Code saved!");
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
              code={code} // Pass the current code state
              setCode={setCode} // Pass the state updater
              onRun={handleRun}
              onSave={() => console.log("Save logic goes here")}
              onLanguageChange={handleLanguageChange}
              showForkButton={false}
            />
            </div>


    
            {/* Right Side: Output and Template Info */}
            
              {/* Input Section */}
              <div className="flex-[0.8] flex flex-col space-y-6 overflow-auto mt-4 lg:mt-0 lg:ml-4">
                <textarea
                    id="user-input"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="p-4 border border-gray-300 dark:border-gray-700 rounded-lg w-full resize-none overflow-auto h-[150px]"
                    placeholder="Enter your input here"
                  ></textarea>

              {/* Output Section */}
              <div className="flex-1 flex flex-col border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2">
                <OutputComponent stderr={dummyOutput} stdout={dummyOutput} />
              </div>
              </div>
              
            </div>
        </div>
      </div>
    </div>
  );
};  

export default Editor;
