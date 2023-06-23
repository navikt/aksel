# @navikt/ds-react

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
