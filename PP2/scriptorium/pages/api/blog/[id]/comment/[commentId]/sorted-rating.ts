import { SortingCommentsRequest, SortingCommentsResponse } from "@/types/sorting";
import handlerSorting from "@/utils/comment/comments-sorted-rating";

export default async function handler(req:SortingCommentsRequest,res:SortingCommentsResponse){
    // get top comments within a blog 
    await handlerSorting(req,res,3);
}