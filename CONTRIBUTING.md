# Utvikling av nye eller eksisterende løsninger

## TL;DR

Vi bruker yarn for pakkeversjonering. Har du ikke yarn? `npm i -g yarn`

```sh
git clone git@github.com:navikt/aksel.git
cd aksel
yarn install
yarn boot

// Storybook
yarn storybook

// Nettside
yarn dev
```

Storybook: [http://localhost:6006](http://localhost:6006)

Nettside: [http://localhost:3000](http://localhost:3000)

## Utviklingsmiljø

Vi bruker storybook [https://storybook.js.org/](https://storybook.js.org/) for utvikling av nye komponenter.
Lag `stories` for komponentene man vil teste [(hvordan skrive storybook stories)](https://storybook.js.org/docs/react/writing-stories/introduction)

## Utvikling av nye komponenter

Det er ikke satt opp en template for nye komponenter, men vi følger en mal.

```sh
@navikt/pakkenavn
└─ src                  # Komponenter
   ├─ index.ts          # Alle exports
   └─ pakkenavn
      ├─ index.ts       # Alle exports fra komponent
      ├─ komponent.tsx  # Komponentkode
      └─ komponent.stories.tsx # Stories
```

## Dokumentasjon

Dokumentasjon for komponenter finner man på [aksel.nav.no](https://aksel.nav.no/). Hvis man ønsker å skrive noe dokumentasjon selv gjør vi det via CMS et Sanity. Kode-eksempler blir skrevet lokalt i (https://github.com/navikt/aksel/tree/main/aksel.nav.no/website/pages/eksempler)[/pages/eksempler]

## Versjonering av pakker

Vi bruker `changeset` for versjonering av pakker. Se [README](https://github.com/navikt/aksel/blob/main/.changeset/README.md) for mer informasjon.

## Kodekvalitet og testing

Komponenter og løsninger blir testet med jest + react-testing-library.

- Commit: Kjører prettier på endrede filer + linter
- Ved PR: Kjører tester, linter og visuell regresjonstester

## Oppdatere Aksel.nav.no

Push til `main` pusher endringer til prod

Push til `next` pusher endringer til aksel.dev.nav.no
