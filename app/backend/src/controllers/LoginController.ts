import { Request, Response } from 'express';
import LoginService from '../services/LoginService';
import { decodeToken } from '../utils/auth';

export default class LoginController {
  public static async verifyLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    const token = await LoginService.verifyLogin(email, password);

    res.status(200).json({ token });
  }

  public static async getRole(req: Request, res: Response) {
    const { authorization } = req.headers;

    const { role } = decodeToken(authorization);

    res.status(200).json({ role });
  }
}
