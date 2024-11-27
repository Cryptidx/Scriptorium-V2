import React, { useState } from "react";
import BlogCreationModal from "@/components/modals/BlogCreationModal";
import ReportCreationModal from "@/components/modals/ReportCreationModal";
import TemplateCreationModal from "@/components/modals/TemplateCreationModal";

const TestPage: React.FC = () => {
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const handleBlogSubmit = (data: { title: string; description: string; tags: string[] }) => {
    console.log("Blog Data Submitted:", data);
  };

  const handleReportSubmit = (data: { explanation: string }) => {
    console.log("Report Data Submitted:", data);
  };

  // Handle Template Submission  // Handle Template Submission
  const handleTemplateSubmit = (data: {
    forkedFromId?: number;
    code: string;
    language: string;
    title: string;
    explanation: string;
    tags: string[];
  }) => {
    console.log("Template Data Submitted:", data);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Modal Test Page</h1>
      <div className="space-x-4">
        <button
          onClick={() => setShowBlogModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Open Blog Modal
        </button>
        <button
          onClick={() => setShowReportModal(true)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Open Report Modal
        </button>
        <button
          onClick={() => setShowTemplateModal(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Open Template Modal
        </button>
      </div>

      {/* Blog Modal */}
      <BlogCreationModal
        isOpen={showBlogModal}
        onClose={() => setShowBlogModal(false)}
        onSubmit={handleBlogSubmit}
      />

      {/* Report Modal */}
      <ReportCreationModal
        title="example blog title"
        isOpen={showReportModal}
        onClose={() => setShowReportModal(false)}
        onSubmit={handleReportSubmit}
      />

      {/* Template Modal */}
      <TemplateCreationModal
        isOpen={showTemplateModal}
        onClose={() => setShowTemplateModal(false)}
        onSubmit={handleTemplateSubmit}
      />
    </div>
  );
};

export default TestPage;
