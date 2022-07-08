// import supertest from 'supertest';
import { describe, it } from 'mocha';
// import { expect } from 'chai';
// import sinon from 'sinon';
import axios from 'axios'

import app from '../../src/app/main/app';

describe('Sign Up Controller', () => {
  it('Should return 201 if receive correct values', async () => {
    const httpRequest = {
      body: {
        firstName: 'valid_name',
        lastName: 'valid_lastName',
        email: 'valid_email@mail.com',
        password: 'valid_password',
      },
    };

    const response = await axios.post('http://localhost:3001/api/user/register', httpRequest.body)
    console.log(response);
    

    // supertest(app)
    //   .post('/api/user/register')
    //   .send(httpRequest.body)
    //   .expect(201)
    //   .then(response => {
    //       console.log(response)
    //       done();
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     done(err)
    //   })
  });
});