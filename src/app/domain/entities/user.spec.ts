import { describe, it } from 'mocha';
import { expect } from 'chai';

import User from '../entities/user';

describe('User Test Suite', () => {
  const props = {
    firstName: 'validFirstName',
    lastName: 'validLastName',
    email: 'valid@mail.com',
    password: 'validPassword',
  };

  it('Test if a new user is created', () => {
    const newUser = new User(props);

    expect(newUser.firstName).to.be.equal('validFirstName');
    expect(newUser.lastName).to.be.equal('validLastName');
    expect(newUser.email).to.be.equal('valid@mail.com');
    expect(newUser.password).to.be.equal('validPassword');
  });
});