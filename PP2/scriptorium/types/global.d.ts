import { PrismaClient } from '@prisma/client';

declare global {
  // Define the Report type based on your Prisma schema
  interface Report_helper {
    contentId: number;
    explanation: string;
  }

  type QueryMode = 'default' | 'insensitive';

  var prisma: PrismaClient | undefined;
  
  class CustomError extends Error {
    code?: string; // Optional, as not all errors have a `code`

    constructor(message: string, public statusCode: number) {
      super(message);
      this.name = "CustomError";
    }
  }

  interface Tag {
    id: number;
    name: string;
    blogs: Blog[]; // Related blogs
    templates: Template[]; // Related templates
  }

  interface Template {
    id: number;
    ownerId: number; // Foreign key to User
    owner: User; // The User who owns this template
  
    forkedFromId?: number | null; // Nullable foreign key to another Template
    forkedFrom?: Template | null; // Parent template if forked
    forkedCopies: Template[]; // Templates forked from this template
  
    wasForked: boolean; // Indicates if this template was ever forked
  
    code: string; // File path to the code
    language: string;
    title: string;
    explanation: string;
    tags: Tag[]; // Tags associated with this template
  
    blogs: Blog[]; // Blogs associated with this template
  
    createdAt: Date;
    updatedAt: Date;
  }

  interface Blog {
  id: number;
  title: string;
  description: string;
  tags: Tag[]; // Tags associated with the blog
  templates: Template[]; // Templates related to the blog

  flagged: boolean; // Whether the blog is flagged
  authorId: number; // Foreign key to the User
  author: User; // Author of the blog

  createdAt: Date;
  comments: Comment[]; // Comments on the blog
  upvotes: number;
  downvotes: number;
  reports: string[];
  }
  
  interface Comment {
    id: number;
    blogId: number; // Foreign key to Blog
    blog: Blog; // The Blog this comment belongs to

    flagged: boolean; // Whether the comment is flagged
    description: string;

    authorId: number; // Foreign key to User
    author: User; // Author of the comment

    createdAt: Date;
    parentId?: number | null; // Nullable parent comment ID for nested comments
    level: number; // Nesting level of the comment
    parent?: Comment | null; // Parent comment, if exists
    subcomments: Comment[]; // Nested comments

    upvotes: number;
    downvotes: number;
  }

  interface Report {
    id: number;
    contentId: number; // ID of the reported content (Blog or Comment)
    contentType: "BLOG" | "COMMENT"; // Type of content
    explanation: string; // Explanation provided by the user

    authorId: number; // Foreign key to User
    author: User; // Reporting user

    createdAt: Date;
  }

  type ReportMap = Record<number, Report[]>; // Replace `any` with the type of individual reports if available

  
}
