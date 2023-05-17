import { validEmail, validPassword } from './schema';

export default class ValidateInputs {
  public static validateEmail(email:string | null) {
    const { error } = validEmail.validate(email);

    if (error) return { type: 'unauthorized', message: 'Invalid email or password' };

    return { type: null, message: '' };
  }

  public static validatePassword(password: string | null) {
    const { error } = validPassword.validate(password);

    if (error) return { type: 'unauthorized', message: 'Invalid email or password' };

    return { type: null, message: '' };
  }
}
