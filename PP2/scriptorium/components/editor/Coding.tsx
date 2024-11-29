import React from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";
import { languageList } from "@/types/constants";
import { useTheme } from "@/context/modeContext";

interface CodeEditorProps {
  language: string;
  code: string; // Pass the current code from the parent
  setCode: (code: string) => void; // Function to update the code in the parent
  onRun: () => void; // Trigger the Run logic
  onSave: () => void; // Trigger the Save logic
  onFork?: () => void; // Optional Fork logic
  onLanguageChange: (language: string) => void; // Language selection
  showForkButton?: boolean; // Option to show Fork button
  showSaveButton?: boolean; // Option to show Save button
  editable?: boolean; // Option to make code un-editable
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
  showSaveButton = false,
  editable = true,
  title,
  languageOptions = languageList, // Default to languageList
  
}) => {
  const { theme } = useTheme(); // Get the current theme from your ThemeProvider

  return (
    <div className="flex-1 flex flex-col space-y-4 overflow-auto">
      {/* Language Selector and Buttons */}
      <div className="flex items-center justify-between mb-4">
        {/* Language Selector */}
        <div className="w-60">
        <Select
            options={languageOptions}
            value={languageOptions.find((opt) => opt.value === language)}
            onChange={(selected) =>
              onLanguageChange(selected?.value || "javascript")
            }
            className="w-full"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: theme === "dark" ? "#1f2937" : "white", // Dark or light background
                borderColor: theme === "dark" ? "#4b5563" : "#d1d5db", // Tailwind gray-500 for dark, gray-300 for light
                color: theme === "dark" ? "white" : "black",
                boxShadow: "none",
                "&:hover": {
                  borderColor: theme === "dark" ? "#6b7280" : "#9ca3af", // Hover effect
                },
              }),
              menu: (base) => ({
                ...base,
                border: "1px solid",
                borderColor: theme === "dark" ? "#4b5563" : "#d1d5db", // Border for menu
                borderRadius: "0.5rem", // Rounded corners
                backgroundColor: theme === "dark" ? "#1f2937" : "white", // Dark or light background
                color: theme === "dark" ? "white" : "black", // Adjust text color
                zIndex: 10, // Ensure menu appears above other elements
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused
                  ? theme === "dark"
                    ? "#374151" // Tailwind gray-700 for hover in dark mode
                    : "#f3f4f6" // Tailwind gray-200 for hover in light mode
                  : theme === "dark"
                  ? "#1f2937" // Tailwind gray-800 for default background in dark mode
                  : "white", // Default light mode background
                color: theme === "dark" ? "white" : "black", // Adjust text color
                padding: "0.5rem", // Space inside each option
                cursor: "pointer", // Show pointer on hover
              }),
              singleValue: (base) => ({
                ...base,
                color: theme === "dark" ? "white" : "black", // Adjust the single selected value color
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: theme === "dark" ? "white" : "black", // Dropdown arrow color
              }),
              indicatorSeparator: (base) => ({
                ...base,
                backgroundColor: theme === "dark" ? "#4b5563" : "#d1d5db", // Separator color
              }),
            }}
          />

        </div>
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 dark:text-white">
          {title || "Code Editor"}
        </h2>
        {/* Buttons */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onRun}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Run
          </button>
          {showSaveButton && (
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          )}
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
          theme={theme === "dark" ? "vs-dark" : "vs-light"} // Dynamically set theme
          options={{
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            readOnly: !editable,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditorComponent;
