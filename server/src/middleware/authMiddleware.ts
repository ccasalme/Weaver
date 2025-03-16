import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET as string;

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized: No token provided' });
    return; // ✅ Ensure we return here
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    (req as any).user = decoded; // ✅ Attach user data to request
    next(); // ✅ Pass execution to the next middleware
  } catch (err) {
    res.status(403).json({ error: 'Forbidden: Invalid token' });
    return; // ✅ Ensure we return here
  }
};
