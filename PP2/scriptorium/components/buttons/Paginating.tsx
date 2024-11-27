import React from "react";
import { LeftArrow, RightArrow } from "@/common/icons"; // Import icons

type PaginationButtonProps = {
  direction: "previous" | "next"; // Specify if it's a "previous" or "next" button
  disabled?: boolean; // Disable the button if no data is available
  onClick: () => void; // Function to handle API calls or actions
  iconSize?: string; // Customizable icon size
  label?: string; // Customizable button label
};

const PaginationButton: React.FC<PaginationButtonProps> = ({
  direction,
  disabled = false,
  onClick,
  iconSize = "w-5 h-5",
  label,
}) => {
  const isNext = direction === "next";

  return (
    <button
      className={`flex items-center px-4 py-2 rounded-full transition ${
        disabled ? "bg-gray-300 cursor-not-allowed" : "hover:bg-blue-200"
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {!isNext && <LeftArrow className={iconSize} />}
      <span className={`mx-2 ${!label ? "hidden" : ""}`}>{label || direction}</span>
      {isNext && <RightArrow className={iconSize} />}
    </button>
  );
};



export default PaginationButton;
