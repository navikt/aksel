# Bidra med utvikling av nye og eksisterende komponenter

#

Det oppfordres til at alle blir med og bidrar med nye moduler, og holder eksisterende moduler vedlike,
slik at mest mulig av fremtidige moduler er å finne her og fungerer etter de behov som man har i det enkelte prosjekt.

## TL;DR

Vi bruker yarn pga yarn workspaces. Har du ikke yarn? `npm i -g yarn`

```sh
git clone git@github.com:navikt/nav-frontend-moduler.git
cd nav-frontend-moduler
yarn install
yarn boot
yarn sb
```

[http://localhost:6006](http://localhost:6006) (port auto-incrementeres hvis den allerede er i bruk av en annen server)

## Utviklingsmiljø

Vi tar nå i bruk storybook [https://storybook.js.org/](https://storybook.js.org/) som utviklermiljø.
`yarn storybook` vil starte opp dette miljøet og kan da skrive `stories` for komponentene man vil teste [hvordan skrive storybook stories](https://storybook.js.org/docs/react/writing-stories/introduction)

## Utvikling av nye komponenter

**NB!!** Det er aldri behov for å kjøre `npm install` i noen annen mappe enn rot-mappen.
Om en modul du lager har behov for en npm-pakke så kan du legge den til i devDep/dep i pakken for så å kjøre `yarn install` i root. Yarn workspaces fikser da dependency treet selv.

## Dokumentasjon

Dokumentasjon kan skrives ved å legge til mdx filer under `website/src/pages`. Nye komponenter under `@navikt/` dokumenteres ved å skrive mdx filer under `website/src/pages/beta/components`. Eldre komponenter dokumenteres ved å endre mdx filer under `md`-mappen lokalt i pakken under `packages`.

## Kodekvalitet

For å sikre kodekvalitet er det satt opp både `prettier` som kjører for hver commit, samt linter som kjører hvert push

## Kommandoer

### Komponenter

- `yarn install` - installerer alle dependencies og konfigurerer yarn workspaces riktig
- `yarn boot` - bygger alle komponentene, css og ikoner
- `yarn lerna:watch` - watcher alle komponenten for hot-reloading av endringer.
- `yarn lint` - Kjører diverse lintere på kode og styling
- `yarn storybook` - starter opp utviklingsmiljø for storybook

### Nettside

- `yarn start` - starter opp gatsby nettsiden lokalt
- `yarn build:gatsby` - bygger gatsby nettsiden lokalt
- `yarn serve` - server bygd gatsby nettside på localhost:9000

## Ikoner

> Krever at man har lagt til en .env fil under `@navikt/ds-icons/figma-api` med en Figma auth-token i format FIGMA_TOKEN="[TOKEN]"

- `yarn lerna:icons` - Oppdaterer ikonpakken med de nyeste ikonene fra Figma-biblioteket

## Byggemiljø

Det er satt opp [Github actions](https://github.com/navikt/nav-frontend-moduler/actions) for repoet.
Pull-requests bygges og testes derfor automatisk med en gang de pushes til remote.

### Byggesteg

Se [build-publish.yml](https://github.com/navikt/nav-frontend-moduler/blob/master/.github/workflows/build-publish.yml).
