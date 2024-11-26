import { SortingCommentsRequest, SortingCommentsResponse } from "@/types/sorting";
import handlerSorting from "@/utils/comment/comments-sorted-rating";

export default async function handler(req:SortingCommentsRequest, res:SortingCommentsResponse) {
    // GET request: get topmost comments everywhere
    // not restricted 
    await handlerSorting(req,res,2);
}
