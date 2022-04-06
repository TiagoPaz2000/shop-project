import { describe, it } from 'mocha';
import { expect } from 'chai';

import User from '../../entities/user/user';

class CreateUser {
  constructor(private validEmail: any) {
    this.validEmail = validEmail;
  }

  create({ firstName, lastName, email, password }: User) {
    if (typeof firstName !== 'string') return ({ error: '"firstName" must be a string' });
    if (firstName.length <= 3) return ({ error: '"firstName" need to have more than 3 length' });
    if (typeof lastName !== 'string') return ({ error: '"lastName" must be a string' });
    if (lastName.length <= 3) return ({ error: '"lastName" need to have more than 3 length' });
    if (!this.validEmail(email)) return ({ error: '"email" has a incorrect format' });
    if (typeof password !== 'string') return ({ error: '"password" must be a string' });
    if (password.length < 6) return ({ error: '"password" need to have more than 6 length' });

    return new User({ firstName, lastName, email, password });
  }
}

describe('Create User Test Suite', () => {
  const validEmailStub = (email: string) => {
    if (email === 'invalidEmail') {
      return false;
    }

    return true;
  };

  it('test if a new "User" is returned', () => {
    const sut = {
      firstName: 'validFirstName',
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result = new CreateUser(validEmailStub).create(sut);

    expect(result).to.be.deep.equal(sut);
  });

  it('test if first name is more than 3 length', () => {
    const sut = {
      firstName: '123',
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result = new CreateUser(validEmailStub).create(sut);

    expect(result).to.be.deep.equal({ error: '"firstName" need to have more than 3 length' });
  });

  it('test if first name throw a error when dont received a string', () => {
    const sut = {
      firstName: 3,
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result2 = new CreateUser(validEmailStub).create(sut as any);

    expect(result2).to.be.deep.equal({ error: '"firstName" must be a string' });
  });

    it('test if last name is more than 3 length', () => {
    const sut = {
      firstName: 'validFirstName',
      lastName: '123',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result = new CreateUser(validEmailStub).create(sut);

    expect(result).to.be.deep.equal({ error: '"lastName" need to have more than 3 length' });
  });

  it('test if last name throw a error when dont received a string', () => {
    const sut = {
      firstName: 'validFirstName',
      lastName: 'validLastName',
      email: 'invalidEmail',
      password: 'validPassword',
    };

    const result2 = new CreateUser(validEmailStub).create(sut as any);

    expect(result2).to.be.deep.equal({ error: '"email" has a incorrect format' });
  });

  it('test if password is more than 6 length', () => {
    const sut = {
      firstName: 'validFirstName',
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: '12345',
    };

    const result = new CreateUser(validEmailStub).create(sut);

    expect(result).to.be.deep.equal({ error: '"password" need to have more than 6 length' });
  });

  it('test if password throw a error when dont received a string', () => {
    const sut = {
      firstName: 'validFirstName',
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 0,
    };

    const result2 = new CreateUser(validEmailStub).create(sut as any);

    expect(result2).to.be.deep.equal({ error: '"password" must be a string' });
  });
});


