import { NextApiRequest, NextApiResponse } from 'next';
import { Prisma } from "@prisma/client";

// used in template/[id]/template/[templateId].ts

// Request type
export interface RunRequest extends NextApiRequest {
  method: string;
  body: {
    language: string; 
    code: string;
    inputs: string;
  };
}

// Response type
export interface RunResponse extends NextApiResponse {
  json: (body: {
    message?: string;
    error?: string;
    blog?: Blog & { templates: Template[] }; // Blog with included templates
  }) => void;
}