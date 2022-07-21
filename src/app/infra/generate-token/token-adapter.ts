import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../../domain/entities/user/user';
import { ITokenAdapter } from '../../domain/protocols';
import 'dotenv/config';

export default class TokenAdapter implements ITokenAdapter {
  generate(userId: User['id'],
    expireDate: string,
  ): string {
    const options: SignOptions = {
      algorithm: 'HS256',
      expiresIn: expireDate,
    };
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'jwt_secret', options);

    return token;
  }
}