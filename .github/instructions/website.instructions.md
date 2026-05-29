---
description: "Website and playroom."
applyTo: "aksel.nav.no/website/**, aksel.nav.no/playroom/**"
---

# Website and playroom instructions

- Stay in router already used nearby; don't mix `app/`/`pages/`.
- `pages/eksempler/**` and `pages/templates/**`: only import from `@navikt/*` and `react`.
- Reuse nearby utils/patterns before adding abstractions.
- Prefer `yarn storybook:aksel` for examples/templates; `yarn dev` only for app-specific behavior.
- `yarn storybook:aksel` needs no secrets. `yarn dev` needs `SANITY_READ_NO_DRAFTS`.
