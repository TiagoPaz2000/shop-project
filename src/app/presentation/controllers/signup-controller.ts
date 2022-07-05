/* eslint-disable @typescript-eslint/no-namespace */
import Controller from '../protocols/controller';
import { HttpResponse } from '../protocols/http';
import { IEmailExists, IError, INewAccount, IUserValidator } from '../../domain/protocols';
import { handleError } from '../helpers';

namespace SignUpController {
  export type Request = {
    firstName: string
    lastName: string
    email: string
    password: string
  }
}

export class SignUpController implements Controller {
  constructor(
    private userValidator: IUserValidator,
    private emailExists: IEmailExists,
    private newAccount: INewAccount,
  ) {
    this.userValidator = userValidator;
  }

  async handle(httpRequest: SignUpController.Request): Promise<HttpResponse> {
    try {
      this.userValidator.valid(httpRequest);

      await this.emailExists.valid(httpRequest.email);

      const newAccount = await this.newAccount.create(httpRequest);

      return ({ statusCode: 201, body: { token: newAccount } });
    } catch (error) {
      const newError = error as IError;
      return handleError({ error: newError.error, status: newError.status });
    }
  }
}