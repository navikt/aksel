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

