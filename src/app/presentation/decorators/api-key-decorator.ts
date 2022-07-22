/* eslint-disable @typescript-eslint/no-namespace */
import Controller from '../protocols/controller';
import { HttpResponse } from '../protocols/http';
import { handleError } from '../../domain/helpers';

namespace ApiKeyDecorator {
  export type Request = {
    firstName: string
    lastName: string
    email: string
    password: string
    apiKey: string
  }
}

export default class ApiKeyDecorator implements Controller {
  constructor(private controller: Controller, private apiKey: string | undefined) {
    this.controller = controller;
    this.apiKey = apiKey;
  }

  async handle(httpRequest: ApiKeyDecorator.Request): Promise<HttpResponse> {
    const { apiKey, ...bodyWithoutApiKey } = httpRequest;
    if (apiKey !== this.apiKey) {
      return handleError({ error: new Error('"apiKey" is incorrect'), status: 400 });
    }

    return this.controller.handle(bodyWithoutApiKey);
  }
}