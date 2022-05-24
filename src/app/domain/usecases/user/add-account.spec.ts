/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import { describe, it } from 'mocha';
import { expect} from 'chai';
import sinon from 'sinon';
import User from '../../entities/user/user';
import { INewAccount } from '../../protocols';
import AddAccount from './add-account';

// const makeAddAccount = (): INewAccount => {
//   class AddAccountStub implements INewAccount {
//     async create(data: Omit<User, 'id'>): Promise<string> {
//       return new Promise(resolve => resolve('valid_token'));
//     }
//   }

//   return new AddAccountStub();
// };

interface IToken {
  token: string
}

interface ITokenGenerator {
  create(userId: User['id']): IToken
}

const makeTokenGenerator = (): ITokenGenerator => {
  class TokenGeneratorStub implements ITokenGenerator {
    create(userId: User['id']): IToken {
      return ({ token: 'valid_token' });
    }
  }

  return new TokenGeneratorStub();
};

interface IUserRepository {
  create(data: Omit<User, 'id'>): Promise<User>
}

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