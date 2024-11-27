import React from "react";

interface BlogPreviewProps {
  title: string;
  description: string;
  author: string;
  tags: string[];
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ title, description, author, tags }) => {
  return (
    <button className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow bg-gray-50">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-700 mt-2">{description}</p>
      <div className="text-sm text-gray-500 mt-4">
        <span> {author}</span>
        <hr></hr>

        <div className="flex flex-wrap  mt-2 ">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
        </div>
        
      </div>
    </button>
  );
};

export default BlogPreview;
