import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import Select from "react-select";
import { useTheme } from "@/context/modeContext";
import Head from "next/head";
import Header from "@/components/header";

const languageOptions = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "typescript", label: "TypeScript" },
];

const CodeEditor: React.FC = () => {
  const { theme } = useTheme();
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("// Start coding here!\n");
  const [output, setOutput] = useState("");

  const handleLanguageChange = (selectedOption: any) => {
    setLanguage(selectedOption.value);
  };

  const handleCodeExecution = () => {
    setOutput(`
Language: ${language}
Code: ${code}
Execution Result: Hello, World!
    `);
  };

  return (
    <div className={`h-screen flex flex-col ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}>
      <Header />
      <div className="flex-1 flex items-center justify-center py-10">
        {/* Main Scrollable Box */}
        <div className="flex flex-col lg:flex-row bg-white dark:bg-gray-800 w-[90%] h-[90%] shadow-lg px-6 py-4 rounded-lg overflow-hidden">
          {/* Left Side: Code Editor */}
          <div className="flex-1 flex flex-col space-y-4 overflow-auto">
            <h1 className="text-center text-2xl font-bold mb-4">Code Editor</h1>

            {/* Language Selector and Buttons */}
            <div className="flex items-center justify-between mb-4">
              {/* Language Selector */}
              <div className="w-60">
                <Select
                  options={languageOptions}
                  defaultValue={languageOptions[0]}
                  onChange={handleLanguageChange}
                  className="w-full"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-center space-x-4">
                {/* Execute Button */}
                <button
                  onClick={handleCodeExecution}
                  className="px-4 py-2 flex items-center space-x-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 5.75L17.75 12 5.25 18.25V5.75Z"
                    />
                  </svg>
                  <span>Run</span>
                </button>

                {/* Save as Template */}
                <button
                  className="px-4 py-2 flex items-center space-x-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                  <span>Save</span>
                </button>
              </div>
            </div>



            {/* Resizable Code Editor */}
            <div className="flex-1 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <Editor
                height="100%"
                language={language}
                value={code}
                onChange={(value) => setCode(value || "")}
                theme={theme === "dark" ? "vs-dark" : "vs-light"}
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>

          {/* Right Side: Output Section */}
          <div className="flex-1 flex flex-col space-y-4 overflow-auto mt-4 lg:mt-0 lg:ml-4">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold">Output</h2>
              
            </div>

            {/* Resizable Output Box */}
            <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg p-4  overflow-auto">
              <pre>{output || "Your code's output will appear here..."}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;