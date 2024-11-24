import {authMiddleware} from '../../../lib/auth';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', ['GET']);
        return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    }

    try {
        const user = await authMiddleware(req, res, {getFullUser: true});
        if (!user) return; // Authentication failed, response already sent

        res.status(201).json({
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
    } catch (error) {
        return res.status(422).json({ error: "Failed to find current user", error });
    }
}
