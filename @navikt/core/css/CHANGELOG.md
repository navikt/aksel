# @navikt/ds-css

## 4.1.4

### Patch Changes

- [#2049](https://github.com/navikt/aksel/pull/2049) [`e06096105`](https://github.com/navikt/aksel/commit/e060961050c75ec815e5c125001f1ff99106e298) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Subtle-description på form-elementer brakk bruk av Readmore

## 4.1.3

## 4.1.2

## 4.1.1

### Patch Changes

- [`91343563c`](https://github.com/navikt/aksel/commit/91343563c916a554d8ade5401c28ab4c3b3e26af) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Fikset markering av tekst i skeleton.

## 4.1.0

### Minor Changes

- [#2035](https://github.com/navikt/aksel/pull/2035) [`7b42f536a`](https://github.com/navikt/aksel/commit/7b42f536aa90c1b5dbe2b19f1bbe292701546420) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :tada: Oppdatert Chips

  - Toggle Chips har nå varianter: neutral og action
  - Toggle Chips har nå en ny prop: `checkmark` som slår av/på checkmark ved selected-state

- [#2036](https://github.com/navikt/aksel/pull/2036) [`b2f796d68`](https://github.com/navikt/aksel/commit/b2f796d681f1c1d76d26d1fd743268c8c618a854) Thanks [@KenAJoh](https://github.com/KenAJoh)! - - Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600).

  - Icon-subtle bruker nå grayalpha.
  - Alle description-felter på fieldsets har nå text-subtle som farge.

- [#1821](https://github.com/navikt/aksel/pull/1821) [`db8c38a09`](https://github.com/navikt/aksel/commit/db8c38a094cd183db54aebecb62d5b223920a040) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :tada: Ny komponent Skeleton!

  - varianter: text, circle, rounded og rectangle

### Patch Changes

- [#2027](https://github.com/navikt/aksel/pull/2027) [`c028f36e2`](https://github.com/navikt/aksel/commit/c028f36e2bc58223ebf8b655980dde7eafb30add) Thanks [@JulianNymark](https://github.com/JulianNymark)! - :sparkles: La til `indent`-prop på Accordion

## 4.0.0

### Major Changes

- [#2026](https://github.com/navikt/aksel/pull/2026) [`895bdc08e`](https://github.com/navikt/aksel/commit/895bdc08e50647d9b9186cbf0e9ab069323de56c) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :test-tube: Datepicker og Monthpicker er nå ute av beta. Kjør codemod for migrering, eller `cmd/ctrl + shift + f` og erstatt `UNSAFE_` med ``

  - UNSAFE-prefix er fjernet fra Datepicker og Monthpicker

  ```bash
  npx @navikt/aksel codemod v4-date
  ```

- [#2026](https://github.com/navikt/aksel/pull/2026) [`895bdc08e`](https://github.com/navikt/aksel/commit/895bdc08e50647d9b9186cbf0e9ab069323de56c) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :truck: Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react`

  - `<Header />` er renamet til `<InternalHeader />`
  - Dropdown, Timeline og InternalHeader(Header) er flyttet over til `@navikt/ds-react`
  - All styling fra `@navikt/ds-css-internal` er flyttet til `@navikt/ds-css` og classname-prefix er endret fra `navdsi` -> `navds` for flyttede komponenter. Sett opp [stylelint med configen vår](https://aksel.nav.no/grunnleggende/kode/stylelint), så vil du få feilmelding om du bruker gamle klassenavn.
  - Fikset cascading-problem mellom dropdown og popover. Dropdown blir ikke lengre påvirket av import-rekkefølge av popover.
  - Styling for flyttede komponenter finnes nå på CDN (https://aksel.nav.no/grunnleggende/kode/css-import)

  Kjør codemod for migrering:

  ```bash
  // React
  npx @navikt/aksel codemod v4-internal-react

  // CSS
  npx @navikt/aksel codemod v4-internal-css
  ```

## 3.4.2

## 3.4.1

## 3.4.0

### Minor Changes

- [#2010](https://github.com/navikt/aksel/pull/2010) [`b958d41a2`](https://github.com/navikt/aksel/commit/b958d41a20c66327658514fcf24ae20893c9531a) Thanks [@HalvorHaugan](https://github.com/HalvorHaugan)! - Ny variant "moderate" i Tag

## 3.3.1

## 3.3.0

## 3.2.4

### Patch Changes

- [#2000](https://github.com/navikt/aksel/pull/2000) [`30eee0dac`](https://github.com/navikt/aksel/commit/30eee0dac4e3e5a1379033283a6885e646e80458) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Search støtter nå htmlSize-prop

## 3.2.3

### Patch Changes

- [#1993](https://github.com/navikt/aksel/pull/1993) [`475e994f4`](https://github.com/navikt/aksel/commit/475e994f494b2080ffc05eb1684b6a244e3e2969) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Fikset small-variant av datepicker-input

  - :recycle: Refactored Datepicker.Input-button for bugfix

- [#1994](https://github.com/navikt/aksel/pull/1994) [`444e905e0`](https://github.com/navikt/aksel/commit/444e905e01965fd5cac40ff20c5225b072e67221) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :tada: CopyButton har nå en `xsmall`-variant

  - Kan nå lettere brukes i tabeller

## 3.2.2

## 3.2.1

## 3.2.0

### Minor Changes

- [#1982](https://github.com/navikt/aksel/pull/1982) [`affcab14c`](https://github.com/navikt/aksel/commit/affcab14c3d536929dfa64a36f5b43f9d0e8c3b7) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :sparkles: Ny komponent `<CopyButton />`!

  - Erstatter `<CopyToClipboard />` fra `@navikt/ds-react-internal`
  - CopyToClipboard er markert som deprecated. Den vil fortsatt fungere, men noen lintere vil kunne ende opp med å klage på den.

## 3.1.3

### Patch Changes

- [#1976](https://github.com/navikt/aksel/pull/1976) [`e8ecf309a`](https://github.com/navikt/aksel/commit/e8ecf309a910e47fd3cea6c54cd993ab1196910f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :lipstick: Oppdatert utseende for ToggleGroup

  - Medium og Small er begge 10px lavere
  - Mindre border-radius

## 3.1.2

## 3.1.1

## 3.1.0

### Minor Changes

- [#1966](https://github.com/navikt/aksel/pull/1966) [`f1c4c46eb`](https://github.com/navikt/aksel/commit/f1c4c46ebb0522561483f18e3b86b190cf9cc372) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :lipstick: Alle komponenter bruker nå default `:focus-visible` for fokusmarkering.
  (Alle komponenter som bruker `:focus-visible` har også en fallback for `:focus`)

### Patch Changes

- [#1967](https://github.com/navikt/aksel/pull/1967) [`9d2cd9e7f`](https://github.com/navikt/aksel/commit/9d2cd9e7fffb3cf6310c88229ee39ea85db19bca) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :lipstick: Oppdatert Label og Description spacing for skjemakomponenter

## 3.0.1

## 3.0.0

### Major Changes

- [#1964](https://github.com/navikt/aksel/pull/1964) [`166ee5feb`](https://github.com/navikt/aksel/commit/166ee5feb3c987c4e633eb449812116bfd865d3f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - **Accordion**

  - Accordion oppdatet til å ha chevron left-aligned.
  - Neutral-variant lagt til
  - Diverse nye size-options for heading og paddinger.
  - Deler av Accordion-CSS er refaktorert. Dette vil kunne brekke overskrevne stiler.

- [#1964](https://github.com/navikt/aksel/pull/1964) [`166ee5feb`](https://github.com/navikt/aksel/commit/166ee5feb3c987c4e633eb449812116bfd865d3f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Aksels løsninger bruker nå `@navikt/aksel-icons`

  **Sideeffects av ikonendringer**

  - Komponenter som tidligere brukte Expand-ikon har fått oppdatert animasjon (table, readmore og accordion)
  - Alert bruker samme ikonstørrelse for alle størrelser
  - Chips har justert padding/ikonstørrelser
  - Datepicker hover-bug på knapper er fikset
  - Helptekst bruker nå et custom-ikon.
  - Select har fått justert padding rundt ikon
  - Switch bruker samme checkmark som checkbox, er nå avrundet
  - ReadMore har justert margin for alignment med ikon, fjernet content-animasjon
  - Tabs bruker default text-default nå
  - Stepper har endret hvordan den styler checkmark-ikon.

## 2.9.8

## 2.9.7

## 2.9.6

## 2.9.5

## 2.9.4

## 2.9.3

## 2.9.2

## 2.9.1

## 2.9.0

### Minor Changes

- [#1941](https://github.com/navikt/aksel/pull/1941) [`657b7f3f3`](https://github.com/navikt/aksel/commit/657b7f3f3e62c5ce3173e6c95a29fcd237ce7343) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :tada: CSS nå tilgjengelig som separate filer

  - Kan lastest fra CDN
  - Tilbys nå i minified-versjoner
  - Kommandoline: `npx @navikt/aksel css-imports` for å raskt komme i gang med CSS-optimalisering

## 2.8.16

## 2.8.15

### Patch Changes

- [#1930](https://github.com/navikt/aksel/pull/1930) [`6682be1c8`](https://github.com/navikt/aksel/commit/6682be1c8e6562213c64e5be4bed70fef54ab865) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Alle pakker implementerer nå npm provenance (beta)

## 2.8.14

### Patch Changes

- [`f0d9a8853`](https://github.com/navikt/aksel/commit/f0d9a8853f56854a4049bd3f6cc34968e9d6c380) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fixes shown month on open in Datepicker/MonthPicker, better handling of out-of-range 'today'

## 2.8.13

## 2.8.12

## 2.8.11

## 2.8.10

## 2.8.9

### Patch Changes

- [#1905](https://github.com/navikt/aksel/pull/1905) [`212194964`](https://github.com/navikt/aksel/commit/212194964c4dd576e1ffc031316dff8cbe5016a2) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :sparkles: Padding/border-radius tokens for button.css

## 2.8.8

## 2.8.7

### Patch Changes

- [`7f3f025db`](https://github.com/navikt/aksel/commit/7f3f025db2ad605df4240605a733d10d08db753a) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset typografi for radio, checkbox. Button token for tertiary

## 2.8.6

### Patch Changes

- [`2eb358ad8`](https://github.com/navikt/aksel/commit/2eb358ad888979d21c385b3900973946f3f466be) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Alert, Chips og ErrorSummary har nå bedre utvalg av tokens

## 2.8.5

### Patch Changes

- [`f66437082`](https://github.com/navikt/aksel/commit/f664370826ed51bda7ad681e1f1799c26d2c1f0a) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :art: Accordion-tokens for header bakgrunn

- [#1879](https://github.com/navikt/aksel/pull/1879) [`55b585618`](https://github.com/navikt/aksel/commit/55b585618341a4d8bf26ed9b9e129d897b1600dc) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Fikset tekstfarge i select på iphone

## 2.8.4

## 2.8.3

## 2.8.2

### Patch Changes

- [#1870](https://github.com/navikt/aksel/pull/1870) [`9c495cf50`](https://github.com/navikt/aksel/commit/9c495cf5037a7453e51e273ab93e4232576f4958) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Oppdatert typografi for ExpansioCard

## 2.8.1

## 2.8.0

### Minor Changes

- [#1820](https://github.com/navikt/aksel/pull/1820) [`c6d51a019`](https://github.com/navikt/aksel/commit/c6d51a01902e4fd7916a422e17ed175f39acd458) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :tada: Ny komponent! ExpansionCard. Oppfølger fra gammel Ekspanderbartpanel.

## 2.7.8

### Patch Changes

- [#1863](https://github.com/navikt/aksel/pull/1863) [`7ace69f21`](https://github.com/navikt/aksel/commit/7ace69f215760bbb5bf997670c897403d8ee558d) Thanks [@it-vegard](https://github.com/it-vegard)! - Added focus indicator for tabpanel

## 2.7.7

## 2.7.6

## 2.7.5

### Patch Changes

- :bug: Fikset token-bug i togglegroup

## 2.7.4

## 2.7.3

## 2.7.2

## 2.7.1

## 2.7.0

## 2.6.2

## 2.6.1

## 2.6.0

## 2.5.1

## 2.5.0

## 2.4.3

### Patch Changes

- [`f962bc781`](https://github.com/navikt/aksel/commit/f962bc7816027c24e334d9754c3e07cda951cf56) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset disabled-opacity bug i select for Chrome

## 2.4.2

### Patch Changes

- [#1823](https://github.com/navikt/aksel/pull/1823) [`a7ce61f84`](https://github.com/navikt/aksel/commit/a7ce61f840e5bfaafc4f70e550167fe0095555b8) Thanks [@kschieren](https://github.com/kschieren)! - added support for nested lists

## 2.4.1

## 2.4.0

### Minor Changes

- [#1807](https://github.com/navikt/aksel/pull/1807) [`70eeb24b3`](https://github.com/navikt/aksel/commit/70eeb24b38ac871c7f2e31e1621b949669c401b6) Thanks [@kschieren](https://github.com/kschieren)! - Added List component

## 2.3.1

### Patch Changes

- [`241b2e678`](https://github.com/navikt/aksel/commit/241b2e678f1f40909e2d36fe095dcbce8673f174) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset feil bruk av fallback-tokens i textarea, timeline

## 2.3.0

### Minor Changes

- [#1813](https://github.com/navikt/aksel/pull/1813) [`7702c6527`](https://github.com/navikt/aksel/commit/7702c65275a4d86a8260852d091e6dd4cfe9217c) Thanks [@ingfo](https://github.com/ingfo)! - Fiksa sentrering av tekst i Select i Firefox

### Patch Changes

- [`51b62cca7`](https://github.com/navikt/aksel/commit/51b62cca7b857e92669cd0b09e620b131faf80e5) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Select small 34px høyde -> 32px

## 2.2.0

### Minor Changes

- [#1789](https://github.com/navikt/aksel/pull/1789) [`c0929a534`](https://github.com/navikt/aksel/commit/c0929a534dc8effece5435f8be550cb7931a52b1) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Button og ToggleGroup har nå en neutral-variant, oppdatert neutral-tokens

## 2.1.7

## 2.1.6

## 2.1.5

## 2.1.4

## 2.1.3

## 2.1.2

### Patch Changes

- [`62f36da5e`](https://github.com/navikt/aksel/commit/62f36da5e74fc7f53414d42b310c3b57597795bc) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Small textfield har nå 8px horisontal padding (4px før)

## 2.1.1

## 2.1.0

## 2.0.18

## 2.0.17

## 2.0.16

## 2.0.15

### Patch Changes

- [#1748](https://github.com/navikt/aksel/pull/1748) [`22dfd8e60`](https://github.com/navikt/aksel/commit/22dfd8e60315c421749394d35e41f412a00a7593) Thanks [@KenAJoh](https://github.com/KenAJoh)! - toptextPosition prop i Chat for horisontal plassering av navn og dato.

## 2.0.14

## 2.0.13

## 2.0.12

### Patch Changes

- [#1737](https://github.com/navikt/aksel/pull/1737) [`8a1ef5e7e`](https://github.com/navikt/aksel/commit/8a1ef5e7e2c066cb80c13e14329e1585e2c427f8) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Fikset default visuell error-state for radio

## 2.0.11

## 2.0.10

## 2.0.9

## 2.0.8

## 2.0.7

## 2.0.6

## 2.0.5

### Patch Changes

- Reverserte border-width endrind i button

## 2.0.4

## 2.0.3

## 2.0.2

## 2.0.1

### Patch Changes

- [`e8007328d`](https://github.com/navikt/aksel/commit/e8007328db3f6d5be696cf24f03304c79be0f3f7) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Bugfixer ved bruk av tokens

## 2.0.0

### Major Changes

- [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4) Thanks [@KenAJoh](https://github.com/KenAJoh)! - v2: Tokens update and font-loading

## 1.5.10

## 1.5.9

### Patch Changes

- 4px -> 2px gap chips-toggle active

## 1.5.8

## 1.5.7

## 1.5.6

## 1.5.5

## 1.5.4

### Patch Changes

- [#1709](https://github.com/navikt/aksel/pull/1709) [`77302a30b`](https://github.com/navikt/aksel/commit/77302a30b8eef8dc00b2d2e9c904a3f57da81a11) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Oppdatert ikoner

## 1.5.3

### Patch Changes

- Byttet om på alt-farge rekkefølge

## 1.5.2

### Patch Changes

- :memo: Rename FilterChips to ToggleChips

## 1.5.1

### Patch Changes

- Flex-wrap chips.css

## 1.5.0

### Minor Changes

- [#1684](https://github.com/navikt/aksel/pull/1684) [`e19bf67b3`](https://github.com/navikt/aksel/commit/e19bf67b337dea39989c68b5e9c2591cf0d5b40f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :sparkles: Oppdaterte tag-varianter

- [#1668](https://github.com/navikt/aksel/pull/1668) [`97c5f60e9`](https://github.com/navikt/aksel/commit/97c5f60e9111da7e08f55c8d0aa29581f0a9b1ca) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Chips komponent :sparkles:

## 1.4.4

## 1.4.3

### Patch Changes

- :sparkles: Validering og inputFormat i Date-komponenter

## 1.4.2

## 1.4.1

### Patch Changes

- [`3c08651df`](https://github.com/navikt/aksel/commit/3c08651df28c3e19dd8c8a7a1d0032200bec473d) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Date-komponenter følger språkrådets dato-formatering for måneder.

## 1.4.0

## 1.3.39

### Patch Changes

- [`40f0b3340`](https://github.com/navikt/aksel/commit/40f0b3340d01bf85fecc04f2f3a8e8b2acf996f1) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Bump for latest-tag

## 1.3.38
