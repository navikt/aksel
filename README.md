# NAV-frontend-moduler

NAV-frontend-moduler er ett monorepo for alle NAVs felleskomponenter/fellesmoduler.
 
## Bruke moduler
For å ta i bruk en modul sjekk dokumentasjon på [storybooken](http://cisbl.devillo.no:8000).


## Bidra med nye komponenter
Det oppfordres til at alle blir med å bidrar med nye modul slik at mest mulig av fremtidige moduler er å finne her.

### Kom igang
For å komme igang med å lage nye moduler: 
```
git clone ssh://git@stash.devillo.no:7999/navfront/nav-frontend-moduler.git
cd nav-frontend-moduler
npm run installAfterConfig
npm start
npm run new
```

**NB!!** `npm install` vil per i dag ikke fungere pga gammel nexus versjon her på huset.
`npm run installAfterConfig` setter opp `npm` slik at visse pakker blir hentet av nexus på test-servere. 
Når nexus blir oppgradert til 3.x.x kan konfigurasjonen fjernes, og `npm install` vil fungere som forventet.

**NB!!** Det er aldri behov for å kjøre `npm install` i noen annen mappe enn rot-mappen. 
Om en modul du lager har behov for en npm-pakke som ikke finnes i repoet fra før av, 
så innstaller denne i rot-mappen og legg til avhengigheten som en `peerDependency` i din modul.

#### Kommandoer:
* `npm start` - Starter storybook for utvikling
* `npm run new` - Kjører scaffolding-script

## Kodekvalitet
For å forsikre oss at koden ikke rotner på rot er det satt opp både `eslint` og `lesshint` som begge blir kjørt ved byggetid.
Så langt det lar seg gjøre skal det ikke være endringer på regelsettene til disse uten at det har blitt avklart/diskutert i NAVs frontendforum.

For at dette skal bli håndhevet er `master`-branchen i repoet lukket. Dvs eneste måten å få inn endringer på er gjennom pull-requests. 
For å merge en PR må bygget har kjørt ok, og minst en persjon godkjent PRen.

For å verifisere at modulene vil fungere for andre er det satt opp to eksempel prosjekt i `examples`-mappen.
Legacy-mappen er satt opp med `browserify` og `lessc`, webpack-mappen har to forskjellige webpack-bygg både med og uten `style-loader`.
Nye moduler blir ikke automatisk satt opp her, men dette kan brukes som en test-rig ved forbedringer på systemet. 

**NB** her må man faktisk kjøre `npm install` i de to mappene.. :O

### Kommandoer:
* `npm run lint` - kjører linting av JS og LESS
* `npm run js:lint` - kjører linting av JS
* `npm run less:lint` - kjører linting av LESS
* `npm test` - kjører tester
* `npm run checkversions` - sjekker at avhengighetene til modulene er de samme som er definert i rot-mappen

## Andre kommandoer
* `npm run publishAlpha` - Publisering av alpha-versjoner av alle moduler. **NB!!** Husk å lage en commit før denne kjøres
* `npm run create` - Samme som `npm run new`
* `npm run build` - Bygger alle JS-filer
* `npm run buildfonts` - Bygger alle font-filer (Lager css-filer med base64 inlinet fonter)
* `npm run dev` - Samme som `npm start`
* `npm run watch` - Samme som `npm start`


## Byggemiljø
Det er satt opp ett multibranch-bygg for repoet: http://cisbl.devillo.no/job/nav-frontend-moduler/ som bruker pipelinen definert i `Jenkinsfile`.
Alle branches bygges derfor automatisk med en gang de pushes til stash.

### Byggesteg på `master`
1. git checkout
2. innstaller avhengigheter
3. kodekvalitet og tester
4. bygg JS-filer
5. publiser moduler
6. sett app-config versjon
7. bygg storybook
8. push git-tags og app-config artifakt
9. bygg docker-image
10. bestill deploy

Hvis det oppdages at ingen moduler er endret (steg 5) vil byggejobben stoppe der.

### Byggesteg på andre branches
1. git checkout
2. merge med master
3. innstaller avhengigheter
4. kodekvalitet og tester
5. bygg JS-filer

## Scripts
Det ligger flere hjelpe-scripts i mappen `_scripts`. 

* `verifyPkgDependencies.js` - sjekker at avhengighetene til modulene er de samme som er definert i rot-mappen. Blir kjørt av `npm run checkversions`
* `fixDependencyVersions.js` - forsøker etter beste evne å fikse feilene rapportert av `verifyPkgDependencies.js`
* `scaffold.js` - scaffolding-script for å lage nye moduler
* `lesshint-reporter.js` - custom reporter for lesshint slik at feil derifra også ser pene ut

## Scaffolding
Scaffolding kjørt via `npm run new` bruker `_scripts/scaffold.js` og templatene finnes i `_templates`.

Det er satt opp `mustache` som templateing-engine. Denne er konfigurert opp til å bruke `'<%'` og `'%>'` som delimiters slik at det ikke blir problemer med annen kode.

Scaffolding-scriptet kommer med ett sett av predefinerte variabler basert på modul-navnet.
* `name.original`
* `name.capitalize`
* `name.camelcase`
* `name.kebabcase`
* `name.cssname`

For å automatisk sette riktig versjon på dependencies kan `resolve`-metoden brukes, denne henter da ut versjonen sånn som den er satt i rot-mappen.
```
"dependencies": {
    "react": "<%#resolve%>react<%/resolve%>"
}
```