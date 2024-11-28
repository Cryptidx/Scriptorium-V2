import React, { useState, useEffect } from "react";
import { apiCall } from "@/utils/auth-api-w-refresh";

// will need to return id of the blog or redirect to the pg of newly created blog 
// still need to return the info
// still need to handle adding editing removing templates as a second part, need to complete search first 

interface BlogCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string; tags: string[] }) => void;
  blogId?: number; // Optional blog ID for update
}

const BlogCreationModal: React.FC<BlogCreationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  blogId,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [""],
  });
  const [defaultValues, setDefaultValues] = useState<typeof formData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (blogId && isOpen) {
      // Fetch default values for update
      const fetchBlog = async () => {
        setLoading(true);
        try {
          const response = await apiCall(`/api/blog/${blogId}`, {method: "GET",});

          const data = await response.json();
          if (response.ok) {
            setDefaultValues({
              title: data.blog.title || "",
              description: data.blog.description || "",
              tags: data.blog.tags.map((tag: { name: string }) => tag.name) || [""],
            });
            setFormData({
              title: data.blog.title || "",
              description: data.blog.description || "",
              tags: data.blog.tags.map((tag: { name: string }) => tag.name) || [""],
            });
          } else {
            console.error("Error fetching blog:", data.error);
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBlog();
    } else {
      // Reset formData for create mode
      setDefaultValues(null);
      setFormData({ title: "", description: "", tags: [""] });
    }
  }, [blogId, isOpen]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || formData.tags.length === 0) {
      alert("Please fill in all required fields and add at least one tag.");
      return;
    }

    try {
      const body: Record<string, any> = {};

      if (!blogId) {
        // For create
        body.title = formData.title;
        body.description = formData.description;
        body.tags = formData.tags.filter((tag) => tag.trim() !== "");

        const response = await apiCall(`/api/blog`, {method: "POST",body: JSON.stringify(body)});

        const data = await response.json();
        if (response.ok) {
          alert("Blog created successfully.");
          onSubmit(data.blog);
          onClose();
        } else {
          console.error("Error creating blog:", data.error);
        }
      } else {
        // For update: Only include changed fields
        if (defaultValues) {
          if (defaultValues.title !== formData.title) body.title = formData.title;
          if (defaultValues.description !== formData.description)
            body.description = formData.description;
          if (
            JSON.stringify(defaultValues.tags.sort()) !== JSON.stringify(formData.tags.sort())
          )
            body.tags = formData.tags.filter((tag) => tag.trim() !== "");
        }

        if (Object.keys(body).length === 0) {
          alert("No changes detected. Nothing to update.");
          return;
        }

        const response = await apiCall(`/api/blog/${blogId}`, {method: "PUT",body: JSON.stringify(body)});

        const data = await response.json();
        if (response.ok) {
          alert("Blog updated successfully.");
          onSubmit(data.blog);
          onClose();
        } else {
          console.error("Error updating blog:", data.error);
        }
      }
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  if (!isOpen) return null;

  if (loading) return <div>Loading...</div>;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 w-[90%] max-w-md h-[70vh] p-6 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-lg font-bold">{blogId ? "Update Blog" : "Create Blog"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter the blog title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
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
              {blogId ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BlogCreationModal;
