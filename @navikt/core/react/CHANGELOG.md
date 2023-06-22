# @navikt/ds-react

## 4.4.0

### Minor Changes

- [#2041](https://github.com/navikt/aksel/pull/2041) - Fikset klassenavn brukt for popover i Datepicker og Monthpicker

## 4.3.0

### Minor Changes

- [#2069](https://github.com/navikt/aksel/pull/2069) - Popover og Helptext har nå luft mot siden av skjerm på mindre flater

## 4.2.0

### Minor Changes

- [#2048](https://github.com/navikt/aksel/pull/2048) - Oppdatert Chat: `size` og `variant`-prop, optional `avatar`, uu og ui-forbedringer

## 4.1.7

### Patch Changes

- Fikset JSDom-problemer ved testing av Timeline

- [#2056](https://github.com/navikt/aksel/pull/2056) - La til `wrapperClassname`-prop for HelpText

## 4.1.6

### Patch Changes

- Timeline-period brakk ved bruk av JSDom i vitest og jest

## 4.1.5

### Patch Changes

- [#2051](https://github.com/navikt/aksel/pull/2051) - `OverridableComponent` fungerer nå med komponenter som allerede bruker 'as'-prop.

- [#2052](https://github.com/navikt/aksel/pull/2052) - Popover: `bubbleEscape`-prop tilbyr muligheten for escape-events til å sendes opp gjennom dom-treet.

## 4.1.3

### Patch Changes

- `className` ble ikke riktig forwardet til ikke-klikkbar Period i Timeline

## 4.1.2

### Patch Changes

- La til JSDoc for Skeleton-komponent

## 4.1.0

### Minor Changes

- [#2035](https://github.com/navikt/aksel/pull/2035) - Chips: `neutral` og `action`-varianter for Chips.Toggle. `checkmark`-prop for Chips.Toggle

- [#1821](https://github.com/navikt/aksel/pull/1821) - Ny komponent Skeleton!

### Patch Changes

- [#2034](https://github.com/navikt/aksel/pull/2034) - La til JSDoc dokumentasjon for alle komponenter

- [#2027](https://github.com/navikt/aksel/pull/2027) - Accordion: La til `indent`-prop

## 4.0.0

### Major Changes

- [#2026](https://github.com/navikt/aksel/pull/2026) - Datepicker og Monthpicker er ute av beta. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h4ef68ae743b0)

- [#2026](https://github.com/navikt/aksel/pull/2026) - Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react`. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h3b8538e1981d)

## 3.4.0

### Minor Changes

- [#2010](https://github.com/navikt/aksel/pull/2010) - Tag: `moderate`-variant

## 3.3.1

### Patch Changes

- [#2005](https://github.com/navikt/aksel/pull/2005) - CopyButton: native `Clipboard API`

## 3.3.0

### Patch Changes

- [#1995](https://github.com/navikt/aksel/pull/1995) - Timeline: popover/tooltip vises nå på hover, ikke onClick.

## 3.2.4

### Patch Changes

- [#2000](https://github.com/navikt/aksel/pull/2000) - Search: Støtter nå htmlSize-prop

## 3.2.3

### Patch Changes

- [#1993](https://github.com/navikt/aksel/pull/1993) - Datepicker: Oppdatert small-variant av Datepicker.Input. UI-oppdatert samtidig.

- [#1994](https://github.com/navikt/aksel/pull/1994) - CopyButton: `xsmall`-variant for bruk i tabeller

## 3.2.2

### Patch Changes

- CopyButton: Fjernet use-client directive fra komponent. (warning i vite/rollup)

## 3.2.0

### Minor Changes

- [#1982](https://github.com/navikt/aksel/pull/1982) - Ny komponent CopyButton! Erstatter `CopyToClipboard` som nå er tagget som deprecated

## 3.1.0

### Patch Changes

- [#1967](https://github.com/navikt/aksel/pull/1967) - Oppdatert Label og Description spacing for alle skjemakomponenter

## 3.0.1

### Patch Changes

- Fjernet `@navikt/ds-icons` fra dependencies

- Accordion: Oppdatert default headingSize brukt i i Accordion.Header

## 3.0.0

### Major Changes

- [#1964](https://github.com/navikt/aksel/pull/1964) - Accordion: left-aligner chevron, `neutral`-variant, `size`-prop

- [#1964](https://github.com/navikt/aksel/pull/1964) - Bruker nå nå `@navikt/aksel-icons` for interne ikoner

## 2.9.1

### Patch Changes

- [#1944](https://github.com/navikt/aksel/pull/1944) - ExpansionCard: Støtter nå `aria-labelledby` i tillegg til `aria-label`

## 2.8.16

### Patch Changes

- ExpansionCard: ExpansionCard.Content sendte ikke `className` videre

- [#1929](https://github.com/navikt/aksel/pull/1929) - Datepicker. Bedre håndtering av visning for out-of-range-datoer

## 2.8.14

### Patch Changes

- Datepicker/Monthpicker: Oppdaterer vist måneder ved popover åpne/lukk. Fikser out-of-range håndtering av `today`

## 2.8.10

### Patch Changes

- [#1907](https://github.com/navikt/aksel/pull/1907) - Datepicker/Monthpicker: refaktorert event-handling i hooks

## 2.8.7

### Patch Changes

- Fikset typografi-bruk for `Radio` og `Checkbox`.

## 2.8.3

### Patch Changes

- [#1875](https://github.com/navikt/aksel/pull/1875) - Textarea: oppdatert counter-tekst + mulighet for lokalisering

## 2.8.2

### Patch Changes

- [#1870](https://github.com/navikt/aksel/pull/1870) - ExpansioCard: Oppdatert typografibruk

## 2.8.1

### Patch Changes

- ExpansionCard: Oppdaetrt standard title-size til `medium`

## 2.8.0

### Minor Changes

- [#1820](https://github.com/navikt/aksel/pull/1820) - Ny komponent ExpansionCard!

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

- [#1823](https://github.com/navikt/aksel/pull/1823) - List: la til støtte for nestede lister

## 2.4.1

### Patch Changes

- [#1827](https://github.com/navikt/aksel/pull/1827) - Datepicker: la til `fixedWeeks`-prop for å alltid vise 6 uker i Datepicker.Standalone

## 2.4.0

### Minor Changes

- [#1807](https://github.com/navikt/aksel/pull/1807) - Ny komponent List!

## 2.2.0

### Minor Changes

- [#1789](https://github.com/navikt/aksel/pull/1789) - ToggleGroup: `neutral`-variant

- [#1789](https://github.com/navikt/aksel/pull/1789) - Button: `neutral`-variant

## 2.1.7

### Patch Changes

- Datepicker: Fikset rekkefølge på `onValidate` og `onRangeChange` i useRangepicker-hook

## 2.1.6

### Patch Changes

- [#1777](https://github.com/navikt/aksel/pull/1777) - Datepicker/Monthpicker: `openOnFocus`-prop for manuell håndtering av popover

## 2.1.5

### Patch Changes

- Datepicker: ESM import fra date-fns fungerer nå

## 2.1.4

### Patch Changes

- Datepicker: Fikset edgecase i `useRangepicker` der valg av startdato etter sluttdato ga feil output

## 2.1.3

### Patch Changes

- [#1771](https://github.com/navikt/aksel/pull/1771) - Monthpicker: håndterer visning av år riktig

## 2.1.1

### Patch Changes

- [#1759](https://github.com/navikt/aksel/pull/1759) - Fikset `@types/react` v18 feil introdusert i v2.0.6

## 2.1.0

### Minor Changes

- Datepicker/Monthpicker: år med 2 siffer i input fungerer nå

## 2.0.18

### Patch Changes

- Datepicker: Bedre typer for `ref`

## 2.0.15

### Patch Changes

- [#1748](https://github.com/navikt/aksel/pull/1748) - Chat: `toptextPosition`-prop for horisontal plassering av navn og dato.

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

- [#1717](https://github.com/navikt/aksel/pull/1717) - Modal: `parentSelector`-prop i Modal

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

- [#1684](https://github.com/navikt/aksel/pull/1684) - Tag: `filles`-varianter

- [#1668](https://github.com/navikt/aksel/pull/1668) - Ny komponent Chips!

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
