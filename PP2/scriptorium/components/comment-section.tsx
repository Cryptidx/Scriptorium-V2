// import React, { useState } from "react";

// // Simulated API Data
// const commentsData = [
//   { id: "1", author: "John Doe", description: "This is the first comment", upvotes: "12", downvotes: "3", parentId: null },
//   { id: "2", author: "Jane Smith", description: "This is the second comment", upvotes: "5", downvotes: "1", parentId: null },
//   { id: "3", author: "Sam Wilson", description: "This is the third comment", upvotes: "8", downvotes: "2", parentId: null },
//   { id: "4", author: "Chris Evans", description: "This is the fourth comment", upvotes: "9", downvotes: "4", parentId: null },
//   { id: "5", author: "Natasha Romanoff", description: "This is the fifth comment", upvotes: "11", downvotes: "0", parentId: null },
//   { id: "6", author: "Steve Rogers", description: "This is a reply to comment 1", upvotes: "6", downvotes: "1", parentId: "1" },
// ];

// const fetchComments = (page: number, parentId: string | null = null) => {
//   // Simulated API fetch
//   const start = (page - 1) * 5;
//   const end = start + 5;
//   return commentsData.filter((c) => c.parentId === parentId).slice(start, end);
// };

// const CommentSection: React.FC = () => {
//   const [comments, setComments] = useState(fetchComments(1));
//   const [replies, setReplies] = useState<{ [key: string]: any[] }>({});
//   const [currentPage, setCurrentPage] = useState(1);

//   const loadMoreComments = () => {
//     const newPage = currentPage + 1;
//     setComments((prev) => [...prev, ...fetchComments(newPage)]);
//     setCurrentPage(newPage);
//   };

// //   const loadReplies = (parentId: string) => {
// //     const replyPage = replies[parentId]?.length / 5 + 1 || 1;
// //     const newReplies = fetchComments(replyPage, parentId);
// //     setReplies((prev) => ({
// //       ...prev,
// //       [parentId]: [...(prev[parentId] || []), ...newReplies],
// //     }));
// //   };

// const loadReplies = (parentId: string) => {
//     const replyPage = (replies[parentId]?.length || 0) / 5 + 1;
//     const newReplies = fetchComments(replyPage, parentId);
  
//     setReplies((prev) => ({
//       ...prev,
//       [parentId]: [
//         ...(prev[parentId] || []),
//         ...newReplies.filter(
//           (newReply) => !(prev[parentId] || []).some((existingReply) => existingReply.id === newReply.id)
//         ),
//       ],
//     }));
//   };
  

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Comment Section</h2>
//       {comments.map((comment) => (
//         <div key={comment.id} className="mb-4">
//           <div className="p-4 border rounded-md shadow-sm">
//             <p className="font-bold">{comment.author}</p>
//             <p className="text-gray-700">{comment.description}</p>
//             <div className="flex space-x-4 mt-2">
//               <span className="text-green-500">{comment.upvotes} Upvotes</span>
//               <span className="text-red-500">{comment.downvotes} Downvotes</span>
//               <button
//                 className="text-blue-500 hover:underline"
//                 onClick={() => loadReplies(comment.id)}
//               >
//                 Show Replies
//               </button>
//             </div>
//           </div>

//           {/* Replies */}
//           {replies[comment.id] &&
//             replies[comment.id].map((reply) => (
//               <div
//                 key={reply.id}
//                 className="ml-8 mt-2 p-3 border-l-4 border-gray-300"
//               >
//                 <p className="font-bold">{reply.author}</p>
//                 <p className="text-gray-600">{reply.description}</p>
//               </div>
//             ))}
//         </div>
//       ))}

//       {/* Load More Button */}
//       <div className="flex justify-center mt-4">
//         {comments.length < commentsData.filter((c) => c.parentId === null).length && (
//           <button
//             onClick={loadMoreComments}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//           >
//             Load More Comments
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentSection;

// import React, { useState } from "react";

// // Simulated API fetch function
// const fetchComments = (page: number, parentId: string | null = null) => {
//   const start = (page - 1) * 5;
//   const end = start + 5;
//   return commentsData.filter((c) => c.parentId === parentId).slice(start, end);
// };

// const commentsData = [
//   { id: "1", author: "John Doe", description: "This is the first comment", upvotes: "12", downvotes: "3", parentId: null },
//   { id: "2", author: "Jane Smith", description: "This is the second comment", upvotes: "5", downvotes: "1", parentId: null },
//   { id: "3", author: "Sam Wilson", description: "This is the third comment", upvotes: "8", downvotes: "2", parentId: null },
//   { id: "4", author: "Chris Evans", description: "This is the fourth comment", upvotes: "9", downvotes: "4", parentId: null },
//   { id: "5", author: "Natasha Romanoff", description: "This is the fifth comment", upvotes: "11", downvotes: "0", parentId: null },
//   { id: "6", author: "Steve Rogers", description: "This is a reply to comment 1", upvotes: "6", downvotes: "1", parentId: "1" },
//   { id: "7", author: "Tony Stark", description: "This is another reply to comment 1", upvotes: "7", downvotes: "2", parentId: "1" },
//   { id: "8", author: "Bruce Banner", description: "Nested reply to Steve Rogers", upvotes: "3", downvotes: "0", parentId: "6" },
//   { id: "9", author: "Clint Barton", description: "Reply to comment 2", upvotes: "4", downvotes: "1", parentId: "2" },
//   { id: "10", author: "Thor Odinson", description: "Reply to comment 3", upvotes: "5", downvotes: "0", parentId: "3" },
//   { id: "11", author: "Loki Laufeyson", description: "Nested reply to Thor Odinson", upvotes: "2", downvotes: "1", parentId: "10" },
//   { id: "12", author: "Peter Parker", description: "Another reply to comment 1", upvotes: "10", downvotes: "3", parentId: "1" },
//   { id: "13", author: "Wanda Maximoff", description: "Nested reply to Natasha Romanoff", upvotes: "5", downvotes: "0", parentId: "5" },
// ];

// const CommentSection: React.FC = () => {
//   const [comments, setComments] = useState(fetchComments(1));
//   const [replies, setReplies] = useState<{ [key: string]: any[] }>({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [replyPages, setReplyPages] = useState<{ [key: string]: number }>({});

//   const loadMoreComments = () => {
//     const newPage = currentPage + 1;
//     setComments((prev) => [...prev, ...fetchComments(newPage)]);
//     setCurrentPage(newPage);
//   };

//   const loadReplies = (parentId: string) => {
//     const replyPage = (replyPages[parentId] || 0) + 1;
//     const newReplies = fetchComments(replyPage, parentId);

//     setReplies((prev) => ({
//       ...prev,
//       [parentId]: [
//         ...(prev[parentId] || []),
//         ...newReplies.filter(
//           (newReply) => !(prev[parentId] || []).some((existingReply) => existingReply.id === newReply.id)
//         ),
//       ],
//     }));
//     setReplyPages((prev) => ({ ...prev, [parentId]: replyPage }));
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Comment Section</h2>
//       {comments.map((comment) => (
//         <div key={comment.id} className="mb-4">
//           <div className="p-4 border rounded-md shadow-sm">
//             <p className="font-bold">{comment.author}</p>
//             <p className="text-gray-700">{comment.description}</p>
//             <div className="flex space-x-4 mt-2">
//               <span className="text-green-500">{comment.upvotes} Upvotes</span>
//               <span className="text-red-500">{comment.downvotes} Downvotes</span>
//               <button
//                 className="text-blue-500 hover:underline"
//                 onClick={() => loadReplies(comment.id)}
//               >
//                 Show Replies
//               </button>
//             </div>
//           </div>

//           {/* Replies */}
//           {replies[comment.id] &&
//             replies[comment.id].map((reply) => (
//               <div
//                 key={reply.id}
//                 className="ml-8 mt-2 p-3 border-l-4 border-gray-300"
//               >
//                 <p className="font-bold">{reply.author}</p>
//                 <p className="text-gray-600">{reply.description}</p>
//               </div>
//             ))}

//           {/* Load More Replies */}
//           {replies[comment.id] &&
//             replies[comment.id].length <
//               commentsData.filter((c) => c.parentId === comment.id).length && (
//               <button
//                 onClick={() => loadReplies(comment.id)}
//                 className="ml-8 mt-2 text-blue-500 hover:underline"
//               >
//                 Load More Replies
//               </button>
//             )}
//         </div>
//       ))}

//       {/* Load More Comments */}
//       <div className="flex justify-center mt-4">
//         {comments.length < commentsData.filter((c) => c.parentId === null).length && (
//           <button
//             onClick={loadMoreComments}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//           >
//             Load More Comments
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentSection;


// import React, { useState } from "react";

// // Simulated API fetch function
// const fetchComments = (page: number, parentId: string | null = null) => {
//   const start = (page - 1) * 5;
//   const end = start + 5;
//   return commentsData.filter((c) => c.parentId === parentId).slice(start, end);
// };

// const commentsData = [
//   // Mock data with 4 levels of nesting
//   { id: "1", author: "John Doe", description: "Top-level comment 1", upvotes: "12", downvotes: "3", parentId: null },
//   { id: "6", author: "Steve Rogers", description: "Reply to comment 1", upvotes: "6", downvotes: "1", parentId: "1" },
//   { id: "12", author: "Peter Parker", description: "Another reply to comment 1 but in sub 6", upvotes: "10", downvotes: "3", parentId: "6" },
//   { id: "15", author: "Natasha Romanoff", description: "Another reply to comment 1 but in sub 12", upvotes: "11", downvotes: "0", parentId: "12" },


//   { id: "2", author: "Jane Smith", description: "Top-level comment 2", upvotes: "5", downvotes: "1", parentId: null },

// ];

// const CommentSection: React.FC = () => {
//   const [comments, setComments] = useState(fetchComments(1));
//   const [replies, setReplies] = useState<{ [key: string]: any[] }>({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [replyPages, setReplyPages] = useState<{ [key: string]: number }>({});

//   const loadMoreComments = () => {
//     const newPage = currentPage + 1;
//     setComments((prev) => [...prev, ...fetchComments(newPage)]);
//     setCurrentPage(newPage);
//   };

//   const loadReplies = (parentId: string) => {
//     const replyPage = (replyPages[parentId] || 0) + 1;
//     const newReplies = fetchComments(replyPage, parentId);

//     setReplies((prev) => ({
//       ...prev,
//       [parentId]: [
//         ...(prev[parentId] || []),
//         ...newReplies.filter(
//           (newReply) => !(prev[parentId] || []).some((existingReply) => existingReply.id === newReply.id)
//         ),
//       ],
//     }));
//     setReplyPages((prev) => ({ ...prev, [parentId]: replyPage }));
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Comment Section</h2>
//       {comments.map((comment) => (
//         <div key={comment.id} className="mb-4">
//           <div className="p-4 border rounded-md shadow-sm">
//             <p className="font-bold">{comment.author}</p>
//             <p className="text-gray-700">{comment.description}</p>
//             <div className="flex space-x-4 mt-2">
//               <span className="text-green-500">{comment.upvotes} Upvotes</span>
//               <span className="text-red-500">{comment.downvotes} Downvotes</span>
//               <button
//                 className="text-blue-500 hover:underline"
//                 onClick={() => loadReplies(comment.id)}
//               >
//                 Show Replies
//               </button>
//             </div>
//           </div>

//           {/* Replies */}
//           {replies[comment.id] &&
//             replies[comment.id].map((reply) => (
//               <div
//                 key={reply.id}
//                 className="ml-8 mt-2 p-3 border-l-4 border-gray-300"
//               >
//                 <p className="font-bold">{reply.author}</p>
//                 <p className="text-gray-600">{reply.description}</p>
//               </div>
//             ))}

//           {/* Load More Replies */}
//           {replies[comment.id] &&
//             replies[comment.id].length <
//               commentsData.filter((c) => c.parentId === comment.id).length && (
//               <button
//                 onClick={() => loadReplies(comment.id)}
//                 className="ml-8 mt-2 text-blue-500 hover:underline"
//               >
//                 Load More Replies
//               </button>
//             )}
//         </div>
//       ))}

//       {/* Load More Comments */}
//       <div className="flex justify-center mt-4">
//         {comments.length < commentsData.filter((c) => c.parentId === null).length && (
//           <button
//             onClick={loadMoreComments}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//           >
//             Load More Comments
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CommentSection;



// THIS ONE IS GOOD 

// import React, { useState } from "react";

// // Simulated API fetch function
// const fetchComments = (parentId: string | null = null, page: number = 1, perPage: number = 5) => {
//   const filteredComments = commentsData.filter((c) => c.parentId === parentId);
//   const start = (page - 1) * perPage;
//   return filteredComments.slice(start, start + perPage);
// };

// // Mock data with 4 levels of nesting
// const commentsData = [
//   { id: "1", author: "John Doe", description: "Top-level comment 1", upvotes: "12", downvotes: "3", parentId: null },
//   { id: "6", author: "Steve Rogers", description: "Reply to comment 1", upvotes: "6", downvotes: "1", parentId: "1" },
//   { id: "12", author: "Peter Parker", description: "Another reply to comment 1 but in sub 6", upvotes: "10", downvotes: "3", parentId: "6" },
//   { id: "15", author: "Natasha Romanoff", description: "Another reply to comment 1 but in sub 12", upvotes: "11", downvotes: "0", parentId: "12" },
//   { id: "2", author: "Jane Smith", description: "Top-level comment 2", upvotes: "5", downvotes: "1", parentId: null },
// ];

// interface Comment {
//   id: string;
//   author: string;
//   description: string;
//   upvotes: string;
//   downvotes: string;
//   parentId: string | null;
// }

// interface CommentProps {
//   comment: Comment;
//   level: number;
// }

// const Comment: React.FC<CommentProps> = ({ comment, level }) => {
//   const [replies, setReplies] = useState<Comment[]>([]);
//   const [replyPage, setReplyPage] = useState(1);
//   const [hasMoreReplies, setHasMoreReplies] = useState(true);

//   const loadReplies = () => {
//     const newReplies = fetchComments(comment.id, replyPage);
//     setReplies((prev) => [...prev, ...newReplies]);

//     if (newReplies.length < 5) {
//       setHasMoreReplies(false);
//     }

//     setReplyPage((prev) => prev + 1);
//   };

//   return (
//     <div className={`ml-${level * 4} mt-4`}>
//       <div className="p-4 border rounded-md shadow-sm bg-gray-100">
//         <p className="font-bold">{comment.author}</p>
//         <p className="text-gray-700">{comment.description}</p>
//         <div className="flex space-x-4 mt-2">
//           <span className="text-green-500">{comment.upvotes} Upvotes</span>
//           <span className="text-red-500">{comment.downvotes} Downvotes</span>
//           <button className="text-blue-500 hover:underline" onClick={loadReplies}>
//             Show Replies
//           </button>
//         </div>
//       </div>

//       {/* Render Replies */}
//       {replies.map((reply) => (
//         <Comment key={reply.id} comment={reply} level={level + 1} />
//       ))}

//       {/* Load More Replies */}
//       {hasMoreReplies && (
//         <button
//           onClick={loadReplies}
//           className="ml-4 mt-2 text-blue-500 hover:underline"
//         >
//           Load More Replies
//         </button>
//       )}
//     </div>
//   );
// };

// const CommentSection: React.FC = () => {
//   const [comments, setComments] = useState<Comment[]>(fetchComments(null));
//   const [page, setPage] = useState(1);
//   const [hasMoreComments, setHasMoreComments] = useState(true);

//   const loadMoreComments = () => {
//     const newComments = fetchComments(null, page + 1);
//     setComments((prev) => [...prev, ...newComments]);

//     if (newComments.length < 5) {
//       setHasMoreComments(false);
//     }

//     setPage((prev) => prev + 1);
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Comment Section</h2>
//       {comments.map((comment) => (
//         <Comment key={comment.id} comment={comment} level={0} />
//       ))}

//       {/* Load More Top-Level Comments */}
//       {hasMoreComments && (
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={loadMoreComments}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//           >
//             Load More Comments
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentSection;


// has max level stopped 
// import React, { useState } from "react";

// // Simulated API fetch function
// const fetchComments = (
//   parentId: string | null = null,
//   page: number = 1,
//   perPage: number = 5
// ) => {
//   const filteredComments = commentsData.filter((c) => c.parentId === parentId);
//   const start = (page - 1) * perPage;
//   return filteredComments.slice(start, start + perPage);
// };

// // Mock data with nesting and depth limitation
// const commentsData = [
//   { id: "1", author: "John Doe", description: "Top-level comment 1", upvotes: "12", downvotes: "3", parentId: null },
//   { id: "6", author: "Steve Rogers", description: "Reply to comment 1", upvotes: "6", downvotes: "1", parentId: "1" },
//   { id: "12", author: "Peter Parker", description: "Another reply to comment 1 but in sub 6", upvotes: "10", downvotes: "3", parentId: "6" },
//   { id: "15", author: "Natasha Romanoff", description: "Another reply to comment 1 but in sub 12", upvotes: "11", downvotes: "0", parentId: "12" },
//   { id: "20", author: "Bruce Wayne", description: "Another reply to comment 1 but nesting limit reached", upvotes: "7", downvotes: "1", parentId: "15" },
//   { id: "2", author: "Jane Smith", description: "Top-level comment 2", upvotes: "5", downvotes: "1", parentId: null },
// ];

// interface Comment {
//   id: string;
//   author: string;
//   description: string;
//   upvotes: string;
//   downvotes: string;
//   parentId: string | null;
// }

// interface CommentProps {
//   comment: Comment;
//   level: number;
//   maxNestingLevel: number;
// }

// const Comment: React.FC<CommentProps> = ({ comment, level, maxNestingLevel }) => {
//   const [replies, setReplies] = useState<Comment[]>([]);
//   const [replyPage, setReplyPage] = useState(1);
//   const [hasMoreReplies, setHasMoreReplies] = useState(true);

//   const loadReplies = () => {
//     const newReplies = fetchComments(comment.id, replyPage);
//     setReplies((prev) => [...prev, ...newReplies]);

//     if (newReplies.length < 5) {
//       setHasMoreReplies(false);
//     }

//     setReplyPage((prev) => prev + 1);
//   };

//   return (
//     <div className={`ml-${level * 4} mt-4`}>
//       <div className="p-4 border rounded-md shadow-sm bg-gray-100">
//         <p className="font-bold">{comment.author}</p>
//         <p className="text-gray-700">{comment.description}</p>
//         <div className="flex space-x-4 mt-2">
//           <span className="text-green-500">{comment.upvotes} Upvotes</span>
//           <span className="text-red-500">{comment.downvotes} Downvotes</span>
//           {level < maxNestingLevel && (
//             <button
//               className="text-blue-500 hover:underline"
//               onClick={loadReplies}
//             >
//               Show Replies
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Render Replies */}
//       {replies.map((reply) => (
//         <Comment
//           key={reply.id}
//           comment={reply}
//           level={level + 1}
//           maxNestingLevel={maxNestingLevel}
//         />
//       ))}

//       {/* Load More Replies */}
//       {hasMoreReplies && level < maxNestingLevel && (
//         <button
//           onClick={loadReplies}
//           className="ml-4 mt-2 text-blue-500 hover:underline"
//         >
//           Load More Replies
//         </button>
//       )}

//       {/* Nesting Limit Reached */}
//       {level >= maxNestingLevel && (
//         <p className="ml-4 mt-2 text-gray-500">
//           Maximum nesting level reached. Please start a new thread.
//         </p>
//       )}
//     </div>
//   );
// };

// const CommentSection: React.FC = () => {
//   const [comments, setComments] = useState<Comment[]>(fetchComments(null));
//   const [page, setPage] = useState(1);
//   const [hasMoreComments, setHasMoreComments] = useState(true);

//   const loadMoreComments = () => {
//     const newComments = fetchComments(null, page + 1);
//     setComments((prev) => [...prev, ...newComments]);

//     if (newComments.length < 5) {
//       setHasMoreComments(false);
//     }

//     setPage((prev) => prev + 1);
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Comment Section</h2>
//       {comments.map((comment) => (
//         <Comment key={comment.id} comment={comment} level={0} maxNestingLevel={4} />
//       ))}

//       {/* Load More Top-Level Comments */}
//       {hasMoreComments && (
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={loadMoreComments}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//           >
//             Load More Comments
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentSection;


// import React, { useState, createContext, useContext } from "react";
// import CommentPopUp from "./comment/comment-pop";
// import CommentButton from "./comment-button";

// // Simulated API fetch and data
// const fetchComments = () => [...mockComments];

// const mockComments = [
//   { id: "1", author: "John Doe", description: "Top-level comment 1", parentId: null },
//   { id: "6", author: "Steve Rogers", description: "Reply to comment 1", parentId: "1" },
//   { id: "12", author: "Peter Parker", description: "Nested reply to comment 1", parentId: "6" },
// ];

// interface Comment {
//   id: string;
//   author: string;
//   description: string;
//   parentId: string | null;
// }

// interface UserContextValue {
//   isLoggedIn: boolean;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) throw new Error("useUserContext must be used within UserProvider");
//   return context;
// };

// const CommentSection: React.FC = () => {
//   const { isLoggedIn } = useUserContext();
//   const [comments, setComments] = useState<Comment[]>(fetchComments());
//   const [activePopUp, setActivePopUp] = useState<string | null>(null);

//   const handleAddComment = (parentId: string | null, description: string) => {
//     const newComment = {
//       id: Date.now().toString(),
//       author: "Current User",
//       description,
//       parentId,
//     };
//     setComments((prev) => [...prev, newComment]);
//   };

//   const renderComments = (parentId: string | null, level: number = 0) => {
//     const filteredComments = comments.filter((c) => c.parentId === parentId);
//     return filteredComments.map((comment) => (
//       <div key={comment.id} className={`ml-${level * 4} mt-4`}>
//         <div className="p-4 border rounded-md shadow-sm bg-gray-100">
//           <p className="font-bold">{comment.author}</p>
//           <p className="text-gray-700">{comment.description}</p>
//           <div className="flex justify-between items-center mt-2">
//             {isLoggedIn && (
//             <CommentButton onClick={() => setActivePopUp(comment.id)} />
//             )}
//           </div>
//         </div>
//         {renderComments(comment.id, level + 1)}
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Comment Section</h2>
//       {renderComments(null)}

//       {/* Pop-Up for adding comments */}
//       {activePopUp && (
//         <CommentPopUp
//           onClose={() => setActivePopUp(null)}
//           onSubmit={(description) => handleAddComment(activePopUp, description)}
//         />
//       )}
//     </div>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <UserContext.Provider value={{ isLoggedIn: true }}>
//       <CommentSection />
//     </UserContext.Provider>
//   );
// };

// export default App;


// import React, { useState, createContext, useContext } from "react";
// import CommentPopUp from "./comment/comment-pop";
// import CommentButton from "./comment-button";

// // Mock data and API fetch
// const fetchComments = () => [...mockComments];

// const mockComments = [
//   { id: "1", author: "John Doe", description: "Top-level comment 1", parentId: null },
//   { id: "6", author: "Steve Rogers", description: "Reply to comment 1", parentId: "1" },
//   { id: "12", author: "Peter Parker", description: "Nested reply to comment 1", parentId: "6" },
// ];

// interface Comment {
//   id: string;
//   author: string;
//   description: string;
//   parentId: string | null;
// }

// interface UserContextValue {
//   isLoggedIn: boolean;
// }

// const UserContext = createContext<UserContextValue | undefined>(undefined);

// const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) throw new Error("useUserContext must be used within UserProvider");
//   return context;
// };

// const CommentSection: React.FC = () => {
//   const { isLoggedIn } = useUserContext();
//   const [comments, setComments] = useState<Comment[]>(fetchComments());
//   const [activePopUp, setActivePopUp] = useState<string | null>(null); // Tracks which comment's pop-up is active

//   const handleAddComment = (parentId: string | null, description: string) => {
//     const newComment: Comment = {
//       id: Date.now().toString(),
//       author: "Current User",
//       description,
//       parentId,
//     };
//     setComments((prev) => [...prev, newComment]); // Add new comment to the list
//     setActivePopUp(null); // Close the pop-up after adding the comment
//   };

//   const renderComments = (parentId: string | null, level: number = 0) => {
//     const filteredComments = comments.filter((c) => c.parentId === parentId);
//     return filteredComments.map((comment) => (
//       <div key={comment.id} className={`ml-${level * 4} mt-4`}>
//         <div className="p-4 border rounded-md shadow-sm bg-gray-100">
//           <p className="font-bold">{comment.author}</p>
//           <p className="text-gray-700">{comment.description}</p>
//           <div className="flex justify-between items-center mt-2">
//             {isLoggedIn && (
//               <CommentButton onClick={() => setActivePopUp(comment.id)} />
//             )}
//           </div>
//         </div>
//         {renderComments(comment.id, level + 1)} {/* Recursively render nested comments */}
//       </div>
//     ));
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">Comment Section</h2>
//       {renderComments(null)}

//       {/* Pop-Up for adding comments */}
//       {activePopUp && (
//         <CommentPopUp
//           onClose={() => setActivePopUp(null)} // Close pop-up
//           onSubmit={(description) => handleAddComment(activePopUp, description)} // Add comment
//         />
//       )}
//     </div>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <UserContext.Provider value={{ isLoggedIn: true }}>
//       <CommentSection />
//     </UserContext.Provider>
//   );
// };

// export default App;


// import React, { useState } from "react";
// import CommentButton from "./comment-button";

// // Simulated mock function to handle adding a comment
// const mockHandleAddComment = (parentId: string | null, comment: string) => {
//   console.log(`New comment added! Parent ID: ${parentId}, Comment: "${comment}"`);
// };

// // Mock data for comments
// const mockComments = [
//   { id: "1", author: "John Doe", description: "This is a top-level comment.", parentId: null },
//   { id: "2", author: "Jane Smith", description: "This is a reply to the first comment.", parentId: "1" },
// ];

// const CommentSection = () => {
//   const [comments, setComments] = useState(mockComments);

//   // Function to add a comment to the state
//   const handleAddComment = (parentId: string | null, comment: string) => {
//     const newComment = {
//       id: (Date.now() + Math.random()).toString(), // Unique ID for the new comment
//       author: "Current User", // Mocked user
//       description: comment,
//       parentId,
//     };
//     setComments((prevComments) => [...prevComments, newComment]);
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Comments Section</h2>
//       {comments
//         .filter((comment) => comment.parentId === null) // Show only top-level comments
//         .map((comment) => (
//           <div key={comment.id} className="mb-4 p-4 border rounded bg-gray-100">
//             <p className="font-bold">{comment.author}</p>
//             <p>{comment.description}</p>

//             {/* Comment Button */}
//             <CommentButton
//               parentId={comment.id}
//               onSubmit={handleAddComment}
//             />

//             {/* Render replies */}
//             <div className="ml-6 mt-2">
//               {comments
//                 .filter((reply) => reply.parentId === comment.id) // Show only replies for this comment
//                 .map((reply) => (
//                   <div key={reply.id} className="p-3 border rounded bg-gray-50">
//                     <p className="font-bold">{reply.author}</p>
//                     <p>{reply.description}</p>

//                     {/* Comment Button for replies */}
//                     <CommentButton
//                       parentId={reply.id}
//                       onSubmit={handleAddComment}
//                     />
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default CommentSection;


// import React, { useState } from "react";

// // Simulated API fetch function
// const fetchComments = (parentId: string | null = null, page: number = 1, perPage: number = 5) => {
//   const filteredComments = commentsData.filter((c) => c.parentId === parentId);
//   const start = (page - 1) * perPage;
//   return filteredComments.slice(start, start + perPage);
// };

// // Simulated API add comment function
// const addComment = (newComment: Comment) => {
//   commentsData.push(newComment);
// };

// const commentsData = [
//   { id: "1", author: "John Doe", description: "Top-level comment 1", upvotes: "12", downvotes: "3", parentId: null },
//   { id: "6", author: "Steve Rogers", description: "Reply to comment 1", upvotes: "6", downvotes: "1", parentId: "1" },
//   { id: "12", author: "Peter Parker", description: "Another reply to comment 1 but in sub 6", upvotes: "10", downvotes: "3", parentId: "6" },
//   { id: "20", author: "Peter P", description: "Another reply to comment 6", upvotes: "10", downvotes: "3", parentId: "6" },
//   { id: "15", author: "Natasha Romanoff", description: "Another reply to comment 1 but in sub 12", upvotes: "11", downvotes: "0", parentId: "12" },
//   { id: "2", author: "Jane Smith", description: "Top-level comment 2", upvotes: "5", downvotes: "1", parentId: null },
// ];

// interface Comment {
//   id: string;
//   author: string;
//   description: string;
//   upvotes: string;
//   downvotes: string;
//   parentId: string | null;
// }

// interface CommentProps {
//   comment: Comment;
//   level: number;
//   onReplyAdded: (reply: Comment) => void;
// }

// const Comment: React.FC<CommentProps> = ({ comment, level, onReplyAdded }) => {
//   const [replies, setReplies] = useState<Comment[]>([]);
//   const [replyPage, setReplyPage] = useState(1);
//   const [hasMoreReplies, setHasMoreReplies] = useState(true);
//   const [showReplyInput, setShowReplyInput] = useState(false);
//   const [replyText, setReplyText] = useState("");

//   const loadReplies = () => {
//     const newReplies = fetchComments(comment.id, replyPage);
//     setReplies((prev) => [...prev, ...newReplies]);

//     if (newReplies.length < 5) {
//       setHasMoreReplies(false);
//     }

//     setReplyPage((prev) => prev + 1);
//   };

//   const handleReplySubmit = () => {
//     if (!replyText.trim()) return;

//     const newReply: Comment = {
//       id: Math.random().toString(36).substr(2, 9), // Random ID
//       author: "Current User", // Replace with actual user data
//       description: replyText,
//       upvotes: "0",
//       downvotes: "0",
//       parentId: comment.id,
//     };

//     addComment(newReply); // Simulated API call
//     setReplies((prev) => [...prev, newReply]);
//     onReplyAdded(newReply);
//     setReplyText("");
//     setShowReplyInput(false);
//   };

//   return (
//     <div className={`ml-${level * 4} mt-4`}>
//       <div className="p-4 border rounded-md shadow-sm bg-gray-100">
//         <p className="font-bold">{comment.author}</p>
//         <p className="text-gray-700">{comment.description}</p>
//         <div className="flex space-x-4 mt-2">
//           <span className="text-green-500">{comment.upvotes} Upvotes</span>
//           <span className="text-red-500">{comment.downvotes} Downvotes</span>
//           <button className="text-blue-500 hover:underline" onClick={loadReplies}>
//             Show Replies
//           </button>
//           <button
//             className="text-blue-500 hover:underline"
//             onClick={() => setShowReplyInput((prev) => !prev)}
//           >
//             Reply
//           </button>
//         </div>
//         {showReplyInput && (
//           <div className="mt-2">
//             <textarea
//               className="w-full p-2 border rounded-md"
//               placeholder="Write your reply..."
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//             />
//             <button
//               onClick={handleReplySubmit}
//               className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//             >
//               Submit Reply
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Render Replies */}
//       {replies.map((reply) => (
//         <Comment key={reply.id} comment={reply} level={level + 1} onReplyAdded={onReplyAdded} />
//       ))}

//       {/* Load More Replies */}
//       {hasMoreReplies && (
//         <button
//           onClick={loadReplies}
//           className="ml-4 mt-2 text-blue-500 hover:underline"
//         >
//           Load More Replies
//         </button>
//       )}
//     </div>
//   );
// };

// const CommentSection: React.FC = () => {
//   const [comments, setComments] = useState<Comment[]>(fetchComments(null));
//   const [page, setPage] = useState(1);
//   const [hasMoreComments, setHasMoreComments] = useState(true);
//   const [newCommentText, setNewCommentText] = useState("");

//   const loadMoreComments = () => {
//     const newComments = fetchComments(null, page + 1);
//     setComments((prev) => [...prev, ...newComments]);

//     if (newComments.length < 5) {
//       setHasMoreComments(false);
//     }

//     setPage((prev) => prev + 1);
//   };

//   const handleAddComment = () => {
//     if (!newCommentText.trim()) return;

//     const newComment: Comment = {
//       id: Math.random().toString(36).substr(2, 9), // Random ID
//       author: "Current User", // Replace with actual user data
//       description: newCommentText,
//       upvotes: "0",
//       downvotes: "0",
//       parentId: null,
//     };

//     addComment(newComment); // Simulated API call
//     setComments((prev) => [newComment, ...prev]);
//     setNewCommentText("");
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Comment Section</h2>
//       <div className="mb-4">
//         <textarea
//           className="w-full p-2 border rounded-md"
//           placeholder="Write a new comment..."
//           value={newCommentText}
//           onChange={(e) => setNewCommentText(e.target.value)}
//         />
//         <button
//           onClick={handleAddComment}
//           className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//         >
//           Submit Comment
//         </button>
//       </div>
//       {comments.map((comment) => (
//         <Comment key={comment.id} comment={comment} level={0} onReplyAdded={() => {}} />
//       ))}

//       {/* Load More Top-Level Comments */}
//       {hasMoreComments && (
//         <div className="flex justify-center mt-4">
//           <button
//             onClick={loadMoreComments}
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
//           >
//             Load More Comments
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CommentSection;

//good?
// import React, { useState } from "react";
// import CommentBox from "./commentBox"; // A single comment/reply component
// import ReplyInput from "./reply-input"; // Reply input text box
// import AddCommentInput from "./addCommentInput"; // Input box for adding top-level comments

// // Mock API functions
// const fetchComments = (parentId: string | null = null, page: number = 1, perPage: number = 5) => {
//   const filteredComments = commentsData.filter((c) => c.parentId === parentId);
//   const start = (page - 1) * perPage;
//   return filteredComments.slice(start, start + perPage);
// };

// const addCommentAPI = (newComment: any) => {
//   commentsData.push(newComment); // Simulate adding a comment to the backend
// };

// const commentsData = [
//   { id: "1", author: "John Doe", description: "Top-level comment 1", upvotes: "12", downvotes: "3", parentId: null },
//   { id: "6", author: "Steve Rogers", description: "Reply to comment 1", upvotes: "6", downvotes: "1", parentId: "1" },
//   { id: "12", author: "Peter Parker", description: "Another reply to comment 1 but in sub 6", upvotes: "10", downvotes: "3", parentId: "6" },
//   { id: "20", author: "Peter P", description: "Another reply to comment 6", upvotes: "10", downvotes: "3", parentId: "6" },
//   { id: "15", author: "Natasha Romanoff", description: "Another reply to comment 1 but in sub 12", upvotes: "11", downvotes: "0", parentId: "12" },
//   { id: "2", author: "Jane Smith", description: "Top-level comment 2", upvotes: "5", downvotes: "1", parentId: null },
// ];

// const CommentSection: React.FC = () => {
//   const [comments, setComments] = useState(fetchComments(null)); // Top-level comments
//   const [page, setPage] = useState(1);
//   const [hasMoreComments, setHasMoreComments] = useState(true);
//   const [replyInputVisible, setReplyInputVisible] = useState<string | null>(null); // Tracks which comment's reply input is visible

//   const loadMoreComments = () => {
//     const newComments = fetchComments(null, page + 1);
//     setComments((prev) => [...prev, ...newComments]);
//     if (newComments.length < 5) setHasMoreComments(false);
//     setPage((prev) => prev + 1);
//   };

//   const handleAddComment = (text: string) => {
//     const newComment = {
//       id: Math.random().toString(36).substr(2, 9), // Random ID
//       author: "Current User",
//       description: text,
//       upvotes: "0",
//       downvotes: "0",
//       parentId: null,
//     };
//     addCommentAPI(newComment);
//     setComments((prev) => [newComment, ...prev]);
//     if (comments.length >= 5) setPage((prev) => prev + 1); // Push the oldest comment to the next page
//   };

//   const handleAddReply = (parentId: string, text: string) => {
//     const newReply = {
//       id: Math.random().toString(36).substr(2, 9),
//       author: "Current User",
//       description: text,
//       upvotes: "0",
//       downvotes: "0",
//       parentId,
//     };
//     addCommentAPI(newReply);
//     setReplyInputVisible(null); // Hide reply input after submission
//   };

//   return (
//     <div className="w-full max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Comment Section</h2>
//       <AddCommentInput onAddComment={handleAddComment} />

//       {comments.map((comment) => (
//         <CommentBox
//           key={comment.id}
//           comment={comment}
//           fetchReplies={fetchComments}
//           onAddReply={handleAddReply}
//           replyInputVisible={replyInputVisible}
//           setReplyInputVisible={setReplyInputVisible}
//         />
//       ))}

//       {hasMoreComments && (
//         <button
//           onClick={loadMoreComments}
//           className="w-full mt-4 p-2 bg-blue-500 text-white rounded"
//         >
//           Load More Comments
//         </button>
//       )}
//     </div>
//   );
// };

// export default CommentSection;


/// WORKING VERSION FR FR 

// import React, { useState, useEffect } from "react";
// import CommentBox from "./commentBox";// A single comment/reply component
// import AddCommentInput from "./addCommentInput"; // Input box for adding top-level comments
// import { fetchComments, addComment } from "./mockApi"; 

// const CommentSection: React.FC = () => {
//   const [comments, setComments] = useState<any[]>([]);
//   const [page, setPage] = useState(1);
//   const [hasMoreComments, setHasMoreComments] = useState(true);

//   useEffect(() => {
//     // Load initial comments
//     loadMoreComments();
//   }, []);

//   const loadMoreComments = async () => {
//     const response = await fetchComments(null, page);
//     setComments((prev) => [...prev, ...response.data]);
//     setHasMoreComments(response.hasMore);
//     setPage((prev) => prev + 1);
//   };

//   const handleAddComment = async (text: string) => {
//     const newComment = {
//       author: "Current User",
//       description: text,
//       parentId: null,
//     };

//     const addedComment = await addComment(newComment);

//     if (comments.length < 5) {
//       setComments((prev) => [addedComment, ...prev]);
//     } else {
//       setHasMoreComments(true); // Ensure pagination updates when new comment pushes others down
//     }
//   };

//   return (
//     <div className="w-full pb-[20px] max-w-2xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">Comment Section</h2>
//       <AddCommentInput onAddComment={handleAddComment} />

//       {comments.map((comment) => (
//         <CommentBox key={comment.id} comment={comment} level={0} />
//       ))}

//       {hasMoreComments && (
//         <button
//           onClick={loadMoreComments}
//           className="w-full mt-4 p-2 bg-blue-500 text-white rounded"
//         >
//           Load More Comments
//         </button>
//       )}
//     </div>
//   );
// };

// export default CommentSection;




import React, { useState, useEffect } from "react";
import CommentBox from "./commentBox";// A single comment/reply component
import AddCommentInput from "./addCommentInput"; // Input box for adding top-level comments
import { fetchComments, addComment } from "./mockApi"; 
import { apiCall } from "@/utils/auth-api-w-refresh";
import { useUser } from "@/context/userContextHeader";
import { useRouter } from "next/router";



// interface Pagination{
//   total: number,
//   firstPage:  number,
//   currentPage: number,
//   totalPages:  number,
//   pagesLeft: number,
//   limit:  number,
// }

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

const CommentSection: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [comments, setComments] = useState<FullComment|null>(null);
  const [comment, setComment] =  useState<Comment|null>(null)
  const [page, setPage] = useState(1);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    // Load initial comments
    loadMoreComments();
  }, []);

  const loadMoreComments = async () => {
    try {
      let limit = 5;
      let query = {page:page, limit:limit};
      let payload = {method: "GET", query: query}

      const start = (page - 1) * limit;
    
      const response = await apiCall(`/api/blog/${id}/comment/sorted-rating`, payload);
      let hasMore  = response.pagination.total > (start + limit)

      console.log(JSON.stringify(response))
      console.log(JSON.stringify(response.body))

      setComments(response);

      setHasMoreComments(hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Failed to load comments:", error);
    }
    
  };

  const handleAddComment = async (text: string) => {
    

    // const newComment = {
    //   author: "Current User",
    //   description: text,
    //   parentId: null,
    // };

    try {
      const newComment = {
        description: text,
      };

      // let addedComment =  await apiCall(`/api/blog/${id}/comment`, {method: "POST", body: JSON.stringify(newComment)});
      //addedComment["author"] = `${user?.firstName} ${user?.lastName}`;

      let limit = 5;
      let query = {page:page, limit:limit};
      let payload = {method: "GET", query: query}


      // first add the comment to the list 
      await apiCall(`/api/blog/${id}/comment`, {method: "POST", body: JSON.stringify(newComment)});
      
      // then get the updated sorted ratings of comments
      // which updates what we look at 
      const response = await apiCall(`/api/blog/${id}/comment/sorted-rating`, payload);
      
  
      if (comments && comments.pagination.total < 5) {
        // we want to set the state
        setComments(response);
      } else {
        setHasMoreComments(true); // Ensure pagination updates when new comment pushes others down
      }
      
    } catch (error) {
      console.error("Failed to add comment:", error);
    }

   
  };

  return (
    <div className="w-full pb-[20px] max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Comment Section</h2>
      <AddCommentInput onAddComment={handleAddComment} />

      {comments && (comments.data.map((comment) => (
        <CommentBox key={comment.id} comment={comment} level={0} />
      )))}

      {hasMoreComments && (
        <button
          onClick={loadMoreComments}
          className="w-full mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Load More Comments
        </button>
      )}
    </div>
  );
};

export default CommentSection;
