# Webpack eksempel prosjekt

Er satt opp som et enkelt oppsett som støtter bruk av designsystemet sine komponenter. Er også satt opp for bruk av riktig typografi og basestiler med `nav-frontend-core` og `nav-frontend-typografi-style`

Prosjektet kjører `pretty-quick` on-`git commit` for automatisk kjøring av prettier, samt linting av js/ts og less on-`git push`.

Development med hot-reloading og linting:

```
yarn install
yarn start
```

Bygging for produksjon:

```
yarn install
yarn run build
```

Bruker `copyfiles` for å kopiere `index.html` til `/dist`
https://www.npmjs.com/package/copyfiles

```
yarn install -g copyfiles
```

For å kjøre build lokalt kan `serve` brukes:
https://www.npmjs.com/package/serve

```
yarn install -g serve
serve dist
```
