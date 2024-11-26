import React from "react";


interface CommentProps {
    id: string;
    description: string;
    level: string;
    parentId: string | null; // Updated to allow `null` as a possible value
  }
  
  interface Comments {
    comments: CommentProps[];
    parentId?: string | null; // Made `parentId` optional
  }
  

// const NestedComments:React.FC<Comments> = ({ comments, parentId=null}) => {
//     return (
//       <ul className="mt-4 space-y-4">
//         {comments
//           .filter((comment) => comment.parentId === parentId)
//           .map((comment) => (
//             <li key={parseInt(comment.id)} className={`pl-${parseInt(comment.level) * 4}`}>
//               <div className="border-l-2 pl-4">
//                 <p>{comment.description}</p>
//                 <NestedComments comments={comments} parentId={comment.id} />
//               </div>
//             </li>
//           ))}
//       </ul>
//     );
//   };
  
//   export default NestedComments;
const NestedComments: React.FC<Comments> = ({ comments, parentId = null }) => {
    return (
      <ul className="mt-4 space-y-4">
        {comments
          .filter((comment) => comment.parentId === parentId)
          .map((comment) => (
            <li key={comment.id} className={`pl-${parseInt(comment.level) * 4}`}>
              <div className="border-l-2 pl-4 border-black ">
                <p>{comment.description}</p>
                {/* Recursively render nested comments */}
                <NestedComments comments={comments} parentId={comment.id} />
              </div>
            </li>
          ))}
      </ul>
    );
  };
  
  export default NestedComments;
  