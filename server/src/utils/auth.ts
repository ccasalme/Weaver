import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET as string;
const EXPIRATION = process.env.JWT_EXPIRATION || '7d';

export const generateToken = (userId: string): string => {
  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is missing!");
  }

  return jwt.sign({ id: userId }, SECRET_KEY, {
    expiresIn: EXPIRATION as jwt.SignOptions['expiresIn'], // ✅ Explicitly define `expiresIn` type
  });
};
