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

  const request = {
    firstName: 'validFirstName',
    lastName: 'validLastName',
    email: 'valid@mail.com',
    password: 'validPassword',
  };

  const EmailValidator = new EmailValidatorSpy();
  const sut = new CreateUser(EmailValidator);


  return ({
    EmailValidator,
    sut,
    request,
  });
};

describe('Create User Test Suite', () => {
  it('test if a new "User" is returned', () => {
    const { sut, request } = makeSut();

    const result = sut.create(request);
    expect(result).to.be.deep.equal({ user: request, error: null });
  });

  it('test if email validator is called with correct values', () => {
    const { EmailValidator, sut, request } = makeSut();

    sut.create(request);
    expect(EmailValidator.email).to.be.deep.equal('valid@mail.com');
  });

  it('test if email throw a error when dont received a valid email', () => {
    const { sut, request } = makeSut();
    request.email = 'invalidEmail';

    const result = sut.create(request);

    expect(result).to.be.deep.equal({ error: '"email" has a incorrect format' });
  });

  it('test if first name is more than 3 length', () => {
    const { sut, request } = makeSut();

    request.firstName = '123';

    const result = sut.create(request);

    expect(result).to.be.deep.equal({ error: '"firstName" need to have more than 3 length' });
  });

  it('test if first name throw a error when dont received a string', () => {
    const { sut, request } = makeSut();

    (request.firstName as any) = 123;

    const result = sut.create(request);

    expect(result).to.be.deep.equal({ error: '"firstName" must be a string' });
  });

  it('test if last name is more than 3 length', () => {
    const { sut, request } = makeSut();

    request.lastName= '123';

    const result = sut.create(request);

    expect(result).to.be.deep.equal({ error: '"lastName" need to have more than 3 length' });
  });

  it('test if last name throw a error when dont received a string', () => {
    const { sut, request } = makeSut();

    (request.lastName as any) = 123;

    const result = sut.create(request);

    expect(result).to.be.deep.equal({ error: '"lastName" must be a string' });
  });

  it('test if password is more than 6 length', () => {
    const { sut, request } = makeSut();

    request.password = '12345';

    const result = sut.create(request);

    expect(result).to.be.deep.equal({ error: '"password" need to have more than 6 length' });
  });

  it('test if password throw a error when dont received a string', () => {
    const { sut, request } = makeSut();

    (request.password as any) = 12345;

    const result = sut.create(request);

    expect(result).to.be.deep.equal({ error: '"password" must be a string' });
  });
});


