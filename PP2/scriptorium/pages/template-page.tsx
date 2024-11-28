import React from "react";
import Layout from "@/components/layout"; // Adjust path as needed
import BlogPreview from "@/components/blogPreview"; // Adjust path as needed
import { useRouter } from "next/router";

const TemplatePage: React.FC = () => {
  const router = useRouter();

  const blogs = [
    {
      id: "1",
      title: "Exploring React Patterns",
      description: "Learn about the latest patterns and practices in React development.",
      author: "Jane Doe",
      tags: ["python"],
      language: "python"
    },
    {
      id: "1",
      title: "Mastering TypeScript",
      description: "A guide to becoming proficient in TypeScript for modern web development.",
      author: "John Smith",
      tags: ["python", "javascript"],
      language: "python"
    },
    {
      id: "1",
      title: "CSS for the Future",
      description: "Discover advanced CSS techniques and upcoming features.",
      author: "Alice Johnson",
      tags: ["python", "javascript"],
      language: "python"
    },

    {
      id: "1",
      title: "CSS for the Future",
      description: "Discover advanced CSS techniques and upcoming features.",
      author: "Alice Johnson",
      tags: ["python", "javascript", "python", "javascript","python", "javascript"],
      language: "python"
    },
  ];

  const handleBlogClick = (id: string) => {
    router.push(`/template/${id}`); // Navigate to the main blog page with the blog's ID
  };

  return (
    <Layout >
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        
      </div> */}
     
      {blogs.map((blog, index) => (
        <div key={blog.id} onClick={() => handleBlogClick(blog.id)}>
          <BlogPreview
            key={index}
            title={blog.title}
            description={blog.description}
            author={blog.author}
            tags={blog.tags}
            language={blog.language}
          />
        </div>
        ))}
    </Layout>
  );
};

export default TemplatePage;
