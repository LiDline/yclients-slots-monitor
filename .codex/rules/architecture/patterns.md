# Architecture patterns

## Where these patterns come from

The project currently uses thin infrastructure wrappers around external systems.

## The hard rule

- Every exported class file ends in one of: `Driver`.
- The pattern is a **mandatory suffix** of the class name. `class Telegram {}` is wrong — use `TelegramDriver`.
- The pattern dictates state (stateful/stateless/readonly), layer, allowed method prefixes, and dependency rules. Read the pattern's file before writing or modifying a class of that type.
- A class that doesn't fit any pattern is doing too much — decompose it.

## Pattern index

| Pattern | What it is | Layer | State | Naming |
|---------|-----------|-------|-------|--------|
| [Driver](patterns/driver.md) | Wraps one low-level system (HTTP, FS, SMTP). No `if`/`for`. | infrastructure | stateless | `FetchHttpDriver` |

## How to choose a pattern

| If you are about to write... | Use |
|---|---|
| ...a class that wraps one low-level call (HTTP, FS, SMTP) | `Driver` |

## Forbidden

- Exported classes with no pattern suffix (`class Telegram {}`).
- Pattern mixed with abbreviation (`FsDriver` — must be `FileSystemDriver`).
- Putting business logic in `Driver`.
