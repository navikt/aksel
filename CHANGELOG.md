# Changelog

## 4.4.0

### @navikt/ds-css

- Shadow-tokens er oppdatert: Datepicker har nå ikke border, Modal bruker shadow-xlarge, LinkCard bruker shadow-xsmall ([PR](https://github.com/navikt/aksel/pull/2041))

### @navikt/ds-tailwind

- Shadow-tokens er oppdatert ([PR](https://github.com/navikt/aksel/pull/2041))

- Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600). ([PR](https://github.com/navikt/aksel/pull/2036))

### @navikt/ds-tokens

- Shadow-tokens er oppdatert til mer tydeligere varianter ([PR](https://github.com/navikt/aksel/pull/2041))

### @navikt/ds-react

- Fikset klassenavn brukt for popover i Datepicker og Monthpicker ([PR](https://github.com/navikt/aksel/pull/2041))

## 4.3.0

### @navikt/ds-css

- Popover/Helptext: Maksbredde på 100vw - 1.5rem. Treffer ikke lengre kanten på skjermen. ([PR](https://github.com/navikt/aksel/pull/2069))

<!---->

- ExpansionCard: Ved nesting av komponetene fikk man styling fra parent ([PR](https://github.com/navikt/aksel/pull/2067))

### @navikt/ds-react

- Popover og Helptext har nå luft mot siden av skjerm på mindre flater ([PR](https://github.com/navikt/aksel/pull/2069))

## 4.2.0

### @navikt/ds-css

- Chat: `small`-size, innebygde varianter for farge og oppdatert utseende. ([PR](https://github.com/navikt/aksel/pull/2048))

### @navikt/ds-react

- Oppdatert Chat: `size` og `variant`-prop, optional `avatar`, uu og ui-forbedringer ([PR](https://github.com/navikt/aksel/pull/2048))

## 4.1.7

### @navikt/ds-react

- Fikset JSDom-problemer ved testing av Timeline

- La til `wrapperClassname`-prop for HelpText ([PR](https://github.com/navikt/aksel/pull/2056))

## 4.1.6

### @navikt/ds-react

- Timeline-period brakk ved bruk av JSDom i vitest og jest

## 4.1.5

### @navikt/ds-react

- `OverridableComponent` fungerer nå med komponenter som allerede bruker 'as'-prop. ([PR](https://github.com/navikt/aksel/pull/2051))

- Popover: `bubbleEscape`-prop tilbyr muligheten for escape-events til å sendes opp gjennom dom-treet. ([PR](https://github.com/navikt/aksel/pull/2052))

### @navikt/aksel-icons

- Nye ikoner `ChevronRightLast` og `ChevronLeftLast` ([PR](https://github.com/navikt/aksel/pull/2054))

## 4.1.4

### @navikt/ds-css

- Readmore: setter nå eksplisitt color for å ikke arve text-subtle fra parent. ([PR](https://github.com/navikt/aksel/pull/2049))

## 4.1.3

### @navikt/ds-react

- `className` ble ikke riktig forwardet til ikke-klikkbar Period i Timeline

## 4.1.2

### @navikt/ds-react

- La til JSDoc for Skeleton-komponent

## 4.1.1

### @navikt/ds-css

- :bug: Fikset cursor-markering av tekst i skeleton.

## 4.1.0

### @navikt/ds-css

- Chips: `neutral` og `action`-varianter av Chips.Toggle. Opt-out mulighet for Checkmark. Oppdatert checkmark-ikon ([PR](https://github.com/navikt/aksel/pull/2035))

- Alle description-felter på fieldsets har nå `text-subtle` som farge. ([PR](https://github.com/navikt/aksel/pull/2036))

### @navikt/ds-tailwind

- :tada: Fargetokens for datavisualisering. ([PR](https://github.com/navikt/aksel/pull/2032))

### @navikt/ds-tokens

- :tada: Fargetokens for datavisualisering. ([PR](https://github.com/navikt/aksel/pull/2032))

- Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600). ([PR](https://github.com/navikt/aksel/pull/2036))

### @navikt/ds-react

- Chips: `neutral` og `action`-varianter for Chips.Toggle. `checkmark`-prop for Chips.Toggle ([PR](https://github.com/navikt/aksel/pull/2035))

- Ny komponent Skeleton! ([PR](https://github.com/navikt/aksel/pull/1821))

<!---->

- La til JSDoc dokumentasjon for alle komponenter ([PR](https://github.com/navikt/aksel/pull/2034))

- Accordion: La til `indent`-prop ([PR](https://github.com/navikt/aksel/pull/2027))

### @navikt/aksel-stylelint

- Deprecated klassenavn `navds-chips--icon-left` ([PR](https://github.com/navikt/aksel/pull/2035))

## 4.0.0

### @navikt/ds-css

- All styling fra `@navikt/ds-css-internal` er flyttet til `@navikt/ds-css`. ([PR](https://github.com/navikt/aksel/pull/2026))

- classname-prefix er endret fra `navdsi` -> `navds` for flyttede komponenter.

- Fikset cascading-problem mellom dropdown og popover. Dropdown blir ikke lengre påvirket av import-rekkefølge av popover.

- Styling for flyttede komponenter finnes nå på CDN [Guide](https://aksel.nav.no/grunnleggende/kode/css-import)

### @navikt/ds-react

- Datepicker og Monthpicker er ute av beta. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h4ef68ae743b0) ([PR](https://github.com/navikt/aksel/pull/2026))

- Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react`. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h3b8538e1981d) ([PR](https://github.com/navikt/aksel/pull/2026))

### @navikt/aksel

- Codemod for migrering av Datepicker/Monthpicker ut av Beta. `npx @navikt/aksel codemod v4-date` ([PR](https://github.com/navikt/aksel/pull/2026))

- Codemods for migrering fra `@navikt/ds-react-internal` til `@navikt/ds-react` [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h3b8538e1981d) ([PR](https://github.com/navikt/aksel/pull/2026))

## 3.4.2

### @navikt/aksel-stylelint

- La til riktige dependencies ([PR](https://github.com/navikt/aksel/pull/2017))

## 3.4.1

### @navikt/aksel-stylelint

- Inkluderer nå dist-mappe i release

## 3.4.0

### @navikt/ds-css

- Tag: `moderate`-variant ([PR](https://github.com/navikt/aksel/pull/2010))

### @navikt/ds-react

- Tag: `moderate`-variant ([PR](https://github.com/navikt/aksel/pull/2010))

### @navikt/aksel-stylelint

- Stylelint-pakke for Aksel ([PR](https://github.com/navikt/aksel/pull/1973))

## 3.3.1

### @navikt/ds-react

- CopyButton: native `Clipboard API` ([PR](https://github.com/navikt/aksel/pull/2005))

## 3.3.0

### @navikt/ds-react

- Timeline: popover/tooltip vises nå på hover, ikke onClick. ([PR](https://github.com/navikt/aksel/pull/1995))

## 3.2.4

### @navikt/ds-react

- Search: Støtter nå htmlSize-prop ([PR](https://github.com/navikt/aksel/pull/2000))

## 3.2.3

### @navikt/ds-css

- Datepicker: Fikset small-variant av datepicker-input. ([PR](https://github.com/navikt/aksel/pull/1993))

- CopyButton: `xsmall`-size for bruk i tabeller ([PR](https://github.com/navikt/aksel/pull/1994))

### @navikt/ds-react

- Datepicker: Oppdatert small-variant av Datepicker.Input. UI-oppdatert samtidig. ([PR](https://github.com/navikt/aksel/pull/1993))

- CopyButton: `xsmall`-variant for bruk i tabeller ([PR](https://github.com/navikt/aksel/pull/1994))

### @navikt/aksel-icons

- Nye ikoner `FileParagraph` og `FilePlus` ([PR](https://github.com/navikt/aksel/pull/1998))

## 3.2.2

### @navikt/ds-react

- CopyButton: Fjernet use-client directive fra komponent. (warning i vite/rollup)

## 3.2.0

### @navikt/ds-react

- Ny komponent CopyButton! Erstatter `CopyToClipboard` som nå er tagget som deprecated ([PR](https://github.com/navikt/aksel/pull/1982))

## 3.1.3

### @navikt/ds-css

- :lipstick: Oppdatert utseende for ToggleGroup. `Medium` og `Small`-size er begge 10px lavere, mindre border-radius ([PR](https://github.com/navikt/aksel/pull/1976))

## 3.1.0

### @navikt/ds-css

- Alle komponenter bruker nå default `:focus-visible` for fokusmarkering. Medfølger også fallback for `:focus` ([PR](https://github.com/navikt/aksel/pull/1966))

<!---->

- Oppdatert Label og Description spacing for skjemakomponenter ([PR](https://github.com/navikt/aksel/pull/1967))

### @navikt/ds-react

- Oppdatert Label og Description spacing for alle skjemakomponenter ([PR](https://github.com/navikt/aksel/pull/1967))

## 3.0.1

### @navikt/ds-react

- Fjernet `@navikt/ds-icons` fra dependencies

- Accordion: Oppdatert default headingSize brukt i i Accordion.Header

## 3.0.0

### @navikt/ds-css

- Accordion: Chevron er left-aligned, deler av styling er refaktorert, `size`-props og `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1964))

### @navikt/ds-react

- Accordion: left-aligner chevron, `neutral`-variant, `size`-prop ([PR](https://github.com/navikt/aksel/pull/1964))

- Bruker nå nå `@navikt/aksel-icons` for interne ikoner ([PR](https://github.com/navikt/aksel/pull/1964))

## 2.9.8

### @navikt/aksel-icons

- Oppdatert Statusikoner til å være tydeligere og mer konsistente. ([PR](https://github.com/navikt/aksel/pull/1959))

## 2.9.7

### @navikt/aksel-icons

- Fikset `CheckmarkIcon`-bug

## 2.9.6

### @navikt/aksel-icons

- Fikset `CheckmarkCircleIcon`-bug ([PR](https://github.com/navikt/aksel/pull/1956))

## 2.9.4

### @navikt/aksel

- :truck: Flyttet Codemods fra `@navikt/ds-codemods` -> `@navikt/aksel`. `@navikt/ds-codemods` regnes nå som deprecated ([PR](https://github.com/navikt/aksel/pull/1952))

## 2.9.3

### @navikt/aksel-icons

- Nye ikoner `BulletList` og `NumberList` ([PR](https://github.com/navikt/aksel/pull/1950))

## 2.9.1

### @navikt/ds-react

- ExpansionCard: Støtter nå `aria-labelledby` i tillegg til `aria-label` ([PR](https://github.com/navikt/aksel/pull/1944))

## 2.9.0

### @navikt/ds-css

- CSS nå tilgjengelig som separate filer: Kan lastest fra CDN, minified-versjoner tilgjengelig ([PR](https://github.com/navikt/aksel/pull/1941))

## 2.8.16

### @navikt/ds-react

- ExpansionCard: ExpansionCard.Content sendte ikke `className` videre

- Datepicker. Bedre håndtering av visning for out-of-range-datoer ([PR](https://github.com/navikt/aksel/pull/1929))

## 2.8.15

### @navikt/aksel-icons

- :tada: Nye ikoner `HandKnot` og `HandKnotFilled` ([PR](https://github.com/navikt/aksel/pull/1928))

## 2.8.14

### @navikt/ds-react

- Datepicker/Monthpicker: Oppdaterer vist måneder ved popover åpne/lukk. Fikser out-of-range håndtering av `today`

## 2.8.13

### @navikt/aksel-icons

- Oppdatert `InformationSquare`-ikon ([PR](https://github.com/navikt/aksel/pull/1921))

## 2.8.11

### @navikt/aksel-icons

- Oppdatert `VideoSlack`, `Questionmark` og `Information`-ikoner ([PR](https://github.com/navikt/aksel/pull/1909))

## 2.8.10

### @navikt/ds-react

- Datepicker/Monthpicker: refaktorert event-handling i hooks ([PR](https://github.com/navikt/aksel/pull/1907))

## 2.8.9

### @navikt/ds-css

- Button: Padding/border-radius tokens ([PR](https://github.com/navikt/aksel/pull/1905))

## 2.8.8

### @navikt/aksel-icons

- Nye ikoner `VideoSlash` og `VideoSlashFill`

## 2.8.7

### @navikt/ds-css

- Button: token for tertiary

### @navikt/ds-react

- Fikset typografi-bruk for `Radio` og `Checkbox`.

## 2.8.6

### @navikt/ds-css

- Alert, Chips og ErrorSummary har nå bedre utvalg av tokens

## 2.8.5

### @navikt/ds-css

- Accordion: tokens for header-bakgrunn

- Select: Fikset tekstfarge på iphone ([PR](https://github.com/navikt/aksel/pull/1879))

## 2.8.4

### @navikt/aksel-icons

- Fikset Sourcemap-bug

## 2.8.3

### @navikt/ds-react

- Textarea: oppdatert counter-tekst + mulighet for lokalisering ([PR](https://github.com/navikt/aksel/pull/1875))

## 2.8.2

### @navikt/ds-css

- ExpansioCard: Oppdatert typografi ([PR](https://github.com/navikt/aksel/pull/1870))

### @navikt/ds-react

- ExpansioCard: Oppdatert typografibruk ([PR](https://github.com/navikt/aksel/pull/1870))

## 2.8.1

### @navikt/ds-react

- ExpansionCard: Oppdaetrt standard title-size til `medium`

## 2.8.0

### @navikt/ds-react

- Ny komponent ExpansionCard! ([PR](https://github.com/navikt/aksel/pull/1820))

## 2.7.8

### @navikt/ds-css

- Tabs: La til focus-markering for Tabs.Panel ([PR](https://github.com/navikt/aksel/pull/1863))

## 2.7.7

### @navikt/aksel-icons

- Nye ikoner `CaretUpDownFilledDown`, `CaretUpDownFilledUp`, `CloudDown`, `CloudDownFill`, `CloudUp`, `CloudUpFill`, `HddDown`, `HddDownFill`, `HddUp`, `HddUpFill`, `Inbox`, `InboxDown`, `InboxDownFill`, `InboxFill`, `InboxUp`, `InboxUpFill`, `ShoppingBasket`, `ShoppingBasketFill`

## 2.7.5

### @navikt/ds-css

- ToggleGroup: Fikset token-bug

## 2.7.4

### @navikt/aksel-icons

- Nye ikoner, `CaretDownFill`, `CaretLeft`, `CaretLeftFill`, `CaretLeftRight`, `CaretLeftRightFill`, `CaretRight`, `CaretRightFill`, `CaretUpDownFill`, `CaretUpFill`, `Escalator`, `Moon`, `MoonFill`. Fjernet `EscalatorStroke` ([PR](https://github.com/navikt/aksel/pull/1852))

## 2.7.0

### @navikt/aksel-icons

- Ny ikonpakke med for core icons 3! `@navikt/aksel-icons` ([PR](https://github.com/navikt/aksel/pull/1847))

## 2.6.2

### @navikt/ds-react

- Textarea: Fikset React v18 problem med `TextareaAutosize`

## 2.6.1

### @navikt/ds-react

- Search: `onSearchClick`-prop for lettere submit-handling

## 2.5.1

### @navikt/ds-react

- List: Refaktorert nestede lister

## 2.5.0

### @navikt/ds-tailwind

- Breakpoint-tokens er lagt til. Overskriver native tailwind-breakpoints ([PR](https://github.com/navikt/aksel/pull/1832))

### @navikt/ds-tokens

- Breakpoint-tokens lagt til ([PR](https://github.com/navikt/aksel/pull/1832))

## 2.4.3

### @navikt/ds-css

- Select: Fikset disabled + opacity bug for Chrome

## 2.4.2

### @navikt/ds-css

- List: La til støtte for nesting ([PR](https://github.com/navikt/aksel/pull/1823))

### @navikt/ds-react

- List: la til støtte for nestede lister ([PR](https://github.com/navikt/aksel/pull/1823))

## 2.4.1

### @navikt/ds-react

- Datepicker: la til `fixedWeeks`-prop for å alltid vise 6 uker i Datepicker.Standalone ([PR](https://github.com/navikt/aksel/pull/1827))

## 2.4.0

### @navikt/ds-react

- Ny komponent List! ([PR](https://github.com/navikt/aksel/pull/1807))

## 2.3.1

### @navikt/ds-css

- Fikset feil bruk av fallback-tokens i Textarea og Timeline

## 2.3.0

### @navikt/ds-css

- Select: Fikset sentrering av tekst i Firefox ([PR](https://github.com/navikt/aksel/pull/1813))

<!---->

- Select: `small`-variant er nå 32px (var 34px)

## 2.2.0

### @navikt/ds-css

- ToggleGroup: `Neutral`-variant. ([PR](https://github.com/navikt/aksel/pull/1789))

- Button: `Neutral`-variant.

### @navikt/ds-tokens

- Justeringer av semantiske fargetokens, statusfarger nå mer tydelig ([PR](https://github.com/navikt/aksel/pull/1787))

- Oppdatert neutral-tokens ([PR](https://github.com/navikt/aksel/pull/1789))

### @navikt/ds-react

- ToggleGroup: `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1789))

- Button: `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1789))

## 2.1.7

### @navikt/ds-react

- Datepicker: Fikset rekkefølge på `onValidate` og `onRangeChange` i useRangepicker-hook

## 2.1.6

### @navikt/ds-react

- Datepicker/Monthpicker: `openOnFocus`-prop for manuell håndtering av popover ([PR](https://github.com/navikt/aksel/pull/1777))

## 2.1.5

### @navikt/ds-react

- Datepicker: ESM import fra date-fns fungerer nå

## 2.1.4

### @navikt/ds-react

- Datepicker: Fikset edgecase i `useRangepicker` der valg av startdato etter sluttdato ga feil output

## 2.1.3

### @navikt/ds-react

- Monthpicker: håndterer visning av år riktig ([PR](https://github.com/navikt/aksel/pull/1771))

## 2.1.2

### @navikt/ds-css

- TextField: `small`-variant har nå 8px horisontal padding (før 4px)

## 2.1.1

### @navikt/ds-react

- Fikset `@types/react` v18 feil introdusert i v2.0.6 ([PR](https://github.com/navikt/aksel/pull/1759))

## 2.1.0

### @navikt/ds-tokens

- Fikset feil danger-hover token ([PR](https://github.com/navikt/aksel/pull/1665))

### @navikt/ds-react

- Datepicker/Monthpicker: år med 2 siffer i input fungerer nå

## 2.0.18

### @navikt/ds-react

- Datepicker: Bedre typer for `ref`

## 2.0.15

### @navikt/ds-react

- Chat: `toptextPosition`-prop for horisontal plassering av navn og dato. ([PR](https://github.com/navikt/aksel/pull/1748))

## 2.0.14

### @navikt/ds-react

- Oppdatert `@floating-ui/react`-versjon

## 2.0.12

### @navikt/ds-css

- Radio: Fikset default visuell error-state ([PR](https://github.com/navikt/aksel/pull/1737))

## 2.0.7

### @navikt/ds-react

- Monthpicker: Fikset keyboard-click

## 2.0.6

### @navikt/ds-react

- Datepicker: Datepicker.Input satt `className` flere ganger

## 2.0.5

### @navikt/ds-css

- Button: Reverserte border-width endrinder (var 1.5px, nå 2px)

## 2.0.3

### @navikt/ds-react

- Datepicker: `strategi`-prop for layout-strategi av popover

## 2.0.2

### @navikt/ds-react

- Datepicker: onClick-event fikset

## 2.0.1

### @navikt/ds-css

- Bugfixer ved bruk av tokens oppdatert i v2.0.0

## 2.0.0

### @navikt/ds-css

- Fontlasting: Fonter lastes nå fra NAV-CDN

- Tokens: Alle komponenter bruker nå semantiske tokens for som standard, med innebygd støtte for komponent-spesifikke tokens.

### @navikt/ds-tailwind

- Alle token er oppdatert til nytt format. ([Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h76f47744d112))

### @navikt/ds-tokens

- Alle token er oppdatert til nytt format. ([Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h76f47744d112))

### @navikt/ds-react

- Fonter blir bruk i all typografi blir nå lastet fra CDN

## 1.5.10

### @navikt/ds-react

- Modal: `parentSelector`-prop i Modal ([PR](https://github.com/navikt/aksel/pull/1717))

## 1.5.9

### @navikt/ds-css

- Chips: 4px -> 2px gap mellom checkmark i Chips.Toggle

## 1.5.7

### @navikt/ds-react

- Datepicker: `defaultMonth` og `Year` prop lagt til

## 1.5.6

### @navikt/ds-react

- Datepicker: fungerer nå med `open` shadow-dom

## 1.5.3

### @navikt/ds-css

- Tokens: Byttet om på rekkefølge av alt-farger

## 1.5.2

### @navikt/ds-react

- Chips: `FilterChips` heter nå `ToggleChips`

## 1.5.1

### @navikt/ds-css

- Chips. Bruker nå standard flex-wrap

## 1.5.0

### @navikt/ds-css

- Tag: `filled`-varianter ([PR](https://github.com/navikt/aksel/pull/1684))

### @navikt/ds-react

- Tag: `filles`-varianter ([PR](https://github.com/navikt/aksel/pull/1684))

- Ny komponent Chips! ([PR](https://github.com/navikt/aksel/pull/1668))

## 1.4.4

### @navikt/ds-react

- Datepicker: Eksponerer `onValidation`-typer

## 1.4.3

### @navikt/ds-react

- Datepicker: Validering og inputFormat funksjonalitet

## 1.4.1

### @navikt/ds-react

- Datepicker: Følger språkrådets dato-formatering for måneder.

## 1.4.0

### @navikt/ds-react

- Ny komponent Provider! For håndtering av global config på tvers av komponenter

## 1.3.39

### @navikt/ds-css

- Fikset bruk av `:watch` for diverse parsere (less, parcel)

### @navikt/ds-react

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

## 1.3.24

### @navikt/ds-css

- Tokens tilgjengeligjøres nå også på `:host`. Dette lar shadow-dom brukere konsumere tokens direkte.

## 1.2.0

### @navikt/ds-react

- Dropdown: `closeOnSelect`-prop for å skru av/på lukking av dropdown ved valg

## 1.1.0

### @navikt/ds-react

- Dropdown: `onSelect`-prop for callback ved valg av element

## 1.0.0

### @navikt/ds-react

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
