import { apiCallText } from "@/utils/auth-api-w-refresh-text";
import { useRouter } from "next/router";
import React from "react";

interface BlogPreviewProps {
  title: string;
  description: string;
  author: string;
  tags: string[];
  language?: string;
  blogId?: string;
  tempId?: string;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({ title, description, author, tags, language, blogId, tempId }) => {

  const router = useRouter();

  const handleDelete = () => {
    apiCallText(`/api/blog/` + blogId + `/template/` + tempId, {
      method: "DELETE"
    });

    router.reload();
  };

  return (
    // comment 
    <button className="relative p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow bg-gray-50">
      {tempId && <button
        onClick={handleDelete}
        className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
      >
        🗑️
      </button>}

      {language && (
        <div className="flex flex-row justify-end ">
            <div className="w-[25%] bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow-sm">
          <p> {language}</p>
        </div>
        </div>
       
        
      )}
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
