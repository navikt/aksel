# @navikt/ds-react

## 4.4.0

### Minor Changes

- [#2041](https://github.com/navikt/aksel/pull/2041) [`de3626958`](https://github.com/navikt/aksel/commit/de3626958266d1271840fa341c36500ab66b573d) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset klassenavn brukt for popover i Datepicker og Monthpicker

## 4.3.0

### Minor Changes

- [#2069](https://github.com/navikt/aksel/pull/2069) [`99c08b8e4`](https://github.com/navikt/aksel/commit/99c08b8e4ab33acd20a21719986452652ffe3c57) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Popover og Helptext har nå luft mot siden av skjerm på mindre flater

## 4.2.0

### Minor Changes

- [#2048](https://github.com/navikt/aksel/pull/2048) [`b1625ba38`](https://github.com/navikt/aksel/commit/b1625ba3882b430d678d0623922d7fb56aa724b3) Thanks [@HalvorHaugan](https://github.com/HalvorHaugan)! - Oppdatert Chat: `size` og `variant`-prop, optional `avatar`, uu og ui-forbedringer

## 4.1.7

### Patch Changes

- [`42b5af64a`](https://github.com/navikt/aksel/commit/42b5af64ab35d0f2d126d41f8fc3e61fe2834b36) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset JSDom-problemer ved testing av Timeline

- [#2056](https://github.com/navikt/aksel/pull/2056) [`dfbbe92a6`](https://github.com/navikt/aksel/commit/dfbbe92a63210278d9dd4d154c01f116ad921fc1) Thanks [@KenAJoh](https://github.com/KenAJoh)! - La til `wrapperClassname`-prop for HelpText

## 4.1.6

### Patch Changes

- [`9a8bb26c3`](https://github.com/navikt/aksel/commit/9a8bb26c36cfbb1a95cf28a043d2df3dbfe7185d) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Timeline-period brakk ved bruk av JSDom i vitest og jest

## 4.1.5

### Patch Changes

- [#2051](https://github.com/navikt/aksel/pull/2051) [`925aa7a14`](https://github.com/navikt/aksel/commit/925aa7a140bc0cd63e8884bea0bd478838c1aa17) Thanks [@KenAJoh](https://github.com/KenAJoh)! - `OverridableComponent` fungerer nå med komponenter som allerede bruker 'as'-prop.

- [#2052](https://github.com/navikt/aksel/pull/2052) [`7c17e40ca`](https://github.com/navikt/aksel/commit/7c17e40cac6703f00ce756276e9616deb73f6098) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Popover: `bubbleEscape`-prop tilbyr muligheten for escape-events til å sendes opp gjennom dom-treet.

## 4.1.3

### Patch Changes

- [`44a75acb6`](https://github.com/navikt/aksel/commit/44a75acb6b904d614a01344f42111761a48cb7e2) Thanks [@KenAJoh](https://github.com/KenAJoh)! - `className` ble ikke riktig forwardet til ikke-klikkbar Period i Timeline

## 4.1.2

### Patch Changes

- [`30068dca3`](https://github.com/navikt/aksel/commit/30068dca3fcdf4bf7bbfbfb3d09baa9fee003962) Thanks [@KenAJoh](https://github.com/KenAJoh)! - La til JSDoc for Skeleton-komponent

## 4.1.0

### Minor Changes

- [#2035](https://github.com/navikt/aksel/pull/2035) [`7b42f536a`](https://github.com/navikt/aksel/commit/7b42f536aa90c1b5dbe2b19f1bbe292701546420) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Chips: `neutral` og `action`-varianter for Chips.Toggle. `checkmark`-prop for Chips.Toggle

- [#1821](https://github.com/navikt/aksel/pull/1821) [`db8c38a09`](https://github.com/navikt/aksel/commit/db8c38a094cd183db54aebecb62d5b223920a040) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Ny komponent Skeleton!

### Patch Changes

- [#2034](https://github.com/navikt/aksel/pull/2034) [`17d92c9ed`](https://github.com/navikt/aksel/commit/17d92c9ed5f82a80f99a1512989744343edf60b3) Thanks [@JulianNymark](https://github.com/JulianNymark)! - La til JSDoc dokumentasjon for alle komponenter

- [#2027](https://github.com/navikt/aksel/pull/2027) [`c028f36e2`](https://github.com/navikt/aksel/commit/c028f36e2bc58223ebf8b655980dde7eafb30add) Thanks [@JulianNymark](https://github.com/JulianNymark)! - Accordion: La til `indent`-prop

## 4.0.0

### Major Changes

- [#2026](https://github.com/navikt/aksel/pull/2026) [`895bdc08e`](https://github.com/navikt/aksel/commit/895bdc08e50647d9b9186cbf0e9ab069323de56c) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker og Monthpicker er ute av beta. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h4ef68ae743b0)

- [#2026](https://github.com/navikt/aksel/pull/2026) [`895bdc08e`](https://github.com/navikt/aksel/commit/895bdc08e50647d9b9186cbf0e9ab069323de56c) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react`. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h3b8538e1981d)

## 3.4.0

### Minor Changes

- [#2010](https://github.com/navikt/aksel/pull/2010) [`b958d41a2`](https://github.com/navikt/aksel/commit/b958d41a20c66327658514fcf24ae20893c9531a) Thanks [@HalvorHaugan](https://github.com/HalvorHaugan)! - Tag: `moderate`-variant

## 3.3.1

### Patch Changes

- [#2005](https://github.com/navikt/aksel/pull/2005) [`5533fbd5a`](https://github.com/navikt/aksel/commit/5533fbd5a3a2b3e08f3c818e2669daccafb6212a) Thanks [@cskrov](https://github.com/cskrov)! - CopyButton: native `Clipboard API`

## 3.3.0

### Patch Changes

- [#1995](https://github.com/navikt/aksel/pull/1995) [`288cef591`](https://github.com/navikt/aksel/commit/288cef591abb0557295e50cf6e696d7a51607c32) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Timeline: popover/tooltip vises nå på hover, ikke onClick.

## 3.2.4

### Patch Changes

- [#2000](https://github.com/navikt/aksel/pull/2000) [`30eee0dac`](https://github.com/navikt/aksel/commit/30eee0dac4e3e5a1379033283a6885e646e80458) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Search: Støtter nå htmlSize-prop

## 3.2.3

### Patch Changes

- [#1993](https://github.com/navikt/aksel/pull/1993) [`475e994f4`](https://github.com/navikt/aksel/commit/475e994f494b2080ffc05eb1684b6a244e3e2969) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker: Oppdatert small-variant av Datepicker.Input. UI-oppdatert samtidig.

- [#1994](https://github.com/navikt/aksel/pull/1994) [`444e905e0`](https://github.com/navikt/aksel/commit/444e905e01965fd5cac40ff20c5225b072e67221) Thanks [@KenAJoh](https://github.com/KenAJoh)! - CopyButton: `xsmall`-variant for bruk i tabeller

## 3.2.2

### Patch Changes

- [`6d6267fe0`](https://github.com/navikt/aksel/commit/6d6267fe01f438f3bd67e1b4266ca3e82709561c) Thanks [@KenAJoh](https://github.com/KenAJoh)! - CopyButton: Fjernet use-client directive fra komponent. (warning i vite/rollup)

## 3.2.0

### Minor Changes

- [#1982](https://github.com/navikt/aksel/pull/1982) [`affcab14c`](https://github.com/navikt/aksel/commit/affcab14c3d536929dfa64a36f5b43f9d0e8c3b7) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Ny komponent CopyButton! Erstatter `CopyToClipboard` som nå er tagget som deprecated

## 3.1.0

### Patch Changes

- [#1967](https://github.com/navikt/aksel/pull/1967) [`9d2cd9e7f`](https://github.com/navikt/aksel/commit/9d2cd9e7fffb3cf6310c88229ee39ea85db19bca) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Oppdatert Label og Description spacing for alle skjemakomponenter

## 3.0.1

### Patch Changes

- [`fa2ead912`](https://github.com/navikt/aksel/commit/fa2ead912a4db15d1fa7e2c3efccbe69a64dc9a7) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fjernet `@navikt/ds-icons` fra dependencies

- [`db3846f5c`](https://github.com/navikt/aksel/commit/db3846f5cd483ad0ca24bc5938cfcdb64260f89d) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Accordion: Oppdatert default headingSize brukt i i Accordion.Header

## 3.0.0

### Major Changes

- [#1964](https://github.com/navikt/aksel/pull/1964) [`166ee5feb`](https://github.com/navikt/aksel/commit/166ee5feb3c987c4e633eb449812116bfd865d3f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Accordion: left-aligner chevron, `neutral`-variant, `size`-prop

- [#1964](https://github.com/navikt/aksel/pull/1964) [`166ee5feb`](https://github.com/navikt/aksel/commit/166ee5feb3c987c4e633eb449812116bfd865d3f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Bruker nå nå `@navikt/aksel-icons` for interne ikoner

## 2.9.1

### Patch Changes

- [#1944](https://github.com/navikt/aksel/pull/1944) [`1afdee453`](https://github.com/navikt/aksel/commit/1afdee453fbba20ec280dc868c8aa1ae2a92132d) Thanks [@KenAJoh](https://github.com/KenAJoh)! - ExpansionCard: Støtter nå `aria-labelledby` i tillegg til `aria-label`

## 2.8.16

### Patch Changes

- [`ff001f2bc`](https://github.com/navikt/aksel/commit/ff001f2bcf5a1ff0580660a1680f4f8342e7fdff) Thanks [@KenAJoh](https://github.com/KenAJoh)! - ExpansionCard: ExpansionCard.Content sendte ikke `className` videre

- [#1929](https://github.com/navikt/aksel/pull/1929) [`284534246`](https://github.com/navikt/aksel/commit/28453424684e00d65fd8d204f1405f7ed6a82fbf) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker. Bedre håndtering av visning for out-of-range-datoer

## 2.8.14

### Patch Changes

- [`f0d9a8853`](https://github.com/navikt/aksel/commit/f0d9a8853f56854a4049bd3f6cc34968e9d6c380) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker/Monthpicker: Oppdaterer vist måneder ved popover åpne/lukk. Fikser out-of-range håndtering av `today`

## 2.8.10

### Patch Changes

- [#1907](https://github.com/navikt/aksel/pull/1907) [`63fdacf0f`](https://github.com/navikt/aksel/commit/63fdacf0f8fa09593c64b35b49381d6c8a1befd1) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker/Monthpicker: refaktorert event-handling i hooks

## 2.8.7

### Patch Changes

- [`7f3f025db`](https://github.com/navikt/aksel/commit/7f3f025db2ad605df4240605a733d10d08db753a) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset typografi-bruk for `Radio` og `Checkbox`.

## 2.8.3

### Patch Changes

- [#1875](https://github.com/navikt/aksel/pull/1875) [`f862aa9c2`](https://github.com/navikt/aksel/commit/f862aa9c2ec71ffdb295708dc6dad6b77af9519e) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Textarea: oppdatert counter-tekst + mulighet for lokalisering

## 2.8.2

### Patch Changes

- [#1870](https://github.com/navikt/aksel/pull/1870) [`9c495cf50`](https://github.com/navikt/aksel/commit/9c495cf5037a7453e51e273ab93e4232576f4958) Thanks [@KenAJoh](https://github.com/KenAJoh)! - ExpansioCard: Oppdatert typografibruk

## 2.8.1

### Patch Changes

- [`1276b4d7e`](https://github.com/navikt/aksel/commit/1276b4d7efd831d20345292dbb21a11d100a0ddd) Thanks [@KenAJoh](https://github.com/KenAJoh)! - ExpansionCard: Oppdaetrt standard title-size til `medium`

## 2.8.0

### Minor Changes

- [#1820](https://github.com/navikt/aksel/pull/1820) [`c6d51a019`](https://github.com/navikt/aksel/commit/c6d51a01902e4fd7916a422e17ed175f39acd458) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Ny komponent ExpansionCard!

## 2.6.2

### Patch Changes

- [`59d32e52c`](https://github.com/navikt/aksel/commit/59d32e52c437759e66aa50d200b4264a6ba53069) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Textarea: Fikset React v18 problem med `TextareaAutosize`

## 2.6.1

### Patch Changes

- [`1c5e06438`](https://github.com/navikt/aksel/commit/1c5e06438ce9ff8225d5b2b2bf1f94348dfefe9c) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Search: `onSearchClick`-prop for lettere submit-handling

## 2.5.1

### Patch Changes

- [`ac1e69b34`](https://github.com/navikt/aksel/commit/ac1e69b342ae207db2e80e3058555c56902e5832) Thanks [@KenAJoh](https://github.com/KenAJoh)! - List: Refaktorert nestede lister

## 2.4.2

### Patch Changes

- [#1823](https://github.com/navikt/aksel/pull/1823) [`a7ce61f84`](https://github.com/navikt/aksel/commit/a7ce61f840e5bfaafc4f70e550167fe0095555b8) Thanks [@kschieren](https://github.com/kschieren)! - List: la til støtte for nestede lister

## 2.4.1

### Patch Changes

- [#1827](https://github.com/navikt/aksel/pull/1827) [`98c06b0be`](https://github.com/navikt/aksel/commit/98c06b0be20debff9969af874d5239ec920fa401) Thanks [@kschieren](https://github.com/kschieren)! - Datepicker: la til `fixedWeeks`-prop for å alltid vise 6 uker i Datepicker.Standalone

## 2.4.0

### Minor Changes

- [#1807](https://github.com/navikt/aksel/pull/1807) [`70eeb24b3`](https://github.com/navikt/aksel/commit/70eeb24b38ac871c7f2e31e1621b949669c401b6) Thanks [@kschieren](https://github.com/kschieren)! - Ny komponent List!

## 2.2.0

### Minor Changes

- [#1789](https://github.com/navikt/aksel/pull/1789) [`c0929a534`](https://github.com/navikt/aksel/commit/c0929a534dc8effece5435f8be550cb7931a52b1) Thanks [@KenAJoh](https://github.com/KenAJoh)! - ToggleGroup: `neutral`-variant

- [#1789](https://github.com/navikt/aksel/pull/1789) [`c0929a534`](https://github.com/navikt/aksel/commit/c0929a534dc8effece5435f8be550cb7931a52b1) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Button: `neutral`-variant

## 2.1.7

### Patch Changes

- [`6ac97aeb3`](https://github.com/navikt/aksel/commit/6ac97aeb34735020e5a2083e51e836877abaefa3) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker: Fikset rekkefølge på `onValidate` og `onRangeChange` i useRangepicker-hook

## 2.1.6

### Patch Changes

- [#1777](https://github.com/navikt/aksel/pull/1777) [`cd1c93f9d`](https://github.com/navikt/aksel/commit/cd1c93f9d471fbbc38215d788a73f21b5b216c5b) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker/Monthpicker: `openOnFocus`-prop for manuell håndtering av popover

## 2.1.5

### Patch Changes

- Datepicker: ESM import fra date-fns fungerer nå

## 2.1.4

### Patch Changes

- [`87f194c1d`](https://github.com/navikt/aksel/commit/87f194c1dc29b10a604de676b358d117e2dbf52f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker: Fikset edgecase i `useRangepicker` der valg av startdato etter sluttdato ga feil output

## 2.1.3

### Patch Changes

- [#1771](https://github.com/navikt/aksel/pull/1771) [`494566e60`](https://github.com/navikt/aksel/commit/494566e604e958363f75ebfa2adbc1669397636a) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Monthpicker: håndterer visning av år riktig

## 2.1.1

### Patch Changes

- [#1759](https://github.com/navikt/aksel/pull/1759) [`dcf5cfc06`](https://github.com/navikt/aksel/commit/dcf5cfc06b751341559ef30085bd974820531e57) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset `@types/react` v18 feil introdusert i v2.0.6

## 2.1.0

### Minor Changes

- [`0873fe652`](https://github.com/navikt/aksel/commit/0873fe6520e817e462197c162b49c05826da4838) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker/Monthpicker: år med 2 siffer i input fungerer nå

## 2.0.18

### Patch Changes

- [`98177d0cd`](https://github.com/navikt/aksel/commit/98177d0cd3802029dcf398ce93c1767d3b0860c5) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker: Bedre typer for `ref`

## 2.0.15

### Patch Changes

- [#1748](https://github.com/navikt/aksel/pull/1748) [`22dfd8e60`](https://github.com/navikt/aksel/commit/22dfd8e60315c421749394d35e41f412a00a7593) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Chat: `toptextPosition`-prop for horisontal plassering av navn og dato.

## 2.0.14

### Patch Changes

- [`8e5c55443`](https://github.com/navikt/aksel/commit/8e5c554431c98b1b658c5054c0b3cf08b8a65e52) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Oppdatert `@floating-ui/react`-versjon

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

- [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fonter blir bruk i all typografi blir nå lastet fra CDN

## 1.5.10

### Patch Changes

- [#1717](https://github.com/navikt/aksel/pull/1717) [`d9352982d`](https://github.com/navikt/aksel/commit/d9352982d42d5d12a9c5fc345e546f57c753738d) Thanks [@vebnor](https://github.com/vebnor)! - Modal: `parentSelector`-prop i Modal

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

- [#1684](https://github.com/navikt/aksel/pull/1684) [`e19bf67b3`](https://github.com/navikt/aksel/commit/e19bf67b337dea39989c68b5e9c2591cf0d5b40f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Tag: `filles`-varianter

- [#1668](https://github.com/navikt/aksel/pull/1668) [`97c5f60e9`](https://github.com/navikt/aksel/commit/97c5f60e9111da7e08f55c8d0aa29581f0a9b1ca) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Ny komponent Chips!

## 1.4.4

### Patch Changes

- Datepicker: Eksponerer `onValidation`-typer

## 1.4.3

### Patch Changes

- Datepicker: Validering og inputFormat funksjonalitet

## 1.4.1

### Patch Changes

- [`3c08651df`](https://github.com/navikt/aksel/commit/3c08651df28c3e19dd8c8a7a1d0032200bec473d) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker: Følger språkrådets dato-formatering for måneder.

## 1.4.0

### Minor Changes

- [`1bdb7e377`](https://github.com/navikt/aksel/commit/1bdb7e3777ece28d153991b78dbdd289366fca57) Thanks [@KenAJoh](https://github.com/KenAJoh)! - [#1702](https://github.com/navikt/aksel/pull/1702) [`20bcc28cb`](https://github.com/navikt/aksel/commit/20bcc28cb0a886aa40d2c1b042fb2706a144c014) Thanks [@andnorda](https://github.com/andnorda)! - Ny komponent Provider! For håndtering av global config på tvers av komponenter
