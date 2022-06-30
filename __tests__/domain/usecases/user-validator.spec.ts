import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';

import UserValidator from '../../../src/app/domain/usecases/user/user-validator';
import { IEmailValidator } from '../../../src/app/domain/validators/email-validator';

const makeSut = () => {
  class EmailValidatorSpy implements IEmailValidator {
    email: any;

    valid(email: string) {
      this.email = email;

      return true;
    }
  }

  const data = {
    firstName: 'validFirstName',
    lastName: 'validLastName',
    email: 'valid@mail.com',
    password: 'validPassword',
  };

  const EmailValidator = new EmailValidatorSpy();
  const sut = new UserValidator(EmailValidator);


  return ({
    EmailValidator,
    sut,
    data,
  });
};

describe('Validate User Test Suite', () => {
  it('test if a null error is returned when receive a valid data', () => {
    const { sut, data } = makeSut();

    const result = sut.valid(data);
    expect(result).to.be.deep.equal({ error: undefined });
  });

  it('test if email validator is called with correct values', () => {
    const { EmailValidator, sut, data } = makeSut();

    sut.valid(data);
    expect(EmailValidator.email).to.be.equal('valid@mail.com');
  });

  it('test if email throw a error when dont received a valid email', () => {
    const { sut, data, EmailValidator } = makeSut();
    data.email = 'invalidEmail@mail.com';

    sinon.stub(EmailValidator, 'valid').returns(false);

    const result = sut.valid(data);

    expect(result).to.be.deep.equal({ status: 400, error: '"email" has a incorrect format' });
  });

  it('test if first name is more than 3 length', () => {
    const { sut, data } = makeSut();

    data.firstName = '123';

    try {
      sut.valid(data);
    } catch (error: any) {
      expect(error.error.message)
        .to.be.equal('"firstName" need to have more than 3 length');
      expect(error.status)
        .to.be.equal(400);
    }

  });

  it('test if first name throw a error when dont received a string', () => {
    const { sut, data } = makeSut();

    (data.firstName as any) = 123;

    try {
      sut.valid(data);
      
    } catch (error: any) {
      expect(error.error.message)
        .to.be.equal('"firstName" need to have more than 3 length');
      expect(error.status)
        .to.be.equal(400);
    }
  });

  it('test if last name is more than 3 length', () => {
    const { sut, data } = makeSut();

    data.lastName= '123';

    const result = sut.valid(data);

    expect(result).to.be.deep.equal({ status: 400, error: '"lastName" need to have more than 3 length' });
  });

  it('test if last name throw a error when dont received a string', () => {
    const { sut, data } = makeSut();

    (data.lastName as any) = 123;

    const result = sut.valid(data);

    expect(result).to.be.deep.equal({ status: 400, error: '"lastName" must be a string' });
  });

  it('test if password is more than 6 length', () => {
    const { sut, data } = makeSut();

    data.password = '12345';

    const result = sut.valid(data);

    expect(result).to.be.deep.equal({ status: 400, error: '"password" need to have more than 6 length' });
  });

  it('test if password throw a error when dont received a string', () => {
    const { sut, data } = makeSut();

    (data.password as any) = 12345;

    const result = sut.valid(data);

    expect(result).to.be.deep.equal({ status: 400, error: '"password" must be a string' });
  });
});


