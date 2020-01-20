# Endringslogg

> **Obs!** Denne endringsloggen blir manuelt og uregelmessig oppdatert, og er hovedsakelig ment som en grov retrospektiv oppsummering for både tekniske og ikke-tekniske lesere. Det kan dermed ta en stund før publiserte endringer blir loggført her. For å se de siste faktiske endringene kan du ta en titt på [commit-historikken](https://github.com/navikt/nav-frontend-moduler/commits/master), [PR-historikken](https://github.com/navikt/nav-frontend-moduler/pulls?q=is%3Apr+is%3Aclosed) og/eller [release-oversikten](https://github.com/navikt/nav-frontend-moduler/releases) for NPM-pakkene våre.

## 18. januar 2020 

### [Den Store Skjema-oppdateringen™](https://gist.github.com/Lillebo/7394a6e491d479795a6418d93bff638c)

:point_up: den, pluss:

### Nye komponenter

* Popover: https://design.nav.no/components/popover

### Endringer

* Fikset slik at `Etikett` utvider `HTMLDivElement`: https://github.com/navikt/nav-frontend-moduler/pull/575 Takk til [@hakonph](https://github.com/hakonph) :tada:
* Fikset støtte for ikoner i Lenke: https://github.com/navikt/nav-frontend-moduler/pull/579 Takk til [@unorsk](https://github.com/unorsk) :tada:
* Endret farge på valgt rad i Tabell: https://github.com/navikt/nav-frontend-moduler/pull/580
* Fikset støtte for å fortsatt rendre skjult innhold i EkspanderbartPanel: https://github.com/navikt/nav-frontend-moduler/pull/585 Takk til [@frodehansen2](https://github.com/frodehansen2) :tada:
* Fikset støtte for `className` i Tekstomrade: https://github.com/navikt/nav-frontend-moduler/pull/590 Takk til [@alexander-svendsen](https://github.com/alexander-svendsen) :tada:
* Fikset støtte for `className` i EkspanderbartPanel: https://github.com/navikt/nav-frontend-moduler/pull/594 Takk til [@kjesvale](https://github.com/kjesvale) :tada:
* Forenklet skjermleser-tekst på lukknapp i Modal: https://github.com/navikt/nav-frontend-moduler/pull/612 Takk til [@frederikgdl](https://github.com/frederikgdl) :tada:
* Fikset bortskriving fra `componentWillReceiveProps` i Popover: https://github.com/navikt/nav-frontend-moduler/pull/617 Takk til [@havstein](https://github.com/havstein) :tada:
* Oppdatert LICENSE: https://github.com/navikt/nav-frontend-moduler/pull/619 Takk til [@erlendev](https://github.com/erlendev) :tada:
* Lagt til blå "info"-variant av Veilederpanel: https://github.com/navikt/nav-frontend-moduler/pull/620 Takk til [@jhnav](https://github.com/jhnav) :tada:
* Lagt til kontaktinformasjon for forslag til endringer i språk-retningslinjer: https://github.com/navikt/nav-frontend-moduler/pull/623 Takk til [@mariannefriess](https://github.com/mariannefriess) :tada:
* Publisert ny versjon av Sketch-bibliotek med en rekke bugfikser og oppdatering til Sketch Smart Layout: https://github.com/navikt/nav-frontend-moduler/pull/624 Takk til [@vikingwind](https://github.com/vikingwind) :tada:
* Publisert ny versjon av Ikon-bibliotek som inneholder hele ikon-pakken fremfor bare et utvalg: https://github.com/navikt/nav-frontend-moduler/pull/631 Takk til [@vikingwind](https://github.com/vikingwind) :tada:

### Bugfikser

* Fikset type for `onChange` prop på Textarea: https://github.com/navikt/nav-frontend-moduler/pull/578 Takk til [@hakonph](https://github.com/hakonph) :tada:
* Fikset type for `inputRef` prop på Input: https://github.com/navikt/nav-frontend-moduler/pull/593 Takk til [@mijohansen](https://github.com/mijohansen) :tada:
* Fikset avhengighet til React-versjon i Popover, Hjelpetekst
* Fikset feil på posisjonering av Popover i IE11: https://github.com/navikt/nav-frontend-moduler/pull/611 Takk til [@frederikgdl](https://github.com/frederikgdl) :tada:
* Fikset type for `checkboxRef` prop på Checkbox: https://github.com/navikt/nav-frontend-moduler/pull/615 Takk til [@nutgaard](https://github.com/nutgaard) :tada:
* Fikset en bug der skjult tekst som kun er ment for skjermlesere likevel ble synlig i Hjelpetekst og Knapp: https://github.com/navikt/nav-frontend-moduler/pull/624
* Fikset slik at `className` ikke er påkrevd i Grid Row: https://github.com/navikt/nav-frontend-moduler/pull/630 Takk til [@AndreasDybdahl](https://github.com/AndreasDybdahl) :tada:
* Fikset støtte for `className` prop i Snakkeboble: https://github.com/navikt/nav-frontend-moduler/pull/638 Takk til [@andersnav](https://github.com/andersnav) :tada:

## 15. oktober 2019

### Nye komponenter

* Tabell: https://design.nav.no/components/tabell
* Ikonknapper: https://design.nav.no/components/ikonknapper

### Endringer

* Fikset støtte for publisering og markering av "beta"-pakker på design.nav.no
* Fikset støtte for å liste opp og vise frem rene "style"-pakker i komponentoversikten på design.nav.no
* Muligheten for å bare innstallere "style"-pakkene har blitt litt tydeligere under "Teknisk" på komponent-sidene
* Fikset støtte for ikoner i knapper: https://design.nav.no/components/knapp#med-ikon
* Fikset aria-varsling og rød markering på tekst-teller når Textarea får for mange tegn: https://github.com/navikt/nav-frontend-moduler/pull/548
* Fikset støtte for React 17.0+ i Ekspanderbartpanel: https://github.com/navikt/nav-frontend-moduler/pull/541 Takk til [@erlend-axelsson](https://github.com/@erlendaxelsson) :tada:
* Fikset støtte for å bruke knappe-stiler på lenker: https://github.com/navikt/nav-frontend-moduler/pull/532
* Tegnbegrensning på Textarea er nå valgfri: https://github.com/navikt/nav-frontend-moduler/pull/490 Takk til [@hakonph](https://github.com/hakonph) :tada:

### Sider publisert på design.nav.no

* Oppdaterte språk-sider: https://design.nav.no/resources/language Takk til [@mariannefriess](https://github.com/mariannefriess) :tada:
* Tilgjengelighet: https://design.nav.no/accessibility
* Prinsipper for brukeropplevelse på interne flater: https://design.nav.no/resources/internal-ux-principles Takk til Hanna Sofia Hogberg og @ElinNav og alle andre som bidro :tada:
* Subdomener: https://design.nav.no/resources/subdomains Takk til Tov Are Jacobsen og Petter Hafskjold :tada:
* Grid: https://design.nav.no/resources/grid
* Typografi: https://design.nav.no/resources/typography

### Bugfikser

* Fikset en gammel og plagsom bug med dårlig font-rendering i Chrome på Windows: https://github.com/navikt/nav-frontend-moduler/pull/557 Takk til @unorsk :tada:
* Fikset en bug hvor knapper med 100% bredde fikk venstrejustert innhold: https://github.com/navikt/nav-frontend-moduler/pull/532 Takk til @winsvold :tada:
* Fikset en bug hvor Textarea av og til kunne oppta dobbelt så mye plass som det trengte: https://github.com/navikt/nav-frontend-moduler/pull/530
* Fikset syntax-feil i scaffolding-script: https://github.com/navikt/nav-frontend-moduler/pull/523
* Fikset visuell bug hvor spinner forsvant på knapper med fokus: https://github.com/navikt/nav-frontend-moduler/pull/498
