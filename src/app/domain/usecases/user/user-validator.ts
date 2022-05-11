import User from '../../entities/user/user';
import { IEmailValidator } from '../../validators/email-validator';

export default class UserValidator {
  constructor(private validEmail: IEmailValidator) {
    this.validEmail = validEmail;
  }

  create({ firstName, lastName, email, password }: Omit<User, 'id'>) {
    if (typeof firstName !== 'string') return ({ error: '"firstName" must be a string' });
    if (firstName.length <= 3) return ({ error: '"firstName" need to have more than 3 length' });
    if (typeof lastName !== 'string') return ({ error: '"lastName" must be a string' });
    if (lastName.length <= 3) return ({ error: '"lastName" need to have more than 3 length' });
    if (!this.validEmail.valid(email)) return ({ error: '"email" has a incorrect format' });
    if (typeof password !== 'string') return ({ error: '"password" must be a string' });
    if (password.length < 6) return ({ error: '"password" need to have more than 6 length' });

    return ({ error: null });
  }
}
