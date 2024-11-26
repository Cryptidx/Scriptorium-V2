import { NextApiRequest, NextApiResponse } from "next";
import { Blog, Comment } from "@prisma/client";
import { AuthRequest } from "./user";

export interface BlogSortingRequest extends NextApiRequest {
    query: {
      page?: string; // Optional page number
      limit?: string; // Optional limit per page
      id?: string; // Optional blog ID for specific filtering
    };
  }
  
  export interface BlogSortingResponse extends NextApiResponse {
    json: (data: {
      message: string;
      data: Blog[];
      pagination: {
        total: number;
        firstPage: number;
        currentPage: number;
        totalPages: number;
        pagesLeft: number;
        limit: number;
      };
    }) => void;
  }

  export interface SortingCommentsRequest extends NextApiRequest {
    query: {
      page?: string; // Optional page number
      limit?: string; // Optional limit per page
      id?: string; // Blog ID for filtering comments
    };
  }
  
  export interface SortingCommentsResponse extends NextApiResponse {
    json: (body: {
      message: string;
      data: Comment[]; // List of comments
      pagination: {
        total: number;
        firstPage: number;
        currentPage: number;
        totalPages: number;
        pagesLeft: number;
        limit: number;
      };
    }) => void;
  }