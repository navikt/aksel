# @navikt/ds-react

## 5.3.5

### Patch Changes

- :bug: Popover: sjekk at det er et HTML-element som får fokus ([#2258](https://github.com/navikt/aksel/pull/2258))

- Updated dependencies []:
  - @navikt/aksel-icons@5.3.5

## 5.3.4

### Patch Changes

- Updated dependencies [[`27dacfdbe`](https://github.com/navikt/aksel/commit/27dacfdbe96a861b19c20d4494485c863d0ee8d9)]:
  - @navikt/aksel-icons@5.3.4

## 5.3.3

### Patch Changes

- HGrid: Har nå `align`-prop for bedre kontroll over child-elementer ([#2242](https://github.com/navikt/aksel/pull/2242))

- Updated dependencies []:
  - @navikt/aksel-icons@5.3.3

## 5.3.2

### Patch Changes

- Skeleton: Lagt til as-prop for inline brk av Skeleton med span ([#2239](https://github.com/navikt/aksel/pull/2239))

- Updated dependencies []:
  - @navikt/aksel-icons@5.3.2

## 5.3.1

### Patch Changes

- Fix bug in monthpicker, only compare year and month for equality on date object ([#2231](https://github.com/navikt/aksel/pull/2231))

- :lipstick: GuidePanel: justert design ([#2227](https://github.com/navikt/aksel/pull/2227))

- :bug: DatePicker: Riktig skriftstørrelse på small input ([#2232](https://github.com/navikt/aksel/pull/2232))

- Updated dependencies []:
  - @navikt/aksel-icons@5.3.1

## 5.3.0

### Minor Changes

- Heading: Oppdatert med props `textColor`, `align`, `visuallyHidden`. ([#2211](https://github.com/navikt/aksel/pull/2211))

- Label: Oppdatert med props `textColor` og `visuallyHidden`. ([#2211](https://github.com/navikt/aksel/pull/2211))

- BodyLong, BodyShort, Detail: Oppdatert med props `textColor`,`weight`,`align`, `visuallyHidden` og `truncated`. ([#2211](https://github.com/navikt/aksel/pull/2211))

### Patch Changes

- :wheelchair: Textarea: Skjermleser-spesifikk tekst leses opp sammenhengende ([#2216](https://github.com/navikt/aksel/pull/2216))

- Updated dependencies []:
  - @navikt/aksel-icons@5.3.0

## 5.2.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@5.2.1

## 5.2.0

### Patch Changes

- Button: Ved bruk av `as`-prop vil `role="button"` nå bli lagt til. Native `onKeyUp` for `Space` er også implementert slik at standard `button`-interaksjon vil være likere uansett html-tag. ([#2154](https://github.com/navikt/aksel/pull/2154))

- Combobox: Fikset bruk av `useLayoutEffect` med SSR-safe metode. ([#2219](https://github.com/navikt/aksel/pull/2219))

- Hovering over combobox dropdown will move selection/focus in the list, so we don't end up with a split focus, and reversely when moving focus while hovering ([#2193](https://github.com/navikt/aksel/pull/2193))

- Updated dependencies [[`7e789158c`](https://github.com/navikt/aksel/commit/7e789158ce03357c2a2b2173a2c29c7fb6e6bcbb)]:
  - @navikt/aksel-icons@5.2.0

## 5.1.0

### Minor Changes

- :sparkles: Modal: mulighet for å rendre i portal ([#2209](https://github.com/navikt/aksel/pull/2209))

### Patch Changes

- :white_check_mark: Modal: use polyfill in JSDOM ([#2208](https://github.com/navikt/aksel/pull/2208))

- Datepicker: Input setter ikke nå aria-controls før popover åpnes ([#2213](https://github.com/navikt/aksel/pull/2213))

- Updated dependencies []:
  - @navikt/aksel-icons@5.1.0

## 5.0.3

### Patch Changes

- ConfirmationPanel: Fikset opplesing av feilmelding ([#2199](https://github.com/navikt/aksel/pull/2199))

- Updated dependencies []:
  - @navikt/aksel-icons@5.0.3

## 5.0.2

### Patch Changes

- :label: Modal: Bedre type for `width` ([#2191](https://github.com/navikt/aksel/pull/2191))

- Updated dependencies []:
  - @navikt/aksel-icons@5.0.2

## 5.0.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@5.0.1

## 5.0.0

### Major Changes

- Oppdatert Modal - Se [Migrering](https://aksel.nav.no/grunnleggende/kode/migrering) ([#2135](https://github.com/navikt/aksel/pull/2135))

  - :sparkles: Støtte for header og footer
  - :boom: Bruker nå native dialog i stedet for react-modal (med polyfill for eldre nettlesere)
  - :boom: Provider: `appElement` er fjernet

### Patch Changes

- Table: ExpandableRow har oppdatert knapp for å matche Accordion og ExpansionCard ([#2178](https://github.com/navikt/aksel/pull/2178))

- Table: Har lagt til ny size: 'large'. ([#2178](https://github.com/navikt/aksel/pull/2178))

- Updated dependencies []:
  - @navikt/aksel-icons@5.0.0

## 4.12.1

### Patch Changes

- Added red border to Combobox in error state ([#2184](https://github.com/navikt/aksel/pull/2184))

- Updated dependencies []:
  - @navikt/aksel-icons@4.12.1

## 4.12.0

### Minor Changes

- Combobox: La til støtte for feilmeldinger i Combobox ([#2182](https://github.com/navikt/aksel/pull/2182))

- CopyButton: Har nå prop 'iconPosition' for å høyre/venstre aligne ikon ([#2173](https://github.com/navikt/aksel/pull/2173))

### Patch Changes

- List: Fikset sentrering, margins ([#2168](https://github.com/navikt/aksel/pull/2168))

- Combobox: Kjører nå 'onChange' + 'onClear' når input blir reset programmatisk ([#2183](https://github.com/navikt/aksel/pull/2183))

- Combobox: Fikset custom-options i singleselect ([#2180](https://github.com/navikt/aksel/pull/2180))

- Combobox: Fjernet unødvendige 'onClear'-calls når man velger verdier ([#2170](https://github.com/navikt/aksel/pull/2170))

- Checkbox: Checkmark er nå SVG-ikon og ikke Base64 ([#2171](https://github.com/navikt/aksel/pull/2171))

- Combobox: Lukker nå nedtrekksmeny hvis man legger til ny option i singleselect ([#2177](https://github.com/navikt/aksel/pull/2177))

- Updated dependencies []:
  - @navikt/aksel-icons@4.12.0

## 4.11.2

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.11.2

## 4.11.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.11.1

## 4.11.0

### Minor Changes

- HGrid: Ny komponent 'HGrid' er ute i Beta: [Dokumentasjon](https://aksel.nav.no/komponenter/core/hgrid) ([#1838](https://github.com/navikt/aksel/pull/1838))

### Patch Changes

- Fixes bug where combobox list could not be closed after clicking a chip ([#2155](https://github.com/navikt/aksel/pull/2155))

- Grid: Markert som deprecated. Bruk nye 'HGrid' ([#2153](https://github.com/navikt/aksel/pull/2153))

- Updated dependencies []:
  - @navikt/aksel-icons@4.11.0

## 4.10.2

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.10.2

## 4.10.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.10.1

## 4.10.0

### Minor Changes

- Link: La til 'variant', 'underline' og 'inlineText'-prop ([#2093](https://github.com/navikt/aksel/pull/2093))

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.10.0

## 4.9.1

### Patch Changes

- Button: Fikset aria-live bug der knapp alltid ble lest opp av skjermleser ved render ([#2143](https://github.com/navikt/aksel/pull/2143))

- Tweaks to combobox - updated example, small bugfixes, better affordance for selected options and added flag for "isAddedByUser" to onToggleSelected ([#2144](https://github.com/navikt/aksel/pull/2144))

- Updated dependencies []:
  - @navikt/aksel-icons@4.9.1

## 4.9.0

### Minor Changes

- Table: ExpandableRow kan nå åpnes med 'expandOnRowClick'-prop ([#2127](https://github.com/navikt/aksel/pull/2127))

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.9.0

## 4.8.0

### Minor Changes

- Nye komponenter `VStack`, `HStack` og `Spacer` for å enklere kunne lage layout med flexbox og spacing-variabler. ([#2040](https://github.com/navikt/aksel/pull/2040))

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.8.0

## 4.7.4

### Patch Changes

- Textfield: La til type 'time' som tilgjengelig option ([#2137](https://github.com/navikt/aksel/pull/2137))

- Updated dependencies []:
  - @navikt/aksel-icons@4.7.4

## 4.7.3

### Patch Changes

- Chips: Removable Chips submitter ikke forms ved klikk lengre ([#2124](https://github.com/navikt/aksel/pull/2124))

- Updated dependencies []:
  - @navikt/aksel-icons@4.7.3

## 4.7.2

### Patch Changes

- Stepper: Fikset `hotizontal`-bug når step var `completed` ([#2116](https://github.com/navikt/aksel/pull/2116))

- Updated dependencies []:
  - @navikt/aksel-icons@4.7.2

## 4.7.1

### Patch Changes

- Datepicker: Fikset bug ved bruk dynamisk oppdatering av minDate. Vist `month` vil nå alltid være oppdatert når datepicker åpnes ([#2117](https://github.com/navikt/aksel/pull/2117))

- Updated dependencies []:
  - @navikt/aksel-icons@4.7.1

## 4.7.0

### Minor Changes

- Ny komponent Combobox! ([#1868](https://github.com/navikt/aksel/pull/1868))

### Patch Changes

- Timeline: Har nå egen `axisLabelTemplates`-prop for axixlabel formatering ([#2109](https://github.com/navikt/aksel/pull/2109))

- Combobox post-release tweaks ([#2112](https://github.com/navikt/aksel/pull/2112))

- Updated dependencies []:
  - @navikt/aksel-icons@4.7.0

## 4.6.1

### Patch Changes

- Skjema: Labels og Legends bruker nå inline-flex når readOnly er satt ([#2089](https://github.com/navikt/aksel/pull/2089))

- Updated dependencies []:
  - @navikt/aksel-icons@4.6.1

## 4.6.0

### Minor Changes

- Skjema: De fleste skjemakomponenter støtter nå `readOnly`-state ([#2080](https://github.com/navikt/aksel/pull/2080))

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.6.0

## 4.5.0

### Minor Changes

- - Alert: La til `closeButton`-prop ([#2079](https://github.com/navikt/aksel/pull/2079))

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.5.0

## 4.4.2

### Patch Changes

- Textarea: Fikset i18n for counter ([`718b3204d`](https://github.com/navikt/aksel/commit/718b3204d8714c4fc515dcad484424214bdc0c77))

- Updated dependencies []:
  - @navikt/aksel-icons@4.4.2

## 4.4.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.4.1

## 4.4.0

### Minor Changes

- Fikset klassenavn brukt for popover i Datepicker og Monthpicker ([PR](https://github.com/navikt/aksel/pull/2041))

## 4.3.0

### Minor Changes

- Popover og Helptext har nå luft mot siden av skjerm på mindre flater ([PR](https://github.com/navikt/aksel/pull/2069))

## 4.2.0

### Minor Changes

- Oppdatert Chat: `size` og `variant`-prop, optional `avatar`, uu og ui-forbedringer ([PR](https://github.com/navikt/aksel/pull/2048))

## 4.1.7

### Patch Changes

- Fikset JSDom-problemer ved testing av Timeline

- La til `wrapperClassname`-prop for HelpText ([PR](https://github.com/navikt/aksel/pull/2056))

## 4.1.6

### Patch Changes

- Timeline-period brakk ved bruk av JSDom i vitest og jest

## 4.1.5

### Patch Changes

- `OverridableComponent` fungerer nå med komponenter som allerede bruker 'as'-prop. ([PR](https://github.com/navikt/aksel/pull/2051))

- Popover: `bubbleEscape`-prop tilbyr muligheten for escape-events til å sendes opp gjennom dom-treet. ([PR](https://github.com/navikt/aksel/pull/2052))

## 4.1.3

### Patch Changes

- `className` ble ikke riktig forwardet til ikke-klikkbar Period i Timeline

## 4.1.2

### Patch Changes

- La til JSDoc for Skeleton-komponent

## 4.1.0

### Minor Changes

- Chips: `neutral` og `action`-varianter for Chips.Toggle. `checkmark`-prop for Chips.Toggle ([PR](https://github.com/navikt/aksel/pull/2035))

- Ny komponent Skeleton! ([PR](https://github.com/navikt/aksel/pull/1821))

### Patch Changes

- La til JSDoc dokumentasjon for alle komponenter ([PR](https://github.com/navikt/aksel/pull/2034))

- Accordion: La til `indent`-prop ([PR](https://github.com/navikt/aksel/pull/2027))

## 4.0.0

### Major Changes

- Datepicker og Monthpicker er ute av beta. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h4ef68ae743b0) ([PR](https://github.com/navikt/aksel/pull/2026))

- Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react`. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h3b8538e1981d) ([PR](https://github.com/navikt/aksel/pull/2026))

## 3.4.0

### Minor Changes

- Tag: `moderate`-variant ([PR](https://github.com/navikt/aksel/pull/2010))

## 3.3.1

### Patch Changes

- CopyButton: native `Clipboard API` ([PR](https://github.com/navikt/aksel/pull/2005))

## 3.3.0

### Patch Changes

- Timeline: popover/tooltip vises nå på hover, ikke onClick. ([PR](https://github.com/navikt/aksel/pull/1995))

## 3.2.4

### Patch Changes

- Search: Støtter nå htmlSize-prop ([PR](https://github.com/navikt/aksel/pull/2000))

## 3.2.3

### Patch Changes

- Datepicker: Oppdatert small-variant av Datepicker.Input. UI-oppdatert samtidig. ([PR](https://github.com/navikt/aksel/pull/1993))

- CopyButton: `xsmall`-variant for bruk i tabeller ([PR](https://github.com/navikt/aksel/pull/1994))

## 3.2.2

### Patch Changes

- CopyButton: Fjernet use-client directive fra komponent. (warning i vite/rollup)

## 3.2.0

### Minor Changes

- Ny komponent CopyButton! Erstatter `CopyToClipboard` som nå er tagget som deprecated ([PR](https://github.com/navikt/aksel/pull/1982))

## 3.1.0

### Patch Changes

- Oppdatert Label og Description spacing for alle skjemakomponenter ([PR](https://github.com/navikt/aksel/pull/1967))

## 3.0.1

### Patch Changes

- Fjernet `@navikt/ds-icons` fra dependencies

- Accordion: Oppdatert default headingSize brukt i i Accordion.Header

## 3.0.0

### Major Changes

- Accordion: left-aligner chevron, `neutral`-variant, `size`-prop ([PR](https://github.com/navikt/aksel/pull/1964))

- Bruker nå nå `@navikt/aksel-icons` for interne ikoner ([PR](https://github.com/navikt/aksel/pull/1964))

## 2.9.1

### Patch Changes

- ExpansionCard: Støtter nå `aria-labelledby` i tillegg til `aria-label` ([PR](https://github.com/navikt/aksel/pull/1944))

## 2.8.16

### Patch Changes

- ExpansionCard: ExpansionCard.Content sendte ikke `className` videre

- Datepicker. Bedre håndtering av visning for out-of-range-datoer ([PR](https://github.com/navikt/aksel/pull/1929))

## 2.8.14

### Patch Changes

- Datepicker/Monthpicker: Oppdaterer vist måneder ved popover åpne/lukk. Fikser out-of-range håndtering av `today`

## 2.8.10

### Patch Changes

- Datepicker/Monthpicker: refaktorert event-handling i hooks ([PR](https://github.com/navikt/aksel/pull/1907))

## 2.8.7

### Patch Changes

- Fikset typografi-bruk for `Radio` og `Checkbox`.

## 2.8.3

### Patch Changes

- Textarea: oppdatert counter-tekst + mulighet for lokalisering ([PR](https://github.com/navikt/aksel/pull/1875))

## 2.8.2

### Patch Changes

- ExpansioCard: Oppdatert typografibruk ([PR](https://github.com/navikt/aksel/pull/1870))

## 2.8.1

### Patch Changes

- ExpansionCard: Oppdaetrt standard title-size til `medium`

## 2.8.0

### Minor Changes

- Ny komponent ExpansionCard! ([PR](https://github.com/navikt/aksel/pull/1820))

## 2.6.2

### Patch Changes

- Textarea: Fikset React v18 problem med `TextareaAutosize`

## 2.6.1

### Patch Changes

- Search: `onSearchClick`-prop for lettere submit-handling

## 2.5.1

### Patch Changes

- List: Refaktorert nestede lister

## 2.4.2

### Patch Changes

- List: la til støtte for nestede lister ([PR](https://github.com/navikt/aksel/pull/1823))

## 2.4.1

### Patch Changes

- Datepicker: la til `fixedWeeks`-prop for å alltid vise 6 uker i Datepicker.Standalone ([PR](https://github.com/navikt/aksel/pull/1827))

## 2.4.0

### Minor Changes

- Ny komponent List! ([PR](https://github.com/navikt/aksel/pull/1807))

## 2.2.0

### Minor Changes

- ToggleGroup: `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1789))

- Button: `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1789))

## 2.1.7

### Patch Changes

- Datepicker: Fikset rekkefølge på `onValidate` og `onRangeChange` i useRangepicker-hook

## 2.1.6

### Patch Changes

- Datepicker/Monthpicker: `openOnFocus`-prop for manuell håndtering av popover ([PR](https://github.com/navikt/aksel/pull/1777))

## 2.1.5

### Patch Changes

- Datepicker: ESM import fra date-fns fungerer nå

## 2.1.4

### Patch Changes

- Datepicker: Fikset edgecase i `useRangepicker` der valg av startdato etter sluttdato ga feil output

## 2.1.3

### Patch Changes

- Monthpicker: håndterer visning av år riktig ([PR](https://github.com/navikt/aksel/pull/1771))

## 2.1.1

### Patch Changes

- Fikset `@types/react` v18 feil introdusert i v2.0.6 ([PR](https://github.com/navikt/aksel/pull/1759))

## 2.1.0

### Minor Changes

- Datepicker/Monthpicker: år med 2 siffer i input fungerer nå

## 2.0.18

### Patch Changes

- Datepicker: Bedre typer for `ref`

## 2.0.15

### Patch Changes

- Chat: `toptextPosition`-prop for horisontal plassering av navn og dato. ([PR](https://github.com/navikt/aksel/pull/1748))

## 2.0.14

### Patch Changes

- Oppdatert `@floating-ui/react`-versjon

## 2.0.7

### Patch Changes

- Monthpicker: Fikset keyboard-click

## 2.0.6

### Patch Changes

- Datepicker: Datepicker.Input satt `className` flere ganger

## 2.0.3

### Patch Changes

- Datepicker: `strategi`-prop for layout-strategi av popover

## 2.0.2

### Patch Changes

- Datepicker: onClick-event fikset

## 2.0.0

### Major Changes

- Fonter blir bruk i all typografi blir nå lastet fra CDN

## 1.5.10

### Patch Changes

- Modal: `parentSelector`-prop i Modal ([PR](https://github.com/navikt/aksel/pull/1717))

## 1.5.7

### Patch Changes

- Datepicker: `defaultMonth` og `Year` prop lagt til

## 1.5.6

### Patch Changes

- Datepicker: fungerer nå med `open` shadow-dom

## 1.5.2

### Patch Changes

- Chips: `FilterChips` heter nå `ToggleChips`

## 1.5.0

### Minor Changes

- Tag: `filles`-varianter ([PR](https://github.com/navikt/aksel/pull/1684))

- Ny komponent Chips! ([PR](https://github.com/navikt/aksel/pull/1668))

## 1.4.4

### Patch Changes

- Datepicker: Eksponerer `onValidation`-typer

## 1.4.3

### Patch Changes

- Datepicker: Validering og inputFormat funksjonalitet

## 1.4.1

### Patch Changes

- Datepicker: Følger språkrådets dato-formatering for måneder.

## 1.4.0

### Minor Changes

- Ny komponent Provider! For håndtering av global config på tvers av komponenter

## 1.3.39

### Patch Changes

- useId-bug fikset ved bruk i både react 17 og 18

- Datepicker: Patchet UX-bugs ved navigering til fortid/nåtid

- HelpText: Reverserte til å tillate bruk av `React.ReactNode` som children

- DatePicker og MonthPicker er tilgjengelig som Beta

- Modal: `overlayClassName`-prop lagt til

- ConfirmationPanel: Checkbox lenker nå til innholdet i `aria-describedby`

- Table: `shadeOnHover`-prop for å skru av/på hover-effekt

- Table: `colSpan`-prop på `Table.ExpandableRow`

- HelpText: har nå standard max-width på `65ch`

- Stepper: `interactive` og `completed`-props for wizard-løsninger

## 1.2.0

### Minor Changes

- Dropdown: `closeOnSelect`-prop for å skru av/på lukking av dropdown ved valg

## 1.1.0

### Minor Changes

- Dropdown: `onSelect`-prop for callback ved valg av element

## 1.0.0

## Major Changes

- Samversjonering: Alle pakker fra Aksel har nå, og vil i fremtiden ha samme versjonsnummer.

- Accordion/ReadMore: `renderContentWhenClosed`-prop fjernet

- Button: `icon` og `iconPosition`-prop for bedre ikonplassering

- Tabs: `loop`-prop er flyttet fra `Tabs.Tablist` til `Tabs`. `iconPosition`-prop er flyttet fra `Tabs.Tab` til `Tabs`

- Chat: `SpeechBubble`-komponent er renamet til `Chat`.

- Chat: `topText` heter nå `name` og `timestamp`, `illustration` heter nå `avatar` og `illustrationBgColor` heter nå `avatarBgColor`

- Pagination: `medium` -> `small`, `small` -> `xsmall`

- Popover: `auto`, `auto-start` og `auto-end` er fjernet som `placement`-prop

- CopyToClipboard: `iconPlacement` er renamet til `iconPosition`

- ConfirmationPanel: `ref` er flyttet fra wrapper-div til checkbox

- Stepper: `StepIndicator` er refaktorert og renamet til `Stepper`. `StepIndicator`-komponenten er fjernet

- MicroCard: er deprecated

- PageHeader: er deprecated

- Menu: er deprecated

- Divider: er deprecated og renamet til `Dropdown.Menu.Divider`

- `@material/ui` er fjernet som dependency

- `react-popper` og `@popperjs/core` er fjernet som dependency. Bruker nå `@floating-ui/react-dom-interactive`

- `classnames` er byttet ut med `clsx` internt

- `react-collapse` er fjernet som dependency

- `uuid` er fjernet som dependency. Bruker nå intern løsning for id-håndtering

- Label: er nå standard `label`-tag (tidligere p-tag)
