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
import { useUser } from "@/context/userContextHeader";
import { useRouter } from "next/router";
import { apiCall } from "@/utils/auth-api-w-refresh";

interface CommentProps {
  comment: Comment;
  level: number;
}

interface FullComment
 {
  message: string;
  data: Comment[]; // List of comments
  pagination: {
    total: number;
    firstPage: number;
    currentPage: number;
    totalPages: number;
    pagesLeft: number;
    limit: number;
  } 
  author:string} 


const CommentBox: React.FC<CommentProps> = ({ comment, level }) => {
  const [replies, setReplies] = useState<FullComment|null>(null);
  const [hasMoreReplies, setHasMoreReplies] = useState(true);
  const [replyPage, setReplyPage] = useState(1);
  const [replyInputVisible, setReplyInputVisible] = useState(false);

  const [showReportModal, setShowReportModal] = useState(false);
  const [reportComment, setReportComment] = useState("");
  const { user } = useUser();
  const router = useRouter();
  const { id } = router.query;


  const handleFlagClick = (title: string) => {
    setReportComment(title); // Set the title of the item being reported
    setShowReportModal(true); // Show the modal
  };

  const handleReportSubmit = (data: { explanation: string }) => {
    console.log("Report Submitted for:", reportComment, "Data:", data);
    setShowReportModal(false); // Close the modal after submission
  };

  const loadReplies = async (parentId:string) => {

    try {
      let limit = 5;
      let query = {page:replyPage, limit:limit};
      let payload = {method: "GET", query: query}
      const start = (replyPage - 1) * limit;
      console.log("reply page is", replyPage)
      

      const response = await apiCall(`/api/blog/${id}/comment/${parentId}/sorted-rating`, payload);

      console.log("response")

      let hasMore  = response.pagination.total > (start + limit)

      
      setReplies(response);
      setHasMoreReplies(hasMore);
      setReplyPage((prev) => prev + 1);

    } catch (error) {
      console.error("Failed to load replies:", error);
    }
    
  };

  const handleAddReply = async (parentId:string, parentLevel: string, text: string) => {

    try {
      const newReply = {
        description: text,
        parentLevel: parseInt(parentLevel), // Attach the correct parentId
      };
  
      // await apiCall(`/api/blog/${id}/comment/${parentId}/reply`, {method: "POST", body: JSON.stringify(newReply)});

      // let limit = 5;
      // let query = {page:replyPage, limit:limit};
      // let payload = {method: "GET", query: query}

      //const response = await apiCall(`/api/blog/${id}/comment/sorted-rating`, payload);
      const res = await apiCall(`/api/blog/${id}/comment/${parentId}/reply`, {method: "POST", body: JSON.stringify(newReply)});


      const response = res.data;
      setReplies(response);
      setReplyInputVisible(false);

    } catch (error) {
      console.error("Failed to add reply:", error);
    }
    
  };

  const flagged = comment.flagged;

  return (
    <div className={`relative mt-4 ${level > 0 ? 'ml-4' : ''}`}>
      <div className="absolute left-[31px] top-[45px] bottom-0 w-1 border-l-2 border-gray-800"></div>
      <div className="relative pl-3">
        <div className="flex space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div>
            <div className="flex flex-inline space-x-8">
            <p className="font-bold">{comment.author.firstName}</p>
            {flagged && (<div className="flex flex-inline space-x-2 text-xs font-bold">
            <div className="underline">
                You've been reported
                </div>
                <div>
                    <button className="px-2  bg-red-500 text-white rounded-lg">
                    Why?
                    </button>
                    
                </div>
              
                
            </div>)}
            </div>
           
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
                      upvotes = {String(comment.upvotes)}
                      downvotes = {String(comment.downvotes)}
                      commentId={String(comment.id)}
                    />
                  </div>

                  <div className={`inline-flex items-center rounded-full shadow-sm border-2 pr-2 pl-2 ${flagged ? "bg-red-500 border-red-800" : "bg-gray-200 border-gray-500 "}`}>
                    <button
                      onClick={() => handleFlagClick(comment.author.firstName)}
                      className="text-xs font-bold"
                    >
                      <Flag className="object-scale-down h-5 w-5" />
                    </button>
                  </div>
                </div>

                <ReportCreationModal
                  id={String(comment.id) }
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
            parentId={String(comment.id)} 
            onSubmit={(text) => handleAddReply(String(comment.id), String(comment.level), text)}
          />
        )}
        {replies && replies.data.map((reply) => (
          <CommentBox key={reply.id} comment={reply} level={level + 1} />
        ))}
        {hasMoreReplies && (
          <button onClick={() => loadReplies(String(comment.id))} className="text-blue-500 mt-2 ml-[56px]">
            Load More Replies
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentBox;
