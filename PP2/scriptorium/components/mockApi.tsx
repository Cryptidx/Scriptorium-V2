let commentsData = [
    { id: "1", author: "John Doe", description: "Top-level comment 1", upvotes: "12", downvotes: "3", parentId: null },
    { id: "6", author: "Steve Rogers", description: "Reply to comment 1", upvotes: "6", downvotes: "1", parentId: "1" },
    { id: "12", author: "Peter Parker", description: "Another reply to comment 1 but in sub 6", upvotes: "10", downvotes: "3", parentId: "6" },
    { id: "20", author: "Peter P", description: "Another reply to comment 6", upvotes: "10", downvotes: "3", parentId: "6" },
    { id: "15", author: "Natasha Romanoff", description: "Another reply to comment 1 but in sub 12", upvotes: "11", downvotes: "0", parentId: "12" },
    { id: "2", author: "Jane Smith", description: "Top-level comment 2", upvotes: "5", downvotes: "1", parentId: null },
  ];

  const mockBlogs = [
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
  
  // Simulate fetching comments
export const fetchComments = async (parentId: string | null = null, page: number = 1, perPage: number = 5) => {
    const filteredComments = commentsData.filter((c) => c.parentId === parentId);
    const start = (page - 1) * perPage;
    const paginatedComments = filteredComments.slice(start, start + perPage);
  
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return { data: paginatedComments, hasMore: filteredComments.length > start + perPage };
  };
  
  // Simulate adding a comment/reply
export const addComment = async (newComment: any) => {
    const commentWithId = {
      ...newComment,
      id: Math.random().toString(36).substr(2, 9), // Simulate backend-generated ID
      upvotes: "0",
      downvotes: "0",
    };
  
    commentsData.push(commentWithId);
  
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    return commentWithId;
  };
  

 
  
  // Mock API to fetch blog details
export const fetchBlogById = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
    return mockBlogs.find((blog) => blog.id === id);
  };
  
  // Mock API to fetch current user
export   const fetchCurrentUser = async () => {
    await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate network delay
    return { id: "user123", name: "Jane Doe" }; // Simulated logged-in user
  };


// export const simulateBlogCreationAPI = async (data: {
//   title: string;
//   description: string;
//   tags: string[];
// }) => {
//   return new Promise<{ id: string; title: string; description: string; tags: string[] }>((resolve) => {
//     setTimeout(() => {
//       let newBlog =  {
//         id: Math.random().toString(36).substring(2, 9), // Simulate a unique blog ID
//         title: data.title,
//         description: data.description,
//         tags: data.tags,
//       }

//       localStorage.setItem(`${newBlog.id}`, JSON.stringify(newBlog));
//       resolve(
//         newBlog
//       );
//     }, 1000); // Simulate network delay
//   });
// };
export const simulateBlogCreationAPI = async (data: {
  title: string;
  description: string;
  tags: string[];
}) => {
  return new Promise<{ id: string; title: string; description: string; tags: string[] }>((resolve) => {
    setTimeout(() => {
      const newBlog = {
        id: Math.random().toString(36).substring(2, 9), // Simulate a unique blog ID
        title: data.title,
        description: data.description,
        tags: data.tags,
        
        // need a way to get the author for a blog
        author: "Jane Doe",

         // author id is from back end
        authorId:"user123",
      };

      localStorage.setItem(newBlog.id, JSON.stringify(newBlog));
      resolve(newBlog);
    }, 1000); // Simulate network delay
  });
};

// export const simulateBlogEditAPI = async (id: string, data: { title: string; description: string; tags: string[] }) => {
//   return new Promise<{ id: string; title: string; description: string; tags: string[] }>((resolve) => {
//     setTimeout(() => {
//       const updatedBlog = {
//         id,
//         title: data.title,
//         description: data.description,
//         tags: data.tags,
//       };
//       localStorage.setItem(id, JSON.stringify(updatedBlog));
//       resolve(updatedBlog);
//     }, 1000); // Simulate a delay
//   });
// };
export const simulateBlogEditAPI = async (
  id: string,
  data: { title: string; description: string; tags: string[] }
) => {
  return new Promise<{
    id: string;
    title: string;
    description: string;
    tags: string[];
    author: string;
    authorId: string;
  }>((resolve) => {
    setTimeout(() => {
      const storedBlog = JSON.parse(localStorage.getItem(id) || "{}");
      const updatedBlog = {
        id,
        title: data.title,
        description: data.description,
        tags: data.tags,
        author: storedBlog.author || "Unknown Author", // Fallback in case `author` is missing
        authorId: storedBlog.authorId || "unknownAuthorId", // Fallback in case `authorId` is missing
      };
      localStorage.setItem(id, JSON.stringify(updatedBlog));
      resolve(updatedBlog);
    }, 1000); // Simulate network delay
  });
};
