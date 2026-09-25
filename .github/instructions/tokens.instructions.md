---
description: "@navikt/ds-tokens and @navikt/ds-tailwind: token sources, generated output, build order."
applyTo: "@navikt/core/tokens/**,@navikt/core/tailwind/**"
---

# Tokens and Tailwind

- Token source of truth: `@navikt/core/tokens/src/tokens/**` (TypeScript), built with Style Dictionary (`src/index.ts`). Generated output: `dist/`, `token_docs.js`, and in tailwind `tailwind.config.js` and `tailwind4.css`. Never edit generated output; they're untracked.
- Public CSS variables are `--ax-*`. Renaming or removing a token is breaking: it needs a major changeset plus a token migration in `@navikt/aksel` (see `src/codemod/v8-tokens/`) when consumers must migrate.
- Light and dark themes are both generated. Check both when changing semantic color tokens.
- Tailwind is built from `@navikt/ds-tokens/js`, so build tokens first: `corepack yarn workspace @navikt/ds-tokens build`, then `corepack yarn workspace @navikt/ds-tailwind build`.
- Tests: `corepack yarn workspace @navikt/ds-tokens test` and `corepack yarn workspace @navikt/ds-tailwind test`.
- `build` also generates the Figma config/plugin (`src/figma`). Changes there affect design tooling. Mention it in the PR.
