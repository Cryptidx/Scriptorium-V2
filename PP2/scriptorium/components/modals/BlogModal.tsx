import React, { useState } from "react";

interface BlogCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    title: string;
    description: string;
    tags: string[];
  }) => void;
}

const BlogCreationModal: React.FC<BlogCreationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [""],
  });

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index?: number
  ) => {
    const { name, value } = e.target;
    if (name === "tags" && index !== undefined) {
      const updatedTags = [...formData.tags];
      updatedTags[index] = value;
      setFormData((prev) => ({ ...prev, tags: updatedTags }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addTag = () => setFormData((prev) => ({ ...prev, tags: [...prev.tags, ""] }));
  const removeTag = (index: number) =>
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || formData.tags.length === 0) {
      alert("Please fill in all required fields and add at least one tag.");
      return;
    }
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 w-[90%] max-w-md h-[70vh] p-6 rounded-lg shadow-lg overflow-y-auto">
      <h2 className="text-lg font-bold">Create Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div>
          <label htmlFor="blog-title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="blog-title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            placeholder="Enter the blog title"
            required
          />
        </div>
        <div>
          <label htmlFor="blog-description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="blog-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            rows={4}
            placeholder="Enter the blog description"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags</label>
          {formData.tags.map((tag, index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <input
                type="text"
                name="tags"
                value={tag}
                onChange={(e) => handleChange(e, index)}
                className="p-2 w-full border rounded-md"
                placeholder="Enter a tag"
              />
              {formData.tags.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-red-500"
                >
                  ✖
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addTag}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded-lg"
          >
            Add Tag
          </button>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Next
          </button>
        </div>
      </form>
    </div>
  </div>
  );}  
export default BlogCreationModal;
