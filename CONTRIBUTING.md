# Bidra med utvikling av nye og eksisterende komponenter

Lyst på en ny kul feature på en komponent? Prøv deg på en løsning selv eller start en dialog så kan vi hjelpe deg.

## TL;DR

Vi bruker yarn pga yarn workspaces. Har du ikke yarn? `npm i -g yarn`

```sh
git clone git@github.com:navikt/Designsystemet.git
cd Designsystemet
yarn install
yarn boot
yarn storybook
```

[http://localhost:6006](http://localhost:6006) (port auto-incrementeres hvis den allerede er i bruk av en annen server)

## Utviklingsmiljø

Vi bruker storybook [https://storybook.js.org/](https://storybook.js.org/) som utviklermiljø.
`yarn storybook` vil starte opp dette miljøet og kan da skrive `stories` for komponentene man vil teste [hvordan skrive storybook stories](https://storybook.js.org/docs/react/writing-stories/introduction)

## Utvikling av nye komponenter

**NB!!** Det er aldri behov for å kjøre `npm install` i noen annen mappe enn rot-mappen.
Om en modul du lager har behov for en npm-pakke så kan du legge den til i devDep/dep i pakken for så å kjøre `yarn install` i root. Yarn workspaces fikser da dependency treet selv. Hvis du lurer på hvordan strukturen er satt opp, så hjelper vi deg gjerne!

## Dokumentasjon

Dokumentasjon ang komponentter finner man på nettsiden vår [design.nav.no](https://design.nav.no/). Hvis man ønsker å skrive noe dokumentasjon selv gjør vi det via CMS et Sanity. Spør gjerne om tilgang så kan du være med å utfylle dokumentasjonen vår [her](https://verktoykasse.sanity.studio/).

## Kodekvalitet og testing

Kode: Noen komponenter og løsninger blir testet med jest + react-testing-library hvert build.

Design: Ved bruk av [Chromatic](https://www.chromatic.com/) + storybook har vi visuell regresjons-testing på alle komponentene våre.

For å sikre kodekvalitet er det satt opp både `prettier` som kjører for hver commit, samt linter som kjører hvert push. All kode blir da auto-"prettified"

## Kommandoer

### Komponenter

- `yarn install` - installerer alle dependencies og konfigurerer yarn workspaces riktig
- `yarn boot` - bygger alle komponentene, css og ikoner
- `yarn lerna:watch` - watcher alle komponenten for hot-reloading av endringer.
- `yarn lint` - Kjører diverse lintere på kode og styling
- `yarn storybook` - starter opp utviklingsmiljø for storybook

## Ikoner

> Krever at man har lagt til en .env fil under `@navikt/icons` med en Figma auth-token i format FIGMA_TOKEN="[TOKEN]"

- `yarn lerna:icons` - Oppdaterer ikonpakken med de nyeste ikonene fra Figma-biblioteket

## Byggemiljø

Det er satt opp [Github actions](https://github.com/navikt/Designsystemet/actions) for repoet.
Pull-requests bygges og testes derfor automatisk med en gang de pushes til remote.

### Byggesteg

Se [build-publish.yml](https://github.com/navikt/Designsystemet/blob/master/.github/workflows/build-publish.yml).
