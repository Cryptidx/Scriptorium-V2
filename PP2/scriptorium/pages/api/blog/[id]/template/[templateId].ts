import prisma from "@/utils/db"
import { authMiddleware } from "@/lib/auth";
import { BlogTemplateRequest, BlogTemplateResponse } from "@/types/template";

async function handlerDelete(req:BlogTemplateRequest, res: BlogTemplateResponse) {
    // DELETE handler, restricted to users only 
    // expects id and templateId
    if (req.method !== "DELETE") {
        return res.status(405).json({ error: "must use DELETE method"} );
    }

    // authenticates user
    const author = await authMiddleware(req, res, { getFullUser: true } );
    if (!author) {
        return res.status(401).json({ error: "Unauthorized. Please log in to create code." });
    }

    // converts blogId and templateId to a String
    const blogId = parseInt(req.query.id);
    const templateId = parseInt(req.query.templateId);

    // returns error if either id is NaN
    if (isNaN(blogId) || isNaN(templateId)) {
        return res.status(400).json({ error: "Invalid blog or template ID" });
    }

    try {
        // gets template from given templateId
        const template = await prisma.template.findUnique({
            where: { id: templateId }
        });

        // returns error if template does not exist
        if (!template) {
            return res.status(404).json({ error: "Not a valid template ID" })
        }

        // gets blog from given blogId
        const blog = await prisma.blog.findUnique({
            where: { id: blogId }
        });

        // returns error if blog does not exist
        if (!blog) {
            return res.status(404).json({ error: "Not a valid blog ID" })
        }

        // returns error if user is not an admin or if not the author of the blog
        if (author.role !== "SYS_ADMIN" && author.id !== blog.authorId) {
            return res.status(403).json({error: "You do not have correct permission"});
        }

        // removes template from blog
        const updatedBlog = await prisma.blog.update({
            where: { id: blogId },
            data: {
                templates: {
                    disconnect: [{id: template.id}], // disconnect due to many-to-many relation
                }
            }, 
            include: {
                templates: true,
            },
        });

        // returns the updated blog
        return res.status(200).json({ message: "Successfully removed template", blog: updatedBlog});

    } catch (error) {

        // error when deleting template
        console.error(error);
        return res.status(422).json({ error: "could not delete template from blog" });
    }
}

async function handlerUpdate(req:BlogTemplateRequest, res:BlogTemplateResponse) {
    // PUT handler, restricted to users only 
    // expects id and templateId
    if (req.method !== "PUT") {
        return res.status(405).json({ error: "must use PUT method"} );
    }

    // authenticates user
    const author = await authMiddleware(req, res, { getFullUser: true } );
    if (!author) {
        return res.status(401).json({ error: "Unauthorized. Please log in to create code." });
    }

    // converts blogId and templateId to a String
    const blogId = parseInt(req.query.id);
    const templateId = parseInt(req.query.templateId);

    // returns error if either id is NaN
    if (isNaN(blogId) || isNaN(templateId)) {
        return res.status(400).json({ error: "Invalid blog or template ID" });
    }

    try {
        // gets template from given templateId
        const template = await prisma.template.findUnique({
        where: { id: templateId }
        });

        // returns error if template does not exist
        if (!template) {
            return res.status(404).json({ error: "Not a valid template ID" })
        }

        // gets blog from given blogId
        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            include: {
                templates: true, // Include associated templates
            },
        });

        // returns error if blog does not exist
        if (!blog) {
            return res.status(404).json({ error: "Not a valid blog ID" })
        }

        // returns error if user is not an admin or if not the author of the blog
        if (author.role !== "SYS_ADMIN" && author.id !== blog.authorId) {
            return res.status(403).json({error: "You do not have correct permission"});
        }

        // Check if the template is already associated with the blog
        const isTemplateAlreadyAssociated = blog.templates.some(
            (existingTemplate) => existingTemplate.id === templateId
        );

        if (isTemplateAlreadyAssociated) {
            return res.status(400).json({ error: "Template is already associated with this blog" });
        }

        const updatedBlog = await prisma.blog.update({
        where: { id: blogId },
            data: {
                templates: {
                    connect: {id: template.id}, // connect due to many-to-many relation
                }
            }, 
            include: {
                templates: true,
            },
        });

        // returns the updated blog
        return res.status(200).json({ message: "Successfully added template", blog: updatedBlog});

    } catch (error) {
        // error when deleting template
        console.error(error);
        return res.status(422).json({ error: "could not add template to blog" });
    }
}

export default async function handler(req: BlogTemplateRequest, res: BlogTemplateResponse) {
    switch(req.method) {
        case "DELETE":
            await handlerDelete(req, res);
            return;

        case "PUT":
            await handlerUpdate(req, res);
            return;
        
        default:
            return res.status(405).json({ error: "must use DELETE or PUT method"} );
    }
}