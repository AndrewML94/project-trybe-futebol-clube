import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/auth';

export default class TokenMiddleware {
  public static validateToken(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token not found' });

    try {
      validateToken(authorization);
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
