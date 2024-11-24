import prisma from "@/utils/db"
import { authMiddleware } from "@/lib/auth";

export default async function handlerCreateComment(req,res,which){
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
    

        //console.log("my id is" + blogId);

        const blog_id = parseInt(blogId);
        const comment_id = which === 1 ? parseInt(commentId) : null; 

        if (isNaN(blog_id) || (which === 1 && isNaN(comment_id))) {
            return res.status(400).json({ error: 'Invalid comment or blog ID' });
        }
    
        const {description} = req.body;

        if (!description || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ error: "Description is required and cannot be empty" });
        }
    
        let newData = {
            // blogId: blog_id,
            blog: { connect: { id: blog_id } },
            description: description.trim(),
            author: { connect: { id: author } },
            level: 0, // Default for top-level comments
        };
    
        if(which === 1){
            // Set the parent comment ID for subcomment
            //newData.parentId = comment_id;
            // Subcomment logic: Parent ID and level calculation
            if (!parentLevel) {
                return res.status(400).json({ error: "Parent level must be provided for subcomments." });
            }

            newData.parent = { connect: { id: comment_id } };
            newData.level = parentLevel !== undefined ? parentLevel + 1 : null;

            if (newData.level === null) {
                // Fallback to fetch the parent's level from the database if not provided
                const parentComment = await prisma.comment.findUnique({
                    where: { id: comment_id },
                    select: { level: true },
                });

                if (!parentComment) {
                    return res.status(404).json({ error: "Parent comment not found." });
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



