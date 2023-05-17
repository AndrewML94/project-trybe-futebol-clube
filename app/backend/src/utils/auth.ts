import jwt = require('jsonwebtoken');
import { SignOptions } from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig: SignOptions = {
  expiresIn: '100d',
  algorithm: 'HS256',
};

interface JwtInterface {
  email: string,
  role: string | undefined,
}

export const genToken = (payload: JwtInterface) => {
  const token = jwt.sign(payload, jwtSecret, jwtConfig);
  return token;
};

export const validateToken = (token: string) => {
  const verifyToken = jwt.verify(token, jwtSecret);
  return verifyToken;
};

export const decodeToken = (token: any) => {
  const decode = jwt.decode(token) as JwtInterface;
  return decode;
};
