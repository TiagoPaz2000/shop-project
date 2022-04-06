import { describe, it } from 'mocha';
import { expect } from 'chai';

import User from '../entities/user';

class CreateUser {
  create({ firstName, lastName, email, password }: User) {
    if (firstName.length <= 3) return ({ error: '"firstName" need to have more than 3 length' });
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
});


