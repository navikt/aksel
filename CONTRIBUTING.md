# Bidra med utvikling av nye og eksisterende komponenter

## TL;DR

Vi bruker yarn for pakkeversjonering. Har du ikke yarn? `npm i -g yarn`

```sh
git clone git@github.com:navikt/Designsystemet.git
cd Designsystemet
yarn install
yarn boot
yarn dev/storybook
```

[http://localhost:6006](http://localhost:6006) (port auto-incrementeres hvis den allerede er i bruk av en annen server)

## Utviklingsmiljø

Vi bruker storybook [https://storybook.js.org/](https://storybook.js.org/) som utviklermiljø.
`yarn storybook` vil starte opp dette miljøet og kan da skrive `stories` for komponentene man vil teste [hvordan skrive storybook stories](https://storybook.js.org/docs/react/writing-stories/introduction)

## Utvikling av nye komponenter

Om en modul du lager har behov for en npm-pakke så kan du legge den til i devDep/dep i pakken for så å kjøre `yarn install` i root. Yarn workspaces fikser dependency treet selv. Hvis du lurer på hvordan strukturen er satt opp, så hjelper vi deg gjerne!

## Dokumentasjon

Dokumentasjon ang komponentter finner man på [aksel.nav.no](https://design.nav.no/). Hvis man ønsker å skrive noe dokumentasjon selv gjør vi det via CMS et Sanity. Kode-eksempler blir også skrevet i (https://github.com/navikt/aksel-website/tree/main/website/pages/eksempler)[aksel-website repo]

## Kodekvalitet og testing

Noen komponenter og løsninger blir testet med jest + react-testing-library hvert build.

- Commit: Kjører prettier på endrede filer
- Push: Kjører tester, linter
- Ved PR: Kjører tester, linter og visuell regresjonstester
