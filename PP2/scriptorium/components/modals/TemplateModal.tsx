import React, { useState } from "react";
import Select from "react-select";
import { languageList } from "@/types/constants";
import Editor from "@monaco-editor/react";

interface TemplateCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    language: string;
    title: string;
    code: string;
    explanation: string;
    tags: string[];
    forkedFromId?: number | null;
  }) => void;
  defaultValues?: {
    forkedFromId?: number | null;
    code: string;
    language: string;
    title: string;
    explanation: string;
    tags: string[];
  }; // Default values for updating
}

const TemplateCreationModal: React.FC<TemplateCreationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const [formData, setFormData] = useState({
    forkedFromId: defaultValues?.forkedFromId || null,
    code: defaultValues?.code || "",
    language: defaultValues?.language || "javascript",
    title: defaultValues?.title || "",
    explanation: defaultValues?.explanation || "",
    tags: defaultValues?.tags || [""],
  });
  const [error, setError] = useState<string>("");

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

  const validateForm = () => {
    if (!formData.title || !formData.language || !formData.code || !formData.explanation) {
      setError("All fields must be filled out.");
      return false;
    }
    if (formData.tags.length === 0 || formData.tags.some((tag) => tag.trim() === "")) {
      setError("Please add at least one tag and ensure no tag is empty.");
      return false;
    }
    setError(""); // Clear error if validation passes
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop submission if validation fails
    onSubmit(formData);
    onClose();
  };

  const handleLanguageChange = (selected: { value: string; label: string } | null) => {
    setFormData((prev) => ({ ...prev, language: selected?.value || "javascript" }));
  };

  const handleCodeChange = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, code: value || "" }));
  };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 w-[90%] h-[80vh] shadow-lg px-10 py-6 rounded-lg overflow-y-auto">
    <h2 className="text-lg font-bold">Create Template</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="template-title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="template-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter the template title"
              required
            />
          </div>
          <div>
            <label htmlFor="template-language" className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <Select
              options={languageList}
              defaultValue={languageList.find((opt) => opt.value === formData.language)}
              onChange={handleLanguageChange}
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="template-code" className="block text-sm font-medium text-gray-700">
              Code
            </label>
            {/* Replace textarea with Monaco Editor */}
            <div className="border rounded-md overflow-hidden">
              <Editor
                height="200px" // Adjust height as needed
                language={formData.language} // Dynamically set language
                value={formData.code}
                onChange={handleCodeChange}
                theme="vs-white"
                options={{
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          </div>
          <div>
          <label htmlFor="template-explanation" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="template-explanation"
            name="explanation"
            value={formData.explanation}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            rows={4}
            placeholder="Enter the template explanation"
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateCreationModal;
