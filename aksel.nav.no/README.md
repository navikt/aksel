CMS og nettside for [aksel.nav.no](https://aksel.nav.no/)

```sh
├── /website        # NEXT.JS app (v13)
└── /website/sanity # Sanity CMS-app (v3)
```

### /website

[Nextjs](https://nextjs.org/) applikasjon som henter data fra et [sanity-datasett](https://www.sanity.io/).

### /website/sanity

Det publiserte studioet finner man på [aksel.nav.no/admin](https://aksel.nav.no/admin)(krever NAV SSO for innlogging).

`production`-datasettet er privat, så man må ha riktige tilganger for å kunne lese/jobbe med dataen der.

## Kom i gang

### Bidrag

Branch `main` pusher rett til prod -> aksel.nav.no. For å utvikle nye features kan branch `next` brukes, som ved push publiseres til devmiljø https://aksel.ekstern.dev.nav.no/. Kan også publisere andre branches til dev ved bruk av workflow-dispatch.

## Kode-eksempler

Alle eksemplene våre ligger under `/website/pages/eksempler` og `/website/pages/templates`. For å se endringene live kan man starte opp storybook med `yarn storybook:aksel`.

> Du trenger ikke secrets for å teste storybook

### Nettside (localhost:3000)

```bash
// dev
yarn install
yarn dev

// prod
yarn build:next
yarn serve:next
```

**Rettigheter**

Sanity-datasettet er privat, noe som betyr du må ha tilgang til sanity applikasjonen + følgende token for å få data lokalt:

```env
SANITY_READ
SANITY_READ_NO_DRAFTS
```

### .env

Blir brukt flere keys i .env under `./website`, men kun `SANITY_READ_NO_DRAFTS` trengs for å teste lokalt

- SANITY_WRITE:
  For å sende dokumenter til sanity, brukt til å oppdatere sandboxes/examples/farger. Trengs bare hvis kode skal synkes fra lokal branch/teste feedback-løsning
- SANITY_READ: Gir appen tilgang til å lese draft innhold fra sanity i "preview"-mode. Trengs for å teste ikke publiserte-sider
- SANITY_READ_NO_DRAFTS: Gir appen tilgang til å lese innhold fra Sanity da datasettet er privat

## Backups

Kjøres backups hver 3 dag til GCP-bucket under `designsystem-prod`

## Henvendelser

Spørsmål og kontakt kan rettes til team Aksel

Aksel har også en egen Slack-kanal `#aksel-designsystemet`
