import React, { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { languageList } from "@/types/constants";
import Editor from "@monaco-editor/react";
import { apiCallText } from "@/utils/auth-api-w-refresh-text";

interface TempsApi {
  message: string;
  templates: Template[];
}

interface TempApi {
    message: string;
    template: Template;
  }

interface BlogApi {
    message: string;
    blog: Blog;
  }

interface NewTemp {
    value: string;
    label: string;
}

interface TemplateCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  blogId: number | null;
}

const LinkTemplateModal: React.FC<TemplateCreationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  blogId,
}) => {
  const [templates, setTemplates] = useState<NewTemp[]>([{value: "-1", label: "Please select a created template"}])
  const [currTemplates, setCurrTemplates] = useState<Template[]>([])
  const [formData, setFormData] = useState({
    tempId: "-1"
  });

  // Update formData when defaultValues changes
  useEffect(() => {
    fetch(`/api/blog/${blogId}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data: BlogApi) => {
        if (!data?.blog) return;
        setCurrTemplates(data.blog.templates); // Set the current templates from the blog API
      })
      .catch((error) => console.error("Error fetching blog templates:", error));
  }, [blogId]); // Run this effect when blogId changes

  // Fetch all templates and filter out those already in currTemplates
  useEffect(() => {
    // Only run if currTemplates is populated
      fetch(`/api/template?page=1&limit=1000`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data: TempsApi) => {
          if (!data?.templates) return;

          // Create an array to hold the new templates
          const newTemplates = [
            { value: "-1", label: "Please select a created template" },
          ];

          // Check for duplicates based on currTemplates
          const currTemplateIds = new Set(currTemplates.map((template) => template.id));

          data.templates.forEach((template) => {
            // Only add the template if it's not already in currTemplates
            if (!currTemplateIds.has(template.id)) {
              newTemplates.push({
                value: String(template.id),
                label: `${template.id} - ${template.title}`,
              });
            }
          });

          // Update the state with the new templates array
          setTemplates(newTemplates);
        })
        .catch((error) => console.error("Error fetching templates:", error));
  }, [currTemplates]); // this effect runs only when currTemplates changes


  const [error, setError] = useState<string>("");

  if (!isOpen) return null;

  const validateForm = () => {
    if (formData.tempId === "-1") {
        alert("Please select a valid template");
      setError("Must select a field.");
      return false;
    }

    setError(""); // Clear error if validation passes
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const body: Record<string, any> = {};

      const response = await apiCallText(`/api/blog/${blogId}/template/` + formData.tempId, {
        method: "PUT",
        body: JSON.stringify(body)
      });
      
      //const data = JSON.parse(response);
    
      fetch(`/api/template/${formData.tempId}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data: TempApi) => {
          if (!data?.template) return;
          setCurrTemplates((prev) => ([...prev, data.template])); // Set the current templates from the blog API
        })
        .catch((error) => console.error("Error fetching blog templates:", error));

      onSubmit();
      onClose();
      return;
    }

    const handleTempChange = (
        newValue: SingleValue<{ value: string; label: string }>
      ) => {
        // Handle the case where newValue is null (no selection)
        const tempId = newValue ? newValue.value : "-1";
        setFormData((prev) => ({ ...prev, tempId }));
      };

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 w-[90%] h-[80vh] shadow-lg px-10 py-6 rounded-lg overflow-y-auto">
    <h2 className="text-lg font-bold">Link Template to Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div>
            <label htmlFor="template-language" className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <Select
              options={templates}
              defaultValue={{value: "-1", label: "Please select a created template"}}
              onChange={handleTempChange}
              className="mt-1"
            />
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

export default LinkTemplateModal;
