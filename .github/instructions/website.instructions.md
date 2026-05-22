---
description: "Website and playroom."
applyTo: "aksel.nav.no/website/**, aksel.nav.no/playroom/**"
---

# Website and playroom instructions

- Stay in the router already used nearby; don't mix `app/` and `pages/` patterns.
- `pages/eksempler/**` and `pages/templates/**`: only import from `@navikt/*` and `react`.
- Reuse nearby utilities and patterns before adding abstractions.
- Prefer `yarn storybook:aksel` for examples/templates; `yarn dev` only for app-specific behavior.
