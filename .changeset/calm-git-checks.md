---
"@navikt/aksel": patch
---

Codemod: Migrations now run in folders that are not git repositories, and a missing git install gets its own error message. `codemod v8` no longer stops before `v8-tokens` because of changes made by earlier migrations in the same run.
