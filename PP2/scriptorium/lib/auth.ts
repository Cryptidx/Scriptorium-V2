import prisma from '@/lib/prisma'; 
import jwt, { JwtPayload } from "jsonwebtoken";

import {AuthRequest, AuthResponse, AuthMiddlewareResult} from "@/types/user";
import { NextApiResponse } from 'next';

// Middleware and helpers to check authentication of user 
const SECRET_KEY = process.env.JWT_SECRET_ACCESS as string;

// Authentication checker to verify JWT and attach userId to the request
/* GPT: Create a helper based on my model for authentication, taken from past exercise */
export async function authMiddleware(req:AuthRequest, res:NextApiResponse, { getFullUser = false } = {}): Promise<AuthMiddlewareResult>  {
  const authHeader = req.headers.authorization; // Check for 'Authorization' header

  if (!authHeader || !authHeader.startsWith('Bearer ')) { // Check if authorization follows the syntax
    res.status(401).json({ error: 'Unauthorized: No token provided. This action requires User login.' });
    return null;
  }

  const token = authHeader.split(' ')[1]; // Get token from 'Authorization' header

  try {
    // Verify the token to get the userId
    const decoded = jwt.verify(token, SECRET_KEY) as unknown as JwtPayload & { userId: number };
    const userId = decoded.userId;

    // If only userId is needed, attach it to req and return
    if (!getFullUser) {
      req.userId = userId;
      return { userId };
    }

    // If the full user is needed, fetch it from the database
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return null;
    }

    // Attach full user object to req and return it
    req.user = user;
    return user;

  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
    return null;
  }
}

export async function noErrorAuth(req:AuthRequest, res:NextApiResponse, { getFullUser = false } = {}): Promise<AuthMiddlewareResult>  {
  const authHeader = req.headers.authorization; // Check for 'Authorization' header

  if (!authHeader || !authHeader.startsWith('Bearer ')) { // Check if authorization follows the syntax
    return null;
  }

  const token = authHeader.split(' ')[1]; // Get token from 'Authorization' header

  try {
    // Verify the token to get the userId
    const decoded = jwt.verify(token, SECRET_KEY) as unknown as JwtPayload & { userId: number };
    const userId = decoded.userId;

    // If only userId is needed, attach it to req and return
    if (!getFullUser) {
      req.userId = userId;
      return { userId };
    }

    // If the full user is needed, fetch it from the database
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return null;
    }

    // Attach full user object to req and return it
    req.user = user;
    return user;

  } catch (error) {
    return null;
  }
}

// Generic middleware wrapper to perform custom checks
export function performChecks(
  handler: (req: AuthRequest, res: AuthResponse) => Promise<void>,
  checkFunction: (req: AuthRequest, res: AuthResponse) => Promise<boolean>
) {
  return async (req: AuthRequest, res: AuthResponse) => {
    if (await checkFunction(req, res)) {
      return handler(req, res);
    }
    return res.status(403).json({ error: 'Forbidden' });
  };
}

/*

 lightweight check for any valid token. It verifies the token 
 and attaches the userId to the request 
 if the token is valid, but it doesn’t fetch full user details.

*/
export async function isAuthenticated(req: AuthRequest, res: AuthResponse): Promise<boolean> {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    res.status(401).json({ error: 'No token provided' });
    return false;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as unknown as JwtPayload & { userId: string };
    const userId = decoded.userId; // Now safely access userId
    return true;
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
    return false;
  }
}
