import { NextApiRequest, NextApiResponse } from 'next';

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
  "id" | "firstName" | "lastName" | "email" | "password" | "phoneNumber" | "role"
>;

// For Auth (full user details)
export type AuthUser = Required<User>; // All fields are required for authentication


// Request type for Auth
export interface AuthRequest extends NextApiRequest {
  userId?: string; // Attached by middleware when token is valid
  user?: User;     // Optional, only attached when `getFullUser` is true
}

// Response type for Auth
export interface AuthResponse extends NextApiResponse {
  json: (body: {
    error?: string; // Error messages for failed authentication
    userId?: string; // userId attached when token is valid
    user?: User; // Full user object returned when `getFullUser` is true
  }) => void;
}


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
      id: string;
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
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      role: string;
    };
  }) => void;
}

