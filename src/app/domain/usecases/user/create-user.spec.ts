import { describe, it } from 'mocha';
import { expect } from 'chai';

import CreateUser from './create-user';
import { IEmailValidator } from '../../validators/emailValidator';

const makeSut = () => {
  class EmailValidatorSpy implements IEmailValidator {
    email: any;

    valid(email: string) {
      this.email = email;
      if (email === 'invalidEmail') {
        return false;
      }

      return true;
    }
  }

  return ({
    EmailValidator: new EmailValidatorSpy(),
  });
};

describe('Create User Test Suite', () => {
  it('test if a new "User" is returned', () => {
    const { EmailValidator } = makeSut();
    const request = {
      firstName: 'validFirstName',
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result = new CreateUser(EmailValidator).create(request);

    expect(result).to.be.deep.equal({ user: request, error: null });
  });

  it('test if email validator is called with correct values', () => {
    const { EmailValidator } = makeSut();
    const sut = {
      firstName: 'validFirstName',
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result = new CreateUser(EmailValidator).create(sut);
    expect(EmailValidator.email).to.be.equal('valid@mail.com');
  });

  it('test if email throw a error when dont received a valid email', () => {
    const { EmailValidator } = makeSut();
    const request = {
      firstName: 'validFirstName',
      lastName: 'validLastName',
      email: 'invalidEmail',
      password: '12345',
    };

    const result = new CreateUser(EmailValidator).create(request);

    expect(result).to.be.deep.equal({ error: '"email" has a incorrect format' });
  });

  it('test if first name is more than 3 length', () => {
    const { EmailValidator } = makeSut();
    const sut = {
      firstName: '123',
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result = new CreateUser(EmailValidator).create(sut);

    expect(result).to.be.deep.equal({ error: '"firstName" need to have more than 3 length' });
  });

  it('test if first name throw a error when dont received a string', () => {
    const { EmailValidator } = makeSut();
    const request = {
      firstName: 123,
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result2 = new CreateUser(EmailValidator).create(request as any);

    expect(result2).to.be.deep.equal({ error: '"firstName" must be a string' });
  });

  it('test if last name is more than 3 length', () => {
    const { EmailValidator } = makeSut();
    const request = {
      firstName: 'validFirstName',
      lastName: '123',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result = new CreateUser(EmailValidator).create(request);

    expect(result).to.be.deep.equal({ error: '"lastName" need to have more than 3 length' });
  });

  it('test if last name throw a error when dont received a string', () => {
    const { EmailValidator } = makeSut();
    const request = {
      firstName: 'validFirstName',
      lastName: 123,
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result2 = new CreateUser(EmailValidator).create(request as any);

    expect(result2).to.be.deep.equal({ error: '"lastName" must be a string' });
  });

  it('test if password is more than 6 length', () => {
    const { EmailValidator } = makeSut();
    const request = {
      firstName: 'validFirstName',
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: '12345',
    };

    const result = new CreateUser(EmailValidator).create(request);

    expect(result).to.be.deep.equal({ error: '"password" need to have more than 6 length' });
  });

  it('test if password throw a error when dont received a string', () => {
    const { EmailValidator } = makeSut();
    const request = {
      firstName: 'validFirstName',
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 12345,
    };

    const result2 = new CreateUser(EmailValidator).create(request as any);

    expect(result2).to.be.deep.equal({ error: '"password" must be a string' });
  });
});


