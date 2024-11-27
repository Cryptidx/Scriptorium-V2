import React, { useState } from "react";

interface ReportCreationModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { explanation: string }) => void;
}

const ReportCreationModal: React.FC<ReportCreationModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [explanation, setExplanation] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanation) {
      alert("Please provide an explanation.");
      return;
    }
    onSubmit({ explanation });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 w-[90%] max-w-md h-[70vh] p-6 rounded-lg shadow-lg overflow-y-auto">
    <h2 className="text-lg font-bold">Create report on: title </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="report-explanation" className="block text-sm font-medium text-gray-700">
              Explanation
            </label>
            <textarea
              id="report-explanation"
              rows={6} // Adjust rows for vertical size control
              className="w-full h-[50%] p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-base lg:text-lg resize-none"
              placeholder="Provide a detailed explanation for the report..."
            ></textarea>

          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-black rounded-lg"
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportCreationModal;
