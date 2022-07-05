import User from '../../entities/user/user';
import { IEmailValidator } from '../../validators/email-validator';
import { IUserValidator } from '../../protocols';
import { badRequest } from '../../../presentation/helpers';

export default class UserValidator implements IUserValidator {
  constructor(private validEmail: IEmailValidator) {
    this.validEmail = validEmail;
  }

  valid({ firstName, lastName, email, password }: Omit<User, 'id'>): void {
    const status = 400;
    if (typeof firstName !== 'string') throw badRequest({ error: new Error('"firstName" must be a string'), status });
    if (firstName.length <= 3) throw badRequest({ error: new Error('"firstName" need to have more than 3 length'), status });
    if (typeof lastName !== 'string') throw badRequest ({ error: new Error('"lastName" must be a string'), status });
    if (lastName.length <= 3) throw badRequest ({ error: new Error('"lastName" need to have more than 3 length'), status });
    if (!this.validEmail.valid(email)) throw badRequest({ error: new Error('"email" has a incorrect format'), status });
    if (typeof password !== 'string') throw badRequest({ error: new Error('"password" must be a string'), status });
    if (password.length < 6) throw badRequest({ error: new Error('"password" need to have more than 6 length'), status });
  }
}