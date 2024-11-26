import prisma from '@/lib/prisma'; // Adjust path as necessary
import {isValidPassword, isValidEmail, isValidPhoneNumber} from '@/lib/validate';    
import hashPassword from '@/lib/helpers/account';

import {SignupRequest, SignupResponse} from "@/types/user";

export default async function handler(req: SignupRequest, res: SignupResponse): Promise<void> {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }
  
    const { firstName, lastName, password, confirmPassword, email, phoneNumber } = req.body;
    const role = 'user';
  
    if (!firstName || !lastName || !password || !email || !phoneNumber || ! confirmPassword) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Validate email
    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }
  
    // Validate password strength
    if (!isValidPassword(password)) {
      return res.status(400).json({
        error: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',
      });
    }

    // Validate confirm password
    if(password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match.' });
    }
  
    // Validate phone number
    if (!isValidPhoneNumber(phoneNumber)) {
      return res.status(400).json({
        error: 'Phone number must contain only numbers and be 10 to 15 digits long.',
      });
    }
  
    // Check if email already in use with existing user
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already in use.' });
      }

      const saltRounds = Math.floor(Math.random() * (16 - 10 + 1)) + 10;
      // do not need to store the salt rounds in the database because bcrypt already embeds the salt and the salt rounds (cost factor) into the hashed password
  
      const hashedPassword = await hashPassword(password, saltRounds); // hash password
  
      // create new user in db
      const newUser = await prisma.user.create({
        data: {
          firstName,
          lastName,
          password: hashedPassword,
          email,
          phoneNumber,
          role,
        },
      });
  
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          role: newUser.role,
          createdAt: newUser.createdAt,
          avatar: newUser.avatar,
        },
      });
    } catch (error: unknown) {
        // Show error to dev if case happens:
        console.error(error);

        if (error instanceof Error) {
            const customError = error as CustomError; // Explicit cast to CustomError
            if (customError.message.includes('validation') || customError.code === 'P2002') {
              // Use 400 for validation issues if applicable
              res.status(400).json({ error: 'Bad Request: Data validation failed or duplicate entry.' });
              return;
            } 
        }
        res.status(422).json({ error: 'Unprocessable Entity: Unable to create user.' });
        return;
    }
  }
