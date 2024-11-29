import prisma from "@/utils/db"
import {authMiddleware} from "@/lib/auth";
import { UpdateCommentRequest, UpdateCommentResponse, UpdateCommentData} from "@/types/comment";
import { CommentRequestID, CommentResponseID } from "@/types/comment";
import { getReportsForUserContent } from "@/utils/comment-blog/find-report";
/* 
UPDATE COMMENTS IDENTIFIABLE BY COMMENT ID 
ALSO, DELETE COMMENTS (doesn't really delete them, but changes their flag for 
)
 */

async function handlerGet(req:CommentRequestID, res:CommentResponseID){
    // GET handler
    // expects id

    if (req.method !== "GET"){
        return res.status(405).json({ error: "must use GET method" });
    }

    const id  = req.query.commentId;
    // converts given id to a number
    const commentId = id ? parseInt(id, 10) : NaN;
    if (isNaN(commentId)) {
        return res.status(400).json({ error: "Invalid blog ID" });
    }
    
    try {
        // returns template based on given id
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            include: {
                author: {
                    select: {
                        firstName: true,
                        lastName: true, // Include only the author's first and last name
                    },
                },
            },
        });
        
        // returns error if no template found
        if (!comment) {
            return res.status(404).json({error: "No blog found with that ID"});
        }

        let report: Record<number, string[]> = {};

        // Handle flagged blogs
        if (comment.flagged) {
            const user = await authMiddleware(req, res, { getFullUser: true });

            if (!user) {
                return res.status(403).json({ error: "Access denied to this comment." });
            }

            const isAdmin = user.role === "SYS_ADMIN";
            const isAuthor = user.id === comment.authorId;

            if (!isAdmin && !isAuthor) {
                return res.status(403).json({ error: "Access denied to this blog." });
            }

            // Fetch report if user is an admin or the author
            if (isAdmin || isAuthor) {
                report = await getReportsForUserContent(user.id, "COMMENT", [commentId]);
            }
        }

        // Include report only if it was fetched
        const enrichedComment = {
            ...comment,
            ...(report ? { reports: report[commentId] || [] } : {}), // Attach reports if available
        };

        return res.status(200).json({ message: "Successfully found comment", blog: enrichedComment });

    } catch (error) {

        // error when finding template
        console.error(error);
        return res.status(422).json({error: "could not fetch comment"});
    }
}

export async function handlerUpdate(req:UpdateCommentRequest,res:UpdateCommentResponse){
    // this should update top level and sub level commets 
    // cos all we need is comment id tbh

    // authorized action
    if (req.method !== 'PUT') {
        return res.status(405).json({error: "method not allowed"});
    }

    try{
        const author = await authMiddleware(req, res, { getFullUser: true });
        if (!author){
            return res.status(403).json({ error: "Permission denied" });
        }
        
        const commentId = req.query.commentId;
        const comment_id = parseInt(commentId);

        if (isNaN(comment_id)) {
            return res.status(400).json({ error: 'Invalid comment ID' });
        }

        const comment = await prisma.comment.findUnique({
            where: { id: comment_id},
        });

        if (!comment) {
            return res.status(404).json({ error: 'comment not found' });
        }

        const isAdmin = author.role === "SYS_ADMIN"
        const isAuthor = author.id === comment.authorId

        if (comment.flagged && !isAdmin) {
            return res.status(403).json({ error: "Permission denied, flagged blog" });
        }


        const {description,upvotes,downvotes,flagged} = req.body;
        const updateData: UpdateCommentData = {};

        if (description !== undefined){
            if(typeof description !== 'string' || description.trim() == ''){
                return res.status(400).json({ error: "Description must be a non-empty string" });
            }
            updateData.description = description.trimEnd();
        } 

    
        if (flagged !== undefined && isAdmin){
            if(typeof flagged !== 'boolean'){
                return res.status(400).json({ error: "Flagged must be a boolean" });
            }
            updateData.flagged = flagged; 
        } 

        // atp, we should short circuit, if we are neither 
        if(!isAdmin && !isAuthor){
            if(description || flagged){
                // if theres stuff in here
                return res.status(403).json({ error: "Permission denied, only upvotes and downvotes" });
            }
        }

        if (upvotes !== undefined) updateData.upvotes = upvotes;
        if (downvotes !== undefined) updateData.downvotes = downvotes;


        if(Object.keys(updateData).length === 0){
            return res.status(400).json({ error: "Nothing provided to update" });
        }

        const updatedComment = await prisma.comment.update({
            where: {id: comment_id},
            data : updateData,
        })

        // can this return empty? no cos i checked its existence before
        return res.status(200).json({message: "Comment updated", comment: updatedComment});

    }

    catch(error){
        console.log(error);
        return res.status(422).json({ error: "Failed to update comment" });
    }

}


export default async function handler(req: CommentRequestID | UpdateCommentRequest, res: CommentResponseID | UpdateCommentResponse) {
    const method  = req.method;
  
    switch (method) {
      case "GET":
        return handlerGet(req as CommentRequestID, res as CommentResponseID);
      case "PUT":
        return handlerUpdate(req as UpdateCommentRequest, res as UpdateCommentResponse);
      default:
        return res.status(405).json({ error: `Method ${method} not allowed` });
    }
  }
