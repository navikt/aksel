# Create-React-App eksempel prosjekt

Bruker pakken `Craco` https://www.npmjs.com/package/@craco/craco for å kunne extende Webpack-features uten å ta i bruk `eject`.

Satt opp for å støtte lasting av `less` filer ved hjelp av `craco-less` https://github.com/DocSpring/craco-less#readme.


Development og linting:
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

For å kjøre build lokalt kan `serve` brukes:
https://www.npmjs.com/package/serve
```
npm install -g serve
serve build
```