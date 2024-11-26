import prisma from '@/lib/prisma'; 
import { isValidPassword, isValidEmail, isValidPhoneNumber } from '@/lib/validate';
import { authMiddleware } from '@/lib/auth'; 
import hashPassword from '@/lib/helpers/account';
import { getUserFilesWithAvatars} from '@/lib/helpers/getAvatars';

import {SignupRequest, SignupResponse, AuthResponse, AuthRequest, SignupUser} from "@/types/user";


// Main handler logic for updating user details
/* method ensures only the current user authenticated with their token
can preform the update. */
async function updateHandler(req: SignupRequest, res: SignupResponse) {
    if (req.method !== 'PUT') {
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }


    // Run authMiddleware and get userId from the requestif (!getFullUser) {
    const authRes = await authMiddleware(req as AuthRequest, res as AuthResponse);
    if (!authRes) return; // Exit if unauthorized

    const { userId } = authRes;

    const allowedAvatars = await getUserFilesWithAvatars(userId);

    const { firstName, lastName, password, confirmPassword, email, phoneNumber, avatar } = req.body;
    let updates = {} as SignupUser;


        // Helper function to check if a variable is a non-empty string
        const isNonEmptyString = (value: string) => typeof value === 'string' && value.trim().length > 0;

        // Validation checks
        if (
            (firstName !== undefined && !isNonEmptyString(firstName)) ||
            (lastName !== undefined && !isNonEmptyString(lastName)) ||
            (password !== undefined && !isNonEmptyString(password)) ||
            (confirmPassword !== undefined && !isNonEmptyString(confirmPassword)) ||
            (email !== undefined && !isNonEmptyString(email)) ||
            (phoneNumber !== undefined && !isNonEmptyString(phoneNumber)) ||
            (avatar !== undefined && !isNonEmptyString(avatar))
        ) {
            return res.status(400).json({ error: "All fields must be non-empty strings if they are provided." });
        }

    // Check if at least one field is provided
    const hasUpdateField = [
        firstName, 
        lastName, 
        password, 
        email, 
        phoneNumber, 
        avatar, // Check if an avatar is provided
    ].some(field => field !== undefined && field !== null && field !== '');

    if (!hasUpdateField) {
        return res.status(400).json({ error: 'At least one field must be provided for update.' });
    }

    // Conditionally update fields if provided in request body
    if (firstName) updates.firstName = firstName;
    if (lastName) updates.lastName = lastName;
    if (email) {
        if (!isValidEmail(email)) {
        return res.status(400).json({ error: 'Invalid email address.' });
        }
    
        // Check if the email is already used by another user
        const existingUser = await prisma.user.findFirst({
        where: {
            email: email,
            NOT: { id: userId }, // Exclude the current user by their ID
        },
        });
    
        if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use by another account.' });
        }
    
        updates.email = email; // Set the email for updating if it passes validation
    }
    if (phoneNumber) {
        if (!isValidPhoneNumber(phoneNumber)) {
        return res.status(400).json({
            error: 'Phone number must contain only numbers and be 10 to 15 digits long.',
        });
        }
        updates.phoneNumber = phoneNumber;
    }

    // Validate and hash password if provided
    if (password) {
        if (!isValidPassword(password)) {
        return res.status(400).json({
            error: 'Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, one number, and one special character.',
        });
        }
        if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match.' });
        }
        const saltRounds = Math.floor(Math.random() * (16 - 10 + 1)) + 10;
        updates.password = await hashPassword(password, saltRounds);
    }

    // Handle avatar if provided
    if (avatar) {
        if (!allowedAvatars.includes(avatar)) {
        return res.status(400).json({ error: 'Invalid avatar selection. Please choose a predefined avatar.' });
        }
        updates.avatar = avatar;
    }

    try {
        // Update user in the database
        const updatedUser = await prisma.user.update({
            where: { id: userId }, // Ensure userId is defined and available
            data: updates,
        });

        res.status(200).json({
        message: 'User updated successfully',
        user: {
            id: userId,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            avatar: updatedUser.avatar,
            updatedAt: updatedUser.updatedAt,
        },
        });
    } catch (error:unknown) {
        // show dev the actual error
        console.error('Error updating user:', error);

        if (error instanceof Error) {
            if (error.message.includes('validation')) {
                res.status(400).json({ error: 'Bad request: Data validation failed.' });
            } else if (error.message.includes('unique constraint')) {
                res.status(409).json({ error: 'Conflict: Duplicate data detected.' });
            } else {
                res.status(422).json({ error: 'Unprocessable Entity: Unable to process your request.' });
            }
        } else {
            res.status(422).json({ error: 'Unprocessable Entity: Unable to process your request.' });
        }
    }
}

export default updateHandler;
