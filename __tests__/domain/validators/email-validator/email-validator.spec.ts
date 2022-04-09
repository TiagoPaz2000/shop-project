import { describe, it } from 'mocha';
import { expect } from 'chai';

import { EmailValidator } from '../../../../src/app/domain/validators/email-validator';

const makeSut = () => {
  const sut = new EmailValidator();

  const request = {
    email: 'valid@mail.com',
  };

  return ({
    sut,
    request,
  });
};

describe('Email Validator Test Suit', () => {
  it('Email validator should return true if receive a valid email', () => {
    const { sut, request } = makeSut();

    const result = sut.valid(request.email);
    expect(result).to.be.equal(true);
  });

  it('Email validator should return false if receive a invalid email', () => {
    const { sut, request } = makeSut();

    request.email = 'invalidEmail';

    const result = sut.valid(request.email);
    expect(result).to.be.equal(false);
  });

  it('Test if Email Validator return false when dont received a string', () => {
    const { sut, request } = makeSut();

    (request.email as any) = 123;

    const result = sut.valid(request.email);
    expect(result).to.be.equal(false);
  });
});