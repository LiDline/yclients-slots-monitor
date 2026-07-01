export interface HttpDriverRequest {
  readonly url: string | URL;
  readonly init?: RequestInit;
}
