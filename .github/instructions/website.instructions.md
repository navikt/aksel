---
description: "Use when editing Next.js routes, docs pages, examples, templates, or playroom code under aksel.nav.no."
applyTo:
  - "aksel.nav.no/website/**"
  - "aksel.nav.no/playroom/**"
---

# Website and playroom instructions

- Stay inside the router already used nearby; do not mix `app/` and `pages/` patterns in the same area.
- Reuse existing website utilities and local patterns before adding abstractions.
- In `aksel.nav.no/website/pages/eksempler/**` and `aksel.nav.no/website/pages/templates/**`, only import from `@navikt/*` and `react`.
- Prefer `yarn storybook:aksel` for example and template work; use `yarn dev` only when app-only behavior matters.
