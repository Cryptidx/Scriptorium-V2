import React, { useState } from "react";
import SearchBar from "@/components/searchBar"; // Your existing search bar component

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedTemplate: any) => void; // Handle selected template submission
}

const TemplateSelectionModal: React.FC<TemplateSelectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [templates, setTemplates] = useState([
    // Dummy data for templates; replace with actual search results
    { id: 1, title: "Template 1", description: "Description for template 1" },
    { id: 2, title: "Template 2", description: "Description for template 2" },
    { id: 3, title: "Template 3", description: "Description for template 3" },
  ]);
  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  // Filter templates based on search query
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(
        templates.filter((template) =>
          template.title.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  // Handle template selection
  const selectTemplate = (template: any) => {
    setSelectedTemplate(template);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 w-[90%] max-w-2xl h-[70vh] p-6 rounded-lg shadow-lg overflow-y-auto">
        <h2 className="text-lg font-bold">Select a Template</h2>

        {/* Search Bar */}
        <div className="mt-4">
          <SearchBar
          />
        </div>

        {/* Template Results */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className={`border rounded-lg p-4 cursor-pointer ${
                selectedTemplate?.id === template.id
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300 dark:border-gray-700"
              }`}
              onClick={() => selectTemplate(template)}
            >
              <h3 className="font-bold text-sm lg:text-base">{template.title}</h3>
              <p className="text-gray-500 text-xs lg:text-sm">
                {template.description}
              </p>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-lg"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onSubmit(selectedTemplate)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            disabled={!selectedTemplate} // Disable if no template is selected
          >
            Select Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelectionModal;
