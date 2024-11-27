import React, { useState } from "react";
import TriggerButton from "./triggerButton";

interface EnhancedVoteButtonProps {
  upvoteIcon: React.ReactNode; // Default (inactive) upvote icon
  upvoteActiveIcon: React.ReactNode; // Active upvote icon
  downvoteIcon: React.ReactNode; // Default (inactive) downvote icon
  downvoteActiveIcon: React.ReactNode; // Active downvote icon
  initialVoteCount: number; // Initial vote count
}

const EnhancedVoteButton: React.FC<EnhancedVoteButtonProps> = ({
  upvoteIcon,
  upvoteActiveIcon,
  downvoteIcon,
  downvoteActiveIcon,
  initialVoteCount,
}) => {
  const [vote, setVote] = useState<"upvote" | "downvote" | null>(null); // Current vote state
  const [voteCount, setVoteCount] = useState<number>(initialVoteCount); // Numerical vote count

  // Handle upvote toggling
  const handleUpvoteToggle = (id: string) => {
    if (vote === "upvote") {
      setVote(null); // Deselect upvote
      setVoteCount((prev) => prev - 1); // Subtract 1
    } else {
      if (vote === "downvote") {
        setVoteCount((prev) => prev + 2); // Switching from downvote to upvote adds 2
      } else {
        setVoteCount((prev) => prev + 1); // Regular upvote adds 1
      }
      setVote("upvote"); // Set active vote to upvote
    }
  };

  // Handle downvote toggling
  const handleDownvoteToggle = (id: string) => {
    if (vote === "downvote") {
      setVote(null); // Deselect downvote
      setVoteCount((prev) => prev + 1); // Add 1 back
    } else {
      if (vote === "upvote") {
        setVoteCount((prev) => prev - 2); // Switching from upvote to downvote subtracts 2
      } else {
        setVoteCount((prev) => prev - 1); // Regular downvote subtracts 1
      }
      setVote("downvote"); // Set active vote to downvote
    }
  };

  return (
    <div className="inline-flex items-center space-x-4 p-2 bg-gray-100 rounded-full shadow-md border-2 border-gray-300">
      {/* Upvote Button */}
      <TriggerButton
        id="upvote"
        initialContent={upvoteIcon}
        toggledContent={upvoteActiveIcon}
        isActive={vote === "upvote"}
        onToggle={handleUpvoteToggle}
      />

      {/* Vote Count */}
      <div>
        <span className="text-xs font-bold text-gray-700">{voteCount}</span>
      </div>

      {/* Downvote Button */}
      <TriggerButton
        id="downvote"
        initialContent={downvoteIcon}
        toggledContent={downvoteActiveIcon}
        isActive={vote === "downvote"}
        onToggle={handleDownvoteToggle}
      />
    </div>
  );
};

export default EnhancedVoteButton;
