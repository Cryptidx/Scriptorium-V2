// import React from "react";
// import Layout from "@/components/layout"; // Adjust path as needed
// import BlogPreview from "@/components/blogPreview"; // Adjust path as needed

// const BlogPage: React.FC = () => {
//   const blogs = [
//     {
//       title: "Exploring React Patterns",
//       description: "Learn about the latest patterns and practices in React development.",
//       author: "Jane Doe",
//       tags: ["python"],
//     },
//     {
//       title: "Mastering TypeScript",
//       description: "A guide to becoming proficient in TypeScript for modern web development.",
//       author: "John Smith",
//       tags: ["python", "javascript"],
//     },
//     {
//       title: "CSS for the Future",
//       description: "Discover advanced CSS techniques and upcoming features.",
//       author: "Alice Johnson",
//       tags: ["python", "javascript"],
//     },

//     {
//       title: "CSS for the Future",
//       description: "Discover advanced CSS techniques and upcoming features.",
//       author: "Alice Johnson",
//       tags: ["python", "javascript", "python", "javascript","python", "javascript"],
//     },
//   ];

//   return (
    // <Layout >
    //   {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        
    //   </div> */}
     
    //   {blogs.map((blog, index) => (
    //       <BlogPreview
    //         key={index}
    //         title={blog.title}
    //         description={blog.description}
    //         author={blog.author}
    //         tags={blog.tags}
    //       />
    //     ))}
    // </Layout>
//   );
// };

// export default BlogPage;

import React from "react";
import BlogPreview from "@/components/blogPreview";// Adjust path as necessary
import { useRouter } from "next/router";
import Layout from "@/components/layout";

const BlogPage: React.FC = () => {
  const blogs = [
    {
      id: "1",
      title: "Exploring React Patterns",
      description: "Learn about the latest patterns and practices in React development.",
      author: "Jane Doe",
      authorId: "user123",
      tags: ["React", "Patterns"],
    },
    {
      id: "2",
      title: "Mastering TypeScript",
      description: "A guide to becoming proficient in TypeScript for modern web development.",
      author: "John Smith",
      authorId: "user456",
      tags: ["TypeScript", "JavaScript"],
    },
  ];

  const router = useRouter();

  const handleBlogClick = (id: string) => {
    router.push(`/blog/${id}`); // Navigate to the main blog page with the blog's ID
  };

  return (
   <Layout>

      {blogs.map((blog) => (
        <div key={blog.id} onClick={() => handleBlogClick(blog.id)}>
          <BlogPreview
            title={blog.title}
            description={blog.description}
            author={blog.author}
            tags={blog.tags}
          />
        </div>
      ))}
      </Layout>
    
  );
};

export default BlogPage;
