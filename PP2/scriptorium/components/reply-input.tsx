// import React, { useState } from "react";

// interface ReplyInputProps {
//   parentId: string;
//   onSubmit: (text: string) => void;
// }

// const ReplyInput: React.FC<ReplyInputProps> = ({ parentId, onSubmit }) => {
//   const [text, setText] = useState("");

//   const handleSubmit = () => {
//     if (!text.trim()) return;
//     onSubmit(text);
//     setText("");
//   };

//   return (
//     <div className="mt-2">
//       <textarea
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         className="w-full p-2 border rounded"
//         placeholder="Write a reply..."
//       />
//       <button onClick={handleSubmit} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
//         Submit Reply
//       </button>
//     </div>
//   );
// };

// export default ReplyInput;

import React, { useState } from "react";

interface ReplyInputProps {
  parentId: string;
  onSubmit: (text: string) => void;
}

const ReplyInput: React.FC<ReplyInputProps> = ({ parentId, onSubmit }) => {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text); // Use the parentId indirectly since it’s already in the parent handler
    setText("");
  };

  return (
    <div className="mt-2 ml-[56px]">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder={`Write a reply to comment ${parentId}...`}
      />
      <button onClick={handleSubmit} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
        Submit Reply
      </button>
    </div>
  );
};

export default ReplyInput;
