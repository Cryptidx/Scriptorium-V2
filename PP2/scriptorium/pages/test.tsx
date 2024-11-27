import React, { useState } from "react";
import BlogCreationModal from "@/components/modals/BlogModal";
import ReportCreationModal from "@/components/modals/ReportCreationModal";
import TemplateCreationModal from "@/components/modals/TemplateModal";
import TemplateSelectionModal from "@/components/modals/BlogTemplateModal";
import UserEditModal from "@/components/modals/UserModal";

const TestPage: React.FC = () => {
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showBlogTemplateModal, setShowBlogTemplateModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const handleBlogSubmit = (data: { title: string; description: string; tags: string[] }) => {
    console.log("Blog Data Submitted:", data);
  };

  const handleReportSubmit = (data: { explanation: string }) => {
    console.log("Report Data Submitted:", data);
  };

  // Handle Template Submission  // Handle Template Submission
  const handleTemplateSubmit = (data: {
    forkedFromId?: number | null;
    code: string;
    language: string;
    title: string;
    explanation: string;
    tags: string[];
  }) => {
    console.log("Template Data Submitted:", data);
  };

  const handleTemplateBlog = (selectedTemplate: any) => {
    console.log("Selected Template:", selectedTemplate);
    setShowBlogTemplateModal(false);
  };

  const handleUserSubmit = (data: { firstName: string; lastName: string; email: string; phoneNumber: string; avatar: string | null; })=> {
    console.log("User Data Submitted:", data);
    setShowUserModal(false);
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
        <button
        onClick={() => setShowBlogTemplateModal(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Open Blog Template Modal
      </button>

      <button 
        onClick={() => setShowUserModal(true)}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Open User Modal
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

    <TemplateSelectionModal
        isOpen={showBlogTemplateModal}
        onClose={() => setShowBlogTemplateModal(false)}
        onSubmit={handleTemplateBlog}
      />

      {/* User Modal */}
      <UserEditModal
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
        onSubmit={handleUserSubmit} defaultValues={{
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          avatar: "/avatar_images/pfp2/png"
        }}      />
    </div>
  );
};

export default TestPage;
