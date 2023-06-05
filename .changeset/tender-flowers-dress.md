---
"@navikt/aksel": major
"@navikt/ds-css": major
"@navikt/ds-react": major
---

:test-tube: Datepicker og Monthpicker er nå ute av beta. Kjør codemod for migrering, eller `cmd/ctrl + shift + f` og erstatt `UNSAFE_` med ``

- UNSAFE-prefix er fjernet fra Datepicker og Monthpicker

```bash
npx @navikt/aksel codemod v4-date
```
