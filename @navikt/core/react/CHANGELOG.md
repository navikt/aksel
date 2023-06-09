# @navikt/ds-react

## 4.1.3

### Patch Changes

- [`44a75acb6`](https://github.com/navikt/aksel/commit/44a75acb6b904d614a01344f42111761a48cb7e2) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Classname ble ikke riktig forwardet til ikke-klikkbar Period i Timeline

- Updated dependencies []:
  - @navikt/aksel-icons@4.1.3

## 4.1.2

### Patch Changes

- [`30068dca3`](https://github.com/navikt/aksel/commit/30068dca3fcdf4bf7bbfbfb3d09baa9fee003962) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Jsdoc for Skeleton-komponent

- Updated dependencies []:
  - @navikt/aksel-icons@4.1.2

## 4.1.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.1.1

## 4.1.0

### Minor Changes

- [#2035](https://github.com/navikt/aksel/pull/2035) [`7b42f536a`](https://github.com/navikt/aksel/commit/7b42f536aa90c1b5dbe2b19f1bbe292701546420) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :tada: Oppdatert Chips

  - Toggle Chips har nå varianter: neutral og action
  - Toggle Chips har nå en ny prop: `checkmark` som slår av/på checkmark ved selected-state

- [#1821](https://github.com/navikt/aksel/pull/1821) [`db8c38a09`](https://github.com/navikt/aksel/commit/db8c38a094cd183db54aebecb62d5b223920a040) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :tada: Ny komponent Skeleton!

  - varianter: text, circle, rounded og rectangle

### Patch Changes

- [#2034](https://github.com/navikt/aksel/pull/2034) [`17d92c9ed`](https://github.com/navikt/aksel/commit/17d92c9ed5f82a80f99a1512989744343edf60b3) Thanks [@JulianNymark](https://github.com/JulianNymark)! - Add JSDoc typings

- [#2027](https://github.com/navikt/aksel/pull/2027) [`c028f36e2`](https://github.com/navikt/aksel/commit/c028f36e2bc58223ebf8b655980dde7eafb30add) Thanks [@JulianNymark](https://github.com/JulianNymark)! - :sparkles: La til `indent`-prop på Accordion

- Updated dependencies []:
  - @navikt/aksel-icons@4.1.0

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

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.0.0

## 3.4.2

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@3.4.2

## 3.4.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@3.4.1

## 3.4.0

### Minor Changes

- [#2010](https://github.com/navikt/aksel/pull/2010) [`b958d41a2`](https://github.com/navikt/aksel/commit/b958d41a20c66327658514fcf24ae20893c9531a) Thanks [@HalvorHaugan](https://github.com/HalvorHaugan)! - Ny variant "moderate" i Tag

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@3.4.0

## 3.3.1

### Patch Changes

- [#2005](https://github.com/navikt/aksel/pull/2005) [`5533fbd5a`](https://github.com/navikt/aksel/commit/5533fbd5a3a2b3e08f3c818e2669daccafb6212a) Thanks [@cskrov](https://github.com/cskrov)! - Migrert `CopyButton` til `Clipboard API`

  - `CopyButton` bruker nå [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
  - `execCommand()` er fjernet fordi den [er deprecated](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand).
  - Nettlesere som ikke støtter `Clipboard API` vil falle tilbake på `window.prompt()`.

- Updated dependencies []:
  - @navikt/aksel-icons@3.3.1

## 3.3.0

### Patch Changes

- [#1995](https://github.com/navikt/aksel/pull/1995) [`288cef591`](https://github.com/navikt/aksel/commit/288cef591abb0557295e50cf6e696d7a51607c32) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :tada: Timeline viser nå popover/tooltip på hover.

  - Popover vises nå ikke lengre ved klikk.
  - Period og Pin bruker nå begge ny popover.
  - Kode og styling for Popover er nå inlinet i Timeline, og bruker ikke `@navikt/ds-react` sin versjon.

- Updated dependencies []:
  - @navikt/aksel-icons@3.3.0

## 3.2.4

### Patch Changes

- [#2000](https://github.com/navikt/aksel/pull/2000) [`30eee0dac`](https://github.com/navikt/aksel/commit/30eee0dac4e3e5a1379033283a6885e646e80458) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Search støtter nå htmlSize-prop

- Updated dependencies []:
  - @navikt/aksel-icons@3.2.4

## 3.2.3

### Patch Changes

- [#1993](https://github.com/navikt/aksel/pull/1993) [`475e994f4`](https://github.com/navikt/aksel/commit/475e994f494b2080ffc05eb1684b6a244e3e2969) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Fikset small-variant av datepicker-input

  - :recycle: Refactored Datepicker.Input-button for bugfix

- [#1994](https://github.com/navikt/aksel/pull/1994) [`444e905e0`](https://github.com/navikt/aksel/commit/444e905e01965fd5cac40ff20c5225b072e67221) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :tada: CopyButton har nå en `xsmall`-variant

  - Kan nå lettere brukes i tabeller

- Updated dependencies [[`53c98181c`](https://github.com/navikt/aksel/commit/53c98181c327ead3406bec3487c10232af7d463a)]:
  - @navikt/aksel-icons@3.2.3

## 3.2.2

### Patch Changes

- [`6d6267fe0`](https://github.com/navikt/aksel/commit/6d6267fe01f438f3bd67e1b4266ca3e82709561c) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :fire: Fjernet use-client directive fra copybutton

- Updated dependencies []:
  - @navikt/aksel-icons@3.2.2

## 3.2.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@3.2.1

## 3.2.0

### Minor Changes

- [#1982](https://github.com/navikt/aksel/pull/1982) [`affcab14c`](https://github.com/navikt/aksel/commit/affcab14c3d536929dfa64a36f5b43f9d0e8c3b7) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :sparkles: Ny komponent `<CopyButton />`!

  - Erstatter `<CopyToClipboard />` fra `@navikt/ds-react-internal`
  - CopyToClipboard er markert som deprecated. Den vil fortsatt fungere, men noen lintere vil kunne ende opp med å klage på den.

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@3.2.0

## 3.1.3

### Patch Changes

- [#1976](https://github.com/navikt/aksel/pull/1976) [`e8ecf309a`](https://github.com/navikt/aksel/commit/e8ecf309a910e47fd3cea6c54cd993ab1196910f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :lipstick: Oppdatert utseende for ToggleGroup

  - Medium og Small er begge 10px lavere
  - Mindre border-radius

- Updated dependencies []:
  - @navikt/aksel-icons@3.1.3

## 3.1.2

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@3.1.2

## 3.1.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@3.1.1

## 3.1.0

### Patch Changes

- [#1967](https://github.com/navikt/aksel/pull/1967) [`9d2cd9e7f`](https://github.com/navikt/aksel/commit/9d2cd9e7fffb3cf6310c88229ee39ea85db19bca) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :lipstick: Oppdatert Label og Description spacing for skjemakomponenter

- Updated dependencies []:
  - @navikt/aksel-icons@3.1.0

## 3.0.1

### Patch Changes

- [`fa2ead912`](https://github.com/navikt/aksel/commit/fa2ead912a4db15d1fa7e2c3efccbe69a64dc9a7) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :fire: Fjernet ds-icons fra dependencies

- [`db3846f5c`](https://github.com/navikt/aksel/commit/db3846f5cd483ad0ca24bc5938cfcdb64260f89d) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Fikset default headingSize for Accordion

- Updated dependencies []:
  - @navikt/aksel-icons@3.0.1

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

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@3.0.0
  - @navikt/ds-icons@3.0.0

## 2.9.8

### Patch Changes

- Updated dependencies [[`8790c5997`](https://github.com/navikt/aksel/commit/8790c5997e0d647419bdb5080c86781d08c196b8)]:
  - @navikt/aksel-icons@2.9.8
  - @navikt/ds-icons@2.9.8

## 2.9.7

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@2.9.7
  - @navikt/ds-icons@2.9.7

## 2.9.6

### Patch Changes

- Updated dependencies [[`8c8559009`](https://github.com/navikt/aksel/commit/8c8559009982911bc4402913656ba4cc6a223dd1)]:
  - @navikt/aksel-icons@2.9.6
  - @navikt/ds-icons@2.9.6

## 2.9.5

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@2.9.5
  - @navikt/ds-icons@2.9.5

## 2.9.4

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@2.9.4
  - @navikt/ds-icons@2.9.4

## 2.9.3

### Patch Changes

- Updated dependencies [[`c03d53d5a`](https://github.com/navikt/aksel/commit/c03d53d5aa2dc7f06a223d48069fa21ee39bb396)]:
  - @navikt/aksel-icons@2.9.3
  - @navikt/ds-icons@2.9.3

## 2.9.2

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@2.9.2
  - @navikt/ds-icons@2.9.2

## 2.9.1

### Patch Changes

- [#1944](https://github.com/navikt/aksel/pull/1944) [`1afdee453`](https://github.com/navikt/aksel/commit/1afdee453fbba20ec280dc868c8aa1ae2a92132d) Thanks [@KenAJoh](https://github.com/KenAJoh)! - ExpansionCard støtter nå aria-labelledby

- Updated dependencies []:
  - @navikt/aksel-icons@2.9.1
  - @navikt/ds-icons@2.9.1

## 2.9.0

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@2.9.0
  - @navikt/ds-icons@2.9.0

## 2.8.16

### Patch Changes

- [`ff001f2bc`](https://github.com/navikt/aksel/commit/ff001f2bcf5a1ff0580660a1680f4f8342e7fdff) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: ExpansionCard.Content sendte ikke className videre

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.16
  - @navikt/ds-icons@2.8.16

## 2.8.15

### Patch Changes

- [#1930](https://github.com/navikt/aksel/pull/1930) [`6682be1c8`](https://github.com/navikt/aksel/commit/6682be1c8e6562213c64e5be4bed70fef54ab865) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Alle pakker implementerer nå npm provenance (beta)

- [#1929](https://github.com/navikt/aksel/pull/1929) [`284534246`](https://github.com/navikt/aksel/commit/28453424684e00d65fd8d204f1405f7ed6a82fbf) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Bedre håndtering av visning for out-of-range dates i datepickers

- Updated dependencies [[`dfe923582`](https://github.com/navikt/aksel/commit/dfe923582a57b41c77cfb4fbfa7c56be047ef2b0), [`6682be1c8`](https://github.com/navikt/aksel/commit/6682be1c8e6562213c64e5be4bed70fef54ab865)]:
  - @navikt/aksel-icons@2.8.15
  - @navikt/ds-icons@2.8.15

## 2.8.14

### Patch Changes

- [`f0d9a8853`](https://github.com/navikt/aksel/commit/f0d9a8853f56854a4049bd3f6cc34968e9d6c380) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fixes shown month on open in Datepicker/MonthPicker, better handling of out-of-range 'today'

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.14
  - @navikt/ds-icons@2.8.14

## 2.8.13

### Patch Changes

- Updated dependencies [[`ecd6241e5`](https://github.com/navikt/aksel/commit/ecd6241e5751519fbda800a5f41a613957dbf77c)]:
  - @navikt/aksel-icons@2.8.13
  - @navikt/ds-icons@2.8.13

## 2.8.12

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.12
  - @navikt/ds-icons@2.8.12

## 2.8.11

### Patch Changes

- Updated dependencies [[`270427910`](https://github.com/navikt/aksel/commit/2704279107a5fbf93048de37d014e78f6721438f)]:
  - @navikt/aksel-icons@2.8.11
  - @navikt/ds-icons@2.8.11

## 2.8.10

### Patch Changes

- [#1907](https://github.com/navikt/aksel/pull/1907) [`63fdacf0f`](https://github.com/navikt/aksel/commit/63fdacf0f8fa09593c64b35b49381d6c8a1befd1) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :recycle: Refactor event-handling i datepicker-hooks

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.10
  - @navikt/ds-icons@2.8.10

## 2.8.9

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.9
  - @navikt/ds-icons@2.8.9

## 2.8.8

### Patch Changes

- Updated dependencies [[`ed8e28454`](https://github.com/navikt/aksel/commit/ed8e284540a9e3a5be7d1d5e393f31db86962613)]:
  - @navikt/aksel-icons@2.8.8
  - @navikt/ds-icons@2.8.8

## 2.8.7

### Patch Changes

- [`7f3f025db`](https://github.com/navikt/aksel/commit/7f3f025db2ad605df4240605a733d10d08db753a) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset typografi for radio, checkbox. Button token for tertiary

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.7
  - @navikt/ds-icons@2.8.7

## 2.8.6

### Patch Changes

- [`2eb358ad8`](https://github.com/navikt/aksel/commit/2eb358ad888979d21c385b3900973946f3f466be) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Alert, Chips og ErrorSummary har nå bedre utvalg av tokens

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.6
  - @navikt/ds-icons@2.8.6

## 2.8.5

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.5
  - @navikt/ds-icons@2.8.5

## 2.8.4

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.4
  - @navikt/ds-icons@2.8.4

## 2.8.3

### Patch Changes

- [#1875](https://github.com/navikt/aksel/pull/1875) [`f862aa9c2`](https://github.com/navikt/aksel/commit/f862aa9c2ec71ffdb295708dc6dad6b77af9519e) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Textarea har oppdatert counter-tekst + mulighet for lokalisering

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.3
  - @navikt/ds-icons@2.8.3

## 2.8.2

### Patch Changes

- [#1870](https://github.com/navikt/aksel/pull/1870) [`9c495cf50`](https://github.com/navikt/aksel/commit/9c495cf5037a7453e51e273ab93e4232576f4958) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Oppdatert typografi for ExpansioCard

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.2
  - @navikt/ds-icons@2.8.2

## 2.8.1

### Patch Changes

- [`1276b4d7e`](https://github.com/navikt/aksel/commit/1276b4d7efd831d20345292dbb21a11d100a0ddd) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :bug: Endret default title-size til medium for ExpansionCard

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.1
  - @navikt/ds-icons@2.8.1

## 2.8.0

### Minor Changes

- [#1820](https://github.com/navikt/aksel/pull/1820) [`c6d51a019`](https://github.com/navikt/aksel/commit/c6d51a01902e4fd7916a422e17ed175f39acd458) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :tada: Ny komponent! ExpansionCard. Oppfølger fra gammel Ekspanderbartpanel.

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@2.8.0
  - @navikt/ds-icons@2.8.0

## 2.7.8

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.7.8

## 2.7.7

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.7.7

## 2.7.6

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.7.6

## 2.7.5

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.7.5

## 2.7.4

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.7.4

## 2.7.3

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.7.3

## 2.7.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.7.2

## 2.7.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.7.1

## 2.7.0

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.7.0

## 2.6.2

### Patch Changes

- [`59d32e52c`](https://github.com/navikt/aksel/commit/59d32e52c437759e66aa50d200b4264a6ba53069) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset React18 problem med TextareaAutosize

- Updated dependencies []:
  - @navikt/ds-icons@2.6.2

## 2.6.1

### Patch Changes

- [`1c5e06438`](https://github.com/navikt/aksel/commit/1c5e06438ce9ff8225d5b2b2bf1f94348dfefe9c) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Ny onSearchClick-prop i Search for lettere submit-handling

- Updated dependencies []:
  - @navikt/ds-icons@2.6.1

## 2.6.0

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.6.0

## 2.5.1

### Patch Changes

- [`ac1e69b34`](https://github.com/navikt/aksel/commit/ac1e69b342ae207db2e80e3058555c56902e5832) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :recycle: Refaktorert nested-list logikk

- Updated dependencies []:
  - @navikt/ds-icons@2.5.1

## 2.5.0

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.5.0

## 2.4.3

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.4.3

## 2.4.2

### Patch Changes

- [#1823](https://github.com/navikt/aksel/pull/1823) [`a7ce61f84`](https://github.com/navikt/aksel/commit/a7ce61f840e5bfaafc4f70e550167fe0095555b8) Thanks [@kschieren](https://github.com/kschieren)! - added support for nested lists

- Updated dependencies [[`a7ce61f84`](https://github.com/navikt/aksel/commit/a7ce61f840e5bfaafc4f70e550167fe0095555b8)]:
  - @navikt/ds-icons@2.4.2

## 2.4.1

### Patch Changes

- [#1827](https://github.com/navikt/aksel/pull/1827) [`98c06b0be`](https://github.com/navikt/aksel/commit/98c06b0be20debff9969af874d5239ec920fa401) Thanks [@kschieren](https://github.com/kschieren)! - Added fixedWeeks prop to standalone datepicker

- Updated dependencies []:
  - @navikt/ds-icons@2.4.1

## 2.4.0

### Minor Changes

- [#1807](https://github.com/navikt/aksel/pull/1807) [`70eeb24b3`](https://github.com/navikt/aksel/commit/70eeb24b38ac871c7f2e31e1621b949669c401b6) Thanks [@kschieren](https://github.com/kschieren)! - Added List component

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.4.0

## 2.3.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.3.1

## 2.3.0

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.3.0

## 2.2.0

### Minor Changes

- [#1789](https://github.com/navikt/aksel/pull/1789) [`c0929a534`](https://github.com/navikt/aksel/commit/c0929a534dc8effece5435f8be550cb7931a52b1) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Button og ToggleGroup har nå en neutral-variant, oppdatert neutral-tokens

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.2.0

## 2.1.7

### Patch Changes

- [`6ac97aeb3`](https://github.com/navikt/aksel/commit/6ac97aeb34735020e5a2083e51e836877abaefa3) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset rekkefølge på onValidate og onRangeChange i useRangepicker-hook

- Updated dependencies []:
  - @navikt/ds-icons@2.1.7

## 2.1.6

### Patch Changes

- [#1777](https://github.com/navikt/aksel/pull/1777) [`cd1c93f9d`](https://github.com/navikt/aksel/commit/cd1c93f9d471fbbc38215d788a73f21b5b216c5b) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :sparkles: Datepicker og monthpicker kan nå bestemme om popover skal dukke opp ved fokus

- Updated dependencies []:
  - @navikt/ds-icons@2.1.6

## 2.1.5

### Patch Changes

- Hotfix: ESM import fra date-fns feilet

- Updated dependencies []:
  - @navikt/ds-icons@2.1.5

## 2.1.4

### Patch Changes

- [`87f194c1d`](https://github.com/navikt/aksel/commit/87f194c1dc29b10a604de676b358d117e2dbf52f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset edgecase i useRangepicker der valg av startdato etter sluttdato ga feil output

- Updated dependencies []:
  - @navikt/ds-icons@2.1.4

## 2.1.3

### Patch Changes

- [#1771](https://github.com/navikt/aksel/pull/1771) [`494566e60`](https://github.com/navikt/aksel/commit/494566e604e958363f75ebfa2adbc1669397636a) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Monthpicker håndterer nå visning av År riktig

- Updated dependencies []:
  - @navikt/ds-icons@2.1.3

## 2.1.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.1.2

## 2.1.1

### Patch Changes

- [#1759](https://github.com/navikt/aksel/pull/1759) [`dcf5cfc06`](https://github.com/navikt/aksel/commit/dcf5cfc06b751341559ef30085bd974820531e57) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Fikset @types/react v18 feil introdusert i v2.0.6

- Updated dependencies [[`dcf5cfc06`](https://github.com/navikt/aksel/commit/dcf5cfc06b751341559ef30085bd974820531e57)]:
  - @navikt/ds-icons@2.1.1

## 2.1.0

### Minor Changes

- [`0873fe652`](https://github.com/navikt/aksel/commit/0873fe6520e817e462197c162b49c05826da4838) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Datepicker/Monthpicker støtter nå år med 2 siffer i input

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.1.0

## 2.0.18

### Patch Changes

- [`98177d0cd`](https://github.com/navikt/aksel/commit/98177d0cd3802029dcf398ce93c1767d3b0860c5) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Bedre typer for ref i datepicker

- Updated dependencies []:
  - @navikt/ds-icons@2.0.18

## 2.0.17

### Patch Changes

- Updated dependencies [[`27e3dfee0`](https://github.com/navikt/aksel/commit/27e3dfee07e135893e9f62cd32f80ed83a3510de)]:
  - @navikt/ds-icons@2.0.17

## 2.0.16

### Patch Changes

- Updated dependencies [[`54f8b0795`](https://github.com/navikt/aksel/commit/54f8b07956bbfb7de51f6682a5fc64903bfd1bdf)]:
  - @navikt/ds-icons@2.0.16

## 2.0.15

### Patch Changes

- [#1748](https://github.com/navikt/aksel/pull/1748) [`22dfd8e60`](https://github.com/navikt/aksel/commit/22dfd8e60315c421749394d35e41f412a00a7593) Thanks [@KenAJoh](https://github.com/KenAJoh)! - toptextPosition prop i Chat for horisontal plassering av navn og dato.

- Updated dependencies []:
  - @navikt/ds-icons@2.0.15

## 2.0.14

### Patch Changes

- [`8e5c55443`](https://github.com/navikt/aksel/commit/8e5c554431c98b1b658c5054c0b3cf08b8a65e52) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Bumpet @floating-ui/react

- Updated dependencies []:
  - @navikt/ds-icons@2.0.14

## 2.0.13

### Patch Changes

- Updated dependencies [[`a6c339123`](https://github.com/navikt/aksel/commit/a6c3391237f13394063e4c004ac9efb1875fc944)]:
  - @navikt/ds-icons@2.0.13

## 2.0.12

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.0.12

## 2.0.11

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.0.11

## 2.0.10

### Patch Changes

- Button submittet form i table

- Updated dependencies []:
  - @navikt/ds-icons@2.0.10

## 2.0.9

### Patch Changes

- ShouldCloseOnEsc i Modal

- Updated dependencies []:
  - @navikt/ds-icons@2.0.9

## 2.0.8

### Patch Changes

- Confirmationpanel wrappet med div

- Updated dependencies []:
  - @navikt/ds-icons@2.0.8

## 2.0.7

### Patch Changes

- :bug: Fikset keyboard-click i monthpicker

- Updated dependencies []:
  - @navikt/ds-icons@2.0.7

## 2.0.6

### Patch Changes

- DateInput hadde duplikat className satt

- Updated dependencies []:
  - @navikt/ds-icons@2.0.6

## 2.0.5

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.0.5

## 2.0.4

### Patch Changes

- Updated dependencies [[`e4b6237e1`](https://github.com/navikt/aksel/commit/e4b6237e1bbf13b1ce5415845d558831b47caf7c)]:
  - @navikt/ds-icons@2.0.4

## 2.0.3

### Patch Changes

- :sparkles: La til muligheten til å velge layout-strategi for datepicker-popover

- Updated dependencies []:
  - @navikt/ds-icons@2.0.3

## 2.0.2

### Patch Changes

- :bug: Fikset click-event for datepicker

- Updated dependencies []:
  - @navikt/ds-icons@2.0.2

## 2.0.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@2.0.1

## 2.0.0

### Major Changes

- [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4) Thanks [@KenAJoh](https://github.com/KenAJoh)! - v2: Tokens update and font-loading

## 1.5.10

### Patch Changes

- [#1717](https://github.com/navikt/aksel/pull/1717) [`d9352982d`](https://github.com/navikt/aksel/commit/d9352982d42d5d12a9c5fc345e546f57c753738d) Thanks [@vebnor](https://github.com/vebnor)! - Fikset parentSelector prop i Modal

- Updated dependencies []:
  - @navikt/ds-icons@1.5.10

## 1.5.9

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@1.5.9

## 1.5.8

### Patch Changes

- console.log removed

- Updated dependencies []:
  - @navikt/ds-icons@1.5.8

## 1.5.7

### Patch Changes

- defaultMonth/Year prop date-komponent

- Updated dependencies []:
  - @navikt/ds-icons@1.5.7

## 1.5.6

### Patch Changes

- Datepicker fungerte ikke med open shadow-dom

- Updated dependencies []:
  - @navikt/ds-icons@1.5.6

## 1.5.5

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@1.5.5

## 1.5.4

### Patch Changes

- Updated dependencies [[`77302a30b`](https://github.com/navikt/aksel/commit/77302a30b8eef8dc00b2d2e9c904a3f57da81a11)]:
  - @navikt/ds-icons@1.5.4

## 1.5.3

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@1.5.3

## 1.5.2

### Patch Changes

- :memo: Rename FilterChips to ToggleChips

- Updated dependencies []:
  - @navikt/ds-icons@1.5.2

## 1.5.1

### Patch Changes

- Flex-wrap chips.css

- Updated dependencies []:
  - @navikt/ds-icons@1.5.1

## 1.5.0

### Minor Changes

- [#1684](https://github.com/navikt/aksel/pull/1684) [`e19bf67b3`](https://github.com/navikt/aksel/commit/e19bf67b337dea39989c68b5e9c2591cf0d5b40f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :sparkles: Oppdaterte tag-varianter

- [#1668](https://github.com/navikt/aksel/pull/1668) [`97c5f60e9`](https://github.com/navikt/aksel/commit/97c5f60e9111da7e08f55c8d0aa29581f0a9b1ca) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Chips komponent :sparkles:

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@1.5.0

## 1.4.4

### Patch Changes

- Eksponerer validation-typer

- Updated dependencies []:
  - @navikt/ds-icons@1.4.4

## 1.4.3

### Patch Changes

- :sparkles: Validering og inputFormat i Date-komponenter

- Updated dependencies []:
  - @navikt/ds-icons@1.4.3

## 1.4.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@1.4.2

## 1.4.1

### Patch Changes

- [`3c08651df`](https://github.com/navikt/aksel/commit/3c08651df28c3e19dd8c8a7a1d0032200bec473d) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Date-komponenter følger språkrådets dato-formatering for måneder.

- Updated dependencies []:
  - @navikt/ds-icons@1.4.1

## 1.4.0

### Minor Changes

- [`1bdb7e377`](https://github.com/navikt/aksel/commit/1bdb7e3777ece28d153991b78dbdd289366fca57) Thanks [@KenAJoh](https://github.com/KenAJoh)! - [#1702](https://github.com/navikt/aksel/pull/1702) [`20bcc28cb`](https://github.com/navikt/aksel/commit/20bcc28cb0a886aa40d2c1b042fb2706a144c014) Thanks [@andnorda](https://github.com/andnorda)! - Global Provider komponent for håndtering av global config

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-icons@1.4.0

## 1.3.39

### Patch Changes

- [`40f0b3340`](https://github.com/navikt/aksel/commit/40f0b3340d01bf85fecc04f2f3a8e8b2acf996f1) Thanks [@KenAJoh](https://github.com/KenAJoh)! - Bump for latest-tag

- Updated dependencies [[`40f0b3340`](https://github.com/navikt/aksel/commit/40f0b3340d01bf85fecc04f2f3a8e8b2acf996f1)]:
  - @navikt/ds-icons@1.3.39

## 1.3.38

### Patch Changes

- Updated dependencies [[`aa506975b`](https://github.com/navikt/aksel/commit/aa506975b4466d4daa79c75f5f9faa255b7fae42)]:
  - @navikt/ds-icons@1.3.38
