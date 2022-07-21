/* eslint-disable @typescript-eslint/no-namespace */
import Controller from '../protocols/controller';
import { HttpResponse } from '../protocols/http';
import { IEmailExists, IError, INewAccount, IPasswordEncrypter, IUserValidator } from '../../domain/protocols';
import { handleError } from '../../domain/helpers';

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
    private passwordEncrypter: IPasswordEncrypter,
  ) {
    this.userValidator = userValidator;
  }

  async handle(httpRequest: SignUpController.Request): Promise<HttpResponse> {
    try {
      this.userValidator.valid(httpRequest);

      await this.emailExists.valid(httpRequest.email);

      const encryptedPassword = await this.passwordEncrypter.encrypt(httpRequest.password);

      const newAccount = await this.newAccount.create({ ...httpRequest, password: encryptedPassword });

      return ({ statusCode: 201, body: { token: newAccount } });
    } catch (error) {
      const newError = error as IError;
      return handleError({ error: newError.error, status: newError.status });
    }
  }
}