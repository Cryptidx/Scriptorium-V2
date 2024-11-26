import { NextApiRequest, NextApiResponse } from 'next';
import { File } from 'multer';

// User type definition for Prisma User model (adjust fields to match your Prisma schema)

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // hashed password
  phoneNumber?: string;
  role: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;

  blogs?: Blog[];
  comments?: Comment[];
  templates?: Template[];
  reports?: Report[];
}

// For Login (minimal fields required)
export type LoginUser = Pick<User, "id" | "email" | "password" | "role">;

// For Signup (additional fields required)
export type SignupUser = Pick<
  User,
  "id" | "firstName" | "lastName" | "email" | "password" | "phoneNumber" | "role" | "avatar"
>;

export interface AuthTokenPayload extends JwtPayload {
  userId: number;
}

// Request type for Auth
/*
export interface AuthRequest extends NextApiRequest {
  userId?: number; // Attached by middleware when token is valid
  user?: User;     // Optional, only attached when `getFullUser` is true
}*/

export interface AuthRequest<B = unknown, Q = Partial<Record<string, string | string[]>>> extends NextApiRequest {
  body?: B; // Generic type for body, defaults to `unknown`
  query?: Q; // Generic type for query, defaults to Partial<Record<string, string | string[]>>
  userId?: number; // Added by authMiddleware
  user?: User; // Full user object added if `getFullUser` is true
}

// Response type for Auth
export interface AuthResponse extends NextApiResponse {
  json: (body: {
    error?: string; // Error messages for failed authentication
    userId?: number; // userId attached when token is valid
    user?: User; // Full user object returned when `getFullUser` is true
  }) => void;
}

// Define the type returned by `authMiddleware`
export type AuthMiddlewareResult = { userId: string } | AuthUser | null;

// Request type for Signup
export interface SignupRequest extends NextApiRequest {
  body: {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    email: string;
    phoneNumber: string;
    avatar?: string;
  };
}

export interface SignupResponse extends NextApiResponse {
  json: (body: {
    message?: string;
    error?: string;
    user?: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
      role: string;
      createdAt: Date;
      avatar?: string | null; // Optional, if the user might not have an avatar initially
    };
  }) => void;
}

// Request type for login
export interface LoginRequest extends NextApiRequest {
  body: {
    email: string;
    password: string;
  };
}

// Response type for login
export interface LoginResponse extends NextApiResponse {
  json: (body: {
    message?: string;
    error?: string;
    accessToken?: string;
    refreshToken?: string;
    user?: {
      id: number;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
  }) => void;
}

// Response for getting currnet logged in user ./user-info.ts
export interface UserInfoResponse extends NextApiResponse{
  message?: string; // A success message
  error?: string; // An error message, if applicable
  user?: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    role: string;
    createdAt: Date;
    avatar?: string;
  };
}

export interface RefreshTokenRequest extends NextApiRequest {
  headers: {
    'x-refresh-token': string; // Refresh token header
  };
}

export interface RefreshTokenResponse extends NextApiResponse {
  json: (body: {
    message?: string; // Success message
    accessToken?: string; // Newly generated access token
    error?: string; // Error message for failures
  }) => void;
}

export interface FileUploadRequest extends NextApiRequest {
  file?: File; // Multer adds the `file` property for single-file uploads
  userId?: string; // Added by `authMiddleware` if the user is authenticated
}

export interface FileUploadResponse extends NextApiResponse {
  json: (body: {
    message?: string; // Success message
    error?: string; // Error message for failures
    filePath?: string; // Path to the uploaded file, on success
  }) => void;
}