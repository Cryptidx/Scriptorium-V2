import { apiCall } from "@/utils/auth-api-w-refresh";
import React, { useState } from "react";

interface ReportCreationModalProps {
  id: string;
  type?: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { explanation: string }) => void;
}

const ReportCreationModal: React.FC<ReportCreationModalProps> = ({id, type, isOpen, onClose, onSubmit }) => {
  const [explanation, setExplanation] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!explanation) {
      alert("Please provide an explanation.");
      return;
    }

    const body: Record<string, any> = {};

    try{
      body.contentId = Number(id);
      body.contentType = type;
      body.explanation = explanation;

      const response = await apiCall(`/api/reports/report`, {method: "POST",body: JSON.stringify(body)});

      //const data = await response.json();

      alert("Report Sent");
      setExplanation("");
      //onSubmit(data.blog);
      onClose();

      // if (response.ok) {
      //   alert("Report sent");
      //   onSubmit(data.blog);
      //   onClose();
      // } else {
      //   console.error("Error creating blog:", data.error);
      // }

    } catch (error) {
        console.log(error);
    }
    
  };

  function close() {
    setExplanation("");
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 w-[90%] max-w-md h-[70vh] p-6 rounded-lg shadow-lg overflow-y-auto">
    <h2 className="text-lg font-bold">Create Report</h2>
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
          <label
            htmlFor="report-explanation"
            className="block text-sm font-medium text-gray-1000"
          >
            Explanation
          </label>
          <textarea
            id="report-explanation"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
            className="w-full min-h-[400px] p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-base lg:text-lg resize-y overflow-auto"
            placeholder="Provide a detailed explanation for the report..."
          ></textarea>
        </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={close}
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
