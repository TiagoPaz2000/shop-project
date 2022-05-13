import { HttpResponse } from './http';

interface Controller<T = any> {
  handle(httpRequest: T): Promise<HttpResponse>
}

export default Controller;