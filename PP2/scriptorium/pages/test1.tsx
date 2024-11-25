import React, { useState } from "react";
import Popup from "@/components/popup"; // Adjust the import path as necessary

const TestPopupPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <button
        onClick={openPopup}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Open Popup
      </button>

      {isOpen && (
        <Popup
          title="Report Content"
          description="Provide details about the issue you're reporting."
          onClose={closePopup}
          footerActions={
            <div className="flex justify-end space-x-2">
              <button
                onClick={closePopup}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Submitted!");
                  closePopup();
                }}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Submit
              </button>
            </div>
          }
        >
          <form className="space-y-4">
            <div>
              <label
                htmlFor="report-title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="report-title"
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Enter the title"
              />
            </div>
            <div>
              <label
                htmlFor="report-explanation"
                className="block text-sm font-medium text-gray-700"
              >
                Explanation
              </label>
              <textarea
                id="report-explanation"
                rows={4}
                className="mt-1 p-2 w-full border rounded-md"
                placeholder="Describe the issue"
              ></textarea>
            </div>
          </form>
        </Popup>
      )}
    </div>
  );
};

export default TestPopupPage;
