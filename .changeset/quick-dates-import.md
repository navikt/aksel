---
"@navikt/ds-react": patch
---

Date utilities: Import date-fns functions and locales from their own paths, so unbundled Node imports (SSR, Vitest/Jest) no longer load every date-fns locale.
