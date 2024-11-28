import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from "@prisma/client";
import {AuthRequest} from "@/types/user";
import {Blog, Template} from "@types/global";

export interface Template {
    id: number;
    ownerId: number;
    code: string;
    language: string;
    title: string;
    explanation: string;
    forkedFromId?: number | null;
    wasForked: boolean;
    owner: {firstName: string, lastName: string}
    createdAt: Date;
    updatedAt: Date;
    tags?: Tag[];
    blogs?: Blog[];
  }
  
  export interface Tag {
    id: number;
    name: string;
  }
  
  export interface Blog {
    id: number;
    title: string;
    description?: string;
  }
  
// used in template/index.ts

  export interface TemplateRequest extends NextApiRequest, AuthRequest {
    body?: {
      // Fields for creating a template
      forkedFromId?: number;
      code?: string; // Required for create
      language?: string; // Required for create
      title?: string; // Required for create
      explanation?: string; // Required for create
      tags?: string[]; // Array of tag names (optional for get)
  
      // Common to both create and get
      blogs?: string; // Comma-separated list of blog IDs
    };
    
    query?: {
      // Fields for querying templates
      forkedFromId?: string; // Query parameter for get
      code?: string;
      language?: string;
      title?: string;
      explanation?: string;
      tags?: string; // Comma-separated list of tag names
      blogs?: string; // Comma-separated list of blog IDs
      page?: string; // Pagination
      limit?: string; // Pagination
      onlyMine?: string; // Filter by logged-in user's templates
    };
  }


export interface TemplateResponse extends NextApiResponse{
  message: string;
  error?: string; // Optional, only for error cases
  template?: Prisma.TemplateGetPayload<{ include: { tags: true } }>; // For create response
  templates?: Prisma.TemplateGetPayload<{ include: { tags: true; blogs: true } }>[]; // For get response
  pagination?: {
    total: number;
    firstPage: number;
    currentPage: number;
    totalPages: number;
    pagesLeft: number;
    limit: number;
  }; // For get response
}

// used in template/[id].ts

// Template with included relations
export type TemplateWithRelations = Prisma.TemplateGetPayload<{
    include: {
      blogs: true;
      tags: true;
    };
  }>;
  
  // Response structure for errors or success messages
  export interface BaseResponse {
    error?: string; // Present if an error occurs
    message?: string; // Present if the operation succeeds
  }

  export interface TemplateRequestID extends NextApiRequest, AuthRequest {
    query?: {
      id?: string; // For DELETE and GET
    };
    body?: {
      code?: string; // For PUT
      language?: string; // For PUT
      title?: string; // For PUT
      explanation?: string; // For PUT
      tags?: string[]; // For PUT
    };
  }

  export interface TemplateResponseID extends NextApiResponse {
    json: (body: {
      message?: string; // Success message
      error?: string; // Error message
      template?: TemplateWithRelations; // For GET and PUT
    }) => void;
  }


// used in template/[id]/template/[templateId].ts

// Request type
export interface BlogTemplateRequest extends NextApiRequest {
  method: string;
  query: {
    id: string; // Blog ID
    templateId: string; // Template ID
  };
}

// Response type
export interface BlogTemplateResponse extends NextApiResponse {
  json: (body: {
    message?: string;
    error?: string;
    blog?: Blog & { templates: Template[] }; // Blog with included templates
  }) => void;
}