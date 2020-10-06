# Bidra til design.nav.no

```bash
git clone git@github.com:navikt/nav-frontend-moduler.git
cd nav-frontend-moduler
npm install
npm run start-guideline-app
```

[http://localhost:8080](http://localhost:8080) (port auto-incrementeres hvis den allerede er i bruk av en annen server).

## Komponentsider

Alle komponentsidene er autogenerert utifra `.md(x)`-filer som ligger i komponentens katalog under [`/packages/node_modules/`](https://github.com/navikt/nav-frontend-moduler/tree/master/packages/node_modules). Vanligvis har en komponent følgende `.md(x)`-filer:

- `<komponent>.ingress.md`
- `<komponent>.accessibility.md`
- `<komponent>.overview.mdx`

### `<komponent>.ingress.md`

Skal være en kort oppsummering av komponentens formål. Bør være hovedsakelig ren tekst, men kan også inneholde lenker til andre komponenter.

### `<komponent>.accessibility.md`

Hvis det er spesielle tilgjengelighets-hensyn som konsumenten bør være klar over for denne komponenten skal det informeres om dette på denne siden. Hvis det ikke er noen spesielle tilgjengelighets-hensyn for denne komponenten kan dennes filen utelukkes/fjernes.

### `<komponent>.overview.mdx`

Denne filen benytter markdown-formatet [MDX](https://github.com/mdx-js/mdx) som tillater JSX-kode og React-imports i dokumentet. Poenget med denne filen er å importere komponenten og vise den frem i alle sine variasjoner på en strukturert måte, med forklaringer og kode-eksempel. Det anbefales å ta en titt på eksisterende `overview.mdx`-filer som allerede ligger i andre komponent-pakker for å få en idè om hvordan disse kan struktureres.

Her er et eksempel på hvordan en slik fil kan struktureres:

````jsx
// Importer 'Example'-modulen fra Guideline-appen. Denne brukes til å ramme inn live-eksempel av komponenten din

import Example from './../../../website/guideline-app/app/ui/components/example/Example';

// Importer komponenten du har laget

import MinKomponent from './..';

// Hvis du trenger andre komponenter fra systemet er det bare å importere disse også

import Lenke from './../../nav-frontend-lenker';

// Bruk '##' for hoved-titler slik at disse rendres som <h2>. <h1>-tittel for hele komponent-siden blir auto-generert av Guideline-appen, og trenger ikke å defineres her. Begynn alltid med normal variant av komponenten din.

## Normal

// Gi en kort beskrivelse av normal variant.

Normal variant av MinKomponent kan benyttes hvis brukeren trenger å gjøre...

// Inkluder komponenten som barn av 'Example' for å lage et innrammet live-eksempel av komponenten.

<Example>
    <MinKomponent>Dette er innholdet til MinKomponent</MinKomponent>
</Example>

// Rett nedenfor lager du et kode-eksempel som er identisk til hva du ga som barn til 'Example'.

```jsx
<MinKomponent>Dette er innholdet til MinKomponent</MinKomponent>
``` `
````

## Øvrige sider

Alle andre sider på design.nav.no er definert under `guideline-app/app/ui/containers` hvor det aller meste av innholdet er definert som `.mdx`-filer.
