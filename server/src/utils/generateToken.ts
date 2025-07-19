import jwt from 'jsonwebtoken';
import { env } from '../config/envConfig';

const JWT_SECRET = env.JWT_ACCESS

export const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: '1d',
  });
};
