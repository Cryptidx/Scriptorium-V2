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
      <button className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow bg-gray-50">
        <h3 className="text-xl font-bold">{author}</h3>
        <p className="text-gray-700 mt-2">{description}</p>
        <div className="text-sm text-gray-500 mt-4">
          <hr></hr>

          <div className="flex flex-row space-x-3">
            <div className="flex flex-inline">
            <ThumbsUpF className=" object-scale-down h-5 w-5"/>
            <p>{upvotes}</p>
            </div>

            <div  className="flex flex-inline">
            <ThumbsDownF className=" object-scale-down h-5 w-5"/>
            <p>{downvotes}</p>
            </div>

            <Link href="/main-blog-page" > <p className="underline">see blog </p></Link>
            
          </div>

         


        </div>
      </button>
    );
  };
  
  export default CommentPreview;