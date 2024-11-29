import prisma from "@/utils/db";
import { noErrorAuth } from "@/lib/auth";
import {getReportsForUserContent} from "@/utils/comment-blog/find-report";
import {SortingCommentsRequest,SortingCommentsResponse} from "@/types/sorting";
import { Prisma } from "@prisma/client";

// GPT: create me a helper function based on
// how i want to sort fetched comments or blogs based
// on the request query parameters 
export default async function handlerSorting(req: SortingCommentsRequest, res: SortingCommentsResponse, which:number) {
    // GET request 
    // not restricted 
    // 0 blogs 
    // 1 comments 

    // Only allow GET requests
    if (req.method !== "GET") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    // get list of blogs based on rating, descending, basd on upvotes
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);

    // would be null for top level function, cos its directly under blogs
    const blogId = req.query.id ? parseInt(req.query.id, 10) : null;
    console.log(blogId);

    const commentId = req.query.commentId ? parseInt(req.query.commentId, 10) : null;


    // Convert page and limit to integers and calculate skip
    const pageInt = page;
    const limitInt = limit;
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
        let reportData: Record<number, string[]> = {};
        let newData = [];
        let totalCount = 0;

        const author = await noErrorAuth(req, res, { getFullUser: true });
        const authorId = author ? author.id : null;
        console.log(authorId);

        const filters: Prisma.CommentWhereInput = {
            AND: [
              ...(authorId
                ? [
                    {
                      OR: [
                        { flagged: false },
                        { flagged: true, authorId: authorId },
                      ],
                    },
                  ]
                : [{ flagged: false }]),
            ],
        }
    
        if (which === 1) {
            if (!blogId || isNaN(blogId)) {
                return res.status(400).json({ error: "Invalid blog ID" });
            }

            // Use type-safe addition to `filters.AND`
            (filters.AND as Prisma.CommentWhereInput[]).push({
                blogId: blogId,
                parentId: null,
            });
        }

        if(which === 3) {
            if (!blogId || isNaN(blogId) ||!commentId || isNaN(commentId)) {

                return res.status(400).json({ error: "Invalid blog ID or comment parent ID" });
            }
            // Use type-safe addition to `filters.AND`
            (filters.AND as Prisma.CommentWhereInput[]).push({
                blogId: blogId,
                parentId: commentId,
            });
        }

        data = await prisma.comment.findMany({
            where: filters,
            orderBy: { upvotes: "desc" },
            skip: skip,
            take: limitInt,
            include: {
              _count: {
                select: {
                  subcomments: true, // Get the count of subcomments
                },
              },
              author: {
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    role: true
                }
                },    
            },
          });
          
    
        if (authorId) {
            const flaggedCommentIds = data
                .filter(comment => comment.flagged && comment.authorId === authorId)
                .map(comment => comment.id);

            if (flaggedCommentIds.length > 0) {
                reportData = await getReportsForUserContent(authorId, "COMMENT", flaggedCommentIds);
            }
        }

        data = data.map(({ _count, ...comment }) => ({
            ...comment,
            subcommentsCount: _count.subcomments, // Extract subcomments count
            reports: comment.flagged && comment.authorId === authorId ? reportData[comment.id] || [] : undefined,
        }));

        totalCount = await prisma.comment.count({ where: filters });
        

        // Calculate total count with the same filters
        
        const totalPages = Math.ceil(totalCount / limitInt);
        const currentPage = pageInt;
        const pagesLeft = totalPages - currentPage;

        // Return enriched blogs with extended pagination info
        return res.status(200).json({
            message: "Success",
            data: data,
            pagination: {
                total: totalCount,
                firstPage: 1,
                currentPage: currentPage,
                totalPages: totalPages,
                pagesLeft: pagesLeft > 0 ? pagesLeft : 0, // Ensure non-negative pagesLeft
                limit: limitInt,
            },
        });
    } 
    
    catch (error) {
        console.log(error);
        return res.status(422).json({ error: "Failed to get sorted comments" });
    }
}