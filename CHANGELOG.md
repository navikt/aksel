# Endringslogg

## 21. Mai 2021

### Popover-position oppdateres nå onMount

[#1104](https://github.com/navikt/nav-frontend-moduler/pull/1104)

- Hvis popover mountes med `ankerEl` så vil posisjon oppdateres riktig nå.
- OPS! Tilfeller ved bruk av useRef som `ankerEl` kan føre til feil i posisjonering da Popover mountes med `ankerEl == null`, og da oppdatering av ref ikke fører til props oppdatering siden det er en ref. Anbefales å ta i bruk state for `ankerEl`

## 19. Mai 2021

### Oppdatert fargepalett

[#1092](https://github.com/navikt/nav-frontend-moduler/pull/1092)

- Alle nav-frontend pakker som `nav-frontend-core` berører vil major bumpes, inkludert `na v-frontend-core`.
- `@navikt/ds-tokens`, `@navikt/ds-css` og `@navikt/ds-react` vil minor bumpes

- `orangeFocus` og alle variantene av denne fargen er fjernet fra `nav-frontend-core`
- `navRod`sine lighten/darken varianter er fjernet fra `nav-frontend-core`. Bruk `redError` som erstattning.
- `@navikt/ds-tokens` har nå `purple` og `limegreen` farger tilgjengelige

### Prop for hvit bakgrunn på veileder sin snakkeboble

[#1099](https://github.com/navikt/nav-frontend-moduler/pull/1099)

- Kan nå bruke prop `hvitSnakkeboble` for å setteakgrunnen på snakkeboble til hvit.

## 18. Mai 2021

### Oppdatert bakgrunnsfarge på Tag/Etikett for å synke med figma

[#1097](https://github.com/navikt/nav-frontend-moduler/pull/1097)
[#1094](https://github.com/navikt/nav-frontend-moduler/pull/1094)

- Bakgrunnene til de fire komponent-variasjonenen er nå endret til `Lighten80` istedenfor `Lighten60`

### Oppdatert textareaRef prop for textarea-controlled

[#1098](https://github.com/navikt/nav-frontend-moduler/pull/1098)

- Legger på optional argument i textareaRef-propen på samme måte som i Textarea-componenten.

### BekreftCheckboksPanel label har nå underline onHover

[#1095](https://github.com/navikt/nav-frontend-moduler/pull/1095)

- Fikser en uu-feil hvor forskjellen på default og hover stil ikke var stor nok.

## 14. Mai 2021

### @navikt/ds-tokens eksporteres nå også i CommonJs format

## 13. Mai 2021

### Typeguard for children i Tekstomrade-komponenten

[#1089](https://github.com/navikt/nav-frontend-moduler/pull/1089)

- Sjekker at children == string, hvis ikke return null

## 04. Mai 2021

### Forbedret scroll-behavior for sticky-panel

[#1084](https://github.com/navikt/nav-frontend-moduler/pull/1084)

- Oppførselen til menyen scrollet separat på mobil-skjermer (< 648px), noe som førte til en litt rar interaksjon. Menyen og innholdet under flyter nå naturlig uten noen overflow og max-height.

## 30. April 2021

### xxxl -> 3xl etc

[#1086](https://github.com/navikt/nav-frontend-moduler/pull/1086)

### AnchorMenu history-state fiks

[#1085](https://github.com/navikt/nav-frontend-moduler/pull/1085)

- Beholder state-objektet når history oppdateres ved scrolling med anchor-menu. Dette benyttes ved async navigering mellom sider i bl.a. next.js, og denne vil brekke dersom state'en overskrives.

- Bruker replaceState istedenfor pushState slik at frem/tilbake-knapper i browser oppfører seg mer som forventet

## 27. April 2021

### Kan nå bruke className på `Popover`-komponent

[#1082](https://github.com/navikt/nav-frontend-moduler/pull/1082)

- Bruker kan nå bruke className som en prop på `<Popover />` uten at den overskriver komponentens styling

### Fikser Checkbokspanel focus+feil markering

[#1081](https://github.com/navikt/nav-frontend-moduler/pull/1081)

- Fokusmarkering vises nå når man har focus + feil

## 21. April 2021

## Active stil for secondary/normal-knapp er endret for å skille seg fra hover

[#1062](https://github.com/navikt/nav-frontend-moduler/pull/1062)

## 19. April 2021

### Modal-overlay klasse for @navikt/ds-css er nå `fixed

[#1074](https://github.com/navikt/nav-frontend-moduler/pull/1074)

- `absolute -> fixed`

## 16. April 2021

### Fokusmarkering forsvinner ikke nå onHover

[#1072](https://github.com/navikt/nav-frontend-moduler/pull/1072)

### Scroll er nå bare "smooth" onFocus

[#1071](https://github.com/navikt/nav-frontend-moduler/pull/1071)

Smooth-scroll bare satt i html:focus-within
Slipper da at det er smooth-scroll når man gjør eks ctrl + f søk på siden.

Takk for tips @winsvold !

## 08. April 2021

### Gråskala er endret i `nav-frontend-core`

[#1068](https://github.com/navikt/nav-frontend-moduler/pull/1068)

- Gråfargene er endret til en mer nøytral og leselig farge enn tidligere.
- Alle pakker som bruker `nav-frontend-core` eller har tilknytning til den (inkludert selve pakken) er minor bumpet fra x.0.x -> x.1.0.
- Letteste måten å oppdatere pakkene på er å kjøre `npm update`
- Hvis man ønsker å bumpe pakkene manuelt så kan alle `nav-frontend-*` pakker minor bumpes til x.1.x utenom disse:
- - nav-frontend-chevron-style
- - nav-frontend-chevron
- - nav-frontend-fullbreddeknapp-style
- - nav-frontend-grid-style
- - nav-frontend-ikoner-assets
- - nav-frontend-js-utils
- - nav-frontend-spinner-style
- - nav-frontend-spinner

## 07. April 2021

### Sourcemapping ds-icons og ds-react

[#1064](https://github.com/navikt/nav-frontend-moduler/pull/1064)
[#1065](https://github.com/navikt/nav-frontend-moduler/pull/1065)

## 24. Mars 2021

### Smoothscroll og reduced animations

[#1055](https://github.com/navikt/nav-frontend-moduler/pull/1055)

- `@navikt/ds-css` sin baseline setter nå `scroll-behavior: smooth;` på html by default
- Ved `(prefers-reduced-motion: reduce)` vil baseline redusere animasjoner.

## 10. Mars 2021

### @navikt/ds-react importerer nå ikke styling i selve komponenten

[#1030](https://github.com/navikt/nav-frontend-moduler/pull/1030)

- Dette betyr at pakken `@navikt/ds-css` må importeres separat ved å endten linke til pakken i `<head>` eller importere den høyt i dom-strukturen.

### @navikt/ds-react og @navikt/ds-icons er nå treeshakable

[#1033](https://github.com/navikt/nav-frontend-moduler/pull/1033)

- Begge pakkene defaulter nå til esm versjonen av pakken. De vanligste bundlerne hånterer da treeshaking selv når pakken blir brukt. Hvis man man ønsker å ta i bruk Commonjs versjonen kan man importere direkte fra `cjs` dir i pakken

```bash
Esm -> import { Button } from "@navikt/ds-react";
Cjs -> import { Button } from "@navikt/ds-react/cjs";
```

Siden eks noen test-libraries ikke støtter ESM enda kan man legge denne til i jest config for å bruke pakkene:

```
"moduleNameMapper": {
  "@navikt/ds-react(.*)": "@navikt/ds-react/cjs$1",
  "@navikt/ds-icons(.*)": "@navikt/ds-icons/cjs$1"
}
```

### Oppdatert feil-styling og state-handling for skjemakomponenter

[#1018](https://github.com/navikt/nav-frontend-moduler/pull/1018)

- Feil på Skjemagruppe vil føre til feil-styling på checkbox/radio og checkboxpanel/radiopanel
- Checkboxpanel, Radiopanel og Radio har nå feil-prop
- Feil + disabled styling er satt til bare disabled nå.
- checkbox/radio og checkboxpanel/radiopanel kan nå alle ta i bruk utenFeilPropagerings-prop

## 01. Mars 2021

### Nav-frontend-typografi-style støtter nå Less v4

[#1014](https://github.com/navikt/nav-frontend-moduler/pull/1014)

- Alle divisjoner i Less-filer er nå wrappet i parentes

## 22. Februar 2021

### Kan nå vise label på checkbox i første column i tabell

[#1000](https://github.com/navikt/nav-frontend-moduler/pull/1000)

- Ved å sette `data-label="true"` på <Checkbox/> som blir brukt i tabell, kan man nå vise label om ønsket

### Oppdatert Bekreftcheckboxpanel for bedre UU

[#1002](https://github.com/navikt/nav-frontend-moduler/pull/1002)

- Styling for Lenke blir nå endret ved bruk på Bekreftcheckboxpanel for å sikre god kontrast

## 19. Februar 2021

### Oppdatert animasjon Ekspanderbartpanel

[#993](https://github.com/navikt/nav-frontend-moduler/pull/993)

- Animasjonen er nå på 250ms, erstatter 400ms

## 15. Februar 2021

### Oppdatert dokumentasjon om obligatoriske felt i skjema

[#996](https://github.com/navikt/nav-frontend-moduler/pull/996)

- https://design.nav.no/patterns/form-validation

## 12. Februar 2021

### Proptable viser nå riktige default-values for props

[#988](https://github.com/navikt/nav-frontend-moduler/pull/988)

- Man kan nå se hva default-value er for props under teknisk side for komponenter
- Eks: https://design.nav.no/components/alertstripe/technical

## 05. Februar 2021

### Komponenter støtter nå React v17

[#979](https://github.com/navikt/nav-frontend-moduler/pull/979)

- Alle react komponenter har nå devDep og peerDep `^16.8.0 || ^17.0.0`
- React er fjernet som devDep for stilpakker

## 05. Februar 2021

### Ikon-nedlastning i PNG format

[#973](https://github.com/navikt/nav-frontend-moduler/pull/973)

- Ikonsiden tilbyr nå både nedlastning av ikoner i SVG og PNG format
- Fargevelger for ikon er laget for å kunne laste ned ikonene med forskjellige farger.

## 29. Januar 2021

### Publisering av ikonpakke og ikonsøk

[#945](https://github.com/navikt/nav-frontend-moduler/pull/945)

- `@navikt/ds-icons` er publisert som version 0.1.0
- Ikonsøket på design.nav.no er nå i bruk

## 25. Januar 2021

### Fjernet komponenten EtikettLiten

[#956](https://github.com/navikt/nav-frontend-moduler/pull/956)

- `Undertekst` kan brukes som erstatning da begge har samme styling.
- Dette fører til en major bump fra v2 -> v3 for `nav-frontend-typografi`

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
