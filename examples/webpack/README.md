# Webpack eksempel prosjekt

Satt opp for å støtte lasting av `.less`, samt `png|jpeg|gif|svg`.

Development med hot-reloading og linting:

```
npm install
npm run lint
npm start
```

Bygging for produksjon:

```
npm install
npm run build
```

Bruker `copyfiles` for å kopiere `index.html` til `/dist`
https://www.npmjs.com/package/copyfiles

```
npm install -g copyfiles
```

For å kjøre build lokalt kan `serve` brukes:
https://www.npmjs.com/package/serve

```
npm install -g serve
serve dist
```
