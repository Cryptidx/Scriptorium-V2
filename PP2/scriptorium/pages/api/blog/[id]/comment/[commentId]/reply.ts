import { CreateCommentRequest, CreateCommentResponse } from "@/types/comment";
import handlerCreateComment from "@/utils/comment/create-comment";

export default async function handler(req:CreateCommentRequest,res:CreateCommentResponse){
    await handlerCreateComment(req,res,1);
}
