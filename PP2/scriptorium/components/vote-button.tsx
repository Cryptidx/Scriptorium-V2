// // // import React, { useState } from "react";
// // // import TriggerButton from "./triggerButton";
// // // import { apiCall } from "@/utils/auth-api-w-refresh";
// // // import { useUser } from "@/context/userContextHeader";
// // // import { useRouter } from "next/router";

// // // interface VoteButtonProps {
// // //   upvoteIcon: React.ReactNode; // Default (inactive) upvote icon
// // //   upvoteActiveIcon: React.ReactNode; // Active upvote icon
// // //   downvoteIcon: React.ReactNode; // Default (inactive) downvote icon
// // //   downvoteActiveIcon: React.ReactNode; // Active downvote icon
// // //   initialText: string; // Initial text to display between icons
// // //   changeText: string; // should we change text or not?
// // //   upvotes:string;
// // //   downvotes:string;
// // //   commentId?:string;
// // // }



// // // const VoteButton: React.FC<VoteButtonProps> = ({
// // //   upvoteIcon,
// // //   upvoteActiveIcon,
// // //   downvoteIcon,
// // //   downvoteActiveIcon,
// // //   initialText,
// // //   changeText,
// // //   upvotes,
// // //   downvotes
// // // }) => {
// // //   const [vote, setVote] = useState<"upvote" | "downvote" | null>(null); // Track current vote state
// // //   const [text, setText] = useState<string>(initialText); // Text displayed between buttons
// // //   const [currentUpvotes, setCurrentUpvotes] = useState<number>(parseInt(upvotes));
// // //   const [currentDownvotes, setCurrentDownvotes] = useState<number>(parseInt(downvotes));

// // //   const router = useRouter();
// // //   const { id } = router.query;

// // //   let up = parseInt(upvotes)
// // //   let down = parseInt(downvotes)

 

// // //   // Handle upvote toggling
// // //   const handleUpvoteToggle = async() => {

// // //     try {
      
// // //       let bod = {upvotes:up++}
// // //       let payload = { method: "PUT" , body:JSON.stringify(bod)}

// // //       let blog = await apiCall(`/api/blog/${id}`, payload);

// // //       if (vote === "upvote") {
// // //         setVote(null); // Deselect if already upvoted
// // //         setText(initialText); // Reset text
// // //       } else {
// // //         setVote("upvote"); // Set upvote
// // //         // call api function
// // //         // set trxt to result of api function
// // //         if(parseInt(changeText)){
// // //           setText(`${blog.upvotes + blog.downvotes}`);
// // //         }
        
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to vote:", error);
// // //     }
   
// // //   };

// // //   // Handle downvote toggling
// // //   const handleDownvoteToggle = async() => {

// // //     try {

// // //       let new_votes = parseInt(initialText)-1
// // //       if(new_votes < 0) {new_votes == 0}
// // //       down++
// // //       const bod = {downvotes:String(down)}
      
    
// // //       let blog = await apiCall(`/api/blog/${id}`, {method: "PUT", body: bod} )

// // //       if (vote === "downvote") {
// // //         setVote(null); // Deselect if already downvoted
// // //         setText(initialText); // Reset text
// // //       } else {
// // //         setVote("downvote"); // Set downvote
// // //         if(parseInt(changeText)){
// // //           setText(`${blog.upvotes + blog.downvotes}`); // Update text
// // //         }
        
// // //       }
// // //     } catch (error) {
// // //       console.error("Failed to vote:", error);
// // //     }
    
// // //   };

// // //   return (
// // //     <div className="inline-flex items-center   bg-gray-200 rounded-full shadow-sm border-gray-500 border-2">
// // //       {/* Upvote Button */}
// // //       <TriggerButton
// // //         id="upvote"
// // //         initialContent={upvoteIcon}
// // //         toggledContent={upvoteActiveIcon}
// // //         isActive={vote === "upvote"}
// // //         onToggle={handleUpvoteToggle}
// // //       />

// // //       {/* Text Between Buttons */}
// // //       <div >
// // //       <span className="text-xs font-bold text-gray-700">{text}</span>
// // //       </div>
     

// // //       {/* Downvote Button */}
// // //       <TriggerButton
// // //         id="downvote"
// // //         initialContent={downvoteIcon}
// // //         toggledContent={downvoteActiveIcon}
// // //         isActive={vote === "downvote"}
// // //         onToggle={handleDownvoteToggle}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default VoteButton;
// // import React, { useState } from "react";
// // import TriggerButton from "./triggerButton";
// // import { apiCall } from "@/utils/auth-api-w-refresh";
// // import { useUser } from "@/context/userContextHeader";
// // import { useRouter } from "next/router";

// // interface VoteButtonProps {
// //   upvoteIcon: React.ReactNode; // Default (inactive) upvote icon
// //   upvoteActiveIcon: React.ReactNode; // Active upvote icon
// //   downvoteIcon: React.ReactNode; // Default (inactive) downvote icon
// //   downvoteActiveIcon: React.ReactNode; // Active downvote icon
// //   initialText: string; // Initial text to display between icons
// //   changeText: string; // Indicates whether to change the text dynamically
// //   upvotes: string; // Initial upvotes count
// //   downvotes: string; // Initial downvotes count
// //   commentId?: string; // Optional comment ID for voting on comments
// // }

// // const VoteButton: React.FC<VoteButtonProps> = ({
// //   upvoteIcon,
// //   upvoteActiveIcon,
// //   downvoteIcon,
// //   downvoteActiveIcon,
// //   initialText,
// //   changeText,
// //   upvotes,
// //   downvotes,
// //   commentId,
// // }) => {
// //   const [vote, setVote] = useState<"upvote" | "downvote" | null>(null); // Track current vote state
// //   const [text, setText] = useState<string>(initialText); // Text displayed between buttons
// //   const [currentUpvotes, setCurrentUpvotes] = useState<number>(parseInt(upvotes));
// //   const [currentDownvotes, setCurrentDownvotes] = useState<number>(parseInt(downvotes));

// //   const router = useRouter();
// //   const { id } = router.query;

// //   const handleUpvoteToggle = async () => {
// //     try {
// //       let newUpvotes = currentUpvotes;
// //       let newDownvotes = currentDownvotes;

// //       if (vote === "upvote") {
// //         // If already upvoted, undo the vote
// //         newUpvotes -= 1;
// //         setVote(null);
// //       } else {
// //         // Otherwise, add an upvote
// //         newUpvotes += 1;

// //         if (vote === "downvote") {
// //           // If previously downvoted, remove the downvote
// //           newDownvotes -= 1;
// //         }
// //         setVote("upvote");
// //       }

// //       const payload = {
// //         upvotes: newUpvotes,
// //         downvotes: newDownvotes,
// //       };

// //       await apiCall(`/api/blog/${id}${commentId ? `/comment/${commentId}` : ""}`, {
// //         method: "PUT",
// //         body: JSON.stringify(payload),
// //       });

// //       setCurrentUpvotes(newUpvotes);
// //       setCurrentDownvotes(newDownvotes);

// //       if (parseInt(changeText)) {
// //         setText(String(newUpvotes - newDownvotes));
// //       }
// //     } catch (error) {
// //       console.error("Failed to upvote:", error);
// //     }
// //   };

// //   const handleDownvoteToggle = async () => {
// //     try {
// //       let newUpvotes = currentUpvotes;
// //       let newDownvotes = currentDownvotes;

// //       if (vote === "downvote") {
// //         // If already downvoted, undo the vote
// //         newDownvotes -= 1;
// //         setVote(null);
// //       } else {
// //         // Otherwise, add a downvote
// //         newDownvotes += 1;

// //         if (vote === "upvote") {
// //           // If previously upvoted, remove the upvote
// //           newUpvotes -= 1;
// //         }
// //         setVote("downvote");
// //       }

// //       const payload = {
// //         upvotes: newUpvotes,
// //         downvotes: newDownvotes,
// //       };

// //       await apiCall(`/api/blog/${id}${commentId ? `/comment/${commentId}` : ""}`, {
// //         method: "PUT",
// //         body: JSON.stringify(payload),
// //       });

// //       setCurrentUpvotes(newUpvotes);
// //       setCurrentDownvotes(newDownvotes);

// //       if (parseInt(changeText)) {
// //         setText(String(newUpvotes - newDownvotes));
// //       }
// //     } catch (error) {
// //       console.error("Failed to downvote:", error);
// //     }
// //   };

// //   return (
// //     <div className="inline-flex items-center bg-gray-200 rounded-full shadow-sm border-gray-500 border-2">
// //       {/* Upvote Button */}
// //       <TriggerButton
// //         id="upvote"
// //         initialContent={upvoteIcon}
// //         toggledContent={upvoteActiveIcon}
// //         isActive={vote === "upvote"}
// //         onToggle={handleUpvoteToggle}
// //       />

// //       {/* Text Between Buttons */}
// //       <div>
// //         <span className="text-xs font-bold text-gray-700">{text}</span>
// //       </div>

// //       {/* Downvote Button */}
// //       <TriggerButton
// //         id="downvote"
// //         initialContent={downvoteIcon}
// //         toggledContent={downvoteActiveIcon}
// //         isActive={vote === "downvote"}
// //         onToggle={handleDownvoteToggle}
// //       />
// //     </div>
// //   );
// // };

// // export default VoteButton;
// // import React, { useState } from "react";
// // import TriggerButton from "./triggerButton";
// // import { apiCall } from "@/utils/auth-api-w-refresh";
// // import { useRouter } from "next/router";

// // interface VoteButtonProps {
// //   upvoteIcon: React.ReactNode; // Default (inactive) upvote icon
// //   upvoteActiveIcon: React.ReactNode; // Active upvote icon
// //   downvoteIcon: React.ReactNode; // Default (inactive) downvote icon
// //   downvoteActiveIcon: React.ReactNode; // Active downvote icon
// //   initialText: string; // Initial text to display between icons
// //   changeText: string; // Indicates whether to change the text dynamically
// //   upvotes: string; // Initial upvotes count
// //   downvotes: string; // Initial downvotes count
// //   commentId?: string; // Optional comment ID for voting on comments
// // }

// // const VoteButton: React.FC<VoteButtonProps> = ({
// //   upvoteIcon,
// //   upvoteActiveIcon,
// //   downvoteIcon,
// //   downvoteActiveIcon,
// //   initialText,
// //   changeText,
// //   upvotes,
// //   downvotes,
// //   commentId,
// // }) => {
// //   const [vote, setVote] = useState<"upvote" | "downvote" | null>(null); // Track current vote state
// //   const [text, setText] = useState<string>(initialText); // Text displayed between buttons
// //   const [currentUpvotes, setCurrentUpvotes] = useState<number>(parseInt(upvotes));
// //   const [currentDownvotes, setCurrentDownvotes] = useState<number>(parseInt(downvotes));

// //   const router = useRouter();
// //   const { id } = router.query;

// //   const updateBackendVotes = async (newUpvotes: number, newDownvotes: number) => {
// //     try {
// //       const payload = {
// //         upvotes: newUpvotes,
// //         downvotes: newDownvotes,
// //       };

// //       await apiCall(`/api/blog/${id}${commentId ? `/comment/${commentId}` : ""}`, {
// //         method: "PUT",
// //         body: JSON.stringify(payload),
// //       });
// //     } catch (error) {
// //       console.error("Failed to update votes:", error);
// //     }
// //   };

// //   const handleUpvoteToggle = async () => {

// //     try {
// //       let newUpvotes = currentUpvotes;
// //     let newDownvotes = currentDownvotes;

// //     if (vote === "upvote") {
// //       // If already upvoted, remove the upvote
// //       newUpvotes -= 1;
// //       setVote(null);
// //     } else {
// //       // Add an upvote
// //       newUpvotes += 1;
// //       if (vote === "downvote") {
// //         // If previously downvoted, remove the downvote
// //         newDownvotes += 1;
// //       }
// //       setVote("upvote");
// //     }

// //     console.log(newDownvotes)
// //     console.log(newUpvotes)

// //     await updateBackendVotes(newUpvotes, newDownvotes);
// //     setCurrentUpvotes(newUpvotes);
// //     setCurrentDownvotes(newDownvotes);

// //     if (parseInt(changeText)) {
// //       setText(String(newUpvotes - newDownvotes));
// //     }
// //     } catch (error) {
// //       console.error("Failed to add update:", error);
// //     }
    
// //   };

// //   const handleDownvoteToggle = async () => {

// //     try {
// //       let newUpvotes = currentUpvotes;
// //     let newDownvotes = currentDownvotes;

// //     if (vote === "downvote") {
// //       // If already downvoted, remove the downvote
// //       newDownvotes -= 1;
// //       setVote(null);
// //     } else {
// //       // Add a downvote
// //       newDownvotes += 1;
// //       if (vote === "upvote") {
// //         // If previously upvoted, remove the upvote
// //         newUpvotes -= 1;
// //       }
// //       setVote("downvote");
// //     }

// //     await updateBackendVotes(newUpvotes, newDownvotes);
// //     setCurrentUpvotes(newUpvotes);
// //     setCurrentDownvotes(newDownvotes);

// //     if (parseInt(changeText)) {
// //       setText(String(newUpvotes - newDownvotes));
// //     }
// //     } catch (error) {
// //       console.error("Failed to add update:", error);
// //     }
    
// //   };

// //   return (
// //     <div className="inline-flex items-center bg-gray-200 rounded-full shadow-sm border-gray-500 border-2">
// //       {/* Upvote Button */}
// //       <TriggerButton
// //         id="upvote"
// //         initialContent={upvoteIcon}
// //         toggledContent={upvoteActiveIcon}
// //         isActive={vote === "upvote"}
// //         onToggle={handleUpvoteToggle}
// //       />

// //       {/* Text Between Buttons */}
// //       <div>
// //         <span className="text-xs font-bold text-gray-700">{text}</span>
// //       </div>

// //       {/* Downvote Button */}
// //       <TriggerButton
// //         id="downvote"
// //         initialContent={downvoteIcon}
// //         toggledContent={downvoteActiveIcon}
// //         isActive={vote === "downvote"}
// //         onToggle={handleDownvoteToggle}
// //       />
// //     </div>
// //   );
// // };

// // export default VoteButton;

// import React, { useState, useEffect } from "react";
// import TriggerButton from "./triggerButton";
// import { apiCall } from "@/utils/auth-api-w-refresh";
// import { useRouter } from "next/router";

// interface VoteButtonProps {
//   upvoteIcon: React.ReactNode;
//   upvoteActiveIcon: React.ReactNode;
//   downvoteIcon: React.ReactNode;
//   downvoteActiveIcon: React.ReactNode;
//   initialText: string;
//   changeText: string;
//   upvotes: string;
//   downvotes: string;
//   commentId?: string;
// }

// const VoteButton: React.FC<VoteButtonProps> = ({
//   upvoteIcon,
//   upvoteActiveIcon,
//   downvoteIcon,
//   downvoteActiveIcon,
//   initialText,
//   changeText,
//   upvotes,
//   downvotes,
//   commentId,
// }) => {
//   const [vote, setVote] = useState<"upvote" | "downvote" | null>(null);
//   const [text, setText] = useState<string>(initialText);
//   const [currentUpvotes, setCurrentUpvotes] = useState<number>(parseInt(upvotes));
//   const [currentDownvotes, setCurrentDownvotes] = useState<number>(parseInt(downvotes));

//   const router = useRouter();
//   const { id } = router.query;

//   // Unique storage key for this user's vote on this blog/comment
//   const storageKey = `${id}${commentId ? `-${commentId}` : ""}-vote`;

//   useEffect(() => {
//     // Load the stored vote state on mount
//     const storedVote = localStorage.getItem(storageKey);
//     if (storedVote === "upvote" || storedVote === "downvote") {
//       setVote(storedVote);
//     }
//   }, [storageKey]);

//   const updateBackendVotes = async (newUpvotes: number, newDownvotes: number) => {
//     if (newUpvotes === undefined || newDownvotes === undefined) {
//       console.error("Invalid votes passed to updateBackendVotes");
//       return;
//     }

//     const payload = { upvotes: newUpvotes, downvotes: newDownvotes };
//     try {
//       await apiCall(`/api/blog/${id}${commentId ? `/comment/${commentId}` : ""}`, {
//         method: "PUT",
//         body: JSON.stringify(payload),
//       });
//     } catch (error) {
//       console.error("Failed to update votes:", error);
//     }
//   };

//   const handleUpvoteToggle = async () => {
//     let newUpvotes = currentUpvotes;
//     let newDownvotes = currentDownvotes;

//     if (vote === "upvote") {
//       // Remove the upvote
//       newUpvotes -= 1;
//       setVote(null);
//       localStorage.removeItem(storageKey);
//     } else {
//       // Add an upvote
//       newUpvotes += 1;
//       if (vote === "downvote") {
//         // Remove previous downvote
//         newDownvotes -= 1;
//       }
//       setVote("upvote");
//       localStorage.setItem(storageKey, "upvote");
//     }

//     await updateBackendVotes(newUpvotes, newDownvotes);
//     setCurrentUpvotes(newUpvotes);
//     setCurrentDownvotes(newDownvotes);

//     if (parseInt(changeText)) {
//       setText(String(newUpvotes - newDownvotes));
//     }
//   };

//   const handleDownvoteToggle = async () => {
//     let newUpvotes = currentUpvotes;
//     let newDownvotes = currentDownvotes;

//     if (vote === "downvote") {
//       // Remove the downvote
//       newDownvotes -= 1;
//       setVote(null);
//       localStorage.removeItem(storageKey);
//     } else {
//       // Add a downvote
//       newDownvotes += 1;
//       if (vote === "upvote") {
//         // Remove previous upvote
//         newUpvotes -= 1;
//       }
//       setVote("downvote");
//       localStorage.setItem(storageKey, "downvote");
//     }

//     await updateBackendVotes(newUpvotes, newDownvotes);
//     setCurrentUpvotes(newUpvotes);
//     setCurrentDownvotes(newDownvotes);

//     if (parseInt(changeText)) {
//       setText(String(newUpvotes - newDownvotes));
//     }
//   };

//   return (
//     <div className="inline-flex items-center bg-gray-200 rounded-full shadow-sm border-gray-500 border-2">
//       {/* Upvote Button */}
//       <TriggerButton
//         id="upvote"
//         initialContent={upvoteIcon}
//         toggledContent={upvoteActiveIcon}
//         isActive={vote === "upvote"}
//         onToggle={handleUpvoteToggle}
//       />

//       {/* Text Between Buttons */}
//       <div>
//         <span className="text-xs font-bold text-gray-700">{text}</span>
//       </div>

//       {/* Downvote Button */}
//       <TriggerButton
//         id="downvote"
//         initialContent={downvoteIcon}
//         toggledContent={downvoteActiveIcon}
//         isActive={vote === "downvote"}
//         onToggle={handleDownvoteToggle}
//       />
//     </div>
//   );
// };

// export default VoteButton;

import React, { useState, useEffect } from "react";
import TriggerButton from "./triggerButton";
import { apiCall } from "@/utils/auth-api-w-refresh";
import { useRouter } from "next/router";

interface VoteButtonProps {
  upvoteIcon: React.ReactNode;
  upvoteActiveIcon: React.ReactNode;
  downvoteIcon: React.ReactNode;
  downvoteActiveIcon: React.ReactNode;
  upvotes: string; // Initial upvotes count
  downvotes: string; // Initial downvotes count
  commentId?: string; // Optional comment ID for voting on comments
}

const VoteButton: React.FC<VoteButtonProps> = ({
  upvoteIcon,
  upvoteActiveIcon,
  downvoteIcon,
  downvoteActiveIcon,
  upvotes,
  downvotes,
  commentId,
}) => {
  const [vote, setVote] = useState<"upvote" | "downvote" | null>(null); // Track current vote state
  const [currentUpvotes, setCurrentUpvotes] = useState<number>(parseInt(upvotes));
  const [currentDownvotes, setCurrentDownvotes] = useState<number>(parseInt(downvotes));

  const router = useRouter();
  const { id } = router.query;

  // Unique storage key for this user's vote on this blog/comment
  const storageKey = `${id}${commentId ? `-${commentId}` : ""}-vote`;

  useEffect(() => {
    // Load the stored vote state on mount
    const storedVote = localStorage.getItem(storageKey);
    if (storedVote === "upvote" || storedVote === "downvote") {
      setVote(storedVote);
    }
  }, [storageKey]);

  const updateBackendVotes = async (newUpvotes: number, newDownvotes: number) => {
    if (newUpvotes === undefined || newDownvotes === undefined) {
      console.error("Invalid votes passed to updateBackendVotes");
      return;
    }

    const payload = { upvotes: newUpvotes, downvotes: newDownvotes };
    try {
     

      // await apiCall(`/api/blog/commentId) }
      // let x = await apiCall(`/api/blog/${id}${commentId ? `/comment/${commentId}` : ""}`, {
      //   method: "PUT",
      //   body: JSON.stringify(payload),
      // });

      let x =  await apiCall(`${commentId ? `/api/comment/${commentId}`  :`/api/blog/${id}`}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });

      console.log(JSON.stringify(x))
    } catch (error) {
      console.error("Failed to update votes:", error);
    }
  };

  const handleUpvoteToggle = async () => {
    let newUpvotes = currentUpvotes;
    let newDownvotes = currentDownvotes;

    if (vote === "upvote") {
      // Remove the upvote
      // the vote was already up
      newUpvotes -= 1;
      setVote(null);
      localStorage.removeItem(storageKey);
    } 

    else {
      // Add an upvote
      // i want to change state
      newUpvotes += 1;
      if (vote === "downvote") {
        // Remove previous downvote
        newDownvotes -= 1;
      }
      setVote("upvote");
      localStorage.setItem(storageKey, "upvote");
    }

    await updateBackendVotes(newUpvotes, newDownvotes);
    setCurrentUpvotes(newUpvotes);
    setCurrentDownvotes(newDownvotes);
  };

  const handleDownvoteToggle = async () => {
    let newUpvotes = currentUpvotes;
    let newDownvotes = currentDownvotes;

    if (vote === "downvote") {
      // Remove the downvote
      newDownvotes -= 1;
      setVote(null);
      localStorage.removeItem(storageKey);
    } 
    
    else {
      // Add a downvote
      newDownvotes += 1;
      if (vote === "upvote") {
        // Remove previous upvote
        newUpvotes -= 1;
      }
      setVote("downvote");
      localStorage.setItem(storageKey, "downvote");
    }
    
    // console.log(newUpvotes)
    console.log(newDownvotes)
    await updateBackendVotes(newUpvotes, newDownvotes);
    setCurrentUpvotes(newUpvotes);
    setCurrentDownvotes(newDownvotes);
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Upvote Button */}
      <div className="flex items-center space-x-1">
        <TriggerButton
          id="upvote"
          initialContent={upvoteIcon}
          toggledContent={upvoteActiveIcon}
          isActive={vote === "upvote"}
          onToggle={handleUpvoteToggle}
        />
        <span className="text-sm font-bold">{currentUpvotes}</span>
      </div>

      {/* Downvote Button */}
      <div className="flex items-center space-x-1">
        <TriggerButton
          id="downvote"
          initialContent={downvoteIcon}
          toggledContent={downvoteActiveIcon}
          isActive={vote === "downvote"}
          onToggle={handleDownvoteToggle}
        />
        <span className="text-sm font-bold">{currentDownvotes}</span>
      </div>
    </div>
  );
};

export default VoteButton;
