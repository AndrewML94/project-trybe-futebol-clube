import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { mapError } from '../utils/errorMap';
import ValidateInputs from '../validations/ValidateInputs';
import { decodeToken } from '../utils/auth';

export default class LoginController {
  public static async verifyLogin(req: Request, res: Response) {
    const { email, password } = req.body;
    const errorName = ValidateInputs.validateEmail(email);
    const errorPassword = ValidateInputs.validatePassword(password);

    if (errorName.type) {
      return res.status(mapError(errorName.type)).json({ message: errorName.message });
    }
    if (errorPassword.type) {
      return res.status(mapError(errorPassword.type)).json({ message: errorPassword.message });
    }

    const { type, message } = await LoginService.verifyLogin(email, password);

    if (type) return res.status(mapError(type)).json({ message });

    res.status(200).json({ token: message });
  }

  public static async getRole(req: Request, res: Response) {
    const { authorization } = req.headers;

    const { role } = decodeToken(authorization);

    res.status(200).json({ role });
  }
}
