import { describe, it } from 'mocha';
import { expect} from 'chai';
import sinon from 'sinon';
import { LoginController } from '../../../../src/app/presentation/controllers/login-controller';
import { badRequest } from '../../../../src/app/domain/helpers'
import { makeEmailValidator } from '../../mocks/usecases';

const makeSut = () => {
  const emailValidator = makeEmailValidator();
  const sut = new LoginController(emailValidator);

  return ({
    sut,
    emailValidator,
  })
}

describe('Login Controller', () => {
  it('Should return status 200 and a token with success', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        email: 'valid_email',
        password: 'valid_password',
      }
    }

    const response = await sut.handle(httpRequest.body);

    expect(response.statusCode).to.be.equal(200);
    expect(response.body).to.be.eql({ token: '' });
  });

  it('Should return status 400 and a error message if email has incorrect format', async () => {
    const { sut, emailValidator } = makeSut();

    sinon.stub(emailValidator, 'valid').throws(badRequest({ error: new Error('"email" has a incorrect format'), status: 400 }));

    const httpRequest = {
      body: {
        email: 'invalid_email',
        password: 'valid_password',
      }
    }

    const response = await sut.handle(httpRequest.body);

    expect(response.statusCode).to.be.equal(400);
    expect(response.body).to.be.eql({ error: '"email" has a incorrect format' });
  })

  it('Should call email validator with correct params', async () => {
    const { sut, emailValidator } = makeSut();

    const emailValidatorSpy = sinon.spy(emailValidator, 'valid');

    const httpRequest = {
      body: {
        email: 'valid_email',
        password: 'valid_password',
      }
    }

    await sut.handle(httpRequest.body);

    expect(emailValidatorSpy.calledWith(httpRequest.body.email)).true;
  })
});