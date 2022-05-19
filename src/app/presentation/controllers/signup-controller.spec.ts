/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import { describe, it } from 'mocha';
import { expect} from 'chai';
import sinon from 'sinon';
import { IEmailExists, IError, IUserValidator } from '../../domain/protocols';
import User from '../../domain/entities/user/user';
import { SignUpController } from './signup-controller';

const makeUserValidator = (): IUserValidator => {
  class UserValidatorStub implements IUserValidator {
    valid({ firstName, lastName, email, password }: Omit<User, 'id'>): IError {
      return ({ error: undefined });
    }
  }

  return new UserValidatorStub();
};

const makeEmailExists = (): IEmailExists => {
  class EmailExistsStub implements IEmailExists {
    async valid(email: User['email']): Promise<IError> {
      return ({ error: undefined });
    }
  }

  return new EmailExistsStub();
};

const makeSut = () => {
  const userValidator = makeUserValidator();
  const emailExists = makeEmailExists();
  const sut = new SignUpController(userValidator, emailExists);

  return ({
    sut,
    userValidator,
    emailExists,
  });
};

describe('SignUpController', () => {
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

  it('Should return status 400 if receive an email used', async () => {
    const { sut, emailExists } = makeSut();

    sinon.stub(emailExists, 'valid').resolves({ error: '"email" already used', status: 400 });

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'used_email',
        password: 'valid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest.body);

    expect(httpResponse.statusCode).to.equal(400);
  });

  it('Should return a token when new account is created', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest.body);

    expect(httpResponse.body).to.deep.equal({ token: 'valid_token'});
  });

  it('Should return a status 201 new account is created', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest.body);

    expect(httpResponse.statusCode).to.equal(201);
  });

});