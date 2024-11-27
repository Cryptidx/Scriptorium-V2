// import React, { useState } from "react";
// import ReplyInput from "./reply-input";

// interface CommentProps {
//   comment: any;
//   fetchReplies: (parentId: string, page: number, perPage: number) => any[];
//   onAddReply: (parentId: string, text: string) => void;
//   replyInputVisible: string | null;
//   setReplyInputVisible: (id: string | null) => void;
// }

// const CommentBox: React.FC<CommentProps> = ({
//   comment,
//   fetchReplies,
//   onAddReply,
//   replyInputVisible,
//   setReplyInputVisible,
// }) => {
//   const [replies, setReplies] = useState<any[]>([]);
//   const [hasMoreReplies, setHasMoreReplies] = useState(true);
//   const [replyPage, setReplyPage] = useState(1);

//   const loadReplies = () => {
//     const newReplies = fetchReplies(comment.id, replyPage, 5);
//     setReplies((prev) => [...prev, ...newReplies]);
//     if (newReplies.length < 5) setHasMoreReplies(false);
//     setReplyPage((prev) => prev + 1);
//   };

//   return (
//     <div className="mt-4 border-b pb-4">
//       <div className="flex space-x-4">
//         <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
//         <div>
//           <p className="font-bold">{comment.author}</p>
//           <p>{comment.description}</p>
//           <div className="mt-2 flex space-x-4">
//             <button
//               className="text-blue-500"
//               onClick={() => setReplyInputVisible(comment.id)}
//             >
//               Reply
//             </button>
//             <button className="text-green-500">Upvote {comment.upvotes}</button>
//             <button className="text-red-500">Downvote {comment.downvotes}</button>
//           </div>
//         </div>
//       </div>

//       {replyInputVisible === comment.id && (
//         <ReplyInput
//           parentId={comment.id}
//           onSubmit={(text) => onAddReply(comment.id, text)}
//         />
//       )}

//       {replies.map((reply) => (
//         <CommentBox
//           key={reply.id}
//           comment={reply}
//           fetchReplies={fetchReplies}
//           onAddReply={onAddReply}
//           replyInputVisible={replyInputVisible}
//           setReplyInputVisible={setReplyInputVisible}
//         />
//       ))}

//       {hasMoreReplies && (
//         <button onClick={loadReplies} className="text-blue-500 mt-2">
//           Load More Replies
//         </button>
//       )}
//     </div>
//   );
// };

// export default CommentBox;

import React, { useState } from "react";
import ReplyInput from "./reply-input";
import { fetchComments, addComment } from "./mockApi"; // Import mock API functions

interface CommentProps {
  comment: any;
  level: number;
}

const CommentBox: React.FC<CommentProps> = ({ comment, level }) => {
  const [replies, setReplies] = useState<any[]>([]);
  const [hasMoreReplies, setHasMoreReplies] = useState(true);
  const [replyPage, setReplyPage] = useState(1);
  const [replyInputVisible, setReplyInputVisible] = useState(false);

  const loadReplies = async () => {
    const response = await fetchComments(comment.id, replyPage);
    setReplies((prev) => [...prev, ...response.data]);
    setHasMoreReplies(response.hasMore);
    setReplyPage((prev) => prev + 1);
  };

  const handleAddReply = async (parentId: string, text: string) => {
    const newReply = {
      author: "Current User",
      description: text,
      parentId: parentId, // Attach the correct parentId
    };

    const addedReply = await addComment(newReply);
    setReplies((prev) => [addedReply, ...prev]);
    setReplyInputVisible(false);
  };

  return (
    <div className={`mt-4 ml-${level * 4}`}>
      <div className="flex space-x-4">
        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
        <div>
          <p className="font-bold">{comment.author}</p>
          <p>{comment.description}</p>
          <div className="mt-2 flex space-x-4">
            <button
              className="text-blue-500"
              onClick={() => setReplyInputVisible(!replyInputVisible)}
            >
              Reply
            </button>
          </div>
        </div>
      </div>

      {replyInputVisible && (
        <ReplyInput
          parentId={comment.id} // Pass the parentId explicitly
          onSubmit={(text) => handleAddReply(comment.id, text)}
        />
      )}

      {replies.map((reply) => (
        <CommentBox key={reply.id} comment={reply} level={level + 1} />
      ))}

      {hasMoreReplies && (
        <button onClick={loadReplies} className="text-blue-500 mt-2 ml-4">
          Load More Replies
        </button>
      )}
    </div>
  );
};

export default CommentBox;
