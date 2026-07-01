# Driver

Wraps **one** low-level subsystem (HTTP, filesystem, SMTP, Telegram Bot API). Robert Martin calls this the **Humble Object** — its job is to be a thin, untestable shell around an untestable API so that everything that uses it stays testable.

## State

Stateless. Constructor stores configuration only (base URL, root path, credentials).

## Layer

Infrastructure.

## Rules

- Interface name: `<System>Driver` — `HttpDriver`, `FileSystemDriver`, `SmtpDriver`.
- Implementation name: `<Version><System>Driver` — `FetchHttpDriver`, `NodeFileSystemDriver`.
- **No `if`, no `for`, no `try/catch`** inside method bodies. A `Driver` is one statement per method, ideally. Branching, looping, retry, and parsing belong outside the driver.
- One `Driver` per subsystem. A `Driver` **may not depend on another `Driver`**.
- Method names mirror the underlying API.
- Has a `Fake*Driver` counterpart for tests.

## Dependencies

- **Depends on:** domain layer (for typed inputs/outputs).
- **Sibling dependency:** none — drivers never depend on each other.
- **Used by:** application code that needs the external subsystem.

## When to use

Anywhere you call out to the OS or an external service: HTTP requests, file I/O, sending email, talking to Telegram, executing shell commands. Anything where the real implementation cannot reasonably be unit-tested in isolation.

If the interaction has multiple steps, retries, or response parsing, keep that orchestration outside the driver.

## Example

```ts
// driver/http/interface.ts
export interface HttpDriver {
    get(url: string): Promise<any>;
}

// driver/http/fetch/FetchHttpDriver.ts
export class FetchHttpDriver implements HttpDriver {
    async get(url: string): Promise<any> {
        const response = await fetch(url);
        return await response.json();
    }
}
```
