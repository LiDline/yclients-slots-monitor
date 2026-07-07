# Interface

Describes the shape of an object.

## no-i-interface

Interface names do not start with `I`.

```ts
// bad
interface ICompany {}

// good
interface Company {}
```

## interface-location

Interfaces live next to the module that owns them in an `interface/` directory.
Use a barrel named `interface.ts` to re-export interface files, following `src/config/interface`.
