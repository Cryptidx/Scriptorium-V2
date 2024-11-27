import React, { useState } from "react";

interface AddCommentInputProps {
  onAddComment: (text: string) => void;
}

const AddCommentInput: React.FC<AddCommentInputProps> = ({ onAddComment }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(text);
    setText("");
  };

  return (
    <div className="mb-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Add a comment..."
      />
      <button onClick={handleSubmit} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Submit Comment
      </button>
    </div>
  );
};

export default AddCommentInput;
