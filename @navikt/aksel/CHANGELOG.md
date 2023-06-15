# @navikt/aksel

## 4.1.4

### Patch Changes

- Updated dependencies [[`e06096105`](https://github.com/navikt/aksel/commit/e060961050c75ec815e5c125001f1ff99106e298)]:
  - @navikt/ds-css@4.1.4

## 4.1.3

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@4.1.3

## 4.1.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@4.1.2

## 4.1.1

### Patch Changes

- Updated dependencies [[`91343563c`](https://github.com/navikt/aksel/commit/91343563c916a554d8ade5401c28ab4c3b3e26af)]:
  - @navikt/ds-css@4.1.1

## 4.1.0

### Patch Changes

- Updated dependencies [[`7b42f536a`](https://github.com/navikt/aksel/commit/7b42f536aa90c1b5dbe2b19f1bbe292701546420), [`c028f36e2`](https://github.com/navikt/aksel/commit/c028f36e2bc58223ebf8b655980dde7eafb30add), [`b2f796d68`](https://github.com/navikt/aksel/commit/b2f796d681f1c1d76d26d1fd743268c8c618a854), [`db8c38a09`](https://github.com/navikt/aksel/commit/db8c38a094cd183db54aebecb62d5b223920a040)]:
  - @navikt/ds-css@4.1.0

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

- Updated dependencies [[`895bdc08e`](https://github.com/navikt/aksel/commit/895bdc08e50647d9b9186cbf0e9ab069323de56c), [`895bdc08e`](https://github.com/navikt/aksel/commit/895bdc08e50647d9b9186cbf0e9ab069323de56c)]:
  - @navikt/ds-css@4.0.0

## 3.4.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@3.4.2

## 3.4.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@3.4.1

## 3.4.0

### Patch Changes

- Updated dependencies [[`b958d41a2`](https://github.com/navikt/aksel/commit/b958d41a20c66327658514fcf24ae20893c9531a)]:
  - @navikt/ds-css@3.4.0

## 3.3.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@3.3.1

## 3.3.0

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@3.3.0

## 3.2.4

### Patch Changes

- Updated dependencies [[`30eee0dac`](https://github.com/navikt/aksel/commit/30eee0dac4e3e5a1379033283a6885e646e80458)]:
  - @navikt/ds-css@3.2.4

## 3.2.3

### Patch Changes

- Updated dependencies [[`475e994f4`](https://github.com/navikt/aksel/commit/475e994f494b2080ffc05eb1684b6a244e3e2969), [`444e905e0`](https://github.com/navikt/aksel/commit/444e905e01965fd5cac40ff20c5225b072e67221)]:
  - @navikt/ds-css@3.2.3

## 3.2.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@3.2.2

## 3.2.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@3.2.1

## 3.2.0

### Patch Changes

- Updated dependencies [[`affcab14c`](https://github.com/navikt/aksel/commit/affcab14c3d536929dfa64a36f5b43f9d0e8c3b7)]:
  - @navikt/ds-css@3.2.0

## 3.1.3

### Patch Changes

- Updated dependencies [[`e8ecf309a`](https://github.com/navikt/aksel/commit/e8ecf309a910e47fd3cea6c54cd993ab1196910f)]:
  - @navikt/ds-css@3.1.3

## 3.1.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@3.1.2

## 3.1.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@3.1.1

## 3.1.0

### Patch Changes

- Updated dependencies [[`9d2cd9e7f`](https://github.com/navikt/aksel/commit/9d2cd9e7fffb3cf6310c88229ee39ea85db19bca), [`f1c4c46eb`](https://github.com/navikt/aksel/commit/f1c4c46ebb0522561483f18e3b86b190cf9cc372)]:
  - @navikt/ds-css@3.1.0

## 3.0.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@3.0.1

## 3.0.0

### Patch Changes

- Updated dependencies [[`166ee5feb`](https://github.com/navikt/aksel/commit/166ee5feb3c987c4e633eb449812116bfd865d3f), [`166ee5feb`](https://github.com/navikt/aksel/commit/166ee5feb3c987c4e633eb449812116bfd865d3f)]:
  - @navikt/ds-css@3.0.0

## 2.9.8

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@2.9.8

## 2.9.7

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@2.9.7

## 2.9.6

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@2.9.6

## 2.9.5

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@2.9.5

## 2.9.4

### Patch Changes

- [#1952](https://github.com/navikt/aksel/pull/1952) [`27b2b4a11`](https://github.com/navikt/aksel/commit/27b2b4a11caf5ca05c96c686c453653d8a900e5f) Thanks [@KenAJoh](https://github.com/KenAJoh)! - :truck: Flyttet Codemods from `@navikt/ds-codemods` -> `@navikt/aksel`.

  - `@navikt/ds-codemods` vil bli deprecated ettehvert.

- Updated dependencies []:
  - @navikt/ds-css@2.9.4

## 2.9.3

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@2.9.3

## 2.9.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@2.9.2

## 2.9.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-css@2.9.1

## 2.9.0

### Patch Changes

- Updated dependencies [[`657b7f3f3`](https://github.com/navikt/aksel/commit/657b7f3f3e62c5ce3173e6c95a29fcd237ce7343)]:
  - @navikt/ds-css@2.9.0
