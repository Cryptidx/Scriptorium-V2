import React from "react";

interface BlogPreviewProps {
  title: string;
  description: string;
  author: string;
  tags: string[];
  reportCount: number; // Use `number` instead of `Number` (primitive vs wrapper type)
  explanation: string[];
}

const ReportPreview: React.FC<BlogPreviewProps> = ({ title, description, author, tags, reportCount, explanation }) => {
  return (
    <button className="relative p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow bg-gray-50">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700 mt-2">{description}</p>

      {/* Display report count */}
      <div className="text-sm text-gray-500 mt-4">
        <span>{reportCount} Report(s)</span>
      </div>

      <hr className="my-2" />

      {/* Display explanations (up to two, if non-empty) */}
      <div className="text-sm text-gray-500 mt-2">
        {explanation.map((exp, index) => (
          exp && <p key={index}>"{exp}"</p> // Ensure non-empty strings are shown
        ))}
      </div>

      <div className="text-sm text-gray-500 mt-4">
        <span>{author}</span>
      </div>

      <hr className="my-2" />

      <div className="flex flex-wrap mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
};

export default ReportPreview;