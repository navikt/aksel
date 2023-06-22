# Changelog

## 4.4.0

### @navikt/ds-css

- &#x20;Shadow-tokens er oppdatert: Datepicker har nå ikke border, Modal bruker shadow-xlarge, LinkCard bruker shadow-xsmall [#2041](https://github.com/navikt/aksel/pull/2041)

### @navikt/ds-tailwind

- &#x20;Shadow-tokens er oppdatert [#2041](https://github.com/navikt/aksel/pull/2041)

- &#x20;Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600). [#2041](https://github.com/navikt/aksel/pull/2041)

### @navikt/ds-tokens

- &#x20;Shadow-tokens er oppdatert til mer tydeligere varianter [#2041](https://github.com/navikt/aksel/pull/2041)

### @navikt/ds-react

- &#x20;Fikset klassenavn brukt for popover i Datepicker og Monthpicker [#2041](https://github.com/navikt/aksel/pull/2041)

## 4.3.0

### @navikt/ds-css

- &#x20;Popover/Helptext: Maksbredde på 100vw - 1.5rem. Treffer ikke lengre kanten på skjermen. [#2069](https://github.com/navikt/aksel/pull/2069)

<!---->

- &#x20;ExpansionCard: Ved nesting av komponetene fikk man styling fra parent [#2067](https://github.com/navikt/aksel/pull/2067)

### @navikt/ds-react

- &#x20;Popover og Helptext har nå luft mot siden av skjerm på mindre flater [#2069](https://github.com/navikt/aksel/pull/2069)

## 4.2.0

### @navikt/ds-css

- &#x20;Chat: `small`-size, innebygde varianter for farge og oppdatert utseende. [#2048](https://github.com/navikt/aksel/pull/2048)

### @navikt/ds-react

- &#x20;Oppdatert Chat: `size` og `variant`-prop, optional `avatar`, uu og ui-forbedringer [#2048](https://github.com/navikt/aksel/pull/2048)

## 4.1.4

### @navikt/ds-css

- &#x20;Readmore: setter nå eksplisitt color for å ikke arve text-subtle fra parent. [#2049](https://github.com/navikt/aksel/pull/2049)

## 4.1.1

### @navikt/ds-css

- :bug: Fikset cursor-markering av tekst i skeleton. [`91343563c`](https://github.com/navikt/aksel/commit/91343563c916a554d8ade5401c28ab4c3b3e26af)

## 4.1.0

### @navikt/ds-css

- &#x20;Chips: `neutral` og `action`-varianter av Chips.Toggle. Opt-out mulighet for Checkmark. Oppdatert checkmark-ikon [#2035](https://github.com/navikt/aksel/pull/2035)

- &#x20;Alle description-felter på fieldsets har nå `text-subtle` som farge. [#2035](https://github.com/navikt/aksel/pull/2035)

### @navikt/ds-tailwind

- &#x20;:tada: Fargetokens for datavisualisering. [#2032](https://github.com/navikt/aksel/pull/2032)

### @navikt/ds-tokens

- &#x20;:tada: Fargetokens for datavisualisering. [#2032](https://github.com/navikt/aksel/pull/2032)

- &#x20;Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600). [#2032](https://github.com/navikt/aksel/pull/2032)

### @navikt/ds-react

- &#x20;Chips: `neutral` og `action`-varianter for Chips.Toggle. `checkmark`-prop for Chips.Toggle [#2035](https://github.com/navikt/aksel/pull/2035)

- &#x20;Ny komponent Skeleton! [#2035](https://github.com/navikt/aksel/pull/2035)

<!---->

- &#x20;La til JSDoc dokumentasjon for alle komponenter [#2034](https://github.com/navikt/aksel/pull/2034)

- &#x20;Accordion: La til `indent`-prop [#2034](https://github.com/navikt/aksel/pull/2034)

### @navikt/aksel-stylelint

- &#x20;Deprecated klassenavn `navds-chips--icon-left` [#2035](https://github.com/navikt/aksel/pull/2035)

## 4.0.0

### @navikt/ds-css

- &#x20;All styling fra `@navikt/ds-css-internal` er flyttet til `@navikt/ds-css`. [#2026](https://github.com/navikt/aksel/pull/2026)

- classname-prefix er endret fra `navdsi` -> `navds` for flyttede komponenter.

- Fikset cascading-problem mellom dropdown og popover. Dropdown blir ikke lengre påvirket av import-rekkefølge av popover.

- Styling for flyttede komponenter finnes nå på CDN (https://aksel.nav.no/grunnleggende/kode/css-import)

### @navikt/ds-react

- &#x20;Datepicker og Monthpicker er ute av beta. [#2026](https://github.com/navikt/aksel/pull/2026)

- &#x20;Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react`. [#2026](https://github.com/navikt/aksel/pull/2026)

### @navikt/aksel

- &#x20;Codemod for migrering av Datepicker/Monthpicker ut av Beta. `npx @navikt/aksel codemod v4-date` [#2026](https://github.com/navikt/aksel/pull/2026)

- &#x20;Codemods for migrering fra `@navikt/ds-react-internal` til `@navikt/ds-react` [#2026](https://github.com/navikt/aksel/pull/2026)

## 3.4.0

### @navikt/ds-css

- &#x20;Tag: `moderate`-variant [#2010](https://github.com/navikt/aksel/pull/2010)

### @navikt/ds-react

- &#x20;Tag: `moderate`-variant [#2010](https://github.com/navikt/aksel/pull/2010)

### @navikt/aksel-stylelint

- &#x20;Stylelint-pakke for Aksel [#1973](https://github.com/navikt/aksel/pull/1973)

## 3.2.3

### @navikt/ds-css

- &#x20;Datepicker: Fikset small-variant av datepicker-input. [#1993](https://github.com/navikt/aksel/pull/1993)

- &#x20;CopyButton: `xsmall`-size for bruk i tabeller [#1993](https://github.com/navikt/aksel/pull/1993)

### @navikt/ds-react

- &#x20;Datepicker: Oppdatert small-variant av Datepicker.Input. UI-oppdatert samtidig. [#1993](https://github.com/navikt/aksel/pull/1993)

- &#x20;CopyButton: `xsmall`-variant for bruk i tabeller [#1993](https://github.com/navikt/aksel/pull/1993)

### @navikt/aksel-icons

- &#x20;Nye ikoner `FileParagraph` og `FilePlus` [#1998](https://github.com/navikt/aksel/pull/1998)

## 3.1.3

### @navikt/ds-css

- &#x20;:lipstick: Oppdatert utseende for ToggleGroup. `Medium` og `Small`-size er begge 10px lavere, mindre border-radius [#1976](https://github.com/navikt/aksel/pull/1976)

## 3.1.0

### @navikt/ds-css

- &#x20;Alle komponenter bruker nå default `:focus-visible` for fokusmarkering. Medfølger også fallback for `:focus` [#1966](https://github.com/navikt/aksel/pull/1966)

<!---->

- &#x20;Oppdatert Label og Description spacing for skjemakomponenter [#1967](https://github.com/navikt/aksel/pull/1967)

### @navikt/ds-react

- &#x20;Oppdatert Label og Description spacing for alle skjemakomponenter [#1967](https://github.com/navikt/aksel/pull/1967)

## 3.0.0

### @navikt/ds-css

- &#x20;Accordion: Chevron er left-aligned, deler av styling er refaktorert, `size`-props og `neutral`-variant [#1964](https://github.com/navikt/aksel/pull/1964)

### @navikt/ds-react

- &#x20;Accordion: left-aligner chevron, `neutral`-variant, `size`-prop [#1964](https://github.com/navikt/aksel/pull/1964)

- &#x20;Bruker nå nå `@navikt/aksel-icons` for interne ikoner [#1964](https://github.com/navikt/aksel/pull/1964)

## 2.9.0

### @navikt/ds-css

- &#x20;CSS nå tilgjengelig som separate filer: Kan lastest fra CDN, minified-versjoner tilgjengelig [#1941](https://github.com/navikt/aksel/pull/1941)

## 2.8.9

### @navikt/ds-css

- &#x20;Button: Padding/border-radius tokens [#1905](https://github.com/navikt/aksel/pull/1905)

## 2.8.7

### @navikt/ds-css

- Button: token for tertiary [`7f3f025db`](https://github.com/navikt/aksel/commit/7f3f025db2ad605df4240605a733d10d08db753a)

### @navikt/ds-react

- Fikset typografi-bruk for `Radio` og `Checkbox`. [`7f3f025db`](https://github.com/navikt/aksel/commit/7f3f025db2ad605df4240605a733d10d08db753a)

## 2.8.6

### @navikt/ds-css

- Alert, Chips og ErrorSummary har nå bedre utvalg av tokens [`2eb358ad8`](https://github.com/navikt/aksel/commit/2eb358ad888979d21c385b3900973946f3f466be)

## 2.8.5

### @navikt/ds-css

- Accordion: tokens for header-bakgrunn [`f66437082`](https://github.com/navikt/aksel/commit/f664370826ed51bda7ad681e1f1799c26d2c1f0a)

- &#x20;Select: Fikset tekstfarge på iphone [`f66437082`](https://github.com/navikt/aksel/commit/f664370826ed51bda7ad681e1f1799c26d2c1f0a)

## 2.8.2

### @navikt/ds-css

- &#x20;ExpansioCard: Oppdatert typografi [#1870](https://github.com/navikt/aksel/pull/1870)

### @navikt/ds-react

- &#x20;ExpansioCard: Oppdatert typografibruk [#1870](https://github.com/navikt/aksel/pull/1870)

## 2.7.8

### @navikt/ds-css

- &#x20;Tabs: La til focus-markering for Tabs.Panel [#1863](https://github.com/navikt/aksel/pull/1863)

## 2.7.5

### @navikt/ds-css

- ToggleGroup: Fikset token-bug

## 2.4.3

### @navikt/ds-css

- Select: Fikset disabled + opacity bug for Chrome [`f962bc781`](https://github.com/navikt/aksel/commit/f962bc7816027c24e334d9754c3e07cda951cf56)

## 2.4.2

### @navikt/ds-css

- &#x20;List: La til støtte for nesting [#1823](https://github.com/navikt/aksel/pull/1823)

### @navikt/ds-react

- &#x20;List: la til støtte for nestede lister [#1823](https://github.com/navikt/aksel/pull/1823)

## 2.3.1

### @navikt/ds-css

- Fikset feil bruk av fallback-tokens i Textarea og Timeline [`241b2e678`](https://github.com/navikt/aksel/commit/241b2e678f1f40909e2d36fe095dcbce8673f174)

## 2.3.0

### @navikt/ds-css

- &#x20;Select: Fikset sentrering av tekst i Firefox [#1813](https://github.com/navikt/aksel/pull/1813)

<!---->

- Select: `small`-variant er nå 32px (var 34px) [`51b62cca7`](https://github.com/navikt/aksel/commit/51b62cca7b857e92669cd0b09e620b131faf80e5)

## 2.2.0

### @navikt/ds-css

- &#x20;ToggleGroup: `Neutral`-variant. [#1789](https://github.com/navikt/aksel/pull/1789)

- Button: `Neutral`-variant.

### @navikt/ds-tokens

- &#x20;Justeringer av semantiske fargetokens, statusfarger nå mer tydelig [#1787](https://github.com/navikt/aksel/pull/1787)

- &#x20;Oppdatert neutral-tokens [#1787](https://github.com/navikt/aksel/pull/1787)

### @navikt/ds-react

- &#x20;ToggleGroup: `neutral`-variant [#1789](https://github.com/navikt/aksel/pull/1789)

- &#x20;Button: `neutral`-variant [#1789](https://github.com/navikt/aksel/pull/1789)

## 2.1.2

### @navikt/ds-css

- TextField: `small`-variant har nå 8px horisontal padding (før 4px) [`62f36da5e`](https://github.com/navikt/aksel/commit/62f36da5e74fc7f53414d42b310c3b57597795bc)

## 2.0.12

### @navikt/ds-css

- &#x20;Radio: Fikset default visuell error-state [#1737](https://github.com/navikt/aksel/pull/1737)

## 2.0.5

### @navikt/ds-css

- Button: Reverserte border-width endrinder (var 1.5px, nå 2px)

## 2.0.1

### @navikt/ds-css

- Bugfixer ved bruk av tokens oppdatert i v2.0.0 [`e8007328d`](https://github.com/navikt/aksel/commit/e8007328db3f6d5be696cf24f03304c79be0f3f7)

## 2.0.0

### @navikt/ds-css

- Fontlasting: Fonter lastes nå fra NAV-CDN [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4)

- Tokens: Alle komponenter bruker nå semantiske tokens for som standard, med innebygd støtte for komponent-spesifikke tokens.

### @navikt/ds-tailwind

- Alle token er oppdatert til nytt format. [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4)

### @navikt/ds-tokens

- Alle token er oppdatert til nytt format. [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4)

### @navikt/ds-react

- Fonter blir bruk i all typografi blir nå lastet fra CDN [`6b96e4833`](https://github.com/navikt/aksel/commit/6b96e48330c2e013a1acee85cefccd9ccc1aece4)

## 1.5.9

### @navikt/ds-css

- Chips: 4px -> 2px gap mellom checkmark i Chips.Toggle

## 1.5.3

### @navikt/ds-css

- Tokens: Byttet om på rekkefølge av alt-farger

## 1.5.1

### @navikt/ds-css

- Chips. Bruker nå standard flex-wrap

## 1.5.0

### @navikt/ds-css

- &#x20;Tag: `filled`-varianter [#1684](https://github.com/navikt/aksel/pull/1684)

### @navikt/ds-react

- &#x20;Tag: `filles`-varianter [#1684](https://github.com/navikt/aksel/pull/1684)

- &#x20;Ny komponent Chips! [#1684](https://github.com/navikt/aksel/pull/1684)

## 2.5.0

### @navikt/ds-tailwind

- &#x20;Breakpoint-tokens er lagt til. Overskriver native tailwind-breakpoints [#1832](https://github.com/navikt/aksel/pull/1832)

### @navikt/ds-tokens

- &#x20;Breakpoint-tokens lagt til [#1832](https://github.com/navikt/aksel/pull/1832)

## 2.1.0

### @navikt/ds-tokens

- &#x20;Fikset feil danger-hover token [#1665](https://github.com/navikt/aksel/pull/1665)

### @navikt/ds-react

- Datepicker/Monthpicker: år med 2 siffer i input fungerer nå [`0873fe652`](https://github.com/navikt/aksel/commit/0873fe6520e817e462197c162b49c05826da4838)

## 4.1.7

### @navikt/ds-react

- Fikset JSDom-problemer ved testing av Timeline [`42b5af64a`](https://github.com/navikt/aksel/commit/42b5af64ab35d0f2d126d41f8fc3e61fe2834b36)

- &#x20;La til `wrapperClassname`-prop for HelpText [`42b5af64a`](https://github.com/navikt/aksel/commit/42b5af64ab35d0f2d126d41f8fc3e61fe2834b36)

## 4.1.6

### @navikt/ds-react

- Timeline-period brakk ved bruk av JSDom i vitest og jest [`9a8bb26c3`](https://github.com/navikt/aksel/commit/9a8bb26c36cfbb1a95cf28a043d2df3dbfe7185d)

## 4.1.5

### @navikt/ds-react

- &#x20;`OverridableComponent` fungerer nå med komponenter som allerede bruker 'as'-prop. [#2051](https://github.com/navikt/aksel/pull/2051)

- &#x20;Popover: `bubbleEscape`-prop tilbyr muligheten for escape-events til å sendes opp gjennom dom-treet. [#2051](https://github.com/navikt/aksel/pull/2051)

### @navikt/aksel-icons

- &#x20;Nye ikoner `ChevronRightLast` og `ChevronLeftLast` [#2054](https://github.com/navikt/aksel/pull/2054)

## 4.1.3

### @navikt/ds-react

- `className` ble ikke riktig forwardet til ikke-klikkbar Period i Timeline [`44a75acb6`](https://github.com/navikt/aksel/commit/44a75acb6b904d614a01344f42111761a48cb7e2)

## 4.1.2

### @navikt/ds-react

- La til JSDoc for Skeleton-komponent [`30068dca3`](https://github.com/navikt/aksel/commit/30068dca3fcdf4bf7bbfbfb3d09baa9fee003962)

## 3.3.1

### @navikt/ds-react

- &#x20;CopyButton: native `Clipboard API` [#2005](https://github.com/navikt/aksel/pull/2005)

## 3.3.0

### @navikt/ds-react

- &#x20;Timeline: popover/tooltip vises nå på hover, ikke onClick. [#1995](https://github.com/navikt/aksel/pull/1995)

## 3.2.4

### @navikt/ds-react

- &#x20;Search: Støtter nå htmlSize-prop [#2000](https://github.com/navikt/aksel/pull/2000)

## 3.2.2

### @navikt/ds-react

- CopyButton: Fjernet use-client directive fra komponent. (warning i vite/rollup) [`6d6267fe0`](https://github.com/navikt/aksel/commit/6d6267fe01f438f3bd67e1b4266ca3e82709561c)

## 3.2.0

### @navikt/ds-react

- &#x20;Ny komponent CopyButton! Erstatter `CopyToClipboard` som nå er tagget som deprecated [#1982](https://github.com/navikt/aksel/pull/1982)

## 3.0.1

### @navikt/ds-react

- Fjernet `@navikt/ds-icons` fra dependencies [`fa2ead912`](https://github.com/navikt/aksel/commit/fa2ead912a4db15d1fa7e2c3efccbe69a64dc9a7)

- Accordion: Oppdatert default headingSize brukt i i Accordion.Header [`fa2ead912`](https://github.com/navikt/aksel/commit/fa2ead912a4db15d1fa7e2c3efccbe69a64dc9a7)

## 2.9.1

### @navikt/ds-react

- &#x20;ExpansionCard: Støtter nå `aria-labelledby` i tillegg til `aria-label` [#1944](https://github.com/navikt/aksel/pull/1944)

## 2.8.16

### @navikt/ds-react

- ExpansionCard: ExpansionCard.Content sendte ikke `className` videre [`ff001f2bc`](https://github.com/navikt/aksel/commit/ff001f2bcf5a1ff0580660a1680f4f8342e7fdff)

- &#x20;Datepicker. Bedre håndtering av visning for out-of-range-datoer [`ff001f2bc`](https://github.com/navikt/aksel/commit/ff001f2bcf5a1ff0580660a1680f4f8342e7fdff)

## 2.8.14

### @navikt/ds-react

- Datepicker/Monthpicker: Oppdaterer vist måneder ved popover åpne/lukk. Fikser out-of-range håndtering av `today` [`f0d9a8853`](https://github.com/navikt/aksel/commit/f0d9a8853f56854a4049bd3f6cc34968e9d6c380)

## 2.8.10

### @navikt/ds-react

- &#x20;Datepicker/Monthpicker: refaktorert event-handling i hooks [#1907](https://github.com/navikt/aksel/pull/1907)

## 2.8.3

### @navikt/ds-react

- &#x20;Textarea: oppdatert counter-tekst + mulighet for lokalisering [#1875](https://github.com/navikt/aksel/pull/1875)

## 2.8.1

### @navikt/ds-react

- ExpansionCard: Oppdaetrt standard title-size til `medium` [`1276b4d7e`](https://github.com/navikt/aksel/commit/1276b4d7efd831d20345292dbb21a11d100a0ddd)

## 2.8.0

### @navikt/ds-react

- &#x20;Ny komponent ExpansionCard! [#1820](https://github.com/navikt/aksel/pull/1820)

## 2.6.2

### @navikt/ds-react

- Textarea: Fikset React v18 problem med `TextareaAutosize` [`59d32e52c`](https://github.com/navikt/aksel/commit/59d32e52c437759e66aa50d200b4264a6ba53069)

## 2.6.1

### @navikt/ds-react

- Search: `onSearchClick`-prop for lettere submit-handling [`1c5e06438`](https://github.com/navikt/aksel/commit/1c5e06438ce9ff8225d5b2b2bf1f94348dfefe9c)

## 2.5.1

### @navikt/ds-react

- List: Refaktorert nestede lister [`ac1e69b34`](https://github.com/navikt/aksel/commit/ac1e69b342ae207db2e80e3058555c56902e5832)

## 2.4.1

### @navikt/ds-react

- &#x20;Datepicker: la til `fixedWeeks`-prop for å alltid vise 6 uker i Datepicker.Standalone [#1827](https://github.com/navikt/aksel/pull/1827)

## 2.4.0

### @navikt/ds-react

- &#x20;Ny komponent List! [#1807](https://github.com/navikt/aksel/pull/1807)

## 2.1.7

### @navikt/ds-react

- Datepicker: Fikset rekkefølge på `onValidate` og `onRangeChange` i useRangepicker-hook [`6ac97aeb3`](https://github.com/navikt/aksel/commit/6ac97aeb34735020e5a2083e51e836877abaefa3)

## 2.1.6

### @navikt/ds-react

- &#x20;Datepicker/Monthpicker: `openOnFocus`-prop for manuell håndtering av popover [#1777](https://github.com/navikt/aksel/pull/1777)

## 2.1.5

### @navikt/ds-react

- Datepicker: ESM import fra date-fns fungerer nå

## 2.1.4

### @navikt/ds-react

- Datepicker: Fikset edgecase i `useRangepicker` der valg av startdato etter sluttdato ga feil output [`87f194c1d`](https://github.com/navikt/aksel/commit/87f194c1dc29b10a604de676b358d117e2dbf52f)

## 2.1.3

### @navikt/ds-react

- &#x20;Monthpicker: håndterer visning av år riktig [#1771](https://github.com/navikt/aksel/pull/1771)

## 2.1.1

### @navikt/ds-react

- &#x20;Fikset `@types/react` v18 feil introdusert i v2.0.6 [#1759](https://github.com/navikt/aksel/pull/1759)

## 2.0.18

### @navikt/ds-react

- Datepicker: Bedre typer for `ref` [`98177d0cd`](https://github.com/navikt/aksel/commit/98177d0cd3802029dcf398ce93c1767d3b0860c5)

## 2.0.15

### @navikt/ds-react

- &#x20;Chat: `toptextPosition`-prop for horisontal plassering av navn og dato. [#1748](https://github.com/navikt/aksel/pull/1748)

## 2.0.14

### @navikt/ds-react

- Oppdatert `@floating-ui/react`-versjon [`8e5c55443`](https://github.com/navikt/aksel/commit/8e5c554431c98b1b658c5054c0b3cf08b8a65e52)

## 2.0.7

### @navikt/ds-react

- Monthpicker: Fikset keyboard-click

## 2.0.6

### @navikt/ds-react

- Datepicker: Datepicker.Input satt `className` flere ganger

## 2.0.3

### @navikt/ds-react

- Datepicker: `strategi`-prop for layout-strategi av popover

## 2.0.2

### @navikt/ds-react

- Datepicker: onClick-event fikset

## 1.5.10

### @navikt/ds-react

- &#x20;Modal: `parentSelector`-prop i Modal [#1717](https://github.com/navikt/aksel/pull/1717)

## 1.5.7

### @navikt/ds-react

- Datepicker: `defaultMonth` og `Year` prop lagt til

## 1.5.6

### @navikt/ds-react

- Datepicker: fungerer nå med `open` shadow-dom

## 1.5.2

### @navikt/ds-react

- Chips: `FilterChips` heter nå `ToggleChips`

## 1.4.4

### @navikt/ds-react

- Datepicker: Eksponerer `onValidation`-typer

## 1.4.3

### @navikt/ds-react

- Datepicker: Validering og inputFormat funksjonalitet

## 1.4.1

### @navikt/ds-react

- Datepicker: Følger språkrådets dato-formatering for måneder. [`3c08651df`](https://github.com/navikt/aksel/commit/3c08651df28c3e19dd8c8a7a1d0032200bec473d)

## 1.4.0

### @navikt/ds-react

- Ny komponent Provider! For håndtering av global config på tvers av komponenter [`1bdb7e377`](https://github.com/navikt/aksel/commit/1bdb7e3777ece28d153991b78dbdd289366fca57)

## 2.9.8

### @navikt/aksel-icons

- &#x20;Oppdatert Statusikoner til å være tydeligere og mer konsistente. [#1959](https://github.com/navikt/aksel/pull/1959)

## 2.9.7

### @navikt/aksel-icons

- Fikset `CheckmarkIcon`-bug

## 2.9.6

### @navikt/aksel-icons

- &#x20;Fikset `CheckmarkCircleIcon`-bug [#1956](https://github.com/navikt/aksel/pull/1956)

## 2.9.3

### @navikt/aksel-icons

- &#x20;Nye ikoner `BulletList` og `NumberList` [#1950](https://github.com/navikt/aksel/pull/1950)

## 2.8.15

### @navikt/aksel-icons

- &#x20;:tada: Nye ikoner `HandKnot` og `HandKnotFilled` [#1928](https://github.com/navikt/aksel/pull/1928)

## 2.8.13

### @navikt/aksel-icons

- &#x20;Oppdatert `InformationSquare`-ikon [#1921](https://github.com/navikt/aksel/pull/1921)

## 2.8.11

### @navikt/aksel-icons

- &#x20;Oppdatert `VideoSlack`, `Questionmark` og `Information`-ikoner [#1909](https://github.com/navikt/aksel/pull/1909)

## 2.8.8

### @navikt/aksel-icons

- Nye ikoner `VideoSlash` og `VideoSlashFill` [`ed8e28454`](https://github.com/navikt/aksel/commit/ed8e284540a9e3a5be7d1d5e393f31db86962613)

## 2.8.4

### @navikt/aksel-icons

- Fikset Sourcemap-bug

## 2.7.7

### @navikt/aksel-icons

- Nye ikoner `CaretUpDownFilledDown`,`CaretUpDownFilledUp`,`CloudDown`,`CloudDownFill`,`CloudUp`,`CloudUpFill`,`HddDown`,`HddDownFill`,`HddUp`,`HddUpFill`,`Inbox`,`InboxDown`,`InboxDownFill`,`InboxFill`,`InboxUp`,`InboxUpFill`,`ShoppingBasket`,`ShoppingBasketFill` [`a22ac3eb7`](https://github.com/navikt/aksel/commit/a22ac3eb78135bf93d4771802475396849809c03)

## 2.7.4

### @navikt/aksel-icons

- &#x20;Nye ikoner ,`CaretDownFill` ,`CaretLeft` ,`CaretLeftFill` ,`CaretLeftRight` ,`CaretLeftRightFill` ,`CaretRight` ,`CaretRightFill` ,`CaretUpDownFill` ,`CaretUpFill` ,`Escalator` ,`Moon` ,`MoonFill`. Fjernet `EscalatorStroke` [#1852](https://github.com/navikt/aksel/pull/1852)

## 2.7.0

### @navikt/aksel-icons

- &#x20;Ny ikonpakke med for core icons 3! `@navikt/aksel-icons` [#1847](https://github.com/navikt/aksel/pull/1847)

## 3.4.2

### @navikt/aksel-stylelint

- &#x20;La til riktige dependencies [#2017](https://github.com/navikt/aksel/pull/2017)

## 3.4.1

### @navikt/aksel-stylelint

- Inkluderer nå dist-mappe i release

## 2.9.4

### @navikt/aksel

- &#x20;:truck: Flyttet Codemods fra `@navikt/ds-codemods` -> `@navikt/aksel`. `@navikt/ds-codemods` regnes nå som deprecated [#1952](https://github.com/navikt/aksel/pull/1952)
