import express, { Router, Request, Response } from 'express';
import { generateToken } from '../utils/auth.js';

const router: Router = express.Router(); // ✅ Explicitly define Router

// ✅ Login Route
router.post('/login', (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (username === 'bestie' && password === 'slay123') {
    const token = generateToken(username);
    res.json({ token }); // ✅ Remove return (let Express handle it)
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router; // ✅ Ensure this exports a Router
