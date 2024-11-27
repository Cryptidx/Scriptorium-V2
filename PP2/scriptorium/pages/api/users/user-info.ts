import {authMiddleware} from '@/lib/auth';
import { UserInfoResponse, AuthRequest } from '@/types/user';

export default async function handler(req: AuthRequest, res: UserInfoResponse) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const user = await authMiddleware(req, res, {getFullUser: true});
        if (!user) return; // Authentication failed, response already sent

        res.status(200).json({
            message: 'User info fetched successfully',
            user: {
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              role: user.role,
              createdAt: user.createdAt,
              avatar: user.avatar,
            },
          });
    } catch (error: unknown) {
        const currError = error;
        return res.status(422).json({ error: "Failed to find current user", currError });
    }
}
