# Webpack eksempel prosjekt

Satt opp til å bruke `webpack` med to forskjellige konfigurasjoner, med og uten `style-loader`.

For å sjekke om alt er ok kjør; 
```
npm install
npm run build
```

## Quirks

**Med style-loader**: 
For at less-filene skal kompilere må to globale variabler være definert: `nodeModulesPath` og `coreModulePath`.
Med webpacks `style-loader` kan dette gjøres i `webpack.config.js` på følgende måte:
 
```
{ test: /\.less$/, loader: ['style-loader', 'css-loader', 'less-loader?{"globalVars":{"nodeModulesPath":"\'./../../\'", "coreModulePath":"\'./../../\'"}}'] }
```

**Uten style-loader**:
Det antas at det da brukes `lessc` for kompileringen av less-filene, og oppsettet blir tilsvarende som for legacy-eksemplet.

## Bilder og ikoner
Ikonene ligger i pakken nav-frontend-ikoner-assets, webpack løsninger kan her bruke følgende syntaks for å hente bilder i JS-koden.

```
const HakeIkon = require('file-loader!nav-frontend-ikoner-assets/assets/stegindikator__hake.svg');
```

Den mest komplette løsningen er fortsatt å kopiere over ikonene til en lokal mappe under byggestegene, da er det lettere å ta ibruk i CSS også.
(Det finnes loaders til webpack som løser dette, men ikke testet ut her.)