import React from "react";
import NestedComments from "./nested-comments";
import Header from "@/components/header";
import PageDropDown from "@/components/drop-downs/pages-dropdown";
import { ThumbsUp, ThumbsDown, ThumbsUpF, ThumbsDownF, Flag} from "@/common/icons";
import VoteButton from "@/components/vote-button";
import CommentButton from "@/components/comment-button";
import { DropdownProvider } from "@/components/drop-downs/dropdownContext";


interface CommentProps {
    id: string;
    description: string;
    level: string;
    parentId: string | null; // Updated to allow `null` as a possible value
  }
  


interface BlogPreviewProps {
  title: string;
  description: string;
  author: string;
  tags: String[];
  comments: CommentProps[];
}

// const blogs = [
//     {
//       id: 1,
//       title: "Exploring React Patterns",
//       description: "Learn about the latest patterns and practices in React development.",
//       tags: ["React", "Patterns"],
//       comments: [
//         { id: 1, description: "Great post!", level: 0 },
//         { id: 2, description: "I agree!", parentId: 1, level: 1 },
//       ],
//     },
//     {
//       id: 2,
//       title: "Mastering TypeScript",
//       description: "A guide to becoming proficient in TypeScript for modern web development.",
     
//       comments: [],
//     },
//   ];
const tags: string[] = ["TypeScript", "Web"]; // Explicitly typed array

const comments: CommentProps[] = [
  { id: "1", description: "Great post!", level: "0", parentId: null },
  { id: "2", description: "I agree!", level: "1", parentId: "1" },
];



// const comments: CommentProps[] = [
//   { id: "1", description: "Great post!", level: "0", parentId: null },
//   { id: "2", description: "I agree with you!", level: "1", parentId: "1" },
//   { id: "3", description: "Thanks, everyone!", level: "2", parentId: "2" },
//   { id: "4", description: "What about this aspect?", level: "1", parentId: "1" },
//   { id: "5", description: "Can you clarify more?", level: "2", parentId: "4" },
//   { id: "6", description: "Here's an example.", level: "3", parentId: "5" },
//   { id: "7", description: "Amazing discussion!", level: "0", parentId: null },
//   { id: "8", description: "I have a question.", level: "1", parentId: "7" },
//   { id: "9", description: "What's your opinion?", level: "2", parentId: "8" },
//   { id: "10", description: "I don't agree.", level: "1", parentId: "7" },
//   { id: "11", description: "Here's why.", level: "2", parentId: "10" },
//   { id: "12", description: "Another great post!", level: "0", parentId: null },
//   { id: "13", description: "Thank you!", level: "1", parentId: "12" },
//   { id: "14", description: "I loved the insights.", level: "2", parentId: "13" },
//   { id: "15", description: "You're welcome!", level: "3", parentId: "14" },
//   { id: "16", description: "Can we connect?", level: "1", parentId: "12" },
//   { id: "17", description: "Sure, let's do it.", level: "2", parentId: "16" },
// ];
// const BlogPageMain:React.FC<BlogPreviewProps>  = ({ title,description,tags,comments }) => {
//   return (
//     <div className="p-8">
//       <h1 className="text-4xl font-bold">{title}</h1>
//       <div className="flex flex-wrap gap-2 mt-4">
//         {tags.map((tag, index) => (
//           <span
//             key={index}
//             className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//       <p className="mt-6 text-lg">{description}</p>
//       <h2 className="mt-8 text-2xl font-semibold">Comments</h2>
//       <NestedComments comments={comments} />
//     </div>
//   );
// };

// export default BlogPageMain;
// const BlogPageMain: React.FC<BlogPreviewProps> = ({
//     title,
//     description,
//     tags,
//     comments,
//   }) => {
//     return (
//       <div className="p-8">
//         <h1 className="text-4xl font-bold">{title}</h1>
//         <div className="flex flex-wrap gap-2 mt-4">
//           {tags.map((tag, index) => (
//             <span
//               key={index}
//               className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md"
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//         <p className="mt-6 text-lg">{description}</p>
//         <h2 className="mt-8 text-2xl font-semibold">Comments</h2>
//         {/* Pass `comments` to `NestedComments` without needing to specify `parentId` */}
//         <NestedComments comments={comments} />
//       </div>
//     );
//   };
  
//   export default BlogPageMain;
const handleAddComment = async (): Promise<number> => {
    // Simulate an API call to add a comment and fetch the updated count
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(5); // Simulate the new comment count
      }, 5);
    });
  };
  


const BlogPageMain = () => {
    return (
      <div className="h-screen flex flex-col ">
        <DropdownProvider>
        <Header />
        <div className="flex flex-col content-center mt-5 space-y-1">
        <div className="flex justify-center ">
        <h1 className="text-3xl font-bold">This is a Title </h1>
        </div>
        
        <div className="flex justify-center ">
        <div className="flex flex-wrap gap-2 ">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
        </div>

        <div className="flex justify-center text-gray-600"> by hannah</div>
        </div>
        
        <div className="flex-1 flex items-center justify-center py-4">
        <div className="flex flex-col items-start justify-start bg-white w-[95%] h-[95%] shadow-lg px-10 pt-10 pb-[25%] ">
        Hello

        </div>
        
      
        </div>

        <div className=" flex-1 flex items-start justify-start py-4">
        <div className="flex flex-col items-start justify-start px-10 ">
        
        <div className="flex flex-inline space-x-5 mb-4">
        <div>
        <VoteButton
        upvoteIcon={<ThumbsUp className=" object-scale-down h-5 w-5" />}
        upvoteActiveIcon={<ThumbsUpF className=" object-scale-down h-5 w-5" />}
        downvoteIcon={<ThumbsDown className="object-scale-down h-5 w-5" /> }
        downvoteActiveIcon={<ThumbsDownF className="object-scale-down h-5 w-5" />}

        // from backend this will be for the number of votes within the blog
        initialText="0"
        changeText="1"
      />
        </div>
       

        <div>
        <CommentButton initialCount={4} onAddComment={handleAddComment} />
        </div>

        <div className=" inline-flex items-center  bg-gray-200 rounded-full shadow-sm border-gray-500 border-2 pr-2 pl-2">
            <button className="text-xs font-bold"><Flag className=" object-scale-down h-5 w-5" /></button>
        </div>
        </div>

       
        
        

        
        </div>

        
        </div>
        <hr className="w-[95%] border-t-2 border-gray-300 my-4 mx-auto"></hr>
        <div className="flex flex-col items-start px-10 space-y-4">
        

        
        <PageDropDown
            id="juicy"
          trigger={  
            <button className="px-4 py-2 text-sm rounded-full hover:bg-blue-200 transition ">Sort by <span className="inline-block -translate-y-0.5">⌄</span></button>
          }
          items={[
            { label: "Juciest", link: "/home" },
          ]}
        />
        
        

          
        
        <h2 className="mt-8 text-md font-semibold">Comment Section</h2>
        
      
        {/* Pass `comments` to `NestedComments` without needing to specify `parentId` */}
        <NestedComments comments={comments} />
        </div>
       

        </DropdownProvider>

       

        
       

        
        
       
        
      
      </div>
    );
  };
  
  export default BlogPageMain;