---
"@navikt/aksel": major
"@navikt/ds-css": major
"@navikt/ds-react": major
---

:truck: Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react`

- `<Header />` er renamet til `<InternalHeader />`
- Dropdown, Timeline og InternalHeader(Header) er flyttet over til `@navikt/ds-react`
- All styling fra `@navikt/ds-css-internal` er flyttet til `@navikt/ds-css` og classname-prefix er endret fra `navdsi` -> `navds` for flyttede komponenter. Sett opp [stylelint med configen vår](https://aksel.nav.no/grunnleggende/kode/stylelint), så vil du få feilmelding om du bruker gamle klassenavn.
- Fikset cascading-problem mellom dropdown og popover. Dropdown blir ikke lengre påvirket av import-rekkefølge av popover.
- Styling for flyttede komponenter finnes nå på CDN (https://aksel.nav.no/grunnleggende/kode/css-import)

Kjør codemod for migrering:

```bash
// React
npx @navikt/aksel codemod v4-internal-react

// CSS
npx @navikt/aksel codemod v4-internal-css
```
