# @navikt/ds-css

## 5.3.2

### Patch Changes

- Skeleton: Lagt til as-prop for inline brk av Skeleton med span ([#2239](https://github.com/navikt/aksel/pull/2239))

## 5.3.1

### Patch Changes

- :bug: fix missing accordion bottom box-shadow on last element (when opened) ([#2229](https://github.com/navikt/aksel/pull/2229))

- :lipstick: GuidePanel: justert design ([#2227](https://github.com/navikt/aksel/pull/2227))

## 5.3.0

### Minor Changes

- Typography: Oppdatert med typo-klasser for `textColor`, `weight`, `align`, `visuallyHidden` og `truncated`. ([#2211](https://github.com/navikt/aksel/pull/2211))

## 5.2.1

### Patch Changes

- Font: Fikset henting av italic-font ([#2220](https://github.com/navikt/aksel/pull/2220))

## 5.2.0

### Patch Changes

- CSS: Popover har nå 8px border-radius. Fikset padding-bug i Select-small. ([#2219](https://github.com/navikt/aksel/pull/2219))

- Hovering over combobox dropdown will move selection/focus in the list, so we don't end up with a split focus, and reversely when moving focus while hovering ([#2193](https://github.com/navikt/aksel/pull/2193))

## 5.1.0

### Patch Changes

- :lipstick: Modal: fjern kantlinje ([#2210](https://github.com/navikt/aksel/pull/2210))

- Tokens: Fikset table-token ([#2204](https://github.com/navikt/aksel/pull/2204))

## 5.0.3

### Patch Changes

- ConfirmationPanel: Fikset opplesing av feilmelding ([#2199](https://github.com/navikt/aksel/pull/2199))

- Checkbox: Fikset checkbox-alignment ved bruk av tailwindcss ([#2199](https://github.com/navikt/aksel/pull/2199))

## 5.0.2

## 5.0.1

### Patch Changes

- Checkbox: Hotfix da checkmark ikke var sentrert hvis man brukte tailwind ([`90db7dd0c`](https://github.com/navikt/aksel/commit/90db7dd0c120c16a387d3169c05c1f33dc694323))

## 5.0.0

### Major Changes

- Oppdatert Modal - Se [Migrering](https://aksel.nav.no/grunnleggende/kode/migrering) ([#2135](https://github.com/navikt/aksel/pull/2135))

  - :sparkles: Støtte for header og footer
  - :boom: Bruker nå native dialog i stedet for react-modal (med polyfill for eldre nettlesere)

### Patch Changes

- Table: ExpandableRow har oppdatert knapp for å matche Accordion og ExpansionCard ([#2178](https://github.com/navikt/aksel/pull/2178))

- Table: Alle størrelser har justert padding. Small-size table bruker nå også standard typografi-størrelse (18px). ([#2178](https://github.com/navikt/aksel/pull/2178))

## 4.12.1

### Patch Changes

- Added red border to Combobox in error state ([#2184](https://github.com/navikt/aksel/pull/2184))

## 4.12.0

### Minor Changes

- CopyButton: Har nå prop 'iconPosition' for å høyre/venstre aligne ikon ([#2173](https://github.com/navikt/aksel/pull/2173))

### Patch Changes

- List: Fikset sentrering, margins ([#2168](https://github.com/navikt/aksel/pull/2168))

- Checkbox: Checkmark er nå SVG-ikon og ikke Base64 ([#2171](https://github.com/navikt/aksel/pull/2171))

- Alert: Fikset alignment av status-ikon mot tekst ([#2179](https://github.com/navikt/aksel/pull/2179))

## 4.11.2

### Patch Changes

- :lipstick: ToggleGroup: fjern semibold fra selected button ([#2167](https://github.com/navikt/aksel/pull/2167))

## 4.11.1

### Patch Changes

- Border-radius: Fikset hardkodet border-radius i Datepicker, ToggleGroup og Combobox. ([#2159](https://github.com/navikt/aksel/pull/2159))

## 4.11.0

### Minor Changes

- HGrid: Ny komponent 'HGrid' er ute i Beta: [Dokumentasjon](https://aksel.nav.no/komponenter/core/hgrid) ([#1838](https://github.com/navikt/aksel/pull/1838))

### Patch Changes

- List: Fikset alignment av ikoner ([#2149](https://github.com/navikt/aksel/pull/2149))

- Font: La til egen font for semibold italic for bedre skalering cross-browser ([#2150](https://github.com/navikt/aksel/pull/2150))

## 4.10.2

### Patch Changes

- Link: Fikset visited farger og inline SVG-reset ved bruk av tailwind

## 4.10.0

### Minor Changes

- Link: La til 'variant', 'underline' og 'inlineText'-prop ([#2093](https://github.com/navikt/aksel/pull/2093))

## 4.9.1

### Patch Changes

- Tweaks to combobox - updated example, small bugfixes, better affordance for selected options and added flag for "isAddedByUser" to onToggleSelected ([#2144](https://github.com/navikt/aksel/pull/2144))

## 4.9.0

### Minor Changes

- Table: ExpandableRow kan nå åpnes med 'expandOnRowClick'-prop ([#2127](https://github.com/navikt/aksel/pull/2127))

## 4.8.0

### Minor Changes

- Nye komponenter `VStack`, `HStack` og `Spacer` for å enklere kunne lage layout med flexbox og spacing-variabler. ([#2040](https://github.com/navikt/aksel/pull/2040))

## 4.7.4

### Patch Changes

- Oppdatert bruk av REM i komponenter for forbedret utrykk ved font-scaling i browser ([#2126](https://github.com/navikt/aksel/pull/2126))

## 4.7.3

## 4.7.2

### Patch Changes

- Stepper: Fikset `hotizontal`-bug når step var `completed` ([#2116](https://github.com/navikt/aksel/pull/2116))

## 4.7.1

## 4.7.0

### Minor Changes

- Ny komponent Combobox! ([#1868](https://github.com/navikt/aksel/pull/1868))

## 4.6.1

### Patch Changes

- Skjema: Labels og Legends bruker nå inline-flex når readOnly er satt ([#2089](https://github.com/navikt/aksel/pull/2089))

## 4.6.0

### Minor Changes

- Skjema: De fleste skjemakomponenter har nå styling for `readOnly`-state ([#2080](https://github.com/navikt/aksel/pull/2080))

## 4.5.0

### Minor Changes

- - Alert: La til `closeButton`-prop ([#2079](https://github.com/navikt/aksel/pull/2079))

### Patch Changes

- - Button: Fikset outline-bug i tertiary-variant ved `:active`-state ([#2079](https://github.com/navikt/aksel/pull/2079))

## 4.4.2

## 4.4.1

### Patch Changes

- :lipstick: Chat: fjernet border, satt avatar svg til 24x24px, byttet om "subtle" og "neutral" ([#2077](https://github.com/navikt/aksel/pull/2077))

## 4.4.0

### Minor Changes

- Shadow-tokens er oppdatert: Datepicker har nå ikke border, Modal bruker shadow-xlarge, LinkCard bruker shadow-xsmall ([PR](https://github.com/navikt/aksel/pull/2041))

## 4.3.0

### Minor Changes

- Popover/Helptext: Maksbredde på 100vw - 1.5rem. Treffer ikke lengre kanten på skjermen. ([PR](https://github.com/navikt/aksel/pull/2069))

### Patch Changes

- ExpansionCard: Ved nesting av komponetene fikk man styling fra parent ([PR](https://github.com/navikt/aksel/pull/2067))

## 4.2.0

### Minor Changes

- Chat: `small`-size, innebygde varianter for farge og oppdatert utseende. ([PR](https://github.com/navikt/aksel/pull/2048))

## 4.1.4

### Patch Changes

- Readmore: setter nå eksplisitt color for å ikke arve text-subtle fra parent. ([PR](https://github.com/navikt/aksel/pull/2049))

## 4.1.1

### Patch Changes

- :bug: Fikset cursor-markering av tekst i skeleton.

## 4.1.0

### Minor Changes

- Chips: `neutral` og `action`-varianter av Chips.Toggle. Opt-out mulighet for Checkmark. Oppdatert checkmark-ikon ([PR](https://github.com/navikt/aksel/pull/2035))

- Alle description-felter på fieldsets har nå `text-subtle` som farge. ([PR](https://github.com/navikt/aksel/pull/2036))

## 4.0.0

### Major Changes

- All styling fra `@navikt/ds-css-internal` er flyttet til `@navikt/ds-css`. ([PR](https://github.com/navikt/aksel/pull/2026))

- classname-prefix er endret fra `navdsi` -> `navds` for flyttede komponenter.

- Fikset cascading-problem mellom dropdown og popover. Dropdown blir ikke lengre påvirket av import-rekkefølge av popover.

- Styling for flyttede komponenter finnes nå på CDN [Guide](https://aksel.nav.no/grunnleggende/kode/css-import)

## 3.4.0

### Minor Changes

- Tag: `moderate`-variant ([PR](https://github.com/navikt/aksel/pull/2010))

## 3.2.3

### Patch Changes

- Datepicker: Fikset small-variant av datepicker-input. ([PR](https://github.com/navikt/aksel/pull/1993))

- CopyButton: `xsmall`-size for bruk i tabeller ([PR](https://github.com/navikt/aksel/pull/1994))

## 3.1.3

### Patch Changes

- :lipstick: Oppdatert utseende for ToggleGroup. `Medium` og `Small`-size er begge 10px lavere, mindre border-radius ([PR](https://github.com/navikt/aksel/pull/1976))

## 3.1.0

### Minor Changes

- Alle komponenter bruker nå default `:focus-visible` for fokusmarkering. Medfølger også fallback for `:focus` ([PR](https://github.com/navikt/aksel/pull/1966))

### Patch Changes

- Oppdatert Label og Description spacing for skjemakomponenter ([PR](https://github.com/navikt/aksel/pull/1967))

## 3.0.0

### Major Changes

- Accordion: Chevron er left-aligned, deler av styling er refaktorert, `size`-props og `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1964))

## 2.9.0

### Minor Changes

- CSS nå tilgjengelig som separate filer: Kan lastest fra CDN, minified-versjoner tilgjengelig ([PR](https://github.com/navikt/aksel/pull/1941))

## 2.8.9

### Patch Changes

- Button: Padding/border-radius tokens ([PR](https://github.com/navikt/aksel/pull/1905))

## 2.8.7

### Patch Changes

- Button: token for tertiary

## 2.8.6

### Patch Changes

- Alert, Chips og ErrorSummary har nå bedre utvalg av tokens

## 2.8.5

### Patch Changes

- Accordion: tokens for header-bakgrunn

- Select: Fikset tekstfarge på iphone ([PR](https://github.com/navikt/aksel/pull/1879))

## 2.8.2

### Patch Changes

- ExpansioCard: Oppdatert typografi ([PR](https://github.com/navikt/aksel/pull/1870))

## 2.7.8

### Patch Changes

- Tabs: La til focus-markering for Tabs.Panel ([PR](https://github.com/navikt/aksel/pull/1863))

## 2.7.5

### Patch Changes

- ToggleGroup: Fikset token-bug

## 2.4.3

### Patch Changes

- Select: Fikset disabled + opacity bug for Chrome

## 2.4.2

### Patch Changes

- List: La til støtte for nesting ([PR](https://github.com/navikt/aksel/pull/1823))

## 2.3.1

### Patch Changes

- Fikset feil bruk av fallback-tokens i Textarea og Timeline

## 2.3.0

### Minor Changes

- Select: Fikset sentrering av tekst i Firefox ([PR](https://github.com/navikt/aksel/pull/1813))

### Patch Changes

- Select: `small`-variant er nå 32px (var 34px)

## 2.2.0

### Minor Changes

- ToggleGroup: `Neutral`-variant. ([PR](https://github.com/navikt/aksel/pull/1789))

- Button: `Neutral`-variant.

## 2.1.2

### Patch Changes

- TextField: `small`-variant har nå 8px horisontal padding (før 4px)

## 2.0.12

### Patch Changes

- Radio: Fikset default visuell error-state ([PR](https://github.com/navikt/aksel/pull/1737))

## 2.0.5

### Patch Changes

- Button: Reverserte border-width endrinder (var 1.5px, nå 2px)

## 2.0.1

### Patch Changes

- Bugfixer ved bruk av tokens oppdatert i v2.0.0

## 2.0.0

### Major Changes

- Fontlasting: Fonter lastes nå fra NAV-CDN

- Tokens: Alle komponenter bruker nå semantiske tokens for som standard, med innebygd støtte for komponent-spesifikke tokens.

## 1.5.9

### Patch Changes

- Chips: 4px -> 2px gap mellom checkmark i Chips.Toggle

## 1.5.3

### Patch Changes

- Tokens: Byttet om på rekkefølge av alt-farger

## 1.5.1

### Patch Changes

- Chips. Bruker nå standard flex-wrap

## 1.5.0

### Minor Changes

- Tag: `filled`-varianter ([PR](https://github.com/navikt/aksel/pull/1684))

## 1.3.39

### Patch Changes

- Fikset bruk av `:watch` for diverse parsere (less, parcel)

## 1.3.24

### Patch Changes

- Tokens tilgjengeligjøres nå også på `:host`. Dette lar shadow-dom brukere konsumere tokens direkte.
