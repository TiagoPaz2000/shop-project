import axios from 'axios';
import { expect } from 'chai';
import 'dotenv/config'

const { API_KEY } = process.env;

const makeSut = () => {
  const urlBase: string = 'http://localhost:3000';
  const signUpRoute: string = '/api/user/register';

  return ({
    urlBase,
    signUpRoute,
  })
}

describe('SignUp Route', () => {
  it('Should return 400 and error message if dont send a valid api key', async () => {
    const { urlBase, signUpRoute } = makeSut();

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        apiKey: API_KEY + 'invalid_key'
      },
    };

    await axios.post(urlBase + signUpRoute, httpRequest.body).catch(({ response }) => {
      expect(response.status).to.be.equal(400)
      expect(response.data).to.be.eql({ response: { error: '"apiKey" is incorrect' }})
    });    
  });

  it('Should return 400 and error message if dont send a valid email', async () => {
    const { urlBase, signUpRoute } = makeSut();

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'invalid_email',
        password: 'valid_password',
        apiKey: API_KEY,
      },
    };

    await axios.post(urlBase + signUpRoute, httpRequest.body).catch(({ response }) => {
      expect(response.status).to.be.equal(400)
      expect(response.data).to.be.eql({ response: { error: '"email" has a incorrect format' }})
    });    
  });

  it('Should return 400 and error message if dont send password', async () => {
    const { urlBase, signUpRoute } = makeSut();

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid_email@mail.com',
        password: '',
        apiKey: API_KEY,
      },
    };

    await axios.post(urlBase + signUpRoute, httpRequest.body).catch(({ response }) => {
      expect(response.status).to.be.equal(400)
      expect(response.data).to.be.eql({ response: { error: '"password" need to have more than 6 length' }})
    });    
  });

  it('Should return 400 and error message if dont send a firstName', async () => {
    const { urlBase, signUpRoute } = makeSut();

    const httpRequest = {
      body: {
        firstName: '',
        lastName: 'valid_lastName',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        apiKey: API_KEY,
      },
    };

    await axios.post(urlBase + signUpRoute, httpRequest.body).catch(({ response }) => {
      expect(response.status).to.be.equal(400)
      expect(response.data).to.be.eql({ response: { error: '"firstName" need to have more than 3 length' }})
    });    
  });

  it('Should return 400 and error message if dont send a lastName', async () => {
    const { urlBase, signUpRoute } = makeSut();

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: '',
        email: 'valid_email@mail.com',
        password: 'valid_password',
        apiKey: API_KEY,
      },
    };

    await axios.post(urlBase + signUpRoute, httpRequest.body).catch(({ response }) => {
      expect(response.status).to.be.equal(400)
      expect(response.data).to.be.eql({ response: { error: '"lastName" need to have more than 3 length' }})
    });    
  });

  it('Should return 201 and success message if send all fields', async () => {
    const { urlBase, signUpRoute } = makeSut();

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@mail.com',
        password: 'valid_password',
        apiKey: API_KEY,
      },
    };

    await axios.post(urlBase + signUpRoute, httpRequest.body).catch(({ response }) => {
      expect(response.status).to.be.equal(201)
      expect(response.data.response).to.have.property('token')
    });    
  });

  it('Should return 400 and success message if send all fields', async () => {
    const { urlBase, signUpRoute } = makeSut();

    const httpRequest = {
      body: {
        firstName: 'valid_firstName',
        lastName: 'valid_lastName',
        email: 'valid@mail.com',
        password: 'valid_password',
        apiKey: API_KEY,
      },
    };

    await axios.post(urlBase + signUpRoute, httpRequest.body).catch(({ response }) => {
      expect(response.status).to.be.equal(400)
      expect(response.data).to.be.eql({ response: { error: "email already used" } })
    });    
  });
});