import { NextFunction, Request, Response } from 'express';
import { validateToken } from '../utils/auth';
import { UnauthorizedError } from '../errors';

export default class TokenMiddleware {
  public static validateToken(req: Request, _res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) throw new UnauthorizedError('Token not found');

    try {
      validateToken(authorization);
      next();
    } catch (error) {
      throw new UnauthorizedError('Token must be a valid token');
    }
  }
}
