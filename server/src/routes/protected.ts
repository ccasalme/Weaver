
import express, { Router, Request, Response, NextFunction } from 'express';
import { authenticateJWT } from '../middleware/authMiddleware';

const router: Router = express.Router();

router.get('/secret', authenticateJWT, (req: Request, res: Response, next: NextFunction): void => {
  try {
    res.json({ message: `Welcome, ${(req as any).user.id}!` });
  } catch (error) {
    next(error); // ✅ Forward errors to Express error handler
  }
});

export default router; // ✅ Make sure this is exporting a `Router`


// 🎯 Breakdown of the Code
// ✅ What It Does
// Creates an Express router.
// Uses authenticateJWT middleware to protect /api/secret.
// Returns a success message if the JWT is valid.
