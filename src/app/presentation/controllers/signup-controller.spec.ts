/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import { describe, it } from 'mocha';
import { expect} from 'chai';
import sinon from 'sinon';
import { IError, IUserValidator } from '../../domain/usecases/user/protocols';
import User from '../../domain/entities/user/user';
import { SignUpController } from './signup-controller';

class UserValidatorStub implements IUserValidator {
  valid({ firstName, lastName, email, password }: Omit<User, 'id'>): IError {
    return ({ error: undefined });
  }
}

const makeSut = () => {
  const userValidator = new UserValidatorStub;
  const sut = new SignUpController(userValidator);

  return ({
    sut,
    userValidator,
  });
};

describe('SignUpController', () => {
  it('Should return status 200 if receive valid user data', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {},
    };

    const httpResponse = await sut.handle(httpRequest as any);

    expect(httpResponse.statusCode).to.equal(200);
  });

  it('Should return status 400 if receive invalid user first name', async () => {
    const { sut, userValidator } = makeSut();

    sinon.stub(userValidator, 'valid').returns({ error: '"firstName" must be a string', status: 400 });

    const httpRequest = {
      body: {
        firstName: 'invalid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest.body);

    expect(httpResponse.statusCode).to.equal(400);
  });

  it('Should valid user method is called with correct params', async () => {
    const { sut, userValidator } = makeSut();

    const userValidatorSpy = sinon.spy(userValidator, 'valid');

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      },
    };

    await sut.handle(httpRequest.body);

    expect(userValidatorSpy.calledWith(httpRequest.body)).to.be.true;
  });
});