import type { HttpDriverRequest } from './interface.js';

export interface HttpDriver {
  request(request: HttpDriverRequest): Promise<Response>;
}
