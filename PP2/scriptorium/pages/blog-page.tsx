

import React from "react";
import BlogPreview from "@/components/blogPreview";// Adjust path as necessary
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { SearchProvider } from "@/context/SearchContext";

type Blog = {
  id: number;
  title: string;
  description: string;
  author: {firstName: string; lastName: string};
  tags: { id: number; name: string }[]; // Assuming tags are objects
};

const truncateDescription = (text: string | undefined, maxLength: number): string => {
  if (!text) {
    return ""; // Return an empty string or a placeholder if `text` is undefined/null
  }
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};


interface BlogPageProps {
  data: Blog[]; // Expecting an array of blogs as props
}

const BlogPage: React.FC<BlogPageProps> = ({ data }) => {
  const router = useRouter();

  const handleBlogClick = (id: string) => {
    router.push(`/blog/${id}`); // Navigate to the main blog page with the blog's ID
  };
  return (
    <Layout>
      {data.map((blog) => (
        <div key={blog.id} onClick={() => handleBlogClick(blog.id.toString())}>
          <BlogPreview
            title={truncateDescription(blog.title || "Untitled", 20)}
            description={truncateDescription(blog.description, 70) || "No description provided"}
            author={blog.author ? `${blog.author.firstName} ${blog.author.lastName}` : "Unknown author"}
            tags={blog.tags?.map((tag) => tag.name) || []} // Map tag objects to their names
          />
        
        </div>
      ))}
    </Layout>
  );
};

export default BlogPage;
