---
"@navikt/ds-react": patch
---

Migrert `CopyButton` til `Clipboard API`

- `CopyButton` bruker nå [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
- `execCommand()` er fjernet fordi den [er deprecated](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand).
- Nettlesere som ikke støtter `Clipboard API` vil falle tilbake på `window.prompt()`.
