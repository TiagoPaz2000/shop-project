/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import { describe, it } from 'mocha';
import { expect, use} from 'chai';
import sinon from 'sinon';
import User from '../../entities/user/user';
import { INewAccount, IToken, ITokenGenerator, IUserRepository } from '../../protocols';
import AddAccount from './add-account';

const makeTokenGenerator = (): ITokenGenerator => {
  class TokenGeneratorStub implements ITokenGenerator {
    create(userId: User['id']): IToken {
      return ({ token: 'valid_token' });
    }
  }

  return new TokenGeneratorStub();
};

const makeUserRepository = (): IUserRepository => {
  class UserRepositoryStub implements IUserRepository {
    async create(data: Omit<User, 'id'>): Promise<User> {
      return new Promise(resolve => resolve({
        id: 'valid_token',
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      }));
    }
  }

  return new UserRepositoryStub();
};

const makeSut = () => {
  const tokenGenerator = makeTokenGenerator();
  const userRepository = makeUserRepository();
  const sut = new AddAccount(userRepository, tokenGenerator);

  return ({
    sut,
    tokenGenerator,
    userRepository,
  });
};

describe('SignUpController', () => {
  it('Should method create of user repository called with correct data', async () => {
    const { sut, userRepository } = makeSut();

    const userRepositorySpy = sinon.spy(userRepository, 'create');

    const fakeData: Omit<User, 'id'> = {
      firstName: 'valid_firstName',
      lastName: 'valid_lastName',
      email: 'valid_email',
      password: 'valid_password',
    };

    await sut.create(fakeData);

    expect(userRepositorySpy.calledWith(fakeData)).to.be.true;
  });

    it('Should method create of user repository throw an error', async () => {
    const { sut, userRepository } = makeSut();

    sinon.stub(userRepository, 'create').throws();
    const fakeData: Omit<User, 'id'> = {
      firstName: 'valid_firstName',
      lastName: 'valid_lastName',
      email: 'valid_email',
      password: 'valid_password',
    };
    try {
      await sut.create(fakeData);
    } catch (error) {
      expect(userRepository.create).to.throw();
    }
  });
});