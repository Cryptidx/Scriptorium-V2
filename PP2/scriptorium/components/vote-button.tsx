
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
