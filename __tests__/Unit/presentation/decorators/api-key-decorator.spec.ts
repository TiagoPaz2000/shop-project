import { describe, it } from 'mocha';
import { expect} from 'chai';
import sinon from 'sinon';
import Controller from '../../../../src/app/presentation/protocols/controller'
import { HttpResponse } from '../../../../src/app/presentation/protocols/http';
import ApiKeyDecorator from '../../../../src/app/presentation/decorators/api-key-decorator';

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: any): Promise<HttpResponse> {
      return ({ statusCode: 200, body: {}})
    }
  }

  return new ControllerStub;
}

const makeSut = () => {
  const controller = makeController();
  const apiKey = 'api_key'
  const sut = new ApiKeyDecorator(controller, apiKey);

  return ({
    sut,
    controller,
    apiKey
  })
}

describe('Api Key Decorator', () => {
  it('Test if controller handle is called with correct params', async () => {
    const { sut, controller, apiKey } = makeSut();

    const controllerSpy = sinon.spy(controller, 'handle');

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
        apiKey,
      },
    };

    const { apiKey: excludeApiKey, ...bodyWithoutApiKey } = httpRequest.body;

    await sut.handle(httpRequest.body);

    expect(controllerSpy.calledWith(bodyWithoutApiKey)).true
  });

  it('Should return status 400 if api key dont match', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
        apiKey: 'invalid_api_key',
      },
    };

    const response = await sut.handle(httpRequest.body);

    expect(response.statusCode).to.be.equal(400)
    expect(response.body).to.be.eql({ error: '"apiKey" is incorrect' })
  });

  it('Should return status 200 if api key match', async () => {
    const { sut, apiKey } = makeSut();

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email',
        password: 'valid_password',
        apiKey,
      },
    };

    const response = await sut.handle(httpRequest.body);

    expect(response.statusCode).to.be.equal(200)
    expect(response.body).to.be.eql({})
  });
});
