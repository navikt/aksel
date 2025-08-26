---
"@navikt/aksel": patch
---

CLI: Codemods now only run on relevant files. This resolves cases where codemods for js/ts-files tried and failed to parse css/scss/less-files.
