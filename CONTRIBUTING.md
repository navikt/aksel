# Utvikling av nye eller eksisterende løsninger

## TL;DR

Vi bruker yarn for pakkeversjonering. Har du ikke yarn? `corepack enable`

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

Storybook: http://localhost:6006

Nettside: http://localhost:3000

### Ikke Nav-ansatt?

Nettsiden avhenger av pakker som ikke er åpent tilgjengelig. Du kan likevel bidra på andre deler av repoet ved å kjøre denne kommandoen i stedet for `yarn install`:

```sh
yarn workspaces focus @navikt/aksel-icons @navikt/ds-tokens @navikt/ds-css @navikt/ds-react @navikt/ds-tailwind @navikt/aksel @navikt/aksel-stylelint
```

## Utviklingsmiljø

Vi bruker [Storybook](https://storybook.js.org/) for utvikling av nye komponenter.
Lag [stories](https://storybook.js.org/docs/writing-stories) for komponentene du vil teste.

### safeguards

Om man vil ha en ekstra safeguard for å hindre at man kjører diverse sanity scripts fra lokal maskin mot produksjons-datasettet så kan du legge til denne variabelen i filen `./aksel.nav.no/website/.env`:

```sh
LOCAL_DATASET_OVERRIDE=development
```

## Utvikling av nye komponenter

Det er ikke satt opp noen template for nye komponenter, men vi følger en mal.

```sh
@navikt/pakkenavn
└─ src                  # Komponenter
   ├─ index.ts          # Alle exports
   └─ komponent
      ├─ index.ts       # Alle exports fra komponent
      ├─ komponent.tsx  # Komponentkode
      └─ komponent.stories.tsx # Stories
```

## Dokumentasjon

Dokumentasjon for komponenter finner man på [aksel.nav.no](https://aksel.nav.no/). Hvis man ønsker å skrive noe dokumentasjon selv gjør vi det via CMS-et Sanity. Kode-eksempler blir skrevet lokalt i [/pages/eksempler](https://github.com/navikt/aksel/tree/main/aksel.nav.no/website/pages/eksempler)

## Versjonering av pakker

Vi bruker `changeset` for versjonering av pakker. Se [README](https://github.com/navikt/aksel/blob/main/.changeset/README.md) for mer informasjon.

## Kodekvalitet og testing

Komponenter og løsninger blir testet med vitest + react-testing-library.

- Commit: Kjører prettier på endrede filer + linter
- Ved PR: Kjører tester, linter og visuelle regresjonstester

## Oppdatere Aksel.nav.no

Push til `main` pusher endringer til prod

Push til `next` pusher endringer til aksel.dev.nav.no
