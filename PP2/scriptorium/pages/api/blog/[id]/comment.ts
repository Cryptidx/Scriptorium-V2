import handlerCreateComment from "@/utils/comment/create-comment";
import { CreateCommentRequest, CreateCommentResponse } from "@/types/comment";


async function handlerGet(req:CreateCommentRequest,res:CreateCommentResponse){
    await handlerCreateComment(req,res,2);

}

export default async function handler(req:CreateCommentRequest,res:CreateCommentResponse){
    // top level comment
    // add a comment to a given blog identified by blog id (POST)

    switch(req.method){
        case "POST":
            await handlerCreateComment(req,res,0);
            return;

        case "GET":
            await handlerGet(req,res);
            return ;

        default:
            return res.status(400).json({ error: `Method ${req.method} Not Allowed`});
    }   
}
