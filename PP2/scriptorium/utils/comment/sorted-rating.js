import prisma from "@/utils/db";
import { authMiddleware } from "@/lib/auth";
import {getReportsForUserContent} from "@/utils/comment-blog/find-report";

// GPT: create me a helper function based on
// how i want to sort fetched comments or blogs based
// on the request query parameters 
export default async function handlerSorting(req, res, which) {
    // GET request 
    // not restricted 
    // 0 blogs 
    // 1 comments 

    // Only allow GET requests
    if (req.method !== "GET") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    // get list of blogs based on rating, descending, basd on upvotes
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    // would be null for top level function, cos its directly under blogs
    const blogId = req.query.id ? parseInt(req.query.id, 10) : null;
    console.log(blogId);
    // Convert page and limit to integers and calculate skip
    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const skip = (pageInt - 1) * limitInt;

    // only show valid stuff if i'm not the author 
    // else show everything if i'm the author 

    // go into handle report listing 
    // and get the stuff from report listing 
    // content id could be commeent id or blog id 
    

    try {
        // Fetch paginated blog posts sorted by upvotes in descending order
        // add report information for blogs/ comments where user is same as ]
        // current usr 

        let data;
        let reportData = {};
        let newData = [];
        let totalCount;

        const author = await authMiddleware(req, res, { getFullUser: true });
        const authorId = author ? author.id : null;
        console.log(authorId);

        if(which === 0){
            // get blogs 
            data = await prisma.blog.findMany({
                orderBy: { upvotes: "desc" },
                skip: skip,
                take: limitInt,
            });

            // find current user to see if they have any reported blogs
            // so they can see the explanations, if they exist, fro being flagged
            // If the user is authenticated, find flagged blogs authored by them
            if (authorId!==null) {
                const flaggedBlogIds = data
                    .filter(blog => blog.flagged && blog.authorId === authorId)
                    .map(blog => blog.id);
                
                    console.log(flaggedBlogIds);

                // Fetch explanations for flagged blogs authored by the user
                if (flaggedBlogIds.length > 0) {
                    reportData = await getReportsForUserContent(authorId, "BLOG", flaggedBlogIds);
                }
            }

            console.log(reportData);
    
            // Map over blogs, attach reports if user is the author of flagged blogs
            newData = data.map(blog => {
                const isAuthorOfFlagged = blog.flagged && blog.authorId === authorId;
                return {
                    ...blog,
                    reports: isAuthorOfFlagged ? reportData[blog.id] || [] : undefined,
                };
            });
            
            totalCount = await prisma.blog.count();
        }

        if(which > 0){
            if(which === 1){
                // get comments within a blog
    
                if(!blogId || isNaN(blogId)){
                    return res.status(400).json({ error: "Invalid blog id" });
                }
    
                data = await prisma.comment.findMany({
                    where: {
                      blogId: blogId,
                      parentId: null,  // Only fetch top-level comments
                    },
                    orderBy: { upvotes: "desc" },
                    skip: skip,
                    take: limitInt,
                });

                totalCount = await prisma.comment.count({
                    where: { blogId: blogId, parentId: null },
                  });
            }

            else{
                // get juiciest comments everywhere 
                data = await prisma.comment.findMany({
                    // where: {
                    //   //parentId: null,  // Only fetch top-level comments
                    // },
                    orderBy: { upvotes: "desc" },
                    skip: skip,
                    take: limitInt,
                });

                // totalCount = await prisma.comment.count({
                //     where: { parentId: null },
                //   });
                totalCount = await prisma.comment.count();
            }

            if (authorId !== null) {
                const flaggedCommentIds = data
                    .filter(comment => comment.flagged && comment.authorId === authorId)
                    .map(comment => comment.id);
                
                console.log("Flagged Comment IDs:", flaggedCommentIds);

                if (flaggedCommentIds.length > 0) {
                    reportData = await getReportsForUserContent(authorId, "COMMENT", flaggedCommentIds);
                }
            }

            console.log("Comment Report Data:", reportData);

            newData = data.map(comment => {
                const isAuthorOfFlagged = comment.flagged && comment.authorId === authorId;
                return {
                    ...comment,
                    reports: isAuthorOfFlagged ? reportData[comment.id] || [] : undefined,
                };
            });
        }

        return res.status(200).json({
            message: "Success",
            data: newData,
            pagination: {
                total: totalCount,
                page: pageInt,
                limit: limitInt,
                totalPages: Math.ceil(totalCount / limitInt),
            },
        });
    } 
    
    catch (error) {
        console.log(error);
        console.error("Error fetching sorted blogs:", error);
        return res.status(422).json({ error: "Failed to get sorted blogs or comments" });
    }
}
