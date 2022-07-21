import User from '../../entities/user/user';
import { IPasswordEncrypter } from '../../protocols';

export default class PasswordEncrypter implements IPasswordEncrypter {
  constructor(private encrypter: IPasswordEncrypter) {
    this.encrypter = encrypter;
  }

  async encrypt(password: User['password']): Promise<User['password']> {
    const encryptedPassword = await this.encrypter.encrypt(password);

    return encryptedPassword;
  }
}