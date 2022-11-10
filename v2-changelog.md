# Oppsummering av endringer i v2

## Fonter

- Fonter lastes nå fra https://cdn.nav.no. De som har husket å sette en CSP på siden sin må legge inn `https://cdn.nav.no/` i `font-src`

```
font-src https://cdn.nav.no/;
```

Anbefaler også å legge til preloading i document-head.

```
<link
  rel="preload"
  href="https://cdn.nav.no/aksel/SourceSans3-normal.woff2"
  as="font"
  type="font/woff2"
  crossOrigin="true"
/>
```

## Tokens

Vi har oppdatert alle tokens med ny prefix + semantiske farger har fått nye navn. Dette vil medføre en liten migreringsjobb for de som har vært aktive brukere av tokens.

### Migrering ved hjelp av @navikt/ds-codemod

Migrering av tokens kommer med noen utilities for lettere migrering:

- `npx @navikt/ds-codemod v2/css src/`: Oppdaterer alle css-variabler brukt + legger på prefix `--v2-migration` der man har overskrevet token-verdiene. Du må selv søke opp i koden om du finner `--v2-migration` og ta stilling til hva som ble overskrevet der.
- `npx @navikt/ds-codemod v2/sass src/`: Oppdaterer all bruk av tokens i Sass format.
- `npx @navikt/ds-codemod v2/less src/`: Oppdaterer all bruk av tokens i Less format.
- `npx @navikt/ds-codemod v2/js src/`: Oppdaterer all bruk av tokens i js-format. Basert på hvordan du har løst imports, kan det hende dette ikke fungerer i 100% av tillfellene.
- `npx @navikt/ds-codemod v2/preset src/`: Kjører alle migreringene nevnt over etter hverandre
