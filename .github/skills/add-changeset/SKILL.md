---
name: add-changeset
description: >
  Create a Changesets entry for a user-facing change to a published Aksel
  package without the interactive `yarn changeset` prompt. Use when a change
  touches @navikt/ds-react, ds-css, ds-tokens, ds-tailwind, aksel-icons,
  @navikt/aksel or aksel-stylelint and needs a version bump or changelog entry,
  or when asked to "add a changeset".
argument-hint: "Package(s) and a one-line summary of the change"
---

# Add changeset

`yarn changeset` is interactive and will hang an agent. Write the file directly.

## 1. Decide if a changeset is needed

Needed: any consumer-visible change in a published package: behavior, props, CSS output, tokens, icons, CLI/codemods, types, or bug fixes.

Not needed:

- Changes only in ignored workspaces (`.changeset/config.json` → `ignore`: website, sanity-studio, playroom, mcp, tooling, figma plugin).
- Stories, tests, internal refactors with identical output, docs and repo tooling.

## 2. Pick the bump

| Bump    | When                                                                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `patch` | Bug fix, style fix, internal change with visible effect, new icon keyword                                                             |
| `minor` | New component, prop, export, token, icon or codemod; new preview component                                                            |
| `major` | Removed/renamed prop, export, CSS class or token, or changed default. Only when explicitly agreed: needs a codemod or migration notes |

The packages in `config.json` `fixed` release together, so one bump moves all of them to the same version. Still list only the packages whose code changed.

## 3. Write the file

Path: `.changeset/<three-random-lowercase-words>.md` (e.g. `brave-owls-sing`). The slug must not already exist.

```md
---
"@navikt/ds-react": minor
"@navikt/ds-css": minor
---

Lookup: New component `Lookup`
```

Rules:

- The summary starts with `<Component or area>:` (e.g. `Button:`, `Tokens:`, `Icons:`, `CLI:`), then what changed **for consumers**. One changeset per logical change.
- Optional gitmoji after the colon is fine (`:tada:` for new components), matching nearby entries.
- Don't edit `CHANGELOG.md`, package versions or `config.json`.

## Done when

The file exists, its frontmatter lists only changed published packages with valid bumps, and Prettier leaves it unchanged (`./node_modules/.bin/prettier --check .changeset/<file>.md`, or `corepack yarn prettier --check ...`).
