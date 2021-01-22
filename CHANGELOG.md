# Endringslogg

## 04. desember 2020

### Element for sortering av tabell endres

[#893](https://github.com/navikt/nav-frontend-moduler/pull/893)

- ✅ `<button aria-label="Sorter column synkende">`
- ❌ `<Lenke href="#">`

- Hover og fokusmarkering for element er endret, samt plassering av chevron [Eksempel](https://design.nav.no/components/tabell#sorterbar-tabell)

Hvordan ta i bruk oppdateringen:

- Oppdater `nav-frontend-tabell-styles` til v1.0.0
- Legge til pakken `nav-frontend-knapper-style` som nå er en dependency.
- Endre all bruk av `<Lenke>` i sortert tabell til `<button>`. Kan være lurt å lese de nye punktene her [tabell-UU](https://design.nav.no/components/tabell/accessibility) også da.
- Sikre at prosjektet ditt kan håndtere SVG, da chevrons nå er svg og ikke css. Create-react-app gjør dette selv. Om du bruker webpack er dette den mest vanlige løsningen: [npmjs @svgr/webpack](https://www.npmjs.com/package/@svgr/webpack). Om du bruker VUE er dette en potensiell løsning [npmjs vue-svg-loader](https://www.npmjs.com/package/vue-svg-loader)

## 08. Januar 2021

### Oppdatert RadioPanel med prop radioRef

[Pull-request](https://github.com/navikt/nav-frontend-moduler/pull/943)

Kan nå sette ref på RadioPanel
[Dokumentasjon](http://localhost:8000/components/radiopanelgruppe/#bruk-av-radioref)

## 04. Januar 2021

### Oppdaterte Alertstripe komponent for bedre UU

[Pull-request](https://github.com/navikt/nav-frontend-moduler/pull/940)

SVG-ikonene Alertstripe brukte har nå `role="img"` og `aria-label` for å fikse
[WCAG 2.1 SC 1.1.1](https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html)

### Fikset Math kalkulering for LESS v4

[Pull-request](https://github.com/navikt/nav-frontend-moduler/pull/937)

- Chevron mixin kalkulerte `Floor` uten parentes rundt intern kalkulering, noe LESS v4 ikke taklet.

### Oppdatert eksempel-prosjekt for CRA og Webpack

[Pull-request](https://github.com/navikt/nav-frontend-moduler/pull/931)

- Oppdatert til nyeste CRA
- Oppdatert til enklere eslint config
- Satt opp prettier, pretty-quick og stylelint
- Satt opp husky for commit og push (v4)
- Begge bruker nå nav-frontend-core for scaffolding by default

## 21. Desember 2020

### Fikset mixins for LESS v4

[Pull-request](https://github.com/navikt/nav-frontend-moduler/pull/930)

- LESS v4 krever at alle mixins må bli brukt med parentes.

`.skjemaelement__input;` ❌

`.skjemaelement__input();` ✅

## 14. Desember 2020

### Endringer Chevron

[Pull-request](https://github.com/navikt/nav-frontend-moduler/pull/916)

- Endret implementasjon til å bruke `<span>` over `<i>` da dette var sett på som dårlig praksis.
- Bumpet Chevron stilpakke til v1 da ingen større endringer vil treffe denne fremmover.

## 18. januar 2020

### [Den Store Skjema-oppdateringen™](https://gist.github.com/Lillebo/7394a6e491d479795a6418d93bff638c)

:point_up: den, pluss:

### Nye komponenter

- Popover: https://design.nav.no/components/popover

### Endringer

- Fikset slik at `Etikett` utvider `HTMLDivElement`: [#575](https://github.com/navikt/nav-frontend-moduler/pull/575) Takk til [@hakonph](https://github.com/hakonph) :tada:
- Fikset støtte for ikoner i Lenke: [#579](https://github.com/navikt/nav-frontend-moduler/pull/579) Takk til [@unorsk](https://github.com/unorsk) :tada:
- Endret farge på valgt rad i Tabell: [#580](https://github.com/navikt/nav-frontend-moduler/pull/580)
- Fikset støtte for å fortsatt rendre skjult innhold i EkspanderbartPanel: [#585](https://github.com/navikt/nav-frontend-moduler/pull/585) Takk til [@frodehansen2](https://github.com/frodehansen2) :tada:
- Fikset støtte for `className` i Tekstomrade: [#590](https://github.com/navikt/nav-frontend-moduler/pull/590) Takk til [@alexander-svendsen](https://github.com/alexander-svendsen) :tada:
- Fikset støtte for `className` i EkspanderbartPanel: [#594](https://github.com/navikt/nav-frontend-moduler/pull/594) Takk til [@kjesvale](https://github.com/kjesvale) :tada:
- Forenklet skjermleser-tekst på lukknapp i Modal: [#612](https://github.com/navikt/nav-frontend-moduler/pull/612) Takk til [@frederikgdl](https://github.com/frederikgdl) :tada:
- Fikset bortskriving fra `componentWillReceiveProps` i Popover: [#617](https://github.com/navikt/nav-frontend-moduler/pull/617) Takk til [@havstein](https://github.com/havstein) :tada:
- Oppdatert LICENSE: [#619](https://github.com/navikt/nav-frontend-moduler/pull/619) Takk til [@erlendev](https://github.com/erlendev) :tada:
- Lagt til blå "info"-variant av Veilederpanel: [#620](https://github.com/navikt/nav-frontend-moduler/pull/620) Takk til [@jhnav](https://github.com/jhnav) :tada:
- Lagt til kontaktinformasjon for forslag til endringer i språk-retningslinjer: [#623](https://github.com/navikt/nav-frontend-moduler/pull/623) Takk til [@mariannefriess](https://github.com/mariannefriess) :tada:
- Publisert ny versjon av Sketch-bibliotek med en rekke bugfikser og oppdatering til Sketch Smart Layout: [#624](https://github.com/navikt/nav-frontend-moduler/pull/624) Takk til [@vikingwind](https://github.com/vikingwind) :tada:
- Publisert ny versjon av Ikon-bibliotek som inneholder hele ikon-pakken fremfor bare et utvalg: [#631](https://github.com/navikt/nav-frontend-moduler/pull/631) Takk til [@vikingwind](https://github.com/vikingwind) :tada:

### Bugfikser

- Fikset type for `onChange` prop på Textarea: [#578](https://github.com/navikt/nav-frontend-moduler/pull/578) Takk til [@hakonph](https://github.com/hakonph) :tada:
- Fikset type for `inputRef` prop på Input: [#593](https://github.com/navikt/nav-frontend-moduler/pull/593) Takk til [@mijohansen](https://github.com/mijohansen) :tada:
- Fikset avhengighet til React-versjon i Popover, Hjelpetekst
- Fikset feil på posisjonering av Popover i IE11: [#611](https://github.com/navikt/nav-frontend-moduler/pull/611) Takk til [@frederikgdl](https://github.com/frederikgdl) :tada:
- Fikset type for `checkboxRef` prop på Checkbox: [#615](https://github.com/navikt/nav-frontend-moduler/pull/615) Takk til [@nutgaard](https://github.com/nutgaard) :tada:
- Fikset en bug der skjult tekst som kun er ment for skjermlesere likevel ble synlig i Hjelpetekst og Knapp: [#624](https://github.com/navikt/nav-frontend-moduler/pull/624)
- Fikset slik at `className` ikke er påkrevd i Grid Row: [#630](https://github.com/navikt/nav-frontend-moduler/pull/630) Takk til [@AndreasDybdahl](https://github.com/AndreasDybdahl) :tada:
- Fikset støtte for `className` prop i Snakkeboble: [#638](https://github.com/navikt/nav-frontend-moduler/pull/638) Takk til [@andersnav](https://github.com/andersnav) :tada:

## 15. oktober 2019

### Nye komponenter

- Tabell: https://design.nav.no/components/tabell
- Ikonknapper: https://design.nav.no/components/ikonknapper

### Endringer

- Fikset støtte for publisering og markering av "beta"-pakker på design.nav.no
- Fikset støtte for å liste opp og vise frem rene "style"-pakker i komponentoversikten på design.nav.no
- Muligheten for å bare innstallere "style"-pakkene har blitt litt tydeligere under "Teknisk" på komponent-sidene
- Fikset støtte for ikoner i knapper: https://design.nav.no/components/knapp#med-ikon
- Fikset aria-varsling og rød markering på tekst-teller når Textarea får for mange tegn: [#548](https://github.com/navikt/nav-frontend-moduler/pull/548)
- Fikset støtte for React 17.0+ i Ekspanderbartpanel: [#541](https://github.com/navikt/nav-frontend-moduler/pull/541) Takk til [@erlend-axelsson](https://github.com/@erlendaxelsson) :tada:
- Fikset støtte for å bruke knappe-stiler på lenker: [#532](https://github.com/navikt/nav-frontend-moduler/pull/532)
- Tegnbegrensning på Textarea er nå valgfri: [#490](https://github.com/navikt/nav-frontend-moduler/pull/490) Takk til [@hakonph](https://github.com/hakonph) :tada:

### Sider publisert på design.nav.no

- Oppdaterte språk-sider: https://design.nav.no/resources/language Takk til [@mariannefriess](https://github.com/mariannefriess) :tada:
- Tilgjengelighet: https://design.nav.no/accessibility
- Prinsipper for brukeropplevelse på interne flater: https://design.nav.no/resources/internal-ux-principles Takk til Hanna Sofia Hogberg og @ElinNav og alle andre som bidro :tada:
- Subdomener: https://design.nav.no/resources/subdomains Takk til Tov Are Jacobsen og Petter Hafskjold :tada:
- Grid: https://design.nav.no/resources/grid
- Typografi: https://design.nav.no/resources/typography

### Bugfikser

- Fikset en gammel og plagsom bug med dårlig font-rendering i Chrome på Windows: [#557](https://github.com/navikt/nav-frontend-moduler/pull/557) Takk til @unorsk :tada:
- Fikset en bug hvor knapper med 100% bredde fikk venstrejustert innhold: [#532](https://github.com/navikt/nav-frontend-moduler/pull/532) Takk til @winsvold :tada:
- Fikset en bug hvor Textarea av og til kunne oppta dobbelt så mye plass som det trengte: [#530](https://github.com/navikt/nav-frontend-moduler/pull/530)
- Fikset syntax-feil i scaffolding-script: [#523](https://github.com/navikt/nav-frontend-moduler/pull/523)
- Fikset visuell bug hvor spinner forsvant på knapper med fokus: [#498](https://github.com/navikt/nav-frontend-moduler/pull/498)
