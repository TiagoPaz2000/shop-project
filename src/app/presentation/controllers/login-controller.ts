/* eslint-disable @typescript-eslint/no-namespace */
import Controller from '../protocols/controller';
import { HttpResponse } from '../protocols/http';
import { IError } from '../../domain/protocols';
import { handleError } from '../../domain/helpers';
import { IEmailValidatorAdapter } from '../../domain/protocols';

namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}

export class LoginController implements Controller {
  constructor(private emailValidator: IEmailValidatorAdapter ) {
    this.emailValidator = emailValidator;
  }

  async handle(httpRequest: LoginController.Request): Promise<HttpResponse> {
    try {
      this.emailValidator.valid(httpRequest.email);

      return ({ statusCode: 200, body: { token: '' } });
    } catch (error) {
      const newError = error as IError;
      return handleError({ error: newError.error, status: newError.status });
    }
  }
}