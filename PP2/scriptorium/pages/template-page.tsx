import React from "react";
import Layout from "@/components/layout"; // Adjust path as needed
import BlogPreview from "@/components/blogPreview"; // Adjust path as needed
import { useRouter } from "next/router";
import { SearchProvider } from "@/context/SearchContext";

type Template = {
  id: number;
  title: string;
  description: string;
  language: string;
  owner: { firstName: string; lastName: string } | null; // Adjusting for possible undefined
  tags: { id: number; name: string }[]; // Adjusting for possible undefined
};

interface TemplatePageProps {
  data: Template[] | undefined; // Expecting an array of templates as props or undefined
}

const truncateDescription = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};

const TemplatePage: React.FC<TemplatePageProps> = ({ data }) => {
  const router = useRouter();

  // Check if data is undefined or has any invalid templates
  if (
    !data ||
    data.length === 0 ||
    data.some(
      (template) =>
        !template.id ||
        !template.title ||
        !template.description ||
        !template.language ||
        !template.owner?.firstName ||
        !template.owner?.lastName ||
        !template.tags
    )
  ) {
    return (
      <Layout>
        <div className="text-gray-500 text-center mt-4">Loading...</div>
      </Layout>
    );
  }

  const handleBlogClick = (id: string) => {
    router.push(`/template/${id}`); // Navigate to the template page with the template's ID
  };

  return (
    <Layout>
      <SearchProvider>
        {data.map((template, index) => (
          <div key={template.id} onClick={() => handleBlogClick(template.id.toString())}>
            <BlogPreview
              key={index}
              title={template.title}
              description={truncateDescription(template.description, 50)}
              author={
                template.owner
                  ? `${template.owner.firstName} ${template.owner.lastName}`
                  : "Unknown Author" // Fallback if author is null
              }
              tags={template.tags?.map((tag) => tag.name) || []} // Map tag objects to their names
              language={template.language}
            />
          </div>
        ))}
      </SearchProvider>
    </Layout>
  );
};

export default TemplatePage;
