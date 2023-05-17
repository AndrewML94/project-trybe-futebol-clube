import { NextFunction, Request, Response } from 'express';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../errors';

export default class ErrorMiddleware {
  public static handleError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof BadRequestError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ message: error.message });
    }

    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }

    console.error(error);
    res.status(500).end();
  }
}
