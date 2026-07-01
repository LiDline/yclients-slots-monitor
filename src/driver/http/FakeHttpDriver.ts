import type { HttpDriver, HttpDriverRequest } from './interface/interface.js';

export class FakeHttpDriver implements HttpDriver {
  public readonly requests: HttpDriverRequest[] = [];

  public constructor(private readonly response: Response = new Response(null, { status: 204 })) {}

  public request(request: HttpDriverRequest): Promise<Response> {
    this.requests.push(request);
    return Promise.resolve(this.response);
  }
}
