import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { IPasswordEncrypter } from '../../../../src/app/domain/protocols';
import User from '../../../../src/app/domain/entities/user/user';
import PasswordEncrypter from '../../../../src/app/domain/usecases/user/password-encrypter';

const makePasswordEncrypter = (): IPasswordEncrypter => {
  class PasswordEncrypterStub implements IPasswordEncrypter {
    async encrypt(password: User['password']): Promise<User['password']> {
      return 'encrypted_password';
    }
  }

  return new PasswordEncrypterStub();
};

const makeSut = () => {
  const passwordEncrypter = makePasswordEncrypter();
  const sut = new PasswordEncrypter(passwordEncrypter)

  return ({
    sut,
    passwordEncrypter,
  });
};

describe('Password Encrypter', () => {
  it('Should return a encrypted password', async () => {
    const { sut } = makeSut();

    const password: User['password'] = 'valid_password';

    const encryptedPassword = await sut.encrypt(password);

    expect(encryptedPassword).to.be.equal('encrypted_password');
  });

  it('Test if encrypter is called with correct arg', async () => {
    const { sut, passwordEncrypter } = makeSut();

    const passwordEncrypterSpy = sinon.spy(passwordEncrypter, 'encrypt');

    const password: User['password'] = 'valid_password';

    await sut.encrypt(password);

    expect(passwordEncrypterSpy.calledWith(password)).true;
  });
});