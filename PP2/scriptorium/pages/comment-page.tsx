import React from "react";
import Layout from "@/components/layout"; // Adjust path as needed
import CommentPreview from "@/components/commentPreview";
import { useRouter } from "next/router";
import { SearchProvider } from "@/context/SearchContext";

type Comment = {
  id: number;
  blogId: number;
  description: string;
  author: {firstName: string; lastName: string};
  upvotes: number;
  downvotes: number;
};

interface CommentPageProps {
  data: Comment[]; // Expecting an array of blogs as props
}

const truncateDescription = (text: string, maxLength: number): string => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
};


const CommentPage: React.FC<CommentPageProps> = ({ data }) => {

      const router = useRouter();

      const handleBlogClick = (id: string) => {
        router.push(`/blog/${id}`); // Navigate to the main blog page with the blog's ID
      };
    
      
    return (
      <Layout >
            <SearchProvider>

        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          
        </div> */} 
       
        {data.map((comment, index) => (
            <div key={comment.blogId} onClick={() => handleBlogClick(comment.blogId.toString())}>
              <CommentPreview
              key={index}
              author={comment.author.firstName + " " + comment.author.lastName}
              description={truncateDescription(comment.description, 50)} // Truncate the descriptioncomment.description}
              upvotes={comment.upvotes.toString()}
              downvotes={comment.downvotes.toString()}
            />
            </div>
           
          ))}
                </SearchProvider>

      </Layout>
    );
  };
  
  export default CommentPage;
  