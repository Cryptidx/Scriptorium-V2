// import React, { useState, useEffect } from "react";

// interface TriggerButtonProps {
//   initialContent: React.ReactNode; // Initial content (e.g., unfilled upvote)
//   toggledContent?: React.ReactNode; // Optional toggled content (e.g., filled upvote)
//   onToggle?: (isToggled: boolean) => void; // Callback to notify parent of toggle state
// }

// const TriggerButton: React.FC<TriggerButtonProps> = ({
//   initialContent,
//   toggledContent,
//   onToggle,
// }) => {
//   const [isToggled, setIsToggled] = useState(false);

//   const handleToggle = () => {
//     setIsToggled((prev) => !prev);
//   };

//   // Notify parent of state change
//   useEffect(() => {
//     if (onToggle) {
//       onToggle(isToggled);
//     }
//   }, [isToggled, onToggle]);

//   return (
//     <button onClick={handleToggle} className="focus:outline-none">
//       {isToggled && toggledContent ? toggledContent : initialContent}
//     </button>
//   );
// };

// export default TriggerButton;


// import React from "react";

// interface TriggerButtonProps {
//   id: string; // Unique identifier for each button
//   initialContent: React.ReactNode; // Initial content (e.g., unfilled upvote)
//   toggledContent?: React.ReactNode; // Optional toggled content (e.g., filled upvote)
//   isActive: boolean; // State from parent indicating if the button is active
//   onToggle: (id: string) => void; // Callback to notify parent of toggle state
// }

// const TriggerButton: React.FC<TriggerButtonProps> = ({
//   id,
//   initialContent,
//   toggledContent,
//   isActive,
//   onToggle,
// }) => {
//   const handleToggle = () => {
//     onToggle(id); // Notify parent when button is toggled
//   };

//   return (
//     <button onClick={handleToggle} className="focus:outline-none">
//       {isActive && toggledContent ? toggledContent : initialContent}
//     </button>
//   );
// };

// export default TriggerButton;


import React from "react";

interface TriggerButtonProps {
  id: string; // Unique identifier for each button
  initialContent: React.ReactNode; // Initial content (e.g., unfilled upvote)
  toggledContent?: React.ReactNode; // Optional toggled content (e.g., filled upvote)
  isActive: boolean; // State from parent indicating if the button is active
  onToggle: (id: string) => void; // Callback to notify parent of toggle state
}

const TriggerButton: React.FC<TriggerButtonProps> = ({
  id,
  initialContent,
  toggledContent,
  isActive,
  onToggle,
}) => {
  const handleToggle = () => {
    onToggle(id); // Notify parent when button is toggled
  };

  return (
    <button
      onClick={handleToggle}
      className="focus:outline-none w-10 h-10 flex justify-center items-center" // Fixed width and height
    >
      {isActive && toggledContent ? toggledContent : initialContent}
    </button>
  );
};

export default TriggerButton;
