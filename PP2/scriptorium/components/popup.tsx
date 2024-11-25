import React from "react";

type PopupProps = {
  title: string;
  description?: string; // Optional description below the title
  children: React.ReactNode;
  onClose: () => void;
  footerActions?: React.ReactNode; // Optional footer actions (e.g., buttons)
  width?: string; // Custom width (default is 80% for larger screens)
  height?: string; // Custom height (default is 80% for larger screens)
  maxHeight?: string; // Custom max height
};

const Popup: React.FC<PopupProps> = ({
  title,
  description,
  children,
  onClose,
  footerActions,
  width = "80%",
  height = "80%",
  maxHeight = "90vh", // Default max height
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="bg-white rounded-lg shadow-lg overflow-hidden"
        style={{ width, height, maxHeight }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <div>
            <h2 className="text-xl font-bold">{title}</h2>
            {description && (
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto flex-1">{children}</div>

        {/* Footer */}
        {footerActions && (
          <div className="p-4 border-t border-gray-300">{footerActions}</div>
        )}
      </div>
    </div>
  );
};

export default Popup;
