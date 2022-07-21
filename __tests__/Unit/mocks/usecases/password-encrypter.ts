import User from "../../../../src/app/domain/entities/user/user";
import { IPasswordEncrypter } from "../../../../src/app/domain/protocols";

const makePasswordEncrypter = (): IPasswordEncrypter => {
  class PasswordEncrypterStub implements IPasswordEncrypter {
    async encrypt(password: User['password']): Promise<User['password']> {
      return 'encrypted_password'
    }
  }

  return new PasswordEncrypterStub();
};

export default makePasswordEncrypter;