// import React from "react";
// import { ThumbsUpF, ThumbsDownF } from "@/common/icons";
// import Link from 'next/link';

// interface CommentPreviewProps {
//   author:string;  
//   description: string;
//   upvotes: string;
//   downvotes: string;
// }

// const CommentPreview: React.FC<CommentPreviewProps> = ({ author, description, upvotes, downvotes }) => {
//     return (
//       <button className="p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow bg-gray-50 max-h-[200px] max-w-[200px]">
//         <h3 className="text-xl font-bold">{author}</h3>
//         <p className="text-gray-700 mt-2">{description}</p>
//         <div className="text-sm text-gray-500 mt-4">
//           <hr></hr>

//           <div className="flex flex-row space-x-3">
//             <div className="flex flex-inline">
//             <ThumbsUpF className=" object-scale-down h-5 w-5"/>
//             <p>{upvotes}</p>
//             </div>

//             <div  className="flex flex-inline">
//             <ThumbsDownF className=" object-scale-down h-5 w-5"/>
//             <p>{downvotes}</p>
//             </div>

//             <p className="underline">see blog </p>
            
//           </div>

         


//         </div>
//       </button>
//     );
//   };
  
//   export default CommentPreview;

import React from "react";
import { ThumbsUpF, ThumbsDownF } from "@/common/icons";

interface CommentPreviewProps {
  author: string;
  description: string;
  upvotes: string;
  downvotes: string;
}

const CommentPreview: React.FC<CommentPreviewProps> = ({
  author,
  description,
  upvotes,
  downvotes,
}) => {
  return (
    <div className="flex flex-col p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow bg-gray-50 min-h-[200px] max-w-full">
      {/* Author */}
      <h3 className="text-xl font-bold break-words mb-2">{author}</h3>

      {/* Description */}
      <div className="flex-grow overflow-hidden">
        <p className="text-gray-700 break-words">{description}</p>
      </div>

      {/* Footer */}
      <div className="text-sm text-gray-500 mt-4">
        <hr className="my-2" />
        <div className="flex flex-row space-x-3">
          {/* Upvotes */}
          <div className="flex items-center space-x-1">
            <ThumbsUpF className="object-scale-down h-5 w-5" />
            <p>{upvotes}</p>
            </div>

          {/* Downvotes */}
          <div className="flex items-center space-x-1">
            <ThumbsDownF className="object-scale-down h-5 w-5" />
            <p>{downvotes}</p>
          </div>


          {/* Blog Link */}
          <p className="underline cursor-pointer">See blog</p>
        </div>
      </div>
    </div>
  );
};

export default CommentPreview;
