import React from "react";

interface OutputComponentProps {
  output: string;
}

const OutputComponent: React.FC<OutputComponentProps> = ({ output }) => {
  return (
    <div className="flex-1 flex flex-col space-y-4 overflow-auto">
            <h2 className="text-xl lg:text-2xl font-bold mb-2">Output</h2>
            <div className="flex-1 border border-gray-300 dark:border-gray-700 rounded-lg p-4 overflow-auto">
          <pre className="flex-1 overflow-auto text-sm lg:text-base">
            {output || "Your code's output will appear here..."}
          </pre>      </div>
    </div>
  );
};

export default OutputComponent;
