import { describe, it } from 'mocha';
import { expect } from 'chai';

import User from '../entities/user';

class CreateUser {
  create({ firstName, lastName, email, password }: User) {
    if (typeof firstName !== 'string') return ({ error: '"firstName" must be a string' });
    if (firstName.length <= 3) return ({ error: '"firstName" need to have more than 3 length' });
    return 'hello world';
  }

}

describe('Create User Test Suite', () => {
  it('test if first name is more than 3 length', () => {
    const sut = {
      firstName: '123',
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result = new CreateUser().create(sut);

    expect(result).to.be.deep.equal({ error: '"firstName" need to have more than 3 length' });
  });

  it('test if first name throw a error when received a number', () => {
    const sut = {
      firstName: 3,
      lastName: 'validLastName',
      email: 'valid@mail.com',
      password: 'validPassword',
    };

    const result2 = new CreateUser().create(sut as any);

    expect(result2).to.be.deep.equal({ error: '"firstName" must be a string' });
  });
});


