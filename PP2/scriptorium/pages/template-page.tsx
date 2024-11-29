import React from "react";
import Layout from "@/components/layout";
import BlogPreview from "@/components/blogPreview";
import { useRouter } from "next/router";

const truncateDescription = (text: string, maxLength: number): string => {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

interface Template {
  id: number;
  title: string;
  explanation: string;
  language: string;
  owner: { firstName: string; lastName: string } | null;
  tags: { name: string }[]; // Assuming tags have a `name` property
}

interface TemplatePageProps {
  data: Template[]; // Expecting an array of templates
}

const TemplatePage: React.FC<TemplatePageProps> = ({ data }) => {
  const router = useRouter();

  const handleBlogClick = (id: string) => {
    router.push(`/template/${id}`); // Navigate to the main blog page with the blog's ID
  };
  return (
    <Layout>

      {data.map((template) => (
            <div key={template.id} onClick={() => handleBlogClick(template.id.toString())}>          
          <BlogPreview
            title={template.title}
            description={truncateDescription(template.explanation || "No description", 50)}
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
