import prisma from "@/utils/db"
import processTags from "@/lib/helpers/create_tags";
import { authMiddleware, noErrorAuth } from "@/lib/auth";
import { getReportsForUserContent } from "@/utils/comment-blog/find-report";
import { BlogRequestID, BlogResponseID, UpdateBlogData } from "@/types/blog";


/*
DELETE AND UPDATE BLOG FOUND BY BLOG ID
*/

// delete a blog by id 
// will deleting a blog delete its associated comments? i think so 
async function handlerDelete(req:BlogRequestID,res:BlogResponseID){
    // do we delete coressponding relations

    if(req.method !== 'DELETE'){
        return res.setHeader('Allow', ['DELETE']).status(405).end(`Method ${req.method} Not Allowed`);
    }
    const { id } = req.query;
    const blogId = id ? parseInt(id, 10) : NaN;
    if (isNaN(blogId)) {
        return res.status(400).json({ error: "Invalid blog ID" });
    }

    try {
        // Check if the blog exists
        const blog = await prisma.blog.findUnique({
          where: { id: blogId },
        });
    
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }

        // Check permissions
        const author = await authMiddleware(req, res, { getFullUser: true });
        if (!author || (author.role !== 'SYS_ADMIN' && author.id !== blog.authorId)) {
            return res.status(403).json({ error: "Permission denied" });
        }
    
        // Delete the blog
        await prisma.blog.delete({
          where: { id: blogId },
        });
    
        return res.status(200).json({ message: 'Blog was deleted successfully.' });
    } 

    catch (error) {
        console.error("Error deleting blog:", error);
        return res.status(422).json({ error: "Unprocessable entity: Unable to delete the blog" });
    }

}

// update the blog post
async function handlerUpdate(req:BlogRequestID,res:BlogResponseID){

    if (req.method !== 'PUT') {
        return res.setHeader('Allow', ['PUT']).status(405).end(`Method ${req.method} Not Allowed`);
    }

    const { id } = req.query;
    const blogId = id ? parseInt(id, 10) : NaN;
    if (isNaN(blogId)) {
        return res.status(400).json({ error: "Invalid blog ID" });
    }

    const {title, description, tags, upvotes, downvotes, flagged} = req.body || {};
    const updateData: UpdateBlogData = {};

    // Validate title and description if provided
    if (title !== undefined){
        if(typeof title !== 'string' || title.trim() == ''){
            return res.status(400).json({ error: "Title must be a non-empty string" });
        }

        updateData.title = title.trimEnd();
    } 

    if (description !== undefined){
        if(typeof description !== 'string' || description.trim() == ''){
            return res.status(400).json({ error: "Description must be a non-empty string" });
        }
        updateData.description = description.trimEnd();
    } 


    // Process tags if provided
    if (tags !== undefined) {
        if (!Array.isArray(tags) || tags.length === 0 || tags.some(tag => typeof tag !== 'string' || tag.trim() === '')) {
            return res.status(400).json({ error: "Tags must be a non-empty array of non-empty strings" });
        }

        try {
            // Use processTags to ensure tags exist and get connect array
            const tagConnectArray = await processTags(tags);
            updateData.tags = { set: tagConnectArray };  // Use set to update tags
        } catch (error) {
            console.error("Error processing tags:", error);
            return res.status(422).json({ error: "Unprocessable entity: Unable to process tags" });
        }
    }

    if (upvotes !== undefined) updateData.upvotes = upvotes;
    if (downvotes !== undefined) updateData.downvotes = downvotes;

    // if(!title && !description && !tags && !flagged && !upvotes && !downvotes){
    //     console.log("ahhhh")
    //     console.log(upvotes)
    //     return res.status(400).json({ error: "Nothing provided to update" });
    // }
    if(!title && !description && !tags && !flagged && (upvotes === undefined || upvotes === null) &&
    (downvotes === undefined || downvotes === null)){
        return res.status(400).json({ error: "Nothing provided to update" });
    }

    try{
        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
        });

        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }

        // Check permissions
        const user = await authMiddleware(req, res, { getFullUser: true });
        if (!user ) {
            return res.status(403).json({ error: "Permission denied" });
        }

        const isAdmin = user.role === 'SYS_ADMIN';
        const isAuthor = user.id === blog.authorId;

        // Restrict to upvotes/downvotes if not admin and not author
        if (!isAdmin && !isAuthor) {
            if (title || description || tags || flagged !== undefined) {
                return res.status(403).json({ error: "Permission denied. Only upvotes/downvotes can be updated." });
            }
        }

        // Prevent non-admins from updating flagged blogs
        if (blog.flagged && !isAdmin) {
            return res.status(403).json({ error: "Permission denied. Flagged blog." });
        }

        // Only SYS_ADMIN can update the flagged status
        if (flagged !== undefined && isAdmin) {
            if (typeof flagged !== 'boolean') {
                return res.status(400).json({ error: "Flagged must be a boolean value" });
            }
            updateData.flagged = flagged;
        }

        const updatedBlog = await prisma.blog.update({
            where: {id: blogId},
            data : updateData,
            include: { tags: true, templates: true },
        });

        return res.status(200).json({message: "Blog updated successfully.", blog: updatedBlog });
    }

    catch(error){
        console.error("Error updating blog:", error);
        return res.status(422).json({ error: "Unprocessable entity: Unable to update the blog" });
    }
    
    // when it comes to editing comments, use other pathway 
    // when it comes to editing the template links, other pathway
}

async function handlerGet(req:BlogRequestID, res:BlogResponseID){
    // GET handler
    // expects id

    if (req.method !== "GET"){
        return res.status(405).json({ error: "must use GET method" });
    }

    const { id } = req.query;
    // converts given id to a number
    const blogId = id ? parseInt(id, 10) : NaN;
    if (isNaN(blogId)) {
        return res.status(400).json({ error: "Invalid blog ID" });
    }
    
    try {
        // returns template based on given id
        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            include: {
                templates: {
                    select: {
                        id: true,
                        title: true, // Include only the template ID and title
                    },
                },
                tags: {
                    select: {
                        name: true, // Include only the tag name
                    },
                },
                author: {
                    select: {
                        firstName: true,
                        lastName: true, // Include only the author's first and last name
                    },
                },
            },
        });
        
        // returns error if no template found
        if (!blog) {
            return res.status(404).json({error: "No blog found with that ID"});
        }

        let report: Record<number, string[]> = {};

        // Handle flagged blogs
        if (blog.flagged) {
            const user = await authMiddleware(req, res, { getFullUser: true });

            if (!user) {
                return res.status(403).json({ error: "Access denied to this blog." });
            }

            const isAdmin = user.role === "SYS_ADMIN";
            const isAuthor = user.id === blog.authorId;

            if (!isAdmin && !isAuthor) {
                return res.status(403).json({ error: "Access denied to this blog." });
            }

            // Fetch report if user is an admin or the author
            if (isAdmin || isAuthor) {
                report = await getReportsForUserContent(user.id, "BLOG", [blogId]);
            }
        }

        // Include report only if it was fetched
        const enrichedBlog = {
            ...blog,
            ...(report ? { reports: report[blogId] || [] } : {}), // Attach reports if available
        };

        return res.status(200).json({ message: "Successfully found blog", blog: enrichedBlog });

    } catch (error) {

        // error when finding template
        console.error(error);
        return res.status(422).json({error: "could not fetch blog"});
    }
}

export default async function handler(req:BlogRequestID, res:BlogResponseID) {
    // delete and update are restricted pathways 
    

    let method = req.method;
    switch(method){
        case "DELETE":
            try{
                const author = await authMiddleware(req, res);
                if (!author) {
                    // could be null, cos we don't have a current user by jwt 
                    return res.status(401).json({ error: "Unauthorized. Please log in to create a blog." });
                }
            }
            
            catch(error){
                return res.status(422).json({ error: "Failed to find current user" });
            }
            
            await handlerDelete(req,res);
            return;

        case "PUT":
            try{
                const author = await authMiddleware(req, res);
                if (!author) {
                    // could be null, cos we don't have a current user by jwt 
                    return res.status(401).json({ error: "Unauthorized. Please log in to create a blog." });
                }
            }
            
            catch(error){
                return res.status(422).json({ error: "Failed to find current user" });
            }
            
            await handlerUpdate(req,res);
            return;

        case "GET":
            await handlerGet(req,res);
            return;  
    }

    return res.status(400).json({ error: `Method ${method} Not Allowed`});
}