/* eslint-disable @typescript-eslint/no-namespace */
import Controller from '../protocols/controller';
import { HttpResponse } from '../protocols/http';
import { IEmailExists, INewAccount, IUserValidator } from '../../domain/protocols';

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
    const validUser = this.userValidator.valid(httpRequest);
    if (validUser.error) {
      return ({ statusCode: validUser.status || 500, body: {} });
    }

    const emailExists = await this.emailExists.valid(httpRequest.email);
    if (emailExists.error) {
      return ({ statusCode: 400, body: {} });
    }

    const newAccount = await this.newAccount.create(httpRequest);

    return ({ statusCode: 201, body: { token: newAccount } });
  }
}