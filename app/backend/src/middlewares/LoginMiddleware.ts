import { NextFunction, Request, Response } from 'express';
import { validEmail, validPassword } from '../validations/schema';
import { BadRequestError, UnauthorizedError } from '../errors';

export default class LoginMiddleware {
  public static validateLogin(req: Request, _res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const errorEmail = validEmail.validate(email);
    const errorPassword = validPassword.validate(password);

    if (!email || !password) throw new BadRequestError('All fields must be filled');
    if (errorEmail.error || errorPassword.error) {
      throw new UnauthorizedError('Invalid email or password');
    }

    next();
  }
}
