---
description: "aksel.nav.no Next.js website: routers, examples/templates, Sanity data."
applyTo: "aksel.nav.no/website/**"
---

# Website (aksel.nav.no)

- Both routers are in use: `app/` (App Router, `cacheComponents: true` in `next.config.ts`) and `pages/` (examples, templates, legacy). Stay in the router already used nearby. Don't move routes between them.
- In `app/`, dynamic data needs Suspense or `"use cache"`, following nearby code. Cache Components errors at build time are real failures.
- `pages/eksempler/**` and `pages/templates/**` are public code snippets. Use the `website-example` skill. ESLint rules `aksel-local/{import-check,comment-check,args-check}` enforce their shape.
- Reuse `@/` utils and components nearby before adding abstractions.
- Examples/templates: `corepack yarn storybook:aksel` (no secrets). `corepack yarn dev` only for app behavior; it needs `SANITY_READ_NO_DRAFTS` and `NPM_AUTH_TOKEN`.
- Never run `update:*`, `backup` or other Sanity-writing scripts unless asked. They write to the CMS.
- Tests: `corepack yarn workspace website test`. Examples: `corepack yarn workspace website validate:eksempler`.
