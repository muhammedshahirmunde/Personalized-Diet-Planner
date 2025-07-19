import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { env } from '../config/envConfig';

export interface AuthenticatedRequest extends Request {
  userId?: string;
}





const JWT_SECRET = env.JWT_ACCESS

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token; // 👈 Read token from cookie

  if (!token) {
     res.status(401).json({ message: 'Not authorized, no token' });
     return
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    (req as any).userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid or expired' });
    return
  }
};
