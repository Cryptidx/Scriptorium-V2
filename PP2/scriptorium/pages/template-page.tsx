import React from "react";
import Layout from "@/components/layout";
import BlogPreview from "@/components/blogPreview";

const truncateDescription = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

interface Template {
  id: number;
  title: string;
  description: string;
  language: string;
  owner: { firstName: string; lastName: string } | null;
  tags: { name: string }[]; // Assuming tags have a `name` property
}

interface TemplatePageProps {
  data: Template[]; // Expecting an array of templates
}

const TemplatePage: React.FC<TemplatePageProps> = ({ data }) => {
  return (
    <Layout>

      {data.map((template) => (
        <div key={template.id} className="p-4">
          <BlogPreview
            title={template.title}
            description={truncateDescription(template.description || "No description", 50)}
            author={
              template.owner
                ? `${template.owner.firstName} ${template.owner.lastName}`
                : "Unknown Author"
            }
            tags={template.tags?.map((tag) => tag.name) || []}
            language={template.language}
          />
        </div>
      ))}
    </Layout>
  );
};



export default TemplatePage;
