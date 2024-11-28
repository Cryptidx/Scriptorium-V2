import React, { useState } from "react";
import TriggerButton from "./triggerButton"; // Import TriggerButton component
import { Comment } from "@/common/icons";

interface CommentButtonProps {
  initialCount: number; // Initial number of comments/replies
  onAddComment: () => Promise<number>; // API call to fetch updated count
}



const CommentButton: React.FC<CommentButtonProps> = ({
  initialCount,
  onAddComment,
}) => {
  const [commentCount, setCommentCount] = useState(initialCount); // Track number of comments
  const [isLoading, setIsLoading] = useState(false); // Loading state for API call

  // Handle adding a new comment/reply
  const handleAddComment = async () => {
    setIsLoading(true);
    try {
      const updatedCount = await onAddComment(); // Fetch updated count from API
      setCommentCount(updatedCount); // Update the displayed count
    } catch (error) {
      console.error("Failed to update comment count:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="inline-flex items-center pr-3 bg-gray-200 rounded-full shadow-sm border-gray-500 border-2">
      {/* Trigger Button without toggle */}
      <TriggerButton
        id="comment"
        initialContent={
            <Comment className="object-scale-down h-5 w-5" />
        }
        isActive={false} // Switch behavior is turned off
        onToggle={() => {}}
      />

      {/* Text for Comment Count */}
      <button
        onClick={handleAddComment}
        className={`text-xs font-bold text-gray-700 ${isLoading ? "opacity-50" : ""}`}
        disabled={isLoading} // Disable button when loading
      >
        {/* {isLoading ? "Loading..." : `${commentCount} ${commentCount === 1 ? "Comment" : "Comments"}`} */}
        {commentCount}
      </button>
    </div>
  );
};

export default CommentButton;
