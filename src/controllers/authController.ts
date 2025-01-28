import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';


export const login = (req: Request, res: Response) => {
  // Type guard to ensure req.body is defined and has the expected structure
  const JWT_SECRET = process.env.JWT_SECRET;
  if (!req.body || typeof req.body.username !== 'string' || typeof req.body.password !== 'string') {
    return res.status(400).json({ error: 'Invalid request body' });
  }

  const { username, password } = req.body;

  if (username === 'imf' && password === 'password') {
    const token = jwt.sign({ username }, JWT_SECRET as string, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};