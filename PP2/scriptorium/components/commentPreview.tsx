import React from "react";
import { ThumbsUpF, ThumbsDownF } from "@/common/icons";
import Link from 'next/link';

interface CommentPreviewProps {
  author:string;  
  description: string;
  upvotes: string;
  downvotes: string;
}

const CommentPreview: React.FC<CommentPreviewProps> = ({ author, description, upvotes, downvotes }) => {
  return (
    <button className="p-4 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm hover:shadow-md transition-shadow bg-gray-50 dark:bg-gray-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{author}</h3>
      <p className="text-gray-700 dark:text-gray-300 mt-2">{description}</p>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">
        <hr className="border-gray-300 dark:border-gray-700" />

        <div className="flex flex-row space-x-3">
          <div className="flex items-center space-x-1">
            <ThumbsUpF className="object-scale-down h-5 w-5 text-gray-500 dark:text-gray-400" />
            <p className="text-gray-900 dark:text-white">{upvotes}</p>
          </div>

          <div className="flex items-center space-x-1">
            <ThumbsDownF className="object-scale-down h-5 w-5 text-gray-500 dark:text-gray-400" />
            <p className="text-gray-900 dark:text-white">{downvotes}</p>
          </div>

          <p className="underline text-blue-500 dark:text-blue-400 cursor-pointer">see blog</p>
        </div>
      </div>
    </button>
  );
};

export default CommentPreview;
