# Changelog

## 4.4.0

### @navikt/ds-react

- &#x20;Shadow-tokens er oppdatert til mer tydeligere varianter [#2041](https://github.com/navikt/aksel/pull/2041)

### @navikt/ds-tokens

- &#x20;Shadow-tokens er oppdatert til mer tydeligere varianter [#2041](https://github.com/navikt/aksel/pull/2041)

### @navikt/ds-css

- &#x20;Shadow-tokens er oppdatert til mer tydeligere varianter [#2041](https://github.com/navikt/aksel/pull/2041)

## 4.3.0

### @navikt/ds-react

- &#x20;Popover og Helptext har nå luft mot siden av skjerm på mindre flater [#2069](https://github.com/navikt/aksel/pull/2069)

### @navikt/ds-css

- &#x20;Popover og Helptext har nå luft mot siden av skjerm på mindre flater [#2069](https://github.com/navikt/aksel/pull/2069)

<!---->

- &#x20;:bug: Nested ExpansionCard fikk styling fra parent [#2067](https://github.com/navikt/aksel/pull/2067)

## 4.2.0

### @navikt/ds-react

- &#x20;Oppdatert Chat [#2048](https://github.com/navikt/aksel/pull/2048)

  - :sparkles: Ny prop `size` som kan settes til "small" for en mer kompakt layout
  - :sparkles: Ny prop `variant` som erstatter `backgroundColor` og `avatarBgColor`
  - :sparkles: `avatar` er nå valgfritt
  - :wheelchair: Forbedret UU
  - :lipstick: Oppdatert utseende

### @navikt/ds-css

- &#x20;Oppdatert Chat [#2048](https://github.com/navikt/aksel/pull/2048)

  - :sparkles: Ny prop `size` som kan settes til "small" for en mer kompakt layout
  - :sparkles: Ny prop `variant` som erstatter `backgroundColor` og `avatarBgColor`
  - :sparkles: `avatar` er nå valgfritt
  - :wheelchair: Forbedret UU
  - :lipstick: Oppdatert utseende

### @navikt/aksel-stylelint

- &#x20;Oppdatert Chat [#2048](https://github.com/navikt/aksel/pull/2048)

  - :sparkles: Ny prop `size` som kan settes til "small" for en mer kompakt layout
  - :sparkles: Ny prop `variant` som erstatter `backgroundColor` og `avatarBgColor`
  - :sparkles: `avatar` er nå valgfritt
  - :wheelchair: Forbedret UU
  - :lipstick: Oppdatert utseende

## 4.1.7

### @navikt/ds-react

- Fikset jsdom-problemer ved rendring av Timeline [`42b5af64a`](https://github.com/navikt/aksel/commit/42b5af64ab35d0f2d126d41f8fc3e61fe2834b36)

- &#x20;La til `wrapperClassname`-prop for HelpText [`42b5af64a`](https://github.com/navikt/aksel/commit/42b5af64ab35d0f2d126d41f8fc3e61fe2834b36)

### @navikt/ds-css

- Fikset jsdom-problemer ved rendring av Timeline [`42b5af64a`](https://github.com/navikt/aksel/commit/42b5af64ab35d0f2d126d41f8fc3e61fe2834b36)

## 4.1.6

### @navikt/ds-react

- :bug: Timeline-period brakk ved bruk av jsdom-tester [`9a8bb26c3`](https://github.com/navikt/aksel/commit/9a8bb26c36cfbb1a95cf28a043d2df3dbfe7185d)

## 4.1.5

### @navikt/ds-react

- &#x20;:bug: OverridableComponent fungerer nå med komponenter som allerede bruker 'as'-prop [#2051](https://github.com/navikt/aksel/pull/2051)

- &#x20;:bug: floating-ui sendte ikke escape-events opp gjennom dom-treet [#2051](https://github.com/navikt/aksel/pull/2051)

### @navikt/aksel-icons

- &#x20;:tada: Nye ikoner [#2054](https://github.com/navikt/aksel/pull/2054)

  - ChevronRightLast
  - ChevronLeftLast

## 4.1.3

### @navikt/ds-react

- :bug: Classname ble ikke riktig forwardet til ikke-klikkbar Period i Timeline [`44a75acb6`](https://github.com/navikt/aksel/commit/44a75acb6b904d614a01344f42111761a48cb7e2)

## 4.1.2

### @navikt/ds-react

- Jsdoc for Skeleton-komponent [`30068dca3`](https://github.com/navikt/aksel/commit/30068dca3fcdf4bf7bbfbfb3d09baa9fee003962)

## 4.1.0

### @navikt/ds-react

- &#x20;:tada: Oppdatert Chips [#2035](https://github.com/navikt/aksel/pull/2035)

  - Toggle Chips har nå varianter: neutral og action
  - Toggle Chips har nå en ny prop: `checkmark` som slår av/på checkmark ved selected-state

- &#x20;:tada: Ny komponent Skeleton! [#2035](https://github.com/navikt/aksel/pull/2035)

  - varianter: text, circle, rounded og rectangle

<!---->

- &#x20;Add JSDoc typings [#2034](https://github.com/navikt/aksel/pull/2034)

- &#x20;:sparkles: La til `indent`-prop på Accordion [#2034](https://github.com/navikt/aksel/pull/2034)

### @navikt/ds-tokens

- &#x20;:tada: Fargetokens for datavisualisering. [#2032](https://github.com/navikt/aksel/pull/2032)

  6 varianter for surface,surface-subtle og border.

  ```css
  background-color: var(--a-data-surface-1-subtle);
  border-color: var(--a-data-1-border);
  ```

- &#x20;Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600). [#2032](https://github.com/navikt/aksel/pull/2032)
  - Icon-subtle bruker nå grayalpha.
  - Alle description-felter på fieldsets har nå text-subtle som farge.

### @navikt/ds-css

- &#x20;:tada: Oppdatert Chips [#2035](https://github.com/navikt/aksel/pull/2035)

  - Toggle Chips har nå varianter: neutral og action
  - Toggle Chips har nå en ny prop: `checkmark` som slår av/på checkmark ved selected-state

- &#x20;Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600). [#2035](https://github.com/navikt/aksel/pull/2035)

  - Icon-subtle bruker nå grayalpha.
  - Alle description-felter på fieldsets har nå text-subtle som farge.

- &#x20;:tada: Ny komponent Skeleton! [#2035](https://github.com/navikt/aksel/pull/2035)

  - varianter: text, circle, rounded og rectangle

<!---->

- &#x20;:sparkles: La til `indent`-prop på Accordion [#2027](https://github.com/navikt/aksel/pull/2027)

### @navikt/aksel-stylelint

- &#x20;:tada: Oppdatert Chips [#2035](https://github.com/navikt/aksel/pull/2035)

  - Toggle Chips har nå varianter: neutral og action
  - Toggle Chips har nå en ny prop: `checkmark` som slår av/på checkmark ved selected-state

## 4.0.0

### @navikt/ds-react

- &#x20;:test-tube: Datepicker og Monthpicker er nå ute av beta. Kjør codemod for migrering, eller `cmd/ctrl + shift + f` og erstatt `UNSAFE_` med \`\` [#2026](https://github.com/navikt/aksel/pull/2026)

  - UNSAFE-prefix er fjernet fra Datepicker og Monthpicker

  ```bash
  npx @navikt/aksel codemod v4-date
  ```

- &#x20;:truck: Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react` [#2026](https://github.com/navikt/aksel/pull/2026)

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

### @navikt/ds-css

- &#x20;:test-tube: Datepicker og Monthpicker er nå ute av beta. Kjør codemod for migrering, eller `cmd/ctrl + shift + f` og erstatt `UNSAFE_` med \`\` [#2026](https://github.com/navikt/aksel/pull/2026)

  - UNSAFE-prefix er fjernet fra Datepicker og Monthpicker

  ```bash
  npx @navikt/aksel codemod v4-date
  ```

- &#x20;:truck: Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react` [#2026](https://github.com/navikt/aksel/pull/2026)

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

### @navikt/aksel

- &#x20;:test-tube: Datepicker og Monthpicker er nå ute av beta. Kjør codemod for migrering, eller `cmd/ctrl + shift + f` og erstatt `UNSAFE_` med \`\` [#2026](https://github.com/navikt/aksel/pull/2026)

  - UNSAFE-prefix er fjernet fra Datepicker og Monthpicker

  ```bash
  npx @navikt/aksel codemod v4-date
  ```

- &#x20;:truck: Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react` [#2026](https://github.com/navikt/aksel/pull/2026)

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

## 3.4.0

### @navikt/ds-react

- &#x20;Ny variant "moderate" i Tag [#2010](https://github.com/navikt/aksel/pull/2010)

### @navikt/ds-tokens

- &#x20;Ny variant "moderate" i Tag [#2010](https://github.com/navikt/aksel/pull/2010)

### @navikt/ds-css

- &#x20;Ny variant "moderate" i Tag [#2010](https://github.com/navikt/aksel/pull/2010)

### @navikt/aksel-stylelint

- &#x20;add stylelint plugin [#1973](https://github.com/navikt/aksel/pull/1973)

## 3.3.1

### @navikt/ds-react

- &#x20;Migrert `CopyButton` til `Clipboard API` [#2005](https://github.com/navikt/aksel/pull/2005)

  - `CopyButton` bruker nå [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API).
  - `execCommand()` er fjernet fordi den [er deprecated](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand).
  - Nettlesere som ikke støtter `Clipboard API` vil falle tilbake på `window.prompt()`.

## 3.3.0

### @navikt/ds-react

- &#x20;:tada: Timeline viser nå popover/tooltip på hover. [#1995](https://github.com/navikt/aksel/pull/1995)

  - Popover vises nå ikke lengre ved klikk.
  - Period og Pin bruker nå begge ny popover.
  - Kode og styling for Popover er nå inlinet i Timeline, og bruker ikke `@navikt/ds-react` sin versjon.

## 3.2.4

### @navikt/ds-react

- &#x20;:bug: Search støtter nå htmlSize-prop [#2000](https://github.com/navikt/aksel/pull/2000)

### @navikt/ds-css

- &#x20;:bug: Search støtter nå htmlSize-prop [#2000](https://github.com/navikt/aksel/pull/2000)

## 3.2.3

### @navikt/ds-react

- &#x20;:bug: Fikset small-variant av datepicker-input [#1993](https://github.com/navikt/aksel/pull/1993)

  - :recycle: Refactored Datepicker.Input-button for bugfix

- &#x20;:tada: CopyButton har nå en `xsmall`-variant [#1993](https://github.com/navikt/aksel/pull/1993)

  - Kan nå lettere brukes i tabeller

### @navikt/ds-css

- &#x20;:bug: Fikset small-variant av datepicker-input [#1993](https://github.com/navikt/aksel/pull/1993)

  - :recycle: Refactored Datepicker.Input-button for bugfix

- &#x20;:tada: CopyButton har nå en `xsmall`-variant [#1993](https://github.com/navikt/aksel/pull/1993)

  - Kan nå lettere brukes i tabeller

### @navikt/aksel-icons

- &#x20;:tada: Nye ikoner! [#1998](https://github.com/navikt/aksel/pull/1998)

  - :sparkles: FileParagraph
  - :sparkles: FilePlus

## 3.2.2

### @navikt/ds-react

- :fire: Fjernet use-client directive fra copybutton [`6d6267fe0`](https://github.com/navikt/aksel/commit/6d6267fe01f438f3bd67e1b4266ca3e82709561c)

## 3.2.0

### @navikt/ds-react

- &#x20;:sparkles: Ny komponent `<CopyButton />`! [#1982](https://github.com/navikt/aksel/pull/1982)

  - Erstatter `<CopyToClipboard />` fra `@navikt/ds-react-internal`
  - CopyToClipboard er markert som deprecated. Den vil fortsatt fungere, men noen lintere vil kunne ende opp med å klage på den.

### @navikt/ds-css

- &#x20;:sparkles: Ny komponent `<CopyButton />`! [#1982](https://github.com/navikt/aksel/pull/1982)

  - Erstatter `<CopyToClipboard />` fra `@navikt/ds-react-internal`
  - CopyToClipboard er markert som deprecated. Den vil fortsatt fungere, men noen lintere vil kunne ende opp med å klage på den.

## 3.1.3

### @navikt/ds-react

- &#x20;:lipstick: Oppdatert utseende for ToggleGroup [#1976](https://github.com/navikt/aksel/pull/1976)

  - Medium og Small er begge 10px lavere
  - Mindre border-radius

### @navikt/ds-css

- &#x20;:lipstick: Oppdatert utseende for ToggleGroup [#1976](https://github.com/navikt/aksel/pull/1976)

  - Medium og Small er begge 10px lavere
  - Mindre border-radius

## 3.1.0

### @navikt/ds-react

- &#x20;:lipstick: Oppdatert Label og Description spacing for skjemakomponenter [#1967](https://github.com/navikt/aksel/pull/1967)

### @navikt/ds-css

- &#x20;:lipstick: Alle komponenter bruker nå default `:focus-visible` for fokusmarkering.
  (Alle komponenter som bruker `:focus-visible` har også en fallback for `:focus`) [#1966](https://github.com/navikt/aksel/pull/1966)

<!---->

- &#x20;:lipstick: Oppdatert Label og Description spacing for skjemakomponenter [#1967](https://github.com/navikt/aksel/pull/1967)

## 3.0.1

### @navikt/ds-react

- :fire: Fjernet ds-icons fra dependencies [`fa2ead912`](https://github.com/navikt/aksel/commit/fa2ead912a4db15d1fa7e2c3efccbe69a64dc9a7)

- :bug: Fikset default headingSize for Accordion [`fa2ead912`](https://github.com/navikt/aksel/commit/fa2ead912a4db15d1fa7e2c3efccbe69a64dc9a7)

## 3.0.0

### @navikt/ds-react

- &#x20;**Accordion** [#1964](https://github.com/navikt/aksel/pull/1964)

  - Accordion oppdatet til å ha chevron left-aligned.
  - Neutral-variant lagt til
  - Diverse nye size-options for heading og paddinger.
  - Deler av Accordion-CSS er refaktorert. Dette vil kunne brekke overskrevne stiler.

- &#x20;Aksels løsninger bruker nå `@navikt/aksel-icons` [#1964](https://github.com/navikt/aksel/pull/1964)

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

### @navikt/ds-css

- &#x20;**Accordion** [#1964](https://github.com/navikt/aksel/pull/1964)

  - Accordion oppdatet til å ha chevron left-aligned.
  - Neutral-variant lagt til
  - Diverse nye size-options for heading og paddinger.
  - Deler av Accordion-CSS er refaktorert. Dette vil kunne brekke overskrevne stiler.

- &#x20;Aksels løsninger bruker nå `@navikt/aksel-icons` [#1964](https://github.com/navikt/aksel/pull/1964)

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

## 2.9.1

### @navikt/ds-react

- &#x20;ExpansionCard støtter nå aria-labelledby [#1944](https://github.com/navikt/aksel/pull/1944)

## 2.8.16

### @navikt/ds-react

- :bug: ExpansionCard.Content sendte ikke className videre [`ff001f2bc`](https://github.com/navikt/aksel/commit/ff001f2bcf5a1ff0580660a1680f4f8342e7fdff)

## 2.8.15

### @navikt/ds-react

- &#x20;Alle pakker implementerer nå npm provenance (beta) [#1930](https://github.com/navikt/aksel/pull/1930)

- &#x20;Bedre håndtering av visning for out-of-range dates i datepickers [#1930](https://github.com/navikt/aksel/pull/1930)

### @navikt/ds-tailwind

- &#x20;Alle pakker implementerer nå npm provenance (beta) [#1930](https://github.com/navikt/aksel/pull/1930)

### @navikt/ds-tokens

- &#x20;Alle pakker implementerer nå npm provenance (beta) [#1930](https://github.com/navikt/aksel/pull/1930)

### @navikt/ds-css

- &#x20;Alle pakker implementerer nå npm provenance (beta) [#1930](https://github.com/navikt/aksel/pull/1930)

### @navikt/aksel-icons

- &#x20;:tada: Lagt til nye ikoner :tada: [#1928](https://github.com/navikt/aksel/pull/1928)

  - HandKnot.svg
  - HandKnotFilled.svg

- &#x20;Alle pakker implementerer nå npm provenance (beta) [#1928](https://github.com/navikt/aksel/pull/1928)

## 2.8.14

### @navikt/ds-react

- Fixes shown month on open in Datepicker/MonthPicker, better handling of out-of-range 'today' [`f0d9a8853`](https://github.com/navikt/aksel/commit/f0d9a8853f56854a4049bd3f6cc34968e9d6c380)

### @navikt/ds-css

- Fixes shown month on open in Datepicker/MonthPicker, better handling of out-of-range 'today' [`f0d9a8853`](https://github.com/navikt/aksel/commit/f0d9a8853f56854a4049bd3f6cc34968e9d6c380)

## 2.8.10

### @navikt/ds-react

- &#x20;:recycle: Refactor event-handling i datepicker-hooks [#1907](https://github.com/navikt/aksel/pull/1907)

## 2.8.7

### @navikt/ds-react

- Fikset typografi for radio, checkbox. Button token for tertiary [`7f3f025db`](https://github.com/navikt/aksel/commit/7f3f025db2ad605df4240605a733d10d08db753a)

### @navikt/ds-css

- Fikset typografi for radio, checkbox. Button token for tertiary [`7f3f025db`](https://github.com/navikt/aksel/commit/7f3f025db2ad605df4240605a733d10d08db753a)

## 2.8.6

### @navikt/ds-react

- Alert, Chips og ErrorSummary har nå bedre utvalg av tokens [`2eb358ad8`](https://github.com/navikt/aksel/commit/2eb358ad888979d21c385b3900973946f3f466be)

### @navikt/ds-css

- Alert, Chips og ErrorSummary har nå bedre utvalg av tokens [`2eb358ad8`](https://github.com/navikt/aksel/commit/2eb358ad888979d21c385b3900973946f3f466be)

## 2.8.3

### @navikt/ds-react

- &#x20;Textarea har oppdatert counter-tekst + mulighet for lokalisering [#1875](https://github.com/navikt/aksel/pull/1875)

## 2.8.2

### @navikt/ds-react

- &#x20;Oppdatert typografi for ExpansioCard [#1870](https://github.com/navikt/aksel/pull/1870)

### @navikt/ds-css

- &#x20;Oppdatert typografi for ExpansioCard [#1870](https://github.com/navikt/aksel/pull/1870)

## 2.8.1

### @navikt/ds-react

- :bug: Endret default title-size til medium for ExpansionCard [`1276b4d7e`](https://github.com/navikt/aksel/commit/1276b4d7efd831d20345292dbb21a11d100a0ddd)

## 2.8.0

### @navikt/ds-react

- &#x20;:tada: Ny komponent! ExpansionCard. Oppfølger fra gammel Ekspanderbartpanel. [#1820](https://github.com/navikt/aksel/pull/1820)

### @navikt/ds-css

- &#x20;:tada: Ny komponent! ExpansionCard. Oppfølger fra gammel Ekspanderbartpanel. [#1820](https://github.com/navikt/aksel/pull/1820)

## 2.6.2

### @navikt/ds-react

- Fikset React18 problem med TextareaAutosize [`59d32e52c`](https://github.com/navikt/aksel/commit/59d32e52c437759e66aa50d200b4264a6ba53069)

## 2.6.1

### @navikt/ds-react

- Ny onSearchClick-prop i Search for lettere submit-handling [`1c5e06438`](https://github.com/navikt/aksel/commit/1c5e06438ce9ff8225d5b2b2bf1f94348dfefe9c)

## 2.5.1

### @navikt/ds-react

- :recycle: Refaktorert nested-list logikk [`ac1e69b34`](https://github.com/navikt/aksel/commit/ac1e69b342ae207db2e80e3058555c56902e5832)

## 2.4.2

### @navikt/ds-react

- &#x20;added support for nested lists [#1823](https://github.com/navikt/aksel/pull/1823)

### @navikt/ds-tailwind

- &#x20;added support for nested lists [#1823](https://github.com/navikt/aksel/pull/1823)

### @navikt/ds-tokens

- &#x20;added support for nested lists [#1823](https://github.com/navikt/aksel/pull/1823)

### @navikt/ds-css

- &#x20;added support for nested lists [#1823](https://github.com/navikt/aksel/pull/1823)

## 2.4.1

### @navikt/ds-react

- &#x20;Added fixedWeeks prop to standalone datepicker [#1827](https://github.com/navikt/aksel/pull/1827)

## 2.4.0

### @navikt/ds-react

- &#x20;Added List component [#1807](https://github.com/navikt/aksel/pull/1807)

### @navikt/ds-css

- &#x20;Added List component [#1807](https://github.com/navikt/aksel/pull/1807)

## 2.2.0

### @navikt/ds-react

- &#x20;Button og ToggleGroup har nå en neutral-variant, oppdatert neutral-tokens [#1789](https://github.com/navikt/aksel/pull/1789)

### @navikt/ds-tokens

- &#x20;Justeringer i semantiske fargetokens, statusfarger nå mer tydelig [#1787](https://github.com/navikt/aksel/pull/1787)

- &#x20;Button og ToggleGroup har nå en neutral-variant, oppdatert neutral-tokens [#1787](https://github.com/navikt/aksel/pull/1787)

### @navikt/ds-css

- &#x20;Button og ToggleGroup har nå en neutral-variant, oppdatert neutral-tokens [#1789](https://github.com/navikt/aksel/pull/1789)

## 2.1.7

### @navikt/ds-react

- Fikset rekkefølge på onValidate og onRangeChange i useRangepicker-hook [`6ac97aeb3`](https://github.com/navikt/aksel/commit/6ac97aeb34735020e5a2083e51e836877abaefa3)

## 2.1.6

### @navikt/ds-react

- &#x20;:sparkles: Datepicker og monthpicker kan nå bestemme om popover skal dukke opp ved fokus [#1777](https://github.com/navikt/aksel/pull/1777)

## 2.1.5

### @navikt/ds-react

- Hotfix: ESM import fra date-fns feilet

## 2.1.4

### @navikt/ds-react

- Fikset edgecase i useRangepicker der valg av startdato etter sluttdato ga feil output [`87f194c1d`](https://github.com/navikt/aksel/commit/87f194c1dc29b10a604de676b358d117e2dbf52f)

## 2.1.3

### @navikt/ds-react

- &#x20;Monthpicker håndterer nå visning av År riktig [#1771](https://github.com/navikt/aksel/pull/1771)

## 2.1.1

### @navikt/ds-react

- &#x20;Fikset @types/react v18 feil introdusert i v2.0.6 [#1759](https://github.com/navikt/aksel/pull/1759)

## 2.1.0

### @navikt/ds-react

- Datepicker/Monthpicker støtter nå år med 2 siffer i input [`0873fe652`](https://github.com/navikt/aksel/commit/0873fe6520e817e462197c162b49c05826da4838)

### @navikt/ds-tokens

- &#x20;:sparkles: Ny Timeline-komponent for interne-flater
  :bug: Fikset feil danger-hover token [#1665](https://github.com/navikt/aksel/pull/1665)

## 2.0.18

### @navikt/ds-react

- Bedre typer for ref i datepicker [`98177d0cd`](https://github.com/navikt/aksel/commit/98177d0cd3802029dcf398ce93c1767d3b0860c5)

## 2.0.15

### @navikt/ds-react

- &#x20;toptextPosition prop i Chat for horisontal plassering av navn og dato. [#1748](https://github.com/navikt/aksel/pull/1748)

### @navikt/ds-css

- &#x20;toptextPosition prop i Chat for horisontal plassering av navn og dato. [#1748](https://github.com/navikt/aksel/pull/1748)

## 2.0.14

### @navikt/ds-react

- Bumpet @floating-ui/react [`8e5c55443`](https://github.com/navikt/aksel/commit/8e5c554431c98b1b658c5054c0b3cf08b8a65e52)

## 2.0.10

### @navikt/ds-react

- Button submittet form i table

## 2.0.9

### @navikt/ds-react

- ShouldCloseOnEsc i Modal

## 2.0.8

### @navikt/ds-react

- Confirmationpanel wrappet med div

## 2.0.7

### @navikt/ds-react

- :bug: Fikset keyboard-click i monthpicker

## 2.0.6

### @navikt/ds-react

- DateInput hadde duplikat className satt

## 2.0.3

### @navikt/ds-react

- :sparkles: La til muligheten til å velge layout-strategi for datepicker-popover

## 2.0.2

### @navikt/ds-react

- :bug: Fikset click-event for datepicker

## 2.0.0

### @navikt/ds-react

- v2: Tokens update and font-loading [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4)

### @navikt/ds-tailwind

- v2: Tokens update and font-loading [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4)

### @navikt/ds-tokens

- v2: Tokens update and font-loading [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4)

### @navikt/ds-css

- v2: Tokens update and font-loading [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4)

## 1.5.10

### @navikt/ds-react

- &#x20;Fikset parentSelector prop i Modal [#1717](https://github.com/navikt/aksel/pull/1717)

## 1.5.8

### @navikt/ds-react

- console.log removed

## 1.5.7

### @navikt/ds-react

- defaultMonth/Year prop date-komponent

## 1.5.6

### @navikt/ds-react

- Datepicker fungerte ikke med open shadow-dom

## 1.5.2

### @navikt/ds-react

- :memo: Rename FilterChips to ToggleChips

### @navikt/ds-css

- :memo: Rename FilterChips to ToggleChips

## 1.5.1

### @navikt/ds-react

- Flex-wrap chips.css

### @navikt/ds-css

- Flex-wrap chips.css

## 1.5.0

### @navikt/ds-react

- &#x20;:sparkles: Oppdaterte tag-varianter [#1684](https://github.com/navikt/aksel/pull/1684)

- &#x20;Chips komponent :sparkles: [#1684](https://github.com/navikt/aksel/pull/1684)

### @navikt/ds-css

- &#x20;:sparkles: Oppdaterte tag-varianter [#1684](https://github.com/navikt/aksel/pull/1684)

- &#x20;Chips komponent :sparkles: [#1684](https://github.com/navikt/aksel/pull/1684)

## 1.4.4

### @navikt/ds-react

- Eksponerer validation-typer

## 1.4.3

### @navikt/ds-react

- :sparkles: Validering og inputFormat i Date-komponenter

### @navikt/ds-css

- :sparkles: Validering og inputFormat i Date-komponenter

## 1.4.1

### @navikt/ds-react

- Date-komponenter følger språkrådets dato-formatering for måneder. [`3c08651df`](https://github.com/navikt/aksel/commit/3c08651df28c3e19dd8c8a7a1d0032200bec473d)

### @navikt/ds-css

- Date-komponenter følger språkrådets dato-formatering for måneder. [`3c08651df`](https://github.com/navikt/aksel/commit/3c08651df28c3e19dd8c8a7a1d0032200bec473d)

## 1.4.0

### @navikt/ds-react

- Global Provider komponent for håndtering av global config [`1bdb7e377`](https://github.com/navikt/aksel/commit/1bdb7e3777ece28d153991b78dbdd289366fca57)

## 1.3.39

### @navikt/ds-react

- Bump for latest-tag [`40f0b3340`](https://github.com/navikt/aksel/commit/40f0b3340d01bf85fecc04f2f3a8e8b2acf996f1)

### @navikt/ds-tailwind

- Bump for latest-tag [`40f0b3340`](https://github.com/navikt/aksel/commit/40f0b3340d01bf85fecc04f2f3a8e8b2acf996f1)

### @navikt/ds-tokens

- Bump for latest-tag [`40f0b3340`](https://github.com/navikt/aksel/commit/40f0b3340d01bf85fecc04f2f3a8e8b2acf996f1)

### @navikt/ds-css

- Bump for latest-tag [`40f0b3340`](https://github.com/navikt/aksel/commit/40f0b3340d01bf85fecc04f2f3a8e8b2acf996f1)

## 2.5.0

### @navikt/ds-tailwind

- &#x20;Breakpoint-tokens for ds-tokens og ds-tailwind [#1832](https://github.com/navikt/aksel/pull/1832)

### @navikt/ds-tokens

- &#x20;Breakpoint-tokens for ds-tokens og ds-tailwind [#1832](https://github.com/navikt/aksel/pull/1832)

## 4.1.4

### @navikt/ds-css

- &#x20;:bug: Subtle-description på form-elementer brakk bruk av Readmore [#2049](https://github.com/navikt/aksel/pull/2049)

## 4.1.1

### @navikt/ds-css

- :bug: Fikset markering av tekst i skeleton. [`91343563c`](https://github.com/navikt/aksel/commit/91343563c916a554d8ade5401c28ab4c3b3e26af)

## 2.9.0

### @navikt/ds-css

- &#x20;:tada: CSS nå tilgjengelig som separate filer [#1941](https://github.com/navikt/aksel/pull/1941)

  - Kan lastest fra CDN
  - Tilbys nå i minified-versjoner
  - Kommandoline: `npx @navikt/aksel css-imports` for å raskt komme i gang med CSS-optimalisering

## 2.8.9

### @navikt/ds-css

- &#x20;:sparkles: Padding/border-radius tokens for button.css [#1905](https://github.com/navikt/aksel/pull/1905)

## 2.8.5

### @navikt/ds-css

- :art: Accordion-tokens for header bakgrunn [`f66437082`](https://github.com/navikt/aksel/commit/f664370826ed51bda7ad681e1f1799c26d2c1f0a)

- &#x20;:bug: Fikset tekstfarge i select på iphone [`f66437082`](https://github.com/navikt/aksel/commit/f664370826ed51bda7ad681e1f1799c26d2c1f0a)

## 2.7.8

### @navikt/ds-css

- &#x20;Added focus indicator for tabpanel [#1863](https://github.com/navikt/aksel/pull/1863)

## 2.7.5

### @navikt/ds-css

- :bug: Fikset token-bug i togglegroup

## 2.4.3

### @navikt/ds-css

- Fikset disabled-opacity bug i select for Chrome [`f962bc781`](https://github.com/navikt/aksel/commit/f962bc7816027c24e334d9754c3e07cda951cf56)

## 2.3.1

### @navikt/ds-css

- Fikset feil bruk av fallback-tokens i textarea, timeline [`241b2e678`](https://github.com/navikt/aksel/commit/241b2e678f1f40909e2d36fe095dcbce8673f174)

## 2.3.0

### @navikt/ds-css

- &#x20;Fiksa sentrering av tekst i Select i Firefox [#1813](https://github.com/navikt/aksel/pull/1813)

<!---->

- Select small 34px høyde -> 32px [`51b62cca7`](https://github.com/navikt/aksel/commit/51b62cca7b857e92669cd0b09e620b131faf80e5)

## 2.1.2

### @navikt/ds-css

- Small textfield har nå 8px horisontal padding (4px før) [`62f36da5e`](https://github.com/navikt/aksel/commit/62f36da5e74fc7f53414d42b310c3b57597795bc)

## 2.0.12

### @navikt/ds-css

- &#x20;:bug: Fikset default visuell error-state for radio [#1737](https://github.com/navikt/aksel/pull/1737)

## 2.0.5

### @navikt/ds-css

- Reverserte border-width endrind i button

## 2.0.1

### @navikt/ds-css

- Bugfixer ved bruk av tokens [`e8007328d`](https://github.com/navikt/aksel/commit/e8007328db3f6d5be696cf24f03304c79be0f3f7)

## 1.5.9

### @navikt/ds-css

- 4px -> 2px gap chips-toggle active

## 1.5.4

### @navikt/ds-css

- &#x20;Oppdatert ikoner [#1709](https://github.com/navikt/aksel/pull/1709)

## 1.5.3

### @navikt/ds-css

- Byttet om på alt-farge rekkefølge

## 2.9.4

### @navikt/aksel

- &#x20;:truck: Flyttet Codemods from `@navikt/ds-codemods` -> `@navikt/aksel`. [#1952](https://github.com/navikt/aksel/pull/1952)

  - `@navikt/ds-codemods` vil bli deprecated ettehvert.

## 2.9.8

### @navikt/aksel-icons

- &#x20;:lipstick: Statusikoner er nå tydeligere og mer konsistente. [#1959](https://github.com/navikt/aksel/pull/1959)

## 2.9.7

### @navikt/aksel-icons

- :bug: CheckmarkIcon

## 2.9.6

### @navikt/aksel-icons

- &#x20;:bug: Fikset CheckmarkCircleIcon [#1956](https://github.com/navikt/aksel/pull/1956)

## 2.9.3

### @navikt/aksel-icons

- &#x20;:sparkles: Nye ikoner [#1950](https://github.com/navikt/aksel/pull/1950)

  - :tada: BulletList
  - :tada: NumberList

## 2.8.13

### @navikt/aksel-icons

- &#x20;Oppdatert ikoner :tada: [#1921](https://github.com/navikt/aksel/pull/1921)

## 2.8.11

### @navikt/aksel-icons

- &#x20;Oppdatert ikoner [#1909](https://github.com/navikt/aksel/pull/1909)

## 2.8.8

### @navikt/aksel-icons

- :sparkles: Nye ikoner [`ed8e28454`](https://github.com/navikt/aksel/commit/ed8e284540a9e3a5be7d1d5e393f31db86962613)

  - :tada: VideoSlash
  - :tada: VideoSlashFill

## 2.8.4

### @navikt/aksel-icons

- Fikset Sourcemap-bug i Aksel-icons

## 2.7.7

### @navikt/aksel-icons

- :Sparkles: Nye ikoner [`a22ac3eb7`](https://github.com/navikt/aksel/commit/a22ac3eb78135bf93d4771802475396849809c03)

  - :tada: CaretUpDownFilledDown
  - :tada: CaretUpDownFilledUp
  - :tada: CloudDown
  - :tada: CloudDownFill
  - :tada: CloudUp
  - :tada: CloudUpFill
  - :tada: HddDown
  - :tada: HddDownFill
  - :tada: HddUp
  - :tada: HddUpFill
  - :tada: Inbox
  - :tada: InboxDown
  - :tada: InboxDownFill
  - :tada: InboxFill
  - :tada: InboxUp
  - :tada: InboxUpFill
  - :tada: ShoppingBasket
  - :tada: ShoppingBasketFill

## 2.7.4

### @navikt/aksel-icons

- &#x20;Oppdatert ikonpakke med nye ikoner :rocket: [#1852](https://github.com/navikt/aksel/pull/1852)

  - :tada: CaretDownFill
  - :tada: CaretLeft
  - :tada: CaretLeftFill
  - :tada: CaretLeftRight
  - :tada: CaretLeftRightFill
  - :tada: CaretRight
  - :tada: CaretRightFill
  - :tada: CaretUpDownFill
  - :tada: CaretUpFill
  - :tada: Escalator
  - :tada: Moon
  - :tada: MoonFill
  - :fire: EscalatorStroke

## 2.7.1

### @navikt/aksel-icons

- Public-access for ny ikonpakke i GPR [`7d9517cf9`](https://github.com/navikt/aksel/commit/7d9517cf90331b57441a0787a04eef66efd1b9b0)

## 2.7.0

### @navikt/aksel-icons

- &#x20;Ny ikonpakke med for core icons 3! `@navikt/aksel-icons` [#1847](https://github.com/navikt/aksel/pull/1847)

## 3.4.2

### @navikt/aksel-stylelint

- &#x20;add missing dependency [#2017](https://github.com/navikt/aksel/pull/2017)

## 3.4.1

### @navikt/aksel-stylelint

- :bug: Stylelint hotfix, inkluderer nå dist-mappe (kanskje..)
