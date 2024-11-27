import { AuthRequest, AuthResponse } from "@/types/user";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_ACCESS as string;

export default async function isAuthenticated(
  req: AuthRequest,
  res: AuthResponse
): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
    return;
  }

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as JwtPayload & { userId: string };
    const userId = decoded.userId; // Access userId safely

    // Respond with authentication success
    res.status(200).json({ success: true, userId });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
}
