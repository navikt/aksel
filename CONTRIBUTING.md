# Bidra med utvikling av nye og eksisterende komponenter

VIKTIG: Fra 07.10.20 vil oppsettet i dette repoet bli endret, noe som vil gjøre mye av informasjonen her utdatert. Er det noe du ønsker å bidra med eller gjøre i mellomtiden kan man ta kontakt med designsystemet på slack.

#

Det oppfordres til at alle blir med og bidrar med nye moduler, og holder eksisterende moduler vedlike,
slik at mest mulig av fremtidige moduler er å finne her og fungerer etter de behov som man har i det enkelte prosjekt.

## TL;DR

```bash
git clone git@github.com:navikt/nav-frontend-moduler.git
cd nav-frontend-moduler
yarn boot
yarn storybook
```

[http://localhost:6006](http://localhost:6006) (port auto-incrementeres hvis den allerede er i bruk av en annen server)

## Utviklingsmiljø
Vi tar nå i bruk storybook [https://storybook.js.org/](https://storybook.js.org/) som utviklermiljø.
`yarn storybook` vil starte opp dette miljøet og kan da skrive `stories` for elementene man vil teste [hvordan skrive storybook stories](https://storybook.js.org/docs/react/writing-stories/introduction)

## Utvikling av nye komponenter


**NB!!** Det er aldri behov for å kjøre `npm install` i noen annen mappe enn rot-mappen.
Om en modul du lager har behov for en npm-pakke som ikke finnes i repoet fra før av,
installer denne i rot-mappen og legg til avhengigheten som en `peerDependency` i din modul.

### Bruk av ikoner

Det er laget en egen modul som heter [`nav-frontend-ikoner-assets`](https://github.com/navikt/nav-frontend-moduler/tree/master/packages/nav-frontend-ikoner-assets) som
er ment å brukes internt i frontend-rammeverket av komponenter som trenger ikoner. De forskjellige ikonene som
er tilgjengelige ligger inne som .svg-filer [her](https://github.com/navikt/nav-frontend-moduler/tree/master/packages/nav-frontend-ikoner-assets/assets). Nøkler
til Ikon-komponenten tilsvarer navnene på disse .svg-filene, som kommer fram av kildekoden til `index.js`-filen i `nav-frontend-ikoner-assets`-modulen.

Komponenten kan da f.eks. brukes internt i andre komponenter slik:

```
<Ikon kind="feil-sirkel-fyll" />
```

Videre har vi planer om å publisere en egen ikonpakke med ikoner vi eier [nav-frontend-icons repo](https://github.com/navikt/nav-frontend-icons)

## Dokumentasjon

Når du har laget eller endret på en komponent er det fint om du også dokumenterer dette. Komponentene dokumenteres på to måter:

- Som kommentarer på interface i TypeScript-koden. Dette må være på plass for at tabellen over props skal genereres på komponent-siden på design.nav.no.

Det kan også være lurt å kjøre `yarn start` for å kjøre opp design.nav.no-appen lokalt slik at du kan se hvordan komponenten blir vist fram på nettsiden.

## Kodekvalitet

For å sikre kodekvalitet er det satt opp både `prettier` som kjører for hver commit, samt linter som kjører hvert push

## Kommandoer


### Komponenter

- `yarn install` - installerer alle dependencies og konfigurerer yarn workspaces riktig
- `yarn boot` - bygger alle komponentene 
- `yarn lerna:watch` - watcher alle komponenten for hot-reloading av endringer
- `yarn lint` - Kjører diverse lintere på kode og styling
- `yarn storybook` - starter opp utviklingsmiljø for storybook



### Nettside
- `yarn start` - starter opp gatsby nettsiden lokalt
- `yarn build:gatsby` - bygger gatsby nettsiden lokalt
- `yarn serve` - server bygd gatsby nettside på localhost:9000



## Byggemiljø

Det er satt opp [Github actions](https://github.com/navikt/nav-frontend-moduler/actions) for repoet.
Pull-requests bygges derfor automatisk med en gang de pushes til remote.

### Byggesteg

Se [build-publish.yml](https://github.com/navikt/nav-frontend-moduler/blob/master/.github/workflows/build-publish.yml).
