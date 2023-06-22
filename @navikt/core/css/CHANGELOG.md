# @navikt/ds-css

## 4.4.0

### Minor Changes

- [#2041](https://github.com/navikt/aksel/pull/2041) [`de3626958`](https://github.com/navikt/aksel/commit/de3626958266d1271840fa341c36500ab66b573d) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Shadow-tokens er oppdatert: Datepicker har nå ikke border, Modal bruker shadow-xlarge, LinkCard bruker shadow-xsmall

## 4.3.0

### Minor Changes

- [#2069](https://github.com/navikt/aksel/pull/2069) [`99c08b8e4`](https://github.com/navikt/aksel/commit/99c08b8e4ab33acd20a21719986452652ffe3c57) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Popover/Helptext: Maksbredde på 100vw - 1.5rem. Treffer ikke lengre kanten på skjermen.

### Patch Changes

- [#2067](https://github.com/navikt/aksel/pull/2067) [`d39ed906c`](https://github.com/navikt/aksel/commit/d39ed906c61149ac823ebab2e8974a105e592163) Thanks [@KenAJoh](https://github.com/KenAJoh)! - ExpansionCard: Ved nesting av komponetene fikk man styling fra parent

## 4.2.0

### Minor Changes

- [#2048](https://github.com/navikt/aksel/pull/2048) [`b1625ba38`](https://github.com/navikt/aksel/commit/b1625ba3882b430d678d0623922d7fb56aa724b3) Thanks [@HalvorHaugan](https://github.com/HalvorHaugan)! - Chat: `small`-size, innebygde varianter for farge og oppdatert utseende.

## 4.1.4

### Patch Changes

- [#2049](https://github.com/navikt/aksel/pull/2049) [`e06096105`](https://github.com/navikt/aksel/commit/e060961050c75ec815e5c125001f1ff99106e298) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Readmore: setter nå eksplisitt color for å ikke arve text-subtle fra parent.

## 4.1.1

### Patch Changes

- [`91343563c`](https://github.com/navikt/aksel/commit/91343563c916a554d8ade5401c28ab4c3b3e26af) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Fikset cursor-markering av tekst i skeleton.

## 4.1.0

### Minor Changes

- [#2035](https://github.com/navikt/aksel/pull/2035) [`7b42f536a`](https://github.com/navikt/aksel/commit/7b42f536aa90c1b5dbe2b19f1bbe292701546420) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Chips: `neutral` og `action`-varianter av Chips.Toggle. Opt-out mulighet for Checkmark. Oppdatert checkmark-ikon

- [#2036](https://github.com/navikt/aksel/pull/2036) [`b2f796d68`](https://github.com/navikt/aksel/commit/b2f796d681f1c1d76d26d1fd743268c8c618a854) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Alle description-felter på fieldsets har nå `text-subtle` som farge.

## 4.0.0

### Major Changes

- [#2026](https://github.com/navikt/aksel/pull/2026) [`895bdc08e`](https://github.com/navikt/aksel/commit/895bdc08e50647d9b9186cbf0e9ab069323de56c) Thanks [@KenAJoh](https://github.com/KenAJoh)! - All styling fra `@navikt/ds-css-internal` er flyttet til `@navikt/ds-css`.

- classname-prefix er endret fra `navdsi` -> `navds` for flyttede komponenter.

- Fikset cascading-problem mellom dropdown og popover. Dropdown blir ikke lengre påvirket av import-rekkefølge av popover.

- Styling for flyttede komponenter finnes nå på CDN (https://aksel.nav.no/grunnleggende/kode/css-import)

## 3.4.0

### Minor Changes

- [#2010](https://github.com/navikt/aksel/pull/2010) [`b958d41a2`](https://github.com/navikt/aksel/commit/b958d41a20c66327658514fcf24ae20893c9531a) Thanks [@HalvorHaugan](https://github.com/HalvorHaugan)! - Tag: `moderate`-variant

## 3.2.3

### Patch Changes

- [#1993](https://github.com/navikt/aksel/pull/1993) [`475e994f4`](https://github.com/navikt/aksel/commit/475e994f494b2080ffc05eb1684b6a244e3e2969) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker: Fikset small-variant av datepicker-input.

- [#1994](https://github.com/navikt/aksel/pull/1994) [`444e905e0`](https://github.com/navikt/aksel/commit/444e905e01965fd5cac40ff20c5225b072e67221) Thanks [@KenAJoh](https://github.com/KenAJoh)! - CopyButton: `xsmall`-size for bruk i tabeller

## 3.1.3

### Patch Changes

- [#1976](https://github.com/navikt/aksel/pull/1976) [`e8ecf309a`](https://github.com/navikt/aksel/commit/e8ecf309a910e47fd3cea6c54cd993ab1196910f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :lipstick: Oppdatert utseende for ToggleGroup. `Medium` og `Small`-size er begge 10px lavere, mindre border-radius

## 3.1.0

### Minor Changes

- [#1966](https://github.com/navikt/aksel/pull/1966) [`f1c4c46eb`](https://github.com/navikt/aksel/commit/f1c4c46ebb0522561483f18e3b86b190cf9cc372) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Alle komponenter bruker nå default `:focus-visible` for fokusmarkering. Medfølger også fallback for `:focus`

### Patch Changes

- [#1967](https://github.com/navikt/aksel/pull/1967) [`9d2cd9e7f`](https://github.com/navikt/aksel/commit/9d2cd9e7fffb3cf6310c88229ee39ea85db19bca) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Oppdatert Label og Description spacing for skjemakomponenter

## 3.0.0

### Major Changes

- [#1964](https://github.com/navikt/aksel/pull/1964) [`166ee5feb`](https://github.com/navikt/aksel/commit/166ee5feb3c987c4e633eb449812116bfd865d3f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Accordion: Chevron er left-aligned, deler av styling er refaktorert, `size`-props og `neutral`-variant

## 2.9.0

### Minor Changes

- [#1941](https://github.com/navikt/aksel/pull/1941) [`657b7f3f3`](https://github.com/navikt/aksel/commit/657b7f3f3e62c5ce3173e6c95a29fcd237ce7343) Thanks [@KenAJoh](https://github.com/KenAJoh)! - CSS nå tilgjengelig som separate filer: Kan lastest fra CDN, minified-versjoner tilgjengelig

## 2.8.9

### Patch Changes

- [#1905](https://github.com/navikt/aksel/pull/1905) [`212194964`](https://github.com/navikt/aksel/commit/212194964c4dd576e1ffc031316dff8cbe5016a2) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Button: Padding/border-radius tokens

## 2.8.7

### Patch Changes

- [`7f3f025db`](https://github.com/navikt/aksel/commit/7f3f025db2ad605df4240605a733d10d08db753a) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Button: token for tertiary

## 2.8.6

### Patch Changes

- [`2eb358ad8`](https://github.com/navikt/aksel/commit/2eb358ad888979d21c385b3900973946f3f466be) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Alert, Chips og ErrorSummary har nå bedre utvalg av tokens

## 2.8.5

### Patch Changes

- [`f66437082`](https://github.com/navikt/aksel/commit/f664370826ed51bda7ad681e1f1799c26d2c1f0a) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Accordion: tokens for header-bakgrunn

- [#1879](https://github.com/navikt/aksel/pull/1879) [`55b585618`](https://github.com/navikt/aksel/commit/55b585618341a4d8bf26ed9b9e129d897b1600dc) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Select: Fikset tekstfarge på iphone

## 2.8.2

### Patch Changes

- [#1870](https://github.com/navikt/aksel/pull/1870) [`9c495cf50`](https://github.com/navikt/aksel/commit/9c495cf5037a7453e51e273ab93e4232576f4958) Thanks [@KenAJoh](https://github.com/KenAJoh)! - ExpansioCard: Oppdatert typografi

## 2.7.8

### Patch Changes

- [#1863](https://github.com/navikt/aksel/pull/1863) [`7ace69f21`](https://github.com/navikt/aksel/commit/7ace69f215760bbb5bf997670c897403d8ee558d) Thanks [@it-vegard](https://github.com/it-vegard)! - Tabs: La til focus-markering for Tabs.Panel

## 2.7.5

### Patch Changes

- ToggleGroup: Fikset token-bug

## 2.4.3

### Patch Changes

- [`f962bc781`](https://github.com/navikt/aksel/commit/f962bc7816027c24e334d9754c3e07cda951cf56) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Select: Fikset disabled + opacity bug for Chrome

## 2.4.2

### Patch Changes

- [#1823](https://github.com/navikt/aksel/pull/1823) [`a7ce61f84`](https://github.com/navikt/aksel/commit/a7ce61f840e5bfaafc4f70e550167fe0095555b8) Thanks [@kschieren](https://github.com/kschieren)! - List: La til støtte for nesting

## 2.3.1

### Patch Changes

- [`241b2e678`](https://github.com/navikt/aksel/commit/241b2e678f1f40909e2d36fe095dcbce8673f174) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset feil bruk av fallback-tokens i Textarea og Timeline

## 2.3.0

### Minor Changes

- [#1813](https://github.com/navikt/aksel/pull/1813) [`7702c6527`](https://github.com/navikt/aksel/commit/7702c65275a4d86a8260852d091e6dd4cfe9217c) Thanks [@ingfo](https://github.com/ingfo)! - Select: Fikset sentrering av tekst i Firefox

### Patch Changes

- [`51b62cca7`](https://github.com/navikt/aksel/commit/51b62cca7b857e92669cd0b09e620b131faf80e5) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Select: `small`-variant er nå 32px (var 34px)

## 2.2.0

### Minor Changes

- [#1789](https://github.com/navikt/aksel/pull/1789) [`c0929a534`](https://github.com/navikt/aksel/commit/c0929a534dc8effece5435f8be550cb7931a52b1) Thanks [@KenAJoh](https://github.com/KenAJoh)! - ToggleGroup: `Neutral`-variant.

- Button: `Neutral`-variant.

## 2.1.2

### Patch Changes

- [`62f36da5e`](https://github.com/navikt/aksel/commit/62f36da5e74fc7f53414d42b310c3b57597795bc) Thanks [@KenAJoh](https://github.com/KenAJoh)! - TextField: `small`-variant har nå 8px horisontal padding (før 4px)

## 2.0.12

### Patch Changes

- [#1737](https://github.com/navikt/aksel/pull/1737) [`8a1ef5e7e`](https://github.com/navikt/aksel/commit/8a1ef5e7e2c066cb80c13e14329e1585e2c427f8) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Radio: Fikset default visuell error-state

## 2.0.5

### Patch Changes

- Button: Reverserte border-width endrinder (var 1.5px, nå 2px)

## 2.0.1

### Patch Changes

- [`e8007328d`](https://github.com/navikt/aksel/commit/e8007328db3f6d5be696cf24f03304c79be0f3f7) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Bugfixer ved bruk av tokens oppdatert i v2.0.0

## 2.0.0

### Major Changes

- [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fontlasting: Fonter lastes nå fra NAV-CDN

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

- [#1684](https://github.com/navikt/aksel/pull/1684) [`e19bf67b3`](https://github.com/navikt/aksel/commit/e19bf67b337dea39989c68b5e9c2591cf0d5b40f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Tag: `filled`-varianter
