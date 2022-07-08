import { describe, it } from 'mocha';
import { expect} from 'chai';
import sinon from 'sinon';
import { IEmailExists, IError, IUserValidator } from '../../../../src/app/domain/protocols';
import User from '../../../../src/app/domain/entities/user/user';
import { SignUpController } from '../../../../src/app/presentation/controllers/signup-controller';
import { badRequest } from '../../../../src/app/presentation/helpers'

const makeUserValidator = (): IUserValidator => {
  class UserValidatorStub implements IUserValidator {
    valid({ firstName, lastName, email, password }: Omit<User, 'id'>): void {
      return undefined;
    }
  }

  return new UserValidatorStub();
};

const makeEmailExists = (): IEmailExists => {
  class EmailExistsStub implements IEmailExists {
    async valid(email: User['email']): Promise<void> {
      return undefined;
    }
  }

  return new EmailExistsStub();
};

const makeNewAccount = (): any => {
  class NewAccountStub {
    async create(userData: Omit<User, 'id'>): Promise<string> {
      return 'valid_token';
    }
  }

  return new NewAccountStub();
};

const makeSut = () => {
  const userValidator = makeUserValidator();
  const emailExists = makeEmailExists();
  const newAccount = makeNewAccount();
  const sut = new SignUpController(userValidator, emailExists, newAccount);

  return ({
    sut,
    userValidator,
    emailExists,
    newAccount,
  });
};

describe('SignUpController', () => {
  it('Should return status 400 if receive invalid user first name', async () => {
    const { sut, userValidator } = makeSut();

    sinon.stub(userValidator, 'valid').throws(badRequest({ error: new Error('"firstName" must be a string'), status: 400 }));

    const httpRequest = {
      body: {
        firstName: 'invalid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest.body);
    expect(httpResponse.statusCode).to.be.equal(400);
    expect(httpResponse.body).to.be.eql({ error: '"firstName" must be a string' })
  });

  it('Should return status 500 if some dependency throw an exception', async () => {
    const { sut, userValidator } = makeSut();

    sinon.stub(userValidator, 'valid').throws();

    const httpRequest = {
      body: {
        firstName: 'invalid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest.body);
    expect(httpResponse.statusCode).to.be.equal(500);
    expect(httpResponse.body).to.be.eql({ error: 'internal server error' })
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

    expect(userValidatorSpy.calledWith(httpRequest.body)).true;
  });

  it('Should return status 400 if receive an email used', async () => {
    const { sut, emailExists } = makeSut();

    sinon.stub(emailExists, 'valid').throws(badRequest({ error: new Error('"email" already used'), status: 400 }));

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
    expect(httpResponse.body).to.be.eql({ error: '"email" already used' })
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

    expect(httpResponse.body).to.deep.equal({ token: 'valid_token' });
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

  it('Should new account method is called with correct params', async () => {
    const { sut, newAccount } = makeSut();

    const newAccountSpy = sinon.spy(newAccount, 'create');

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      },
    };

    await sut.handle(httpRequest.body);

    expect(newAccountSpy.calledWith(httpRequest.body)).to.be.true;
  });
});