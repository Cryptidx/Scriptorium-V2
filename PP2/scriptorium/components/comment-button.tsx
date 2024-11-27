import React, { useState } from "react";
import TriggerButton from "./triggerButton"; // Import TriggerButton component

interface CommentButtonProps {
  initialCount: number; // Initial number of comments/replies
  onAddComment: () => Promise<number>; // API call to fetch updated count
}

type IconProps = React.FC<React.SVGProps<SVGSVGElement>>;
const Comment: IconProps = (props) =>(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path fill-rule="evenodd" d="M5.337 21.718a6.707 6.707 0 0 1-.533-.074.75.75 0 0 1-.44-1.223 3.73 3.73 0 0 0 .814-1.686c.023-.115-.022-.317-.254-.543C3.274 16.587 2.25 14.41 2.25 12c0-5.03 4.428-9 9.75-9s9.75 3.97 9.75 9c0 5.03-4.428 9-9.75 9-.833 0-1.643-.097-2.417-.279a6.721 6.721 0 0 1-4.246.997Z" clip-rule="evenodd" />
  </svg>
  
); 

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
