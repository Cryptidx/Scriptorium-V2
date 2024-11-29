

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

const truncateDescription = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
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
            title={blog.title} // Default title
            description={truncateDescription(blog.description, 50)} // Truncate the description blog.description } // Default description
            author={blog.author.firstName + " " + blog.author.lastName}
            tags={blog.tags?.map((tag) => tag.name) || []} // Map tag objects to their names
          />
        </div>
      ))}
    </Layout>
  );
};

export default BlogPage;
