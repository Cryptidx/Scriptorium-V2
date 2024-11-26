import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { AuthRequest } from "@/types/user";

// used in blog/index.ts
export interface BlogRequest extends NextApiRequest, AuthRequest {
  query?: {
    title?: string;
    content?: string;
    tags?: string; // Comma-separated tags for GET
    templateIds?: string; // Comma-separated template IDs for GET
    page?: string; // Pagination
    limit?: string; // Pagination limit
  };
  body?: {
    title?: string; // Required for POST
    description?: string; // Required for POST
    tags?: string[]; // Array of tag names for POST
  };
}

export interface BlogResponse extends NextApiResponse {
    json: (body: {
      message?: string; // Success message
      error?: string; // Error message
      blog?: Prisma.BlogGetPayload<{ include: { tags: true; templates: true } }>; // For POST
      data?: any[]; // Array of enriched blogs for GET
      pagination?: {
        total: number; // Total count of blogs
        firstPage: number; // Always 1
        currentPage: number; // Current page number
        totalPages: number; // Total number of pages
        pagesLeft: number; // Pages left
        limit: number; // Number of items per page
      }; // For GET
    }) => void;
  }


// used in blog/[id].ts
export interface UpdateBlogData {
    title?: string; // Optional title
    description?: string; // Optional description
    tags?: { set: { id: number }[] }; // Optional tags
    upvotes?: number; // Optional upvotes
    downvotes?: number; // Optional downvotes
    flagged?: boolean; // Optional flagged status
  }

export interface BlogRequestID extends NextApiRequest, AuthRequest {
    query: {
      id?: string; // Blog ID (from URL query)
    };
    body?: {
      title?: string; // For update
      description?: string; // For update
      tags?: string[]; // Array of tag names for update
      upvotes?: number; // Upvote count
      downvotes?: number; // Downvote count
      flagged?: boolean; // Flagged status
    };
  }

  export interface BlogResponseID extends NextApiResponse {
    json: (body: {
      message?: string; // Success or error message
      error?: string; // Error message, if any
      blog?: {
        id: number;
        title: string;
        description: string;
        flagged: boolean;
        upvotes: number;
        downvotes: number;
        tags?: { name: string }[]; // Array of tag names
        templates?: { id: number; title: string }[]; // Array of templates with IDs and titles
        author?: { firstName: string; lastName: string }; // Author details
        reports?: any[]; // Reports, if applicable (for flagged blogs)
      };
    }) => void;
  }