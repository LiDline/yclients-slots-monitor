# AGENTS.md — yclients-slots-monitor

## Minimal diff

The only changes in my edit are the ones the task requires. Every other byte stays identical to the original: blank lines, indentation, trailing whitespace, line endings (LF/CRLF), final newline at EOF, quote style, import order, semicolons.

Operational check before every edit:

1. Read the exact original of the region I am about to replace.
2. Count blank lines in `old_string` by position.
3. Verify `new_string` has the same blank-line count, offset only by lines the task itself adds or removes.
4. If counts differ, fix the discrepancy before submitting. Do not submit a mismatched edit.

When inserting new statements inside an existing block, do not surround them with blank lines unless a blank line already exists at that exact position in the original.

Use the smallest `old_string` that uniquely targets the change. To change two lines inside a method, replace those two lines — not the whole method. Large replacements are where whitespace drift hides.

## Naming

- Full, descriptive, unambiguous names everywhere.
- One-letter names are forbidden.
- Unnecessary abbreviations are forbidden.
- Applies to variables, arguments, properties, methods, classes, interfaces, types, enums, constants, files.

## Rules

### Architecture

Architecture patterns are in `.codex/rules/architecture/patterns.md`. Read the relevant pattern file before writing or modifying a class of that type.

### Project code rules

Project code rules are in `.codex/rules/code-review/overview.md` — that file indexes every rule. Read the relevant subfile before writing or modifying code in that area.

Before finalizing TypeScript changes, re-read `.codex/rules/code-review/ts/common.md` and check every new method against `missed-this`.
