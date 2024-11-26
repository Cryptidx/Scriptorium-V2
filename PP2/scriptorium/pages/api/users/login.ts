import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '@/lib/prisma'; // Adjust path as necessary

// types
import {LoginRequest, LoginResponse, LoginUser as User} from "@/types/user";

const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET_ACCESS; 
const REFRESH_TOKEN_SECRET = process.env.JWT_SECRET_REFRESH; 
const EXPIRE_ACCESS = process.env.JWT_EXPIRES_IN_ACCESS;
const EXPIRE_REFRESH = process.env.JWT_EXPIRES_IN_REFRESH;

// Generate access and refresh tokens, taken from GPT
function generateTokens(user: User): { accessToken: string; refreshToken: string } {
  const accessToken = jwt.sign(
    { userId: user.id, role: user.role },
    ACCESS_TOKEN_SECRET!,
    { expiresIn: EXPIRE_ACCESS! }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    REFRESH_TOKEN_SECRET!,
    { expiresIn: EXPIRE_REFRESH! }
  );

  return { accessToken, refreshToken };
}

export default async function handler(req: LoginRequest, res: LoginResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
}

  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(404).json({ error: 'Email and password are required.' });
  }

  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Invalid email or password.' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(404).json({ error: 'Invalid email or password.' });
    }

    // Generate a JWT tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Return both tokens in the response
    res.status(200).json({
        message: 'Login successful',
        accessToken,
        refreshToken,
        user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        },
    });
    } catch (error: unknown) {
      console.error('Login error:', error);
    
      // Check if error is an instance of Error
      if (error instanceof Error) {
        const customError = error as CustomError; // Explicit cast to CustomError
    
        if (customError.message.includes('validation') || customError.code === 'P2002') {
          // Use 400 for validation issues if applicable
          return res.status(400).json({ error: 'Bad Request: Data validation failed.' });
        } 
      } else {
        // Handle unknown errors gracefully
        return res.status(422).json({ error: 'Unprocessable Entity: Unable to complete login.' });
      }
    }
}
