import React, { useState } from "react";
import BlogCreationModal from "@/components/modals/BlogModal";

const BlogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState<number | undefined>(undefined);

  const handleOpenModalForCreate = () => {
    setSelectedBlogId(undefined); // Clear the blogId for creation
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (blogId: number) => {
    setSelectedBlogId(blogId); // Pass the blogId for editing
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = (blog: {
      id?: number; title: string; description: string; tags: string[] 
}) => {
    console.log("Blog submitted:", blog);

    // Example: Redirect to the blog's page after creation
    if (!selectedBlogId) {
      // Navigate to the new blog's page
      window.location.href = `/blog/${blog.id}`;
    }

    // Close the modal
    handleModalClose();
  };

  return (
    <div>
      <h1>Manage Blogs</h1>
      <div className="space-y-4">
        {/* Button to open the modal for creating a new blog */}
        <button
          onClick={handleOpenModalForCreate}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Create Blog
        </button>

        {/* Example edit button (can be dynamic if rendering a list of blogs) */}
        <button
          onClick={() => handleOpenModalForEdit(123)} // Replace 123 with actual blogId
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Edit Blog #123
        </button>
      </div>

      {/* BlogCreationModal */}
      <BlogCreationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        blogId={selectedBlogId} // Pass blogId for editing
      />
    </div>
  );
};

export default BlogPage;
