import React from "react";
import Layout from "@/components/layout"; // Adjust path as needed
import CommentPreview from "@/components/commentPreview";


const CommentPage: React.FC = () => {
    const comments = [
        {
          id: "1",
          author: "Jane Doe",
          description: "This article on React patterns is incredibly insightful. Thanks for sharing!",
          upvotes: "120",
          downvotes: "10",
          createdAt: new Date("2024-01-20T10:30:00Z"),
        },
        {
          id: "2",
          author: "John Smith",
          description: "TypeScript has been a game-changer for my projects. Great read!",
          upvotes: "95",
          downvotes: "5",
          createdAt: new Date("2024-01-21T08:15:00Z"),
        },
        {
          id: "3",
          author: "Alice Johnson",
          description: "The advanced CSS techniques mentioned here are fantastic. Looking forward to trying them!",
          upvotes: "80",
          downvotes: "3",
          createdAt: new Date("2024-01-22T14:00:00Z"),
        },
        {
          id: "4",
          author: "Hannah Homeiza",
          description: "Loved the detailed explanation. Can you provide more examples on using CSS grid effectively?",
          upvotes: "60",
          downvotes: "0",
          createdAt: new Date("2024-01-23T16:45:00Z"),
        },
      ];
      
    return (
      <Layout >
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          
        </div> */}
       
        {comments.map((comment, index) => (
            <CommentPreview
              key={index}
              author={comment.author}
              description={comment.description}
              upvotes={comment.upvotes}
              downvotes={comment.downvotes}
            />
          ))}
      </Layout>
    );
  };
  
  export default CommentPage;
  