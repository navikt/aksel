# Bidra med utvikling av nye og eksisterende komponenter

Det oppfordres til at alle blir med og bidrar med nye moduler, og holder eksisterende moduler vedlike, 
slik at mest mulig av fremtidige moduler er å finne her og fungerer etter de behov som man har i det enkelte prosjekt.

## TL;DR
```bash
git clone git@github.com:navikt/nav-frontend-moduler.git
cd nav-frontend-moduler
npm install
npm start
```

[http://localhost:8080](http://localhost:8080) (port auto-incrementeres hvis den allerede er i bruk av en annen server)

## Utviklingsmiljø
Det er opprettet et eget utviklingsmiljø under `/development` på prosjektrot, som er en helt enkel React-app
som kjøres opp med `npm start`. Appen blir kjørt opp med webpack-dev-server.

Se kommentarene i `/development/app/components/App.js` for mer info.

## Utvikling av nye komponenter
For å raskt komme igang med å lage nye moduler, er det laget et scaffolding-script som kan kjøres for å få
en fiks ferdig struktur som er konsistent med hvordan eksisterende modulene er bygd opp fra før, slik at du
kan fokusere på kodingen av komponenten du skal lage.

Dette scaffolding-scriptet kjøres opp med ```npm run new```.

**NB!!** Det er aldri behov for å kjøre `npm install` i noen annen mappe enn rot-mappen. 
Om en modul du lager har behov for en npm-pakke som ikke finnes i repoet fra før av, 
installer denne i rot-mappen og legg til avhengigheten som en `peerDependency` i din modul.

### Bruk av ikoner
Det er laget en egen modul som heter [`nav-frontend-ikoner-assets`](https://github.com/navikt/nav-frontend-moduler/tree/master/packages/node_modules/nav-frontend-ikoner-assets) som
er ment å brukes internt i frontend-rammeverket av komponenter som trenger ikoner. De forskjellige ikonene som 
er tilgjengelige ligger inne som .svg-filer [her](https://github.com/navikt/nav-frontend-moduler/tree/master/packages/node_modules/nav-frontend-ikoner-assets/assets). Nøkler 
til Ikon-komponenten tilsvarer navnene på disse .svg-filene, som kommer fram av kildekoden til `index.js`-filen i `nav-frontend-ikoner-assets`-modulen.

Komponenten kan da f.eks. brukes internt i andre komponenter slik:

```
<Ikon kind="feil-sirkel-fyll" />
```

Nye ikoner legges til som SVG-filer i samme mappe. Husk å kjør `npm run buildicons` og deretter `gulp buildJs` etterpå for å re-generere `index.js`-filen i `nav-frontend-ikoner-assets` slik at nøklene blir oppdatert.

## Dokumentasjon
Når du har laget eller endret på en komponent er det fint om du også dokumenterer dette. Komponentene dokumenteres på to måter: 

- Som kommentarer på interface i TypeScript-koden. Dette må være på plass for at tabellen over props skal genereres på komponent-siden på design.nav.no.
- Som `.md(x)`-filer i pakken. Les mer om [hvordan disse funker her](https://github.com/navikt/nav-frontend-moduler/blob/master/guideline-app/CONTRIBUTING.md).

Det kan også være lurt å kjøre `npm run start-guideline-app` for å kjøre opp design.nav.no-appen lokalt slik at du kan se hvordan komponenten blir vist fram på nettsiden.

## Kodekvalitet
For å sikre kodekvalitet er det satt opp både `tslint` og `lesshint` som blir kjørt ved byggetid.
Så langt det lar seg gjøre skal det ikke være endringer på regelsettene til disse uten at det har 
blitt avklart/diskutert i NAVs frontendforum.

For at dette skal bli håndhevet er `master`-branchen i repoet lukket. Det vil si at den 
eneste måten man får inn endringer på er gjennom pull-requests. For å merge en PR må bygget 
har kjørt ok, og minst èn fra [CODEOWNERS](https://github.com/navikt/nav-frontend-moduler/blob/master/CODEOWNERS) må ha godkjent PRen.

## Kommandoer
* `npm run lint` - kjører linting av TypeScript og LESS
* `npm run ts:lint` - kjører linting av TypeScript
* `npm run less:lint` - kjører linting av LESS
* `npm run checkversions` - sjekker at avhengighetene til modulene er de 
samme som er definert i rot-mappen

## Andre kommandoer
* `npm run start-guideline-app` - Starter opp utviklingsmiljø for utvikling av Guideline-appen`
* `npm run build-guideline-app` - Bygger Guideline-appen til `/guideline-app/dist`
* `npm run build` - Bygger alle JS-filer
* `npm run buildfonts` - Bygger alle font-filer (Lager css-filer med base64 inlinet fonter)
* `npm run buildicons` - Bygger opp react-komponenten utifra svg'ene i ikon-pakken
* `npm run create` - Samme som `npm run new`
* `npm run dev` - Samme som `npm start`
* `npm run watch` - Samme som `npm start`

## Bruk av TypeScript

Når man kjører guidelineappen eller eksempelappen, så blir ikke filer skrevet i 
TypeScript (.ts og .tsx filer) kompilert automatisk. Det anbefales å kjøre en 
typescriptkompiler i et separat konsoll. Hvis man for eksempel jobber med 
filen `bekreft-checkboks-panel.tsx`, så kan man kjøre disse kommandoene for 
å få automatisk filene transpilert til javascript.

* `npm install typescript -g`
* `cd nav-frontend-moduler\packages\node_modules\nav-frontend-skjema`
* `tsc -w -d src/bekreft-checkboks-panel.tsx --jsx react --outDir lib`

## Byggemiljø
Det er satt opp et [Travis-bygg](https://travis-ci.org/navikt/nav-frontend-moduler) for repoet.
Pull-requests bygges derfor automatisk med en gang de pushes til remote.

### Byggesteg
Se [.travis.yml](https://github.com/navikt/nav-frontend-moduler/blob/master/.travis.yml).

## Scripts
Det ligger flere hjelpe-scripts i mappen `_scripts`. 

* `bumpall.js` - Utility script for å bumpe versjons-nummer på alle pakkene manuelt. 
* `verifyPkgDependencies.js` - sjekker at avhengighetene til modulene er de samme som er definert i rot-mappen. Blir kjørt av `npm run checkversions`
* `fixDependencyVersions.js` - forsøker etter beste evne å fikse feilene rapportert av `verifyPkgDependencies.js`
* `scaffold.js` - scaffolding-script for å lage nye moduler
* `lesshint-reporter.js` - custom reporter for lesshint slik at feil derifra også ser pene ut
* `generateReadmes.js` - genererer README.md-filer for hver modul basert på template i DISCLAIMER.md samt modulens 
peerDependencies

## Scaffolding
Scaffolding kjørt via `npm run new` bruker `_scripts/scaffold.js` og templatene 
finnes i `_templates`.

Det er satt opp `mustache` som templateing-engine. Denne er konfigurert opp til å 
bruke `'<%'` og `'%>'` som delimiters slik at det ikke blir problemer med annen kode.

Scaffolding-scriptet kommer med ett sett av predefinerte variabler basert på modul-navnet.
* `name.original`
* `name.capitalize`
* `name.camelcase`
* `name.kebabcase`
* `name.cssname`

For å automatisk sette riktig versjon på dependencies kan `resolve`-metoden brukes, 
denne henter da ut versjonen sånn som den er satt i rot-mappen.
```
"dependencies": {
    "react": "<%#resolve%>react<%/resolve%>"
}
```
