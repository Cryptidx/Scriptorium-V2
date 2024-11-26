import { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";

import {AuthRequest} from "@/types/user";

export interface ReportRequest extends NextApiRequest, AuthRequest {
  query?: {
    page?: string; // For pagination (GET)
    pageSize?: string; // For pagination (GET)
    contentType?: "BLOG" | "COMMENT" | "BOTH"; // For filtering reports (GET)
  };
  body?: {
    contentId?: number; // ID of the blog or comment being reported (POST)
    contentType?: "BLOG" | "COMMENT"; // Type of content being reported (POST)
    explanation?: string; // Explanation for the report (POST)
  };
}


export interface ReportResponse extends NextApiResponse {
  json: (body: {
    message?: string; // Success message
    error?: string; // Error message
    data?: any; // For GET: Paginated report data
    report?: Prisma.Report; // For POST: Newly created report
    pagination?: {
      total: number; // Total items
      page: number; // Current page
      limit: number; // Items per page
      totalPages: number; // Total pages
    }; // For GET: Pagination metadata
  }) => void;
}