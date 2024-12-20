import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { fetchBlogById, fetchCurrentUser, simulateBlogEditAPI } from "@/components/mockApi";
import BlogCreationModal from "@/components/modals/BlogModal"; // Adjust path as necessary
import Header from "@/components/header";
import PageDropDown from "@/components/drop-downs/pages-dropdown";
import { ThumbsUp, ThumbsDown, ThumbsUpF, ThumbsDownF, Flag, Pencil, Trash } from "@/common/icons";
import VoteButton from "@/components/vote-button";
import CommentButton from "@/components/comment-button";
import ReportCreationModal from "@/components/modals/ReportCreationModal";
import CommentSection from "@/components/comment-section";
import { apiCall } from "@/utils/auth-api-w-refresh";
import { useUser } from "@/context/userContextHeader";
import BlogPreview from "@/components/blogPreview";
import LinkTemplateModal from "@/components/modals/LinkTemplateModal";
import ReportPopUp from "@/components/reportPopUp";  
// working version with local stroe 


interface Author {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface Tag {
    name: string
}

interface Comment{
    id: number;
    description: string;
}

interface Blog {
  id: string;
  title: string;
  description: string;
  author: Author;
  authorId: string;
  flagged: boolean;
  tags: Tag[];
  upvotes: string;
  downvotes: string;
}

const BlogPage: React.FC = () => {
  

  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [showTempLinkModal, setShowTempLinkModal] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [relatedTemps, setRelatedTemps] = useState<Template[]>([])
  const { user } = useUser();

  const flagged = blog?.flagged;

  const handleFlagClick = (title: string) => {
    setReportTitle(title); // Set the title of the item being reported
    setShowReportModal(true); // Show the modal
  };

  const handleTempLinkSubmit = () => {
    router.reload();
  }

  const handleReportSubmit = () => {
    console.log("Report Submitted");
    setShowReportModal(false); // Close the modal after submission
  };

  // Fetch blog data on the client
  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        console.log("my id", id);
        setLoading(true);
        try {
            let blo = await apiCall(`/api/blog/${id}`, { method: "GET" });
          const fetchedBlog = blo.blog;
          setRelatedTemps(blo.blog.templates)
          setBlog(fetchedBlog);
        } catch (error) {
          console.error("Error fetching blog:", error);
          alert("Could not fetch the blog. Redirecting...");
          router.push("/home");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchBlog();
  }, [id]);

  const handleEditSubmit = async (data: { title: string; description: string; tags: string[] }) => {
    try {
    //   const payload = {
    //     ...data,
    //     tags: data.tags.map((tag) => ({ name: tag })),
    //   };

      console.log("this is my paylad", JSON.stringify(data))

      let updatedBlog = await apiCall(`/api/blog/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });

      updatedBlog.blog.author = user;

      setBlog(updatedBlog.blog);
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update blog:", error);
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await apiCall(`/api/blog/${id}`, { method: "DELETE" });
        console.log("deleted!")
        router.push("/home");
      } catch (error) {
        console.error("Failed to delete blog:", error);
        alert("Failed to delete the blog. Please try again.");
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }
  console.log("Theis is the response, ", blog)

  console.log("Theis is my tags, ", JSON.stringify(blog.tags))

  console.log("am i flagged", flagged)

     return (
      <div className="h-screen flex flex-col">
        <div className="flex flex-col content-center mt-5 space-y-1">
            
            {flagged && (<div className="flex flex-col items-end content-center mr-16 text-xs font-bold">
                <div className="flex flex-col items-center">
                <div className="underline">
                You've been reported
                </div>
                <div>
                    <button className="px-2 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => setShowReports(true)}>
                    Why?
                    </button>
                    
                </div>
                </div>
              
                
            </div>)}

        
          <div className="flex justify-center">
            <div className="flex flex-wrap">
            <h1 className="text-3xl font-bold break-words text-center max-w-[50%] mx-auto">{blog.title}</h1>
            </div>
            
            
          </div>
  
          <div className="flex justify-center">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <span key={index} className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
  
          <div className="flex justify-center text-gray-600">by {blog.author.firstName} {blog.author.lastName}</div>
  
          <div className="flex justify-center">
            {user && (user.id === blog.authorId) && (
                <div className="flex flex-row space-x-2 ">
                     <button
                        onClick={() => setShowEditModal(true)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                    >
                    <Pencil className="object-scale-down h-5 w-5" />
                     </button >

                    <button onClick={handleDelete}
                        className="px-4 py-2 bg-yellow-500 text-white rounded-lg">
                         <Trash className="object-scale-down h-5 w-5" />
                    </button>
                </div>

             
            )}
          </div>
        </div>
  
        <div className="flex-1 flex items-center justify-center py-4">
          <main className="flex flex-col break-words items-start justify-start bg-white w-[95%] h-[95%] shadow-lg px-10 pt-10 pb-[25%] ">
            <div className="max-w-[100%]">
            <p>{blog.description}</p>
            </div>
            
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
                  upvotes={blog.upvotes}
                  downvotes={blog.downvotes}
                />
              </div>
  
              {/* <div>
                <CommentButton initialCount={4} onAddComment={handleAddComment} />
              </div> */}
  
              <div className={`inline-flex items-center  rounded-full shadow-sm border-2 pr-2 pl-2 ${flagged ? "bg-red-500 border-red-800  " : "bg-gray-200 border-gray-500 "}`}>
                <button
                  onClick={() => handleFlagClick(blog.title)}
                  className="text-xs font-bold"
                >
                  <Flag className="object-scale-down h-5 w-5" />
                </button>
              </div>
            </div>
  
            <ReportCreationModal
              id={id as string}
              type={"BLOG"}
              isOpen={showReportModal}
              onClose={() => setShowReportModal(false)}
              onSubmit={handleReportSubmit}
            />
          </div>
        </div>

      
        {relatedTemps.length > 0 && <>
          <h2 className="text-3xl font-bold ml-[10px]">Linked Templates:</h2>
        <div className={`mt-6 flex flex-col overflow-y-auto min-h-[275px] min-w-[100px] flex-col overflow-y-auto max-h-[300px] border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-2`}>
              {relatedTemps.map((blog, index) => (
              <BlogPreview
                  key={index}
                  language={blog.language}
                  title={blog.title}
                  description={blog.explanation}
                  author={blog.owner.firstName + " " + blog.owner.lastName}
                  tags={blog.tags?.map((tag) => tag.name) || []}
                  blogId={id as string}
                  tempId={String(blog.id)}
              />
              ))}
          </div></>}
          
        {user && (user.id === blog.authorId) && <>
        <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        onClick={() => setShowTempLinkModal(true)}
      >
        Link Template
      </button>

      <LinkTemplateModal
        isOpen={showTempLinkModal}
        onClose={() => setShowTempLinkModal(false)}
        onSubmit={handleTempLinkSubmit}
        blogId={Number(id as string)}
      />

        </>
      }

      <ReportPopUp
        isOpen={showReports}
        onClose={() => setShowReports(false)}
        blogId={Number(id as string)}
        type={"blog"}
      />
  
        <hr className="w-[95%] border-t-2 border-gray-300 my-4 mx-auto"></hr>
  
        <div className="flex flex-col items-start px-10 space-y-4">
          <PageDropDown
            id="juicy"
            trigger={
              <button className="px-4 py-2 text-sm rounded-full hover:bg-blue-200 transition">
                Sort by <span className="inline-block -translate-y-0.5">⌄</span>
              </button>
            }
            items={[{ label: "Juiciest", link: `/blog/${id}` }]}
          />
  
          {/* <h2 className="mt-8 text-md font-semibold">Comment Section</h2> */}
  
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

export default BlogPage;
