import React, { useState } from "react";

interface OutputComponentProps {
  stdout: string; // Output for stdout
  stderr: string; // Output for stderr
}

const OutputComponent: React.FC<OutputComponentProps> = ({ stdout, stderr }) => {
  const [activeTab, setActiveTab] = useState<"stdout" | "stderr">("stdout");

  return (
    <div className="flex-1 flex flex-col space-y-4 overflow-auto">

      {/* Tabs for switching between stdout and stderr */}
      <div className="flex space-x-4 border-b border-gray-300 dark:border-gray-700 pb-2">
        <button
          onClick={() => setActiveTab("stdout")}
          className={`px-4 py-2 font-medium ${
            activeTab === "stdout"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Stdout
        </button>
        <button
          onClick={() => setActiveTab("stderr")}
          className={`px-4 py-2 font-medium ${
            activeTab === "stderr"
              ? "border-b-2 border-red-500 text-red-500"
              : "text-gray-500 dark:text-gray-400"
          }`}
        >
          Stderr
        </button>
      </div>

      {/* Display the output based on the active tab */}
      <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg p-4 overflow-auto">
        <pre className="text-sm lg:text-base">
          {activeTab === "stdout"
            ? stdout || "No standard output available."
            : stderr || "No error output available."}
        </pre>
      </div>
    </div>
  );
};

export default OutputComponent;
