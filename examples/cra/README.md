# Eksempel oppsett med create-react-app

Denne mappen inneholder ett eksempel prosjekt laget med create-react-app.

Hoved endringene som er gjort finnes i [package.json](package.json), hvor `autoless` og `npm-run-all` blir brukt for å sette opp less bygget.
I tillegg håndteres import av nav-frontend-moduler sine styling-moduler i [index.less](src/index.less) siden CRA ikke støtter LESS-imports.


## NB
Man må alltid laste inn css-filene fra react-komponentene, siden CRA ikke støtter LESS. Se [App.js](src/App.js)


## Hvordan fungerer det?

Ved utvikling startes to npm-scripts i parallell:

    * `start:js` lytter etter endringer i JS/CSS og lager ny bundle
    * `start:css` lytter etter endringer i LESS, og lager CSS-filer
    
Endringer i LESS-filer vil derfor bygges om til CSS forløpende, og default-oppsettet til CRA plukker så disse opp.

## Obs obs, Nedetid

Vær obs på at filnavnene CRA lager er av typen main.[hash].[js|css](eks: main.23fe21.js). Dette betyr at hvis disse filene blir sendt fra en server kjørende på nais klusteret, hvor ikke også den gamle versjonen av frontend appen også ligger klar på i samme nais app, så vil appen ha nedetid. 

Grunnen til dette er fordi nais tar først ned en app, så opp en ny en så ned de andre, så opp de nye. Hvis en bruker prøver å åpne appen din mens en deploy skjer:
   - Bruker prøver å åpne appen. Får index.html med en referanse til main.v1.js
   - Nais tar ned den gamle appen. Her ligger index.html med en referanse til main.v2.js
   - Bruker prøver nå å hente main.v1.js, men denne finnes ikke på den nye versjonen av appen
   - Bruker får 404

For å løse dette så må filene bytte navn til å være statiske. Som f.eks -> main.js og main.css

Eller så kan du bruke oppsettet du finner her: https://github.com/navikt/create-react-app-craco-template
