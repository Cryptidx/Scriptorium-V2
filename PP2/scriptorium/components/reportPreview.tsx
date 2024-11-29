import { apiCallText } from "@/utils/auth-api-w-refresh-text";
import { IdentificationIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import React from "react";

interface BlogPreviewProps {
  title: string;
  description: string;
  author: string;
  tags: string[];
  reportCount: number; // Use `number` instead of `Number` (primitive vs wrapper type)
  explanation: string[];
  flag?: boolean;
  flagged?: boolean;
  blog: boolean;
  id: number;
}

const ReportPreview: React.FC<BlogPreviewProps> = ({ title, description, author, tags, reportCount, explanation, flagged, id, blog }) => {
    const router = useRouter();
    
    const handleFlag = () => {
        const putIn = {flagged: true};
          
        if (blog) {
          apiCallText(`/api/blog/` + id, {
            method: "PUT",
            body: JSON.stringify(putIn)
          })
        } else {
          apiCallText(`/api/comment/` + id, {
            method: "PUT",
            body: JSON.stringify(putIn)
          })
        }
    
        router.reload();
      };
  
    return (
    <button className="relative p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow bg-gray-50">
    <button
        onClick={handleFlag}
        className={`absolute top-2 left-2 p-2 ${flagged ? `bg-red-500` : `bg-white`} text-white rounded-full hover:bg-red-600 focus:outline-none`}
      >
        🚩
      </button>

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