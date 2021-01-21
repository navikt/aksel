# Create-React-App eksempel prosjekt

Er satt opp som et enkelt oppsett som støtter bruk av designsystemet sine komponenter. Er også satt opp for bruk av riktig typografi og basestiler med `nav-frontend-core` og `nav-frontend-typografi-style`

Bruker pakken `Craco` https://www.npmjs.com/package/@craco/craco for å kunne extende Webpack-features uten å ta i bruk `eject`.

Satt opp for å støtte lasting av `less` filer ved hjelp av `craco-less` https://github.com/DocSpring/craco-less#readme.

Prosjektet kjører `pretty-quick` on-`git commit` for automatisk kjøring av prettier, samt linting av js/ts og less on-`git push`.

Development og linting:

```
yarn install
yarn start
```

Bygging for produksjon:

```
yarn install
yarn run build
```

For å kjøre build lokalt kan `serve` brukes:
https://www.npmjs.com/package/serve

```
yarn install -g serve
serve build
```
