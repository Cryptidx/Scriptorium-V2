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
import CommentButton from "./comment-button";
import VoteButton from "./vote-button";
import { Flag, ThumbsDown, ThumbsDownF, ThumbsUp, ThumbsUpF } from "@/common/icons";
import ReportCreationModal from "./modals/ReportCreationModal";

interface CommentProps {
  comment: any;
  level: number;
}

const CommentBox: React.FC<CommentProps> = ({ comment, level }) => {
  const [replies, setReplies] = useState<any[]>([]);
  const [hasMoreReplies, setHasMoreReplies] = useState(true);
  const [replyPage, setReplyPage] = useState(1);
  const [replyInputVisible, setReplyInputVisible] = useState(false);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportComment, setReportComment] = useState("");

  const handleFlagClick = (title: string) => {
    setReportComment(title); // Set the title of the item being reported
    setShowReportModal(true); // Show the modal
  };

  const handleReportSubmit = () => {
    console.log("Report Submitted");
    setShowReportModal(false); // Close the modal after submission
  };

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
    <div className={`relative mt-4 ${level > 0 ? 'ml-4' : ''}`}>
      <div className="absolute left-[31px] top-[45px] bottom-0 w-1 border-l-2 border-gray-800"></div>
      <div className="relative pl-3">
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

              <div className="flex-1 flex items-start justify-start">
              <div className="flex flex-col items-start justify-start">
                <div className="flex flex-inline space-x-5">
                  <div>
                    <VoteButton
                      upvoteIcon={<ThumbsUp className="object-scale-down h-5 w-5" />}
                      upvoteActiveIcon={<ThumbsUpF className="object-scale-down h-5 w-5" />}
                      downvoteIcon={<ThumbsDown className="object-scale-down h-5 w-5" />}
                      downvoteActiveIcon={<ThumbsDownF className="object-scale-down h-5 w-5" />}
                      initialText="0"
                      changeText="1"
                    />
                  </div>

                  <div className="inline-flex items-center bg-gray-200 rounded-full shadow-sm border-gray-500 border-2 pr-2 pl-2">
                    <button
                      onClick={() => handleFlagClick(comment.comment)}
                      className="text-xs font-bold"
                    >
                      <Flag className="object-scale-down h-5 w-5" />
                    </button>
                  </div>
                </div>

                <ReportCreationModal
                  id={comment.id}
                  type={"COMMENT"}
                  isOpen={showReportModal}
                  onClose={() => setShowReportModal(false)}
                  onSubmit={handleReportSubmit}
                />
              </div>
            </div>

            </div>
          </div>
        </div>
        {replyInputVisible && (
          <ReplyInput
            parentId={comment.id} 
            onSubmit={(text) => handleAddReply(comment.id, text)}
          />
        )}
        {replies.map((reply) => (
          <CommentBox key={reply.id} comment={reply} level={level + 1} />
        ))}
        {hasMoreReplies && (
          <button onClick={loadReplies} className="text-blue-500 mt-2 ml-[56px]">
            Load More Replies
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
