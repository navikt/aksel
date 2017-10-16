# NAV-frontend-moduler

NAV-frontend-moduler er et monorepo for alle NAVs felleskomponenter/fellesmoduler.
 
## Bruke moduler
For å ta i bruk en modul sjekk dokumentasjon på [storybooken](https://navikt.github.io/nav-frontend-moduler).


## Bidra med nye komponenter
Det oppfordres til at alle blir med og bidrar med nye moduler slik at mest mulig av fremtidige moduler er å finne her.

### Kom igang
For å komme igang med å lage nye moduler: 
```
git clone git@github.com:navikt/nav-frontend-moduler.git
cd nav-frontend-moduler
npm install
npm start
npm run new
```

**NB!!** Det er aldri behov for å kjøre `npm install` i noen annen mappe enn rot-mappen. 
Om en modul du lager har behov for en npm-pakke som ikke finnes i repoet fra før av, 
så innstaller denne i rot-mappen og legg til avhengigheten som en `peerDependency` i din modul.

#### På NAV-nettet
Om du skal starte prosjektet inne på NAV-nettet så brukes nexus som proxy for npmjs.org. 
Det er derfor nødvendig med litt ekstra config: 
```
npm config set @hypnosphi:registry http://a34apvl062.devillo.no:8082/repository/npm-all/
npm config set @types:registry http://a34apvl062.devillo.no:8082/repository/npm-all/
npm config set @storybook:registry http://a34apvl062.devillo.no:8082/repository/npm-all/
```

#### Kommandoer:
* `npm start` - Starter storybook for utvikling
* `npm run new` - Kjører scaffolding-script

## Kodekvalitet
For å forsikre oss at koden ikke råtner på rot er det satt opp både `eslint` og `lesshint` som begge blir kjørt ved byggetid.
Så langt det lar seg gjøre skal det ikke være endringer på regelsettene til disse uten at det har blitt avklart/diskutert i NAVs frontendforum.

For at dette skal bli håndhevet er `master`-branchen i repoet lukket. Dvs eneste måten å få inn endringer på er gjennom pull-requests. 
For å merge en PR må bygget har kjørt ok, og minst en person godkjent PRen.

For å verifisere at modulene vil fungere for andre er det satt opp to eksempel prosjekt i `examples`-mappen.
Legacy-mappen er satt opp med `browserify` og `lessc`, webpack-mappen har to forskjellige webpack-bygg både med og uten `style-loader`.
Nye moduler blir ikke automatisk satt opp her, men dette kan brukes som en test-rig ved forbedringer på systemet og for å komme igang med å bruke systemet på nye prosjekter. 

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
Det er satt opp ett multibranch-bygg for repoet: *TO BE ANNOUNCED* som bruker pipelinen definert i `Jenkinsfile`.
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

## Licenses and attribution

_For updated information, always see LICENSE first!_

### Font License

The Source Sans Pro font files in `packages/node_modules/nav-frontend-typografi-style/assets` are a subset of
[Source Sans Pro](https://github.com/adobe-fonts/source-sans-pro), licensed under the [SIL Open Font License](http://scripts.sil.org/cms/scripts/page.php?item_id=OFL), and copyright [Adobe Systems Incorporated](http://www.adobe.com/).

### Icon License

This project uses [Streamline Icons](http://www.streamlineicons.com/). If you use nav-frontend-moduler in your project please adhere to the [Streamline Icons license agreement](http://www.streamlineicons.com/license.html).

### The rest of the codebase (excluding 3rd party dependencies)

Copyright (c) 2017 NAV

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
