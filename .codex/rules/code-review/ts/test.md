# TypeScript tests

## one-assertion-per-test

Each test contains only one assertion.
If behavior needs more checks, split them into separate tests.

## repeated-test-constants

Repeated test constants live at file scope.
Repeated values that are reset or replaced per test live in `beforeEach`.
