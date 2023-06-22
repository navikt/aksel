# @navikt/ds-css

## 4.4.0

### Minor Changes

- [#2041](https://github.com/navikt/aksel/pull/2041) - Shadow-tokens er oppdatert: Datepicker har nå ikke border, Modal bruker shadow-xlarge, LinkCard bruker shadow-xsmall

## 4.3.0

### Minor Changes

- [#2069](https://github.com/navikt/aksel/pull/2069) - Popover/Helptext: Maksbredde på 100vw - 1.5rem. Treffer ikke lengre kanten på skjermen.

### Patch Changes

- [#2067](https://github.com/navikt/aksel/pull/2067) - ExpansionCard: Ved nesting av komponetene fikk man styling fra parent

## 4.2.0

### Minor Changes

- [#2048](https://github.com/navikt/aksel/pull/2048) - Chat: `small`-size, innebygde varianter for farge og oppdatert utseende.

## 4.1.4

### Patch Changes

- [#2049](https://github.com/navikt/aksel/pull/2049) - Readmore: setter nå eksplisitt color for å ikke arve text-subtle fra parent.

## 4.1.1

### Patch Changes

- :bug: Fikset cursor-markering av tekst i skeleton.

## 4.1.0

### Minor Changes

- [#2035](https://github.com/navikt/aksel/pull/2035) - Chips: `neutral` og `action`-varianter av Chips.Toggle. Opt-out mulighet for Checkmark. Oppdatert checkmark-ikon

- [#2036](https://github.com/navikt/aksel/pull/2036) - Alle description-felter på fieldsets har nå `text-subtle` som farge.

## 4.0.0

### Major Changes

- [#2026](https://github.com/navikt/aksel/pull/2026) - All styling fra `@navikt/ds-css-internal` er flyttet til `@navikt/ds-css`.

- classname-prefix er endret fra `navdsi` -> `navds` for flyttede komponenter.

- Fikset cascading-problem mellom dropdown og popover. Dropdown blir ikke lengre påvirket av import-rekkefølge av popover.

- Styling for flyttede komponenter finnes nå på CDN (https://aksel.nav.no/grunnleggende/kode/css-import)

## 3.4.0

### Minor Changes

- [#2010](https://github.com/navikt/aksel/pull/2010) - Tag: `moderate`-variant

## 3.2.3

### Patch Changes

- [#1993](https://github.com/navikt/aksel/pull/1993) - Datepicker: Fikset small-variant av datepicker-input.

- [#1994](https://github.com/navikt/aksel/pull/1994) - CopyButton: `xsmall`-size for bruk i tabeller

## 3.1.3

### Patch Changes

- [#1976](https://github.com/navikt/aksel/pull/1976) - :lipstick: Oppdatert utseende for ToggleGroup. `Medium` og `Small`-size er begge 10px lavere, mindre border-radius

## 3.1.0

### Minor Changes

- [#1966](https://github.com/navikt/aksel/pull/1966) - Alle komponenter bruker nå default `:focus-visible` for fokusmarkering. Medfølger også fallback for `:focus`

### Patch Changes

- [#1967](https://github.com/navikt/aksel/pull/1967) - Oppdatert Label og Description spacing for skjemakomponenter

## 3.0.0

### Major Changes

- [#1964](https://github.com/navikt/aksel/pull/1964) - Accordion: Chevron er left-aligned, deler av styling er refaktorert, `size`-props og `neutral`-variant

## 2.9.0

### Minor Changes

- [#1941](https://github.com/navikt/aksel/pull/1941) - CSS nå tilgjengelig som separate filer: Kan lastest fra CDN, minified-versjoner tilgjengelig

## 2.8.9

### Patch Changes

- [#1905](https://github.com/navikt/aksel/pull/1905) - Button: Padding/border-radius tokens

## 2.8.7

### Patch Changes

- Button: token for tertiary

## 2.8.6

### Patch Changes

- Alert, Chips og ErrorSummary har nå bedre utvalg av tokens

## 2.8.5

### Patch Changes

- Accordion: tokens for header-bakgrunn

- [#1879](https://github.com/navikt/aksel/pull/1879) - Select: Fikset tekstfarge på iphone

## 2.8.2

### Patch Changes

- [#1870](https://github.com/navikt/aksel/pull/1870) - ExpansioCard: Oppdatert typografi

## 2.7.8

### Patch Changes

- [#1863](https://github.com/navikt/aksel/pull/1863) - Tabs: La til focus-markering for Tabs.Panel

## 2.7.5

### Patch Changes

- ToggleGroup: Fikset token-bug

## 2.4.3

### Patch Changes

- Select: Fikset disabled + opacity bug for Chrome

## 2.4.2

### Patch Changes

- [#1823](https://github.com/navikt/aksel/pull/1823) - List: La til støtte for nesting

## 2.3.1

### Patch Changes

- Fikset feil bruk av fallback-tokens i Textarea og Timeline

## 2.3.0

### Minor Changes

- [#1813](https://github.com/navikt/aksel/pull/1813) - Select: Fikset sentrering av tekst i Firefox

### Patch Changes

- Select: `small`-variant er nå 32px (var 34px)

## 2.2.0

### Minor Changes

- [#1789](https://github.com/navikt/aksel/pull/1789) - ToggleGroup: `Neutral`-variant.

- Button: `Neutral`-variant.

## 2.1.2

### Patch Changes

- TextField: `small`-variant har nå 8px horisontal padding (før 4px)

## 2.0.12

### Patch Changes

- [#1737](https://github.com/navikt/aksel/pull/1737) - Radio: Fikset default visuell error-state

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

- [#1684](https://github.com/navikt/aksel/pull/1684) - Tag: `filled`-varianter
