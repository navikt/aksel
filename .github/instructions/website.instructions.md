description: "Use for website and playroom work."
applyTo:

- "aksel.nav.no/website/\*\*"
- "aksel.nav.no/playroom/\*\*"

---

# Website and playroom instructions

- Stay inside the router already used nearby; do not mix `app/` and `pages/` patterns in the same area.
- In `aksel.nav.no/website/pages/eksempler/**` and `aksel.nav.no/website/pages/templates/**`, only import from `@navikt/*` and `react`.
- Reuse nearby website utilities and patterns before adding abstractions.
- Prefer `yarn storybook:aksel` for examples/templates; use `yarn dev` only for app-only behavior.
