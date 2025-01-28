import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';



declare global {
  namespace Express {
    interface Request {
      user?: any; 
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const JWT_SECRET = process.env.JWT_SECRET;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    req.user = decoded;
    const decodedToken = jwt.decode(token);
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(400).json({ error: 'Invalid token' });
  }
};