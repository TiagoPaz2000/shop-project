import User from '../../entities/user/user';
import { IEmailValidator } from '../../validators/email-validator';
import { IError, IUserValidator } from '../../protocols';

export default class UserValidator implements IUserValidator {
  constructor(private validEmail: IEmailValidator) {
    this.validEmail = validEmail;
  }

  valid({ firstName, lastName, email, password }: Omit<User, 'id'>): IError {
    const status = 400;
    if (typeof firstName !== 'string') return badRequest({ error: new Error('"firstName" must be a string'), status });
    if (firstName.length <= 3) return badRequest({ error: new Error('"firstName" need to have more than 3 length'), status });
    // if (typeof lastName !== 'string') return ({ error: '"lastName" must be a string', status });
    // if (lastName.length <= 3) return ({ error: '"lastName" need to have more than 3 length', status });
    // if (!this.validEmail.valid(email)) return ({ error: '"email" has a incorrect format', status });
    // if (typeof password !== 'string') return ({ error: '"password" must be a string', status });
    // if (password.length < 6) return ({ error: '"password" need to have more than 6 length', status });

    return ({ error: undefined });
  }
}

const badRequest = ({ error, status}: IError) => ({ error, status });