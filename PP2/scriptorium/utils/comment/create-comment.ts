import prisma from "@/utils/db"
import { authMiddleware } from "@/lib/auth";
import { CreateCommentRequest, CreateCommentResponse } from "@/types/comment";

interface NewCommentData {
    blog: { connect: { id: number } };
    description: string;
    author: { connect: { id: number } };
    level: number;
    parent?: { connect: { id: number } }; // Optional for top-level comments
}

export default async function handlerCreateComment(req:CreateCommentRequest,res:CreateCommentResponse,which:number){
    // create a subcomment 
    if(req.method !== "POST"){
        return res.status(405).json({error: "method not allowed"});
    }

    try{
        let {userId} = await authMiddleware(req, res);
        const author = userId;
        if (!author) {
            // could be null, cos we don't have a current user by jwt 
            return res.status(401).json({ error: "Unauthorized. Please log in to create a blog." });
        }

        const blogId = req.query.id;
        const commentId = req.query.commentId;
    
        const blog_id = parseInt(blogId);
        
        if (isNaN(blog_id) ) {
            return res.status(400).json({ error: 'Invalid comment or blog ID' });
        }

        // Validate that the blog exists and is not flagged
        const blog = await prisma.blog.findUnique({
            where: { id: blog_id },
            select: { flagged: true },
        });

        if (!blog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        if (blog.flagged) {
            return res.status(403).json({ error: "Cannot comment on a flagged blog." });
        }
    
        const {description, parentLevel} = req.body;

        if (!description || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ error: "Description is required and cannot be empty" });
        }
    
        let newData: NewCommentData = {
            blog: { connect: { id: blog_id } },
            description: description.trim(),
            author: { connect: { id: author } },
            level: 0, // Default for top-level comments
          };
    
        if (which === 1) {
            if(commentId === undefined){
                return res.status(400).json({ error: 'Invalid comment or blog ID' });
            } 
            let comment_id = parseInt(commentId);
            if(isNaN(comment_id)){
                return res.status(400).json({ error: 'Invalid comment or blog ID' });
            }            
        
            newData.parent = { connect: { id: comment_id! } }; // Use non-null assertion after validation
            
            // Determine the level for subcomments
            if (parentLevel !== undefined) {
                newData.level = parentLevel + 1; // Add 1 to parent level
            } else {
                // Fetch the parent's level from the database
                const parentComment = await prisma.comment.findUnique({
                where: { id: comment_id },
                select: { level: true },
                });
            
                if (!parentComment || parentComment.level === null) {
                return res.status(404).json({ error: "Parent comment not found or invalid level" });
                }
            
                newData.level = parentComment.level + 1;
            }
        }

        const comment = await prisma.comment.create({
            data: newData
        });

        return res.status(201).json({message: "Comment created", comment: comment});
    }

    catch(error){
        console.log(error);
        return res.status(422).json({ error: "Failed to create comment", error_msg: error});
    }   

}



