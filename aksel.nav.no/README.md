CMS og nettside for [aksel.nav.no](https://aksel.nav.no/)

```sh
├── /website    # NEXT.JS app (v12)
└── /sanity     # Sanity CMS-app (v2)
```

### /website

[Nextjs](https://nextjs.org/) applikasjon som henter data fra et [sanity-datasett](https://www.sanity.io/).

Siden leverer to løsninger:

- Innhold på toppnivå i Aksel: artikler, prinsipper og blogger
- Designsystem-dokumentasjon under https://aksel.nav.no/designsystem

### /sanity

Det publiserte studioet finner man på [aksel.nav.no/studio](https://aksel.nav.no/studio)(krever NAV SSO eller invite).

`production`-datasettet er privat, så man må ha riktige tilganger for å kunne lese/jobbe med dataen der.

## Kom i gang

### Bidrag

Branch `master` blir pusher rett til prod -> aksel.nav.no. For å utvikle nye features brukes branch `next` som ved push publiseres til devmiljø aksel.dev.nav.no (krever naisdevice).

### Nettside (localhost:3000)

```
yarn install
yarn workspace aksel.nav.no dev
```

**Rettigheter**

Sanity-datasettet er privat, noe som betyr du må ha tilgang til sanity applikasjonen + følgende token for å få data lokalt:

```
SANITY_PREVIEW_TOKEN
SANITY_PRIVATE_NO_DRAFTS
```

### Sanity (localhost:3333)

> !! Må være developer i https://verktoykasse.sanity.studio, Ta kontakt med team Aksel om du trenger tilgang !!

Husk at alle endringer i datasettet lokalt også gjøres i prod. Bytt derfor til `development`-dataset hvis man vil teste destruktive handlinger. Dette kan endres i `/sanity/schema.json`

```
yarn install
yarn workspace aksel.nav.no sanity
```

**Deploy av ny sanity-oppdatering**

```
yarn workspace aksel.nav.no sanity:deploy
```

### .env

Blir brukt flere keys i .env under `./website`, men kun `SANITY_PRIVATE_NO_DRAFTS` trengs for å teste lokalt

- SANITY_WRITE_KEY:
  For å sende dokumenter til sanity, brukt til å oppdatere sandboxes/examples/farger. Trengs bare hvis kode skal synkes fra lokal branch
- SANITY_PREVIEW_TOKEN: Gir appen tilgang til å lese draft innhold fra sanity i "preview"-mode. Trengs for å teste preview-sider
- SANITY_PRIVATE_NO_DRAFTS: Gir appen tilgang til å lese innhold fra Sanity da datasettet er privat

### Søk

Søk-index blir generert av [algolia-scraper](https://github.com/algolia/docsearch-scraper). Kjøres daglig i en github-action, men kan kjøres lokalt også med docker.

```
docker run -it --env-file=.env -e "CONFIG=$(cat crawler.json | jq -r tostring)" algolia/docsearch-scraper
```

## Backups

Kjøres backups hver 3 dag til GCP-bucket under `designsystem-prod`

## Henvendelser

Spørsmål og kontakt kan rettes til team Aksel

Aksel har også en egen slack-kanal #aksel
