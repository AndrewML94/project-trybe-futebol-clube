import bcrypt = require('bcryptjs');
import UserModel from '../database/models/UserModel';
import { genToken } from '../utils/auth';

export default class LoginService {
  public static async verifyLogin(email: string, password: string) {
    const emailV = await UserModel.findOne({ where: { email } });
    const role = emailV?.role;

    if (!emailV) return { type: 'unauthorized', message: 'Invalid email or password' };

    const passwordV = bcrypt.compareSync(password, emailV.password);

    if (!passwordV) return { type: 'unauthorized', message: 'Invalid email or password' };

    const newToken = genToken({ email, role });

    return { type: null, message: newToken };
  }
}
