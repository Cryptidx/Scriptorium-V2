import prisma from "@/utils/db";
import { noErrorAuth } from "@/lib/auth";
import {getReportsForUserContent} from "@/utils/comment-blog/find-report";
import { BlogSortingRequest, BlogSortingResponse } from "@/types/sorting";
/*
GET BLOGS SORTED IN DESCENDING ORDER OF UPVOTES
*/

export default async function handler(req: BlogSortingRequest, res: BlogSortingResponse) {
    // GET request 
    // not restricted 
    // get top blogs evrywhere 
     // Only allow GET requests
     if (req.method !== "GET") {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    // get list of blogs based on rating, descending, basd on upvotes
    const pageInt = parseInt(req.query.page || "1", 10);
    const limitInt = parseInt(req.query.limit || "10", 10);
    const skip = (pageInt - 1) * limitInt;

    // would be null for top level function, cos its directly under blogs
    const blogId = req.query.id ? parseInt(req.query.id, 10) : null;
    console.log(blogId);


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
        let totalCount;

        const author = await noErrorAuth(req, res, { getFullUser: true });
        const authorId = author ? author.id : null;
        console.log(authorId);

        const filters = {
            AND: [
                // Flagged content logic
                authorId
                    ? {
                            OR: [
                                { flagged: false }, // Include non-flagged blogs
                                { flagged: true, authorId: authorId }, // Include flagged blogs authored by the user
                            ],
                        }
                    : { flagged: false }, // For unauthenticated users, exclude flagged blogs
            ],
        };

        // get blogs 
        data = await prisma.blog.findMany({
            where: filters,
            orderBy: { upvotes: "desc" },
            skip: skip,
            take: limitInt,
        });

        // find current user to see if they have any reported blogs
        // so they can see the explanations, if they exist, fro being flagged
        // If the user is authenticated, find flagged blogs authored by them
        if (authorId) {
            const flaggedBlogIds = data
                .filter(blog => blog.flagged && blog.authorId === authorId)
                .map(blog => blog.id);

            if (flaggedBlogIds.length > 0) {
                reportData = await getReportsForUserContent(authorId, "BLOG", flaggedBlogIds);
            }
        }

        console.log(reportData);

        data = data.map(blog => ({
            ...blog,
            reports: blog.flagged && blog.authorId === authorId ? reportData[blog.id] || [] : undefined,
        }));

        totalCount = await prisma.blog.count({ where: filters });

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
        console.error("Error fetching sorted blogs:", error);
        return res.status(422).json({ error: "Failed to get sorted blogs or comments" });
    }
}

   