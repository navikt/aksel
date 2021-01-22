# react-module: nav-frontend-ekspanderbartpanel

<!-- AUTO-GENERATED-CONTENT:START (INSTALL) -->

### Installering:

```
npm install @types/react-collapse classnames lodash.throttle nav-frontend-chevron-style nav-frontend-core nav-frontend-ekspanderbartpanel nav-frontend-ekspanderbartpanel-style nav-frontend-js-utils nav-frontend-paneler-style nav-frontend-typografi-style prop-types react react-collapse --save
```

<!-- AUTO-GENERATED-CONTENT:END *-->

### Bruk

Ekspanderbartpanel kommer i to former; `self-container` og `pure`.

Default export er `self-contained`, og vil selv håndtere `apen`-state og toggle denne når man klikker på panelet.
`Pure` er for de som bruker redux, og vil ha staten til panelet inn der. Her må propen `apen` alltid sendes med.

## Bruke self-contained

Denne er grei om man ikke har en statemanagement på plass (e.g ikke bruker `redux` eller annet)
Legg til `import EkspanderbartPanel from 'nav-frontend-ekspanderbartpanel'`

## Bruke pure

Bruker man `redux` har man mulighet til å lagre staten der, og kan (om man vil) bruke en `pure` versjon av panelet.
Da må man selv alltid sende inn `apen`-propen.

Legg til `import { EkspanderbartpanelPure } from 'nav-frontend-ekspanderbartpanel'`

<!-- AUTO-GENERATED-CONTENT:START (DISCLAIMER) -->

### Disclaimer:

NPM-pakken(e) publisert av NAV IT er midlertidig unscoped'e,
men vil bli prefikset og scopet med @navikt i fremtiden. Vi
gjør oppmerksom på at npm-pakkene i følgende lenke,
og _kun_ disse npm-pakkene, er forvaltet og publisert offisielt av NAV IT:

https://www.npmjs.com/org/navikt

Oppdatert liste over gyldige pakker ligger til enhver tid beskrevet her.

NAV IT tar ikke ansvar for eventuell bruk av annen programvare som
fremstilles som om de skulle vært publisert av NAV.

Vi refererer ellers til MIT-lisensen som ligger vedlagt i repository:
https://github.com/navikt/nav-frontend-moduler/tree/master/packages/node_modules/nav-frontend-ekspanderbartpanel

<!-- AUTO-GENERATED-CONTENT:END *-->
