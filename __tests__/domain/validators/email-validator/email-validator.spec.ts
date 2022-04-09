export interface IEmailValidator {
  valid: (email: string) => boolean;
}

class EmailValidator implements IEmailValidator {
  valid(email: string) {
    return true;
  }
}

import { describe, it } from 'mocha';
import { expect } from 'chai';

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
});