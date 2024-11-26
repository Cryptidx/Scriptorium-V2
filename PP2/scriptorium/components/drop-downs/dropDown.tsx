import React, { useState, ReactNode } from "react";

// Define props
interface DropdownItem {
  label: string; // Text to display
  link?: string; // Optional link for navigation
  onClick?: () => void; // Optional callback for custom actions
}

interface DropdownProps {
  trigger: ReactNode; // Custom trigger (icon, button, or any HTML element)
  items: DropdownItem[]; // Dropdown items with label, link, or callback
}

const Dropdown: React.FC<DropdownProps> = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown when an item is clicked
  const handleItemClick = (item: DropdownItem) => {
    setIsOpen(false);
    if (item.onClick) {
      item.onClick();
    }
    if (item.link) {
      window.location.href = item.link; // Navigate if a link is provided
    }
  };

  return (
    <div className="relative inline-block">
      {/* Trigger element */}
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-48 z-50">
          {items.map((item, index) => (
            <div
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                index === 0 ? "rounded-t-md" : ""
              } ${
                index === items.length - 1 ? "rounded-b-md" : ""
              }`}
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
