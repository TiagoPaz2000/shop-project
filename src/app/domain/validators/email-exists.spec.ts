import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import { IUserRepository } from '../../data/usecases/user-repository';
import EmailExists from './email-exists';
import User from '../entities/user/user';

const makeUserRepository = (): IUserRepository => {
  class UserRepositoryStub implements IUserRepository {
    async create(data: Omit<User, 'id'>): Promise<User> {
      return new Promise(resolve => resolve({
        id: 1,
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      }));
    }

    async findOne(email: User['email']): Promise<null | User> {
      return null;
    }
  }

  return new UserRepositoryStub();
};

const makeSut = () => {
  const userRepositoryStub = makeUserRepository();
  const sut = new EmailExists(userRepositoryStub);

  return { sut, userRepositoryStub };
};

describe('Email Exists', () => {
  it('Should return a error if email exists', async () => {
    const { sut, userRepositoryStub } = makeSut();
    sinon.stub(userRepositoryStub, 'findOne').resolves({
      id: 1,
      firstName: 'valid_firstName',
      lastName: 'valid_lastName',
      email: 'valid_email',
      password: 'valid_password',
    });

    const emailExist = await sut.valid('valid_email');

    expect(emailExist).to.be
      .deep.equal({ status: 400, error: 'email already used' });
  });

  it('Should return undefined if email doesnt exist', async () => {
    const { sut } = makeSut();

    const emailExist = await sut.valid('valid_email');

    expect(emailExist).to.be.equal(undefined);
  });

  it('Test if findOne is called with correct arg', async () => {
    const { sut, userRepositoryStub } = makeSut();
    const userRepositorySpy = sinon.spy(userRepositoryStub, 'findOne');

    await sut.valid('valid_email');

    expect(userRepositorySpy.calledWith('valid_email')).true;
  });
});
