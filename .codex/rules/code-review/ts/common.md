# General rules for all JS / TS code

## no-abbr

No abbreviations.

```js
// bad
e            // -> error or event
err          // -> error
ev           // -> event
sec, min, h  // -> seconds, minutes, hours
idx          // -> index
```

## object-property-name

Variable names follow `object + property` order, not `property + object`.

```js
// bad
idOrder
user         // if it holds a name -> userName / userFullName

// good
companyName  // object first, property second
orderId
```

## array-plural

Arrays use plural names.

```js
// bad
arr             // unclear what's inside
companyArr
companyIds      // both words must be plural -> companiesIds
idsCompanies    // ids belongs at the end
companyIdArr    // -> companiesIds

// good
companies
companiesIds
```

## array-element-singular

The element variable is the array name, singular.

```js
// good
companiesIds.map(companyId => /* ... */);
for (const companyId of companiesIds) { /* ... */ }

// bad
for (const item of values) {}        // -> value
for (const companyEl of companies) {} // -> company
```

## no-check

Use `is*` / `has*` / `was*` / `can*` instead of `check*`. `check` reads as a void validator.

```js
// bad
if (order.checkArchived()) {}
order.checkConstraints();  // sounds like a validator -> rename to validate()

// good
if (order.isArchived()) {}
```

## any-class-name-starts-with-upper-letter

Class names start with a capital letter.

```js
// bad
class orderModel {}

// good
class OrderModel {}
```

## any-class-name-contains-pattern

Every exported class belongs to a project pattern. The pattern is the mandatory suffix.

```js
// good
class FileSystemDriver {}

// bad
class FileSystem {}   // unclear pattern
class FsDriver {}     // unwanted abbreviation
```

## file-name-is-class-name

File name equals the class name.

- `FetchHttpDriver.ts` for `class FetchHttpDriver` — good
- `fetchHttpDriver.ts` for `class FetchHttpDriver` — bad (lowercase first letter)
- `FetchHttp.ts` for `class FetchHttpDriver` — bad (missing suffix)

## shared-url-const

Shared URL literals live in `CONST.ts`.

## split-try-catch

Split a `try/catch` block into two methods: `tryAction` and `action`.

```js
// bad
class SomeTask {
    onClickCreateButton() {
        try {
            // create items
        } catch (error) {
            // handle error
        }
    }
}

// good
class SomeTask {
    onClickCreateButton() {
        this.tryCreate();
    }

    tryCreate() {
        try {
            this.create();
        } catch (error) {
            // handle error
        }
    }

    create() {
        // create items
    }
}
```

## split-loop

Move the loop body into its own method.

```js
// bad
async saveCompanies(companies) {
    for (const company of companies) {
        // iteration code
    }
}

// good
async saveCompanies(companies) {
    for (const company of companies) {
        await this.saveCompany(company);
    }
}

async saveCompany(company) {
    // iteration code
}
```

## use-for-of

Use `for ... of` when you do not need an index.

```js
// bad
companies.forEach(company => { /* ... */ });          // breaks with async/await
for (let i = 0; i < companies.length; i++) {          // index only used to read element
    const company = companies[i];
}

// good
for (const company of companies) { /* ... */ }
```

## use-array-method

Prefer built-in array methods (or lodash when needed) over hand-rolled loops.

```ts
// bad
let appliesToMass = false;
for (const state of states) {
    if (state === "MA") appliesToMass = true;
}
// good
const appliesToMass = states.includes("MA");

// bad
let evenNumbers = [];
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) evenNumbers.push(numbers[i]);
}
// good
const evenNumbers = numbers.filter(number => number % 2 === 0);

// bad
let hasNegative = false;
for (const number of numbers) {
    if (number < 0) { hasNegative = true; break; }
}
// good
const hasNegative = numbers.some(number => number < 0);

// bad
let allPositive = true;
for (const number of numbers) {
    if (number <= 0) { allPositive = false; break; }
}
// good
const allPositive = numbers.every(number => number > 0);

// good (lodash)
_.uniqBy(users, "id");

// good
const managers = orders.flatMap(order => order.managers);
```

## unnecessary-type

Do not annotate when TypeScript already knows the type.

```ts
// bad
const isValid: boolean = true;

// good
const isValid = true;
```

## too-many-arguments

If a function has more than two arguments, or two arguments of the same type, wrap them in an object.

```js
// bad
yourMethod(a, b, c, d, e);
yourMethod(name, code);     // two strings, order is not obvious

// good
yourMethod({ a, b, c, d, e });
yourMethod({ name, code });
yourMethod(x, y);           // order is universally obvious
yourMethod(...args);
```

## missed-this

If a method does not use `this`, it is a function, not a method.

```js
// bad
class SomeTask {
    onClickButton() {
        const positions = await this.loadPositions(supplyOrderId);
    }

    loadPositions(supplyOrderId) {
        return await SUPPLY_ORDER_WEIGHT_POSITION.get(/* ... */);
    }
}

// good
class SomeTask {
    onClickButton() {
        const positions = await loadPositions(supplyOrderId);
    }
}

function loadPositions(supplyOrderId) {
    return await SUPPLY_ORDER_WEIGHT_POSITION.get(/* ... */);
}
```

Exception: `Driver` methods are allowed to not touch `this`.

## if-series

A series of related `if`s belongs in its own method.

```js
// bad
class SlotFinder {
    findSlot(slots, preferredTime) {
        let slot;
        if (preferredTime) {
            slot = slots.find(slotItem => slotItem.time === preferredTime);
        } else if (slots.length === 1) {
            slot = slots[0];
        } else if (slots.length > 1) {
            slot = slots.find(slotItem => slotItem.isRecommended);
        }
    }
}

// good
class SlotFinder {
    findSlot(slots, preferredTime) {
        return this.findMatchingSlot(slots, preferredTime);
    }

    findMatchingSlot(slots, preferredTime) {
        if (preferredTime) {
            return slots.find(slotItem => slotItem.time === preferredTime);
        }
        if (slots.length === 1) {
            return slots[0];
        }
        if (slots.length > 1) {
            return slots.find(slotItem => slotItem.isRecommended);
        }
    }
}
```

## too-deep

Maximum nesting depth is 3 levels. Past that, extract methods.

```js
// bad
function hardFunction() {
    try {
        for (const item of items) {
            if (item.hasSome) {
                // 3 levels of indentation
            }
        }
    } catch (error) {}
}

// good
function hardFunction() {
    tryProcessItems(items);
}

function tryProcessItems(items) {
    try { processItems(items); } catch (error) {}
}

function processItems(items) {
    for (const item of items) processItem(item);
}

function processItem(item) {
    if (item.hasSome) { /* ... */ }
}
```

## prefer-use-async-await

Always use `async/await`, never callbacks. For legacy callback APIs, promisify them first.

```js
// bad
OPERATION_UNIT.get(404, (err, unitModel) => { /* ... */ });

// bad — callback even with await
await OPERATION_UNIT.get(404, (err, unitModel) => { /* ... */ });

// good
const unitModel = await OPERATION_UNIT.get(404);
```

## unnecessary-else

No `else` after `if + return`.

```js
// bad
if (condition) {
    return 1;
} else {
    return 2;
}

// good
if (condition) {
    return 1;
}
return 2;
```

## prefer-condition-inversion-and-return

Move large blocks out of `if` by inverting and returning early.

```js
// bad
function calculateSome() {
    if (condition) {
        // line 1
        // line 2
        // line 3
        // line 4
    }
}

// good
function calculateSome() {
    if (!condition) return;

    // line 1
    // line 2
    // line 3
    // line 4
}

// good — short body, no inversion needed
function calculateSome() {
    if (condition) {
        // line 1
        // line 2
    }
}

// good — clarifying variable
function calculateSome() {
    const condition = /* ... */;
    if (!condition) return;
    /* ... */
}
```

The goal is fewer horizontal indents — do not invert just to add a `!`.

## no-circle-await

Do not wrap `await` in parentheses.

```js
// bad — cannot inspect the result, cannot extract two fields
const value = (await someFunc()).prop;

// good
const result = await someFunc();
const value = result.name;

// good — concise, still readable
const { prop } = await someFunc();
```

## no-arrow-return

Drop `{ return }` in single-expression arrows.

```js
// bad
const newNumbers = numbers.map(value => { return value + 1; });

// good
const newNumbers = numbers.map(value => value + 1);

// good — object literal needs parens
const newNumbers = numbers.map(value => ({ old: value, new: value + 1 }));
```

## no-empty-constructor

Do not leave an empty constructor.

```js
// bad
class MyClass {
    constructor() {}
}

// good
class MyClass {}
```

## var-near-use

Declare variables near where they are used.

```js
// bad
function someFunc() {
    let a = 0;
    // ...
    // ...
    return a + 1;
}

// good
function someFunc() {
    // ...
    // ...
    let a = 0;
    return a + 1;
}
```

## demetra-law

Do not reach through to a third party (Law of Demeter — no more than two dots).

```js
// bad
class OrderModel {
    calculate() {
        this.client.manager.name;   // 3 dots, reaches into Manager
    }
}

// bad — hidden but still a Demeter violation
class OrderModel {
    calculate() {
        const manager = this.client.manager;
        manager.name;
    }
}

// bad — every level adds boilerplate get* wrappers
class OrderModel {
    calculate() { this.client.getManagerName(); }
}
class Customer {
    getManagerName() { return this.manager.name; }
}
```

## static-first

`static` members go at the top of the class.

```js
// good
class MyClass {
    static property = /* ... */;
    static method() {}

    usualProperty = /* ... */;
    constructor() {}
    usualMethod() {}
}
```

## max-line-length

A single line of code should not carry too much cognitive load. Rule of thumb: if you rename every identifier to a single letter, the line should fit in ~30 characters. If it does not, split it.

```js
// before
company.id >= 100 && company.id <= 900 && company.hasRole(CLIENT_ROLE)

// after — split by logical operators
company.id >= 100 &&
company.id <= 900 &&
company.hasRole(CLIENT_ROLE)

// before
const activeCompaniesIds = companies.filter(company => company.isActive()).map(company => company.id);

// after — chain on new lines
const activeCompaniesIds = companies
    .filter(company => company.isActive())
    .map(company => company.id);

// before
const adminCompanyName = company.hasRole(ADMIN_ROLE_ID) ? company.name : undefined;

// after — split ternary
const adminCompanyName = company.hasRole(ADMIN_ROLE_ID)
    ? company.name
    : undefined;
```

## no-hard-if-condition

Simplify complex `if` conditions. Several techniques:

```js
// bad
if (row.creatorUser.equal(currentUser) && row.isEditable() && row.deleted === 0) {}

// good — split across lines
if (
    row.creatorUser.equal(currentUser) &&
    row.isEditable() &&
    row.deleted === 0
) {}

// good — clarifying variables
const isOwner = row.creatorUser.equal(currentUser);
const isNotDeleted = row.deleted === 0;
if (isOwner && row.isEditable() && isNotDeleted) {}

// good — whole condition as a single variable
const isOwnActiveRow = (
    row.creatorUser.equal(currentUser) &&
    row.isEditable() &&
    row.deleted === 0
);
if (isOwnActiveRow) {}

// good — extracted predicates
if (isOwner(row) && row.isEditable() && isNotDeleted(row)) {}
function isOwner(row) { return row.creatorUser.equal(currentUser); }
function isNotDeleted(row) { return row.deleted === 0; }
```

## throw-only-error-instance

Throw an `Error` (or a subclass) — never strings or plain objects, which lack a call stack.

```js
// bad
throw "some message";
throw { message: "some message" };

// good
throw new Error("some message");

class MyError extends Error {}
throw new MyError("some message");
```

## compare-null-undefined

```js
// bad
if (user.name === null || user.name === undefined) {}

// good — `== null` matches both
if (user.name == null) {}
```

## unnecessary-variables

Do not introduce a variable just to rename a property.

```js
// bad
const companyName = company.name;
console.log(companyName);

// good
console.log(company.name);

// good — companyName clarifies an opaque path
const companyName = response.Data.Companies[0].Attr37;
console.log(companyName);

// bad
const {
    Name: companyName,
    Note23: companyNote,
    Inn: companyInn
} = companyResponse;

repository.save({ name: companyName, note: companyNote, inn: companyInn });

// good
repository.save({
    name: companyResponse.Name,
    note: companyResponse.Note23,
    inn: companyResponse.Inn
});
```

## no-deep-ternary

```js
// bad
const isValid = user.age >= 18
    ? (user.country === "Russia" ? true : false)
    : false;

// good
const isValid = user.age >= 18 && user.country === "Russia";

// good — single-level ternary is fine
const statusColor = invoice.hasPayments() ? "green" : "red";
```

## unnecessary-try-catch

A `try/catch` that does not change behaviour is dead code.

```js
// bad
function doSome() {
    try {
        // do some
    } catch (error) {
        throw error;
    }
}

// good
function doSome() {
    // do some
}
```

## class-extends-parent-postfix

The child class carries the parent class name as a suffix.

```js
// good
class View {}
class OrderView extends View {}

// bad — parent name as prefix
class ViewOrder extends View {}

// bad — parent name missing
class Order extends Entity {}

// good — Abstract / Base are not inherited into the suffix
class AbstractView {}
class OrderView extends AbstractView {}

class BaseView {}
class OrderView extends BaseView {}
```

## class-name-first-letter-uppercase

```js
// bad
class order {}

// good
class Order {}
```

## remove-code-instead-of-comment

Delete dead code; do not comment it out.

```js
// bad
function doSome(companyModel) {
    // let companyName = companyModel.get("NAME");
    // let companyInn = companyModel.get("INN");
}

// good
function doSome(companyModel) {}
```

## no-side-effect-in-getters

`get*`, `calculate*`, `render*`, `is*` methods do not mutate.

```js
// bad — read method has a side effect
class CompanyModel {
    getCreationDate(now) {
        this.creationDate ??= now;
        return this.creationDate;
    }
}

// bad — getOrUpdate violates CQRS
class CompanyModel {
    getOrUpdateCreationDate(now) {
        this.creationDate ??= now;
        return this.creationDate;
    }
}

// good — mutator is void; read directly via the field
class CompanyModel {
    updateCreationDate(now) {
        this.creationDate ??= now;
    }
}
```

## dont-change-input-arguments

Do not mutate arrays or objects passed in as arguments.

```js
// bad — .sort mutates the input
function sort(array) {
    return array.sort((a, b) => a - b);
}

// good — copy first
function sort(array) {
    const newArray = array.slice();
    newArray.sort((a, b) => a - b);
    return newArray;
}
```

## find-many-always-returns-array

Methods that return many things always return an array — never `undefined`.

```js
// bad — caller has to handle undefined
async findMany(status) {
    if (!status) return;
    await this.db.query(/* ... */);
}

// good
async findMany(status) {
    if (!status) return [];
    await this.db.query(/* ... */);
}

// bad
getAvailableStatuses(): string[] | undefined;

// good
getAvailableStatuses(): string[];
```

## no-postfix-pattern-in-instance

Instance variable names drop the pattern suffix.

```ts
class HttpDriver {}

// bad
const httpDriver = new HttpDriver();
await httpDriver.request(request);

// good
const http = new HttpDriver();
await http.request(request);
```
