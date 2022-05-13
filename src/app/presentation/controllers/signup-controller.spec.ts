import { describe, it } from 'mocha';
import { expect} from 'chai';
import sinon from 'sinon';
import Controller from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { IError, IUserValidator } from '../../domain/usecases/user/protocols';
import User from '../../domain/entities/user/user';

class SignUpController implements Controller {
  constructor(private userValidator: any) {
    this.userValidator = userValidator;
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const validUser = this.userValidator.valid(httpRequest);
    if (validUser.error) {
      return ({ statusCode: validUser.status, body: {} });
    }
    return ({ statusCode: 200, body: {} });
  }
}

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

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).to.equal(200);
  });

  it('Should return status 400 if receive invalid user first name', async () => {
    const { sut, userValidator } = makeSut();

    sinon.stub(userValidator, 'valid').returns({ error: '"firstName" must be a string', status: 400 });

    const httpRequest = {
      body: {
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).to.equal(400);
  });
});