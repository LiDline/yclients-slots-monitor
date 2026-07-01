import type {
  FetchHttpDriverConfig,
  HttpDriver,
  HttpDriverRequest,
} from './interface/interface.js';

export class FetchHttpDriver implements HttpDriver {
  public constructor(private readonly config: FetchHttpDriverConfig = {}) {}

  public request(request: HttpDriverRequest): Promise<Response> {
    return fetch(request.url, {
      ...this.config.defaultInit,
      ...request.init,
    });
  }
}
