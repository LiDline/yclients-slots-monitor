# Code review rules

These are the internal code rules for this project. Follow them when writing or modifying code.

Read only the files relevant to what you are touching — do not load all of them.

## TypeScript / JavaScript

- `ts/common.md` — general rules for all JS/TS code: naming, abbreviations, control flow, async/await, try/catch, ternaries, max line length, Demeter, throw rules.
- `ts/interface.md` — interface naming (no `I` prefix).

## When picking a pattern

If you are about to write a class, the suffix dictates which file to read:

| Writing a class ending in… | Read |
|---|---|
| `Driver` | `../architecture/patterns/driver.md` |

For any other code change, start with `ts/common.md`.
