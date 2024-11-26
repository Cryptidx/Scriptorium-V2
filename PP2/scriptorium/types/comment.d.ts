import { NextApiRequest, NextApiResponse } from 'next';
import { AuthRequest } from '@/user';
import { Comment } from '@/types/global'; // Ensure Comment type is globally accessible

// update comment: 
export type UpdateCommentData = {
    description?: string;
    upvotes?: number;
    downvotes?: number;
    flagged?: boolean;
  };

  
export interface UpdateCommentRequest extends NextApiRequest, AuthRequest {
  method: string;
  query: {
    commentId: string; // Comment ID passed in the query
  };
  body: {
    description?: string;
    upvotes?: number;
    downvotes?: number;
    flagged?: boolean;
  };
}

export interface UpdateCommentResponse extends NextApiResponse {
    json: (body: {
      message?: string;
      error?: string;
      comment?: Comment; // Include updated comment when successful
    }) => void;
  }


// create comment 
export interface CreateCommentRequest extends NextApiRequest {
  method: string;
  query: {
    id: string; // Blog ID
    commentId?: string; // Parent Comment ID (optional for top-level comments)
  };
  body: {
    description: string; // Required description of the comment
    parentLevel?: number; // Level of the parent comment (optional)
  };
}

export interface CreateCommentResponse extends NextApiResponse {
  json: (data: {
    message: string;
    comment?: {
      id: number;
      description: string;
      level: number;
      blogId: number;
      parentId?: number | null;
      authorId: number;
      createdAt: string;
      updatedAt: string;
    };
    error?: string;
    error_msg?: string;
  }) => void;
}
