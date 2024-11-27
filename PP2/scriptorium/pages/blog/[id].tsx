// import React, {useState} from "react";
// import { GetServerSideProps } from "next";
// import BlogCreationModal from "@/components/modals/BlogModal";// Adjust path as necessary
// import { fetchBlogById, fetchCurrentUser } from "@/components/mockApi"; // Adjust path as necessary
// import Header from "@/components/header";
// import PageDropDown from "@/components/drop-downs/pages-dropdown";
// import { ThumbsUp, ThumbsDown, ThumbsUpF, ThumbsDownF, Flag, Pencil} from "@/common/icons";
// import VoteButton from "@/components/vote-button";
// import CommentButton from "@/components/comment-button";
// import ReportCreationModal from "@/components/modals/ReportCreationModal";
// import CommentSection from "@/components/comment-section";

// interface BlogPageProps {
//   blog: {
//     id: string;
//     title: string;
//     description: string;
//     author: string;
//     authorId: string;
//     tags: string[];
//   };
//   currentUser: { id: string; name: string };
// }

// const BlogPage: React.FC<BlogPageProps> = ({ blog, currentUser }) => {
//     const [showReportModal, setShowReportModal] = useState(false);
//     const [reportTitle, setReportTitle] = useState("");

//     const handleFlagClick = (title: string) => {
//       setReportTitle(title); // Set the title of the item being reported
//       setShowReportModal(true); // Show the modal
//     };

//     const handleReportSubmit = (data: { explanation: string }) => {
//       console.log("Report Submitted for:", reportTitle, "Data:", data);
//       setShowReportModal(false); // Close the modal after submission
//     };

//   const [showEditModal, setShowEditModal] = React.useState(false);

  

//   const handleEditSubmit = (data: { title: string; description: string; tags: string[] }) => {
//     // Simulate API call to update blog
//     console.log("Edited Blog Data:", data);
//     setShowEditModal(false);
//     window.location.reload(); // Reload to reflect changes
//   };

//   const handleAddComment = async (): Promise<number> => {
//     // Simulate an API call to add a comment and fetch the updated count
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve(5); // Simulate the new comment count
//       }, 5);
//     });
//   };

//   return (
//     <div className="h-screen flex flex-col ">
//         <Header />
//         <div className="flex flex-col content-center mt-5 space-y-1">

       
//         <div className="flex justify-center ">
//         <h1 className="text-3xl font-bold">{blog.title} </h1>
//         </div>
        
//         <div className="flex justify-center ">
//             <div className="flex flex-wrap gap-2 ">
//             {blog.tags.map((tag: string, index: number) => (
//                 <span key={index} className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md">
//                 {tag}
//                 </span>
//             ))}
//             </div>
//         </div>
        
//         <div className="flex justify-center text-gray-600"> by {blog.author} </div>

//         <div className="flex justify-center">
//         {currentUser.id === blog.authorId && (
//           <button
//             onClick={() => setShowEditModal(true)}
//             className=" px-4 py-2 bg-yellow-500 text-white rounded-lg"
//           >
//            <Pencil className=" object-scale-down h-5 w-5" />
//           </button>
//         )}
//         </div>

//         </div>

//         <div className="flex-1 flex items-center justify-center py-4">
        
//         <main className="flex flex-col items-start justify-start bg-white w-[95%] h-[95%] shadow-lg px-10 pt-10 pb-[25%] ">
//             <p>{blog.description}</p>
//         </main>
//         </div>
      

//       <div className=" flex-1 flex items-start justify-start py-4">
//         <div className="flex flex-col items-start justify-start px-10 ">
        
//         <div className="flex flex-inline space-x-5 mb-4">
//         <div>
//         <VoteButton
//         upvoteIcon={<ThumbsUp className=" object-scale-down h-5 w-5" />}
//         upvoteActiveIcon={<ThumbsUpF className=" object-scale-down h-5 w-5" />}
//         downvoteIcon={<ThumbsDown className="object-scale-down h-5 w-5" /> }
//         downvoteActiveIcon={<ThumbsDownF className="object-scale-down h-5 w-5" />}

//         // from backend this will be for the number of votes within the blog
//         initialText="0"
//         changeText="1"
//       />
//         </div>
       

//         <div>
//         <CommentButton initialCount={4} onAddComment={handleAddComment} />
//         </div>

//         <div className=" inline-flex items-center  bg-gray-200 rounded-full shadow-sm border-gray-500 border-2 pr-2 pl-2">
//             <button  onClick={() => handleFlagClick("Blog Title")} className="text-xs font-bold"><Flag className=" object-scale-down h-5 w-5" /></button>
//         </div>

        
//         </div>

       

     

//         <ReportCreationModal
//         title={reportTitle}
//         isOpen={showReportModal}
//         onClose={() => setShowReportModal(false)}
//         onSubmit={handleReportSubmit}
//       />
        
//         </div>
        
       
       


//         </div>
//         <hr className="w-[95%] border-t-2 border-gray-300 my-4 mx-auto"></hr>

//         <div className="flex flex-col items-start px-10 space-y-4">
        

        
//         <PageDropDown
//             id="juicy"
//           trigger={  
//             <button className="px-4 py-2 text-sm rounded-full hover:bg-blue-200 transition ">Sort by <span className="inline-block -translate-y-0.5">⌄</span></button>
//           }
//           items={[
//             { label: "Juciest", link: "/home" },
//           ]}
//         />
        
       
        

          
        
//         <h2 className="mt-8 text-md font-semibold">Comment Section</h2>
        
      
//         {/* Pass `comments` to `NestedComments` without needing to specify `parentId` */}
//         {/* <NestedComments comments={comments} /> */}

//         <CommentSection />
//         </div>

//       {showEditModal && (
//         <BlogCreationModal
//           isOpen={showEditModal}
//           onClose={() => setShowEditModal(false)}
//           onSubmit={handleEditSubmit}
//         />
//       )}
//     </div>
//   );
// };

// // Fetch blog and current user on the server side
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { id } = context.params as { id: string };

//   // Fetch blog and current user data
//   const blog = await fetchBlogById(id);
//   const currentUser = await fetchCurrentUser();

//   // If blog not found, return a 404 page
//   if (!blog) {
//     return {
//       notFound: true,
//     };
//   }

//   return {
//     props: {
//       blog,
//       currentUser,
//     },
//   };
// };

// export default BlogPage;


import React, { useState } from "react";
import { GetServerSideProps } from "next";
import BlogCreationModal from "@/components/modals/BlogModal"; // Adjust path as necessary
import { fetchBlogById, fetchCurrentUser } from "@/components/mockApi"; // Adjust path as necessary
import Header from "@/components/header";
import PageDropDown from "@/components/drop-downs/pages-dropdown";
import { ThumbsUp, ThumbsDown, ThumbsUpF, ThumbsDownF, Flag, Pencil } from "@/common/icons";
import VoteButton from "@/components/vote-button";
import CommentButton from "@/components/comment-button";
import ReportCreationModal from "@/components/modals/ReportCreationModal";
import CommentSection from "@/components/comment-section";

interface BlogPageProps {
  blog: {
    id: string;
    title: string;
    description: string;
    author: string;
    authorId: string;
    tags: string[];
  };
  currentUser: { id: string; name: string };
}

const BlogPage: React.FC<BlogPageProps> = ({ blog: initialBlog, currentUser }) => {
  const [blog, setBlog] = useState(initialBlog); // Initialize state with server-side data
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);

  const handleFlagClick = (title: string) => {
    setReportTitle(title); // Set the title of the item being reported
    setShowReportModal(true); // Show the modal
  };

  const handleReportSubmit = (data: { explanation: string }) => {
    console.log("Report Submitted for:", reportTitle, "Data:", data);
    setShowReportModal(false); // Close the modal after submission
  };

  const handleEditSubmit = (data: { title: string; description: string; tags: string[] }) => {
    // Simulate API call to update the blog
    console.log("Edited Blog Data:", data);

    // Update the `blog` state directly to reflect changes
    setBlog((prevBlog) => ({
      ...prevBlog,
      title: data.title,
      description: data.description,
      tags: data.tags,
    }));

    setShowEditModal(false); // Close the modal
  };

  const handleAddComment = async (): Promise<number> => {
    // Simulate an API call to add a comment and fetch the updated count
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(5); // Simulate the new comment count
      }, 500);
    });
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-col content-center mt-5 space-y-1">
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold">{blog.title}</h1>
        </div>

        <div className="flex justify-center">
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag: string, index: number) => (
              <span key={index} className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-center text-gray-600">by {blog.author}</div>

        <div className="flex justify-center">
          {currentUser.id === blog.authorId && (
            <button
              onClick={() => setShowEditModal(true)}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
            >
              <Pencil className="object-scale-down h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-4">
        <main className="flex flex-col items-start justify-start bg-white w-[95%] h-[95%] shadow-lg px-10 pt-10 pb-[25%]">
          <p>{blog.description}</p>
        </main>
      </div>

      <div className="flex-1 flex items-start justify-start py-4">
        <div className="flex flex-col items-start justify-start px-10">
          <div className="flex flex-inline space-x-5 mb-4">
            <div>
              <VoteButton
                upvoteIcon={<ThumbsUp className="object-scale-down h-5 w-5" />}
                upvoteActiveIcon={<ThumbsUpF className="object-scale-down h-5 w-5" />}
                downvoteIcon={<ThumbsDown className="object-scale-down h-5 w-5" />}
                downvoteActiveIcon={<ThumbsDownF className="object-scale-down h-5 w-5" />}
                initialText="0"
                changeText="1"
              />
            </div>

            <div>
              <CommentButton initialCount={4} onAddComment={handleAddComment} />
            </div>

            <div className="inline-flex items-center bg-gray-200 rounded-full shadow-sm border-gray-500 border-2 pr-2 pl-2">
              <button
                onClick={() => handleFlagClick(blog.title)}
                className="text-xs font-bold"
              >
                <Flag className="object-scale-down h-5 w-5" />
              </button>
            </div>
          </div>

          <ReportCreationModal
            title={reportTitle}
            isOpen={showReportModal}
            onClose={() => setShowReportModal(false)}
            onSubmit={handleReportSubmit}
          />
        </div>
      </div>

      <hr className="w-[95%] border-t-2 border-gray-300 my-4 mx-auto"></hr>

      <div className="flex flex-col items-start px-10 space-y-4">
        <PageDropDown
          id="juicy"
          trigger={
            <button className="px-4 py-2 text-sm rounded-full hover:bg-blue-200 transition">
              Sort by <span className="inline-block -translate-y-0.5">⌄</span>
            </button>
          }
          items={[{ label: "Juiciest", link: "/home" }]}
        />

        <h2 className="mt-8 text-md font-semibold">Comment Section</h2>

        <CommentSection />
      </div>

      {showEditModal && (
        <BlogCreationModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

// Fetch blog and current user on the server side
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  const blog = await fetchBlogById(id);
  const currentUser = await fetchCurrentUser();

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog,
      currentUser,
    },
  };
};

export default BlogPage;
