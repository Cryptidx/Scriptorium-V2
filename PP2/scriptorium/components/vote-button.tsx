import React, { useState } from "react";
import TriggerButton from "./triggerButton";

interface VoteButtonProps {
  upvoteIcon: React.ReactNode; // Default (inactive) upvote icon
  upvoteActiveIcon: React.ReactNode; // Active upvote icon
  downvoteIcon: React.ReactNode; // Default (inactive) downvote icon
  downvoteActiveIcon: React.ReactNode; // Active downvote icon
  initialText: string; // Initial text to display between icons
  changeText: string; // should we change text or not?
}

const VoteButton: React.FC<VoteButtonProps> = ({
  upvoteIcon,
  upvoteActiveIcon,
  downvoteIcon,
  downvoteActiveIcon,
  initialText,
  changeText,
}) => {
  const [vote, setVote] = useState<"upvote" | "downvote" | null>(null); // Track current vote state
  const [text, setText] = useState<string>(initialText); // Text displayed between buttons

  // Handle upvote toggling
  const handleUpvoteToggle = (id: string) => {
    if (vote === "upvote") {
      setVote(null); // Deselect if already upvoted
      setText(initialText); // Reset text
    } else {
      setVote("upvote"); // Set upvote
      // call api function
      // set trxt to result of api function
      if(parseInt(changeText)){
        setText("+1"); // Update text
      }
      
    }
  };

  // Handle downvote toggling
  const handleDownvoteToggle = (id: string) => {
    if (vote === "downvote") {
      setVote(null); // Deselect if already downvoted
      setText(initialText); // Reset text
    } else {
      setVote("downvote"); // Set downvote
      if(parseInt(changeText)){
        setText("-1"); // Update text
      }
      
    }
  };

  return (
    <div className="inline-flex items-center   bg-gray-200 rounded-full shadow-sm border-gray-500 border-2">
      {/* Upvote Button */}
      <TriggerButton
        id="upvote"
        initialContent={upvoteIcon}
        toggledContent={upvoteActiveIcon}
        isActive={vote === "upvote"}
        onToggle={handleUpvoteToggle}
      />

      {/* Text Between Buttons */}
      <div >
      <span className="text-xs font-bold text-gray-700">{text}</span>
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

export default VoteButton;
