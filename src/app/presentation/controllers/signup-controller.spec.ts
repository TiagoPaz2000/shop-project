import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import Controller from '../protocols/controller';
import { HttpRequest, HttpResponse } from '../protocols/http';

class SignUpController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return ({ statusCode: 200, body: {} });
  }
}

const makeSut = () => {
  const sut = new SignUpController();

  return ({
    sut,
  });
};

// describe('SignUpController', () => {
//   it('Should return status 200 if receive valid user data', async () => {
//     const { sut } = makeSut();

//     const httpRequest = {
//       body: {},
//     };

//     const httpResponse = await sut.handle(httpRequest);

//     expect(httpResponse.statusCode).to.equal(200);
//   });
// });