import React from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { languageList } from "@/types/constants";

interface CodeEditorProps {
  language: string;
  code: string; // Pass the current code from the parent
  setCode: (code: string) => void; // Function to update the code in the parent
  onRun: () => void; // Trigger the Run logic
  onSave: () => void; // Trigger the Save logic
  onFork?: () => void; // Optional Fork logic
  onLanguageChange: (language: string) => void; // Language selection
  showForkButton?: boolean; // Option to show Fork button
  title?: string; // Optional title
  languageOptions?: { value: string; label: string }[]; // Optional custom language list
}

const CodeEditorComponent: React.FC<CodeEditorProps> = ({
  language,
  code,
  setCode,
  onRun,
  onSave,
  onFork,
  onLanguageChange,
  showForkButton = false,
  title,
  languageOptions = languageList, // Default to languageList
}) => {
  return (
    <div className="flex-1 flex flex-col space-y-4 overflow-auto">
      {/* Language Selector and Buttons */}
      <div className="flex items-center justify-between mb-4">
        {/* Language Selector */}
        <div className="w-60">
          <Select
            options={languageOptions}
            defaultValue={languageOptions.find((opt) => opt.value === language)}
            onChange={(selected) =>
              onLanguageChange(selected?.value || "javascript")
            }
            className="w-full"
            styles={{
              menu: (base) => ({
                ...base,
                border: "1px solid blue", // Add a black border around the dropdown
                borderRadius: "0.5rem", // Rounded corners for the dropdown
                backgroundColor: "white", // Background color for the dropdown menu
                zIndex: 10, // Ensure it appears above other elements
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#f3f4f6" : "white", // Light gray on hover
                color: "black", // Black text color
                padding: "0.5rem", // Space inside each option
                cursor: "pointer", // Show a pointer on hover
              }),
            }}
          />
        </div>
        <h2 className="text-xl lg:text-2xl font-bold">{title || "Code Editor"}</h2>
        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onRun}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Run
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save
          </button>
          {showForkButton && (
            <button
              onClick={onFork}
              className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
            >
              Fork
            </button>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          language={language}
          value={code}
          onChange={(value) => setCode(value || "")}
          theme="vs-white"
          options={{
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditorComponent;
