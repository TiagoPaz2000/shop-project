import bcrypt from 'bcrypt';
import User from '../../domain/entities/user/user';
import { IPasswordEncrypter } from '../../domain/protocols';
import 'dotenv/config';

export default class EncrypterAdapter implements IPasswordEncrypter {
  async encrypt(password: User['password']): Promise<User['password']> {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);
    // const encryptedPassword = password + 'encrypted';

    return encryptedPassword;
  }
}