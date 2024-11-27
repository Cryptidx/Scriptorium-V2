import React, { useState } from "react";
import CommentPopUp from "./comment-pop"; // Import the pop-up component

interface CommentButtonProps {
  parentId: string | null; // ID of the comment this button is replying to
  onSubmit: (parentId: string | null, comment: string) => void; // Callback to handle adding a comment
}

const CommentButtonF: React.FC<CommentButtonProps> = ({ parentId, onSubmit }) => {
  const [isPopUpVisible, setIsPopUpVisible] = useState(false); // Local state to manage pop-up visibility

  const handlePopUpSubmit = (comment: string) => {
    onSubmit(parentId, comment); // Call the parent-provided submit function
    setIsPopUpVisible(false); // Close the pop-up
  };

  return (
    <>
      <button
        onClick={() => setIsPopUpVisible(true)} // Show the pop-up on click
        className="text-blue-500 hover:underline mt-2"
      >
        Reply
      </button>

      {/* Render the pop-up if visible */}
      {isPopUpVisible && (
        <CommentPopUp
          onClose={() => setIsPopUpVisible(false)} // Close the pop-up
          onSubmit={handlePopUpSubmit} // Handle comment submission
        />
      )}
    </>
  );
};

export default CommentButtonF;
