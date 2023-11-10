# Changelog

## 5.10.0

### @navikt/ds-react

- Primitives: Ny komponent `Page` og `Page.Block` ([#2456](https://github.com/navikt/aksel/pull/2456))

### @navikt/ds-css

- Primitives: Ny komponent `Page` og `Page.Block` ([#2456](https://github.com/navikt/aksel/pull/2456))

## 5.9.2

### @navikt/ds-react

- :bug: Datepicker lukker ikke lenger modalen den er i ([#2451](https://github.com/navikt/aksel/pull/2451))

## 5.9.1

### @navikt/ds-css

- :lipstick: Modal: Bedre håndtering av mobiler i landskapsmodus ([#2444](https://github.com/navikt/aksel/pull/2444))

## 5.9.0

### @navikt/ds-react

- Datepicker/Monthpicker: Hvis man bruker komponentene i Modal vil Popover bli erstattet med Modal uansett om man er på desktop eller mobil. ([#2419](https://github.com/navikt/aksel/pull/2419))

- Datepicker/Monthpicker/Popover: Fjernet `bubbleEscape`-prop. ([#2419](https://github.com/navikt/aksel/pull/2419))

- useDatepicker/useMonthPicker/useRangedpicker: Fjernet `openOnFocus`-prop, kan nå bare åpnes ved klikk på date-knapp i input. ([#2419](https://github.com/navikt/aksel/pull/2419))

- Datepicker/Monthpicker: Bytter nå automatisk til Modalvisning på mobil. ([#2419](https://github.com/navikt/aksel/pull/2419))

* Added useVirtualFocus hook - used in Combobox for now ([#2394](https://github.com/navikt/aksel/pull/2394))

### @navikt/ds-css

- Datepicker/Monthpicker: Hvis man bruker komponentene i Modal vil Popover bli erstattet med Modal uansett om man er på desktop eller mobil. ([#2419](https://github.com/navikt/aksel/pull/2419))

- Datepicker/Monthpicker/Popover: Fjernet `bubbleEscape`-prop. ([#2419](https://github.com/navikt/aksel/pull/2419))

- useDatepicker/useMonthPicker/useRangedpicker: Fjernet `openOnFocus`-prop, kan nå bare åpnes ved klikk på date-knapp i input. ([#2419](https://github.com/navikt/aksel/pull/2419))

- Datepicker/Monthpicker: Bytter nå automatisk til Modalvisning på mobil. ([#2419](https://github.com/navikt/aksel/pull/2419))

## 5.8.0

### @navikt/ds-react

- :sparkles: Modal: Støtte for å lukke ved klikk utenfor ([#2386](https://github.com/navikt/aksel/pull/2386))

* Autocomplete in combobox will not change formatting of the letters while being typed, but will use the casing of the autocompleted word when selecting the option. ([#2207](https://github.com/navikt/aksel/pull/2207))

* Accordion: Fikset dom-validering ved bruk av `div` i `button`. ([#2426](https://github.com/navikt/aksel/pull/2426))

* :bug: Modal: Bedre støtte for Tooltip i Modal ([#2429](https://github.com/navikt/aksel/pull/2429))

### @navikt/ds-css

- :bug: Modal: Bedre støtte for Tooltip i Modal ([#2429](https://github.com/navikt/aksel/pull/2429))

## 5.7.6

### @navikt/ds-react

- :lipstick: Chips.Toggle: Ikon i uvalgt tilstand ([#2395](https://github.com/navikt/aksel/pull/2395))

### @navikt/ds-css

- :lipstick: Chips.Toggle: Ikon i uvalgt tilstand ([#2395](https://github.com/navikt/aksel/pull/2395))

## 5.7.5

### @navikt/ds-react

- Loader: Har nå riktig `ref`-type. ([#2391](https://github.com/navikt/aksel/pull/2391))

### @navikt/ds-css

- Checkbox, Radio: Transparent-border fungerer nå bedre på mørkere bakgrunner ([#2388](https://github.com/navikt/aksel/pull/2388))

## 5.7.4

### @navikt/ds-react

- Datepicker: Fungerer nå bedre i Modal ([#2400](https://github.com/navikt/aksel/pull/2400))

## 5.7.3

### @navikt/ds-react

- Forms: Fikset bug der size='small' ikke oppdaterte typografi. ([#2372](https://github.com/navikt/aksel/pull/2372))

- HelpText: Knapp er visuelt mindre. Klikkflate er fortsatt 24px ([#2376](https://github.com/navikt/aksel/pull/2376))

### @navikt/ds-css

- Ny spacing token på 0.375rem ([#2370](https://github.com/navikt/aksel/pull/2370))

- Select: Tokenstøtte for å endre chevronfarge sammen med tekst ([#2383](https://github.com/navikt/aksel/pull/2383))

- HelpText: Knapp er visuelt mindre. Klikkflate er fortsatt 24px ([#2376](https://github.com/navikt/aksel/pull/2376))

### @navikt/ds-tokens

- Ny spacing token på 0.375rem ([#2370](https://github.com/navikt/aksel/pull/2370))

## 5.7.2

### @navikt/ds-react

- MonthPicker: Fikset tastaturnavigasjon ([#2374](https://github.com/navikt/aksel/pull/2374))

## 5.7.1

### @navikt/ds-react

- Radio: readonly håndterer nå hover-state bedre ([#2363](https://github.com/navikt/aksel/pull/2363))

### @navikt/ds-css

- Radio: readonly håndterer nå hover-state bedre ([#2363](https://github.com/navikt/aksel/pull/2363))

## 5.7.0

### @navikt/aksel-icons

- Ikoner: Nye ikoner `ChevronLeftFirstCircle` og `ChevronRightLastCircle` ([#2365](https://github.com/navikt/aksel/pull/2365))

### @navikt/ds-react

- Chores: Ryddet opp i sirkulære depdendencies ([#2366](https://github.com/navikt/aksel/pull/2366))

- :lipstick: CopyButton: Justert padding, gap og animasjon ([#2355](https://github.com/navikt/aksel/pull/2355))

### @navikt/ds-css

- :lipstick: CopyButton: Justert padding, gap og animasjon ([#2355](https://github.com/navikt/aksel/pull/2355))

## 5.6.5

### @navikt/ds-react

- Datepicker: Popover legger seg nå ikke ovenfor input ([#2349](https://github.com/navikt/aksel/pull/2349))

## 5.6.4

### @navikt/ds-react

- :lipstick: DatePicker: Litt smalere inputfelt ([#2354](https://github.com/navikt/aksel/pull/2354))

## 5.6.3

### @navikt/ds-css

- :bug: Modal: Sett riktig tekstfarge ([#2340](https://github.com/navikt/aksel/pull/2340))

## 5.6.2

### @navikt/ds-tokens

- Tokens: Tilbyr nå token literals for typer, tidligere string literals ([#2342](https://github.com/navikt/aksel/pull/2342))

## 5.6.1

### @navikt/ds-react

- Added aria-hidden to AccordionContent when closed, to fix issue where Radio labels were omitted when opening/closing AccordionItems ([#2338](https://github.com/navikt/aksel/pull/2338))

## 5.6.0

### @navikt/aksel-icons

- Ikoner: SVG export setter nå `height="1em"`, `width="1em"` og `fill="currentColor"`. ([#2300](https://github.com/navikt/aksel/pull/2300))

- Ikoner: Nye ikoner `book` og `books` ([#2313](https://github.com/navikt/aksel/pull/2313))

* Ikoner: Nye ikoner `ClipboardCheckmark` og `ClipboardLink` ([#2307](https://github.com/navikt/aksel/pull/2307))

### @navikt/ds-react

- :recycle: Refaktorering og småfikser ([#2265](https://github.com/navikt/aksel/pull/2265))

  - Refaktorering som følge av nye ESLint-regler
  - AccordionItem/ToggleGroup: Støtte for 'id'-prop
  - MonthPicker: Mer presis type for 'onMonthSelect' prop

- Datepicker: Tilbyr nå muligheten til å bruke `onWeekNumberClick`. ([#2311](https://github.com/navikt/aksel/pull/2311))

- Primitives: ny komponent Bleed ([#2278](https://github.com/navikt/aksel/pull/2278))

* Accordion: Console.error når Accordion blir brukt feil. ([#2310](https://github.com/navikt/aksel/pull/2310))

* Stack: Kan nå endre direction, justify og align ved brekkpunkt. `Stack` er også nå en egen komponent sammen med `HStack` og `VStack`. ([#2286](https://github.com/navikt/aksel/pull/2286))

* Primitives: Show/Hide støtter nå `asChild`-api ([#2312](https://github.com/navikt/aksel/pull/2312))

* Remove tabIndex="-1" on Popover to fix VoiceOver navigation issue inside Popover ([#2303](https://github.com/navikt/aksel/pull/2303))

### @navikt/ds-css

- Primitives: ny komponent Bleed ([#2278](https://github.com/navikt/aksel/pull/2278))

* :recycle: Box: Forenkling av CSS-variabler ([#2279](https://github.com/navikt/aksel/pull/2279))

* Accordion: Har nå 0.25rem padding-top mellom innhold og heading. ([#2310](https://github.com/navikt/aksel/pull/2310))

* Added cursor:pointer to Select component ([#2293](https://github.com/navikt/aksel/pull/2293))

* :bug: Box: sett border-radius riktig ([#2329](https://github.com/navikt/aksel/pull/2329))

* Stack: Kan nå endre direction, justify og align ved brekkpunkt. `Stack` er også nå en egen komponent sammen med `HStack` og `VStack`. ([#2286](https://github.com/navikt/aksel/pull/2286))

* Datepicker: Tilpasset padding og sizing på mobil. ([#2311](https://github.com/navikt/aksel/pull/2311))

* MonthPicker: Tilpasset padding og sizing på mobil. ([#2311](https://github.com/navikt/aksel/pull/2311))

## 5.5.0

### @navikt/ds-react

- Box: Ny primitive, erstatter dagens `Panel` ([#2195](https://github.com/navikt/aksel/pull/2195))

* Skeleton: Width fungerer nå med inline-variant av Skeleton ([#2273](https://github.com/navikt/aksel/pull/2273))

### @navikt/ds-css

- Box: Ny primitive, erstatter dagens `Panel` ([#2195](https://github.com/navikt/aksel/pull/2195))

* Skeleton: Width fungerer nå med inline-variant av Skeleton ([#2273](https://github.com/navikt/aksel/pull/2273))

### @navikt/ds-tokens

- Box: Ny primitive, erstatter dagens `Panel` ([#2195](https://github.com/navikt/aksel/pull/2195))

## 5.4.1

### @navikt/ds-react

- MonthPicker: Fikset kalkulering av fromDate/toDate ([#2269](https://github.com/navikt/aksel/pull/2269))

## 5.4.0

### @navikt/ds-react

- Primitives: Nye komponenter `Show` og `Hide` er lagt til. ([#2222](https://github.com/navikt/aksel/pull/2222))

* Search: Kjører nå bare preventDefault ved Escape når `input` inneholder tekst ([#2245](https://github.com/navikt/aksel/pull/2245))

### @navikt/ds-css

- Primitives: Nye komponenter `Show` og `Hide` er lagt til. ([#2222](https://github.com/navikt/aksel/pull/2222))

* ErrorSummary: Har nå 8px border-radius ([#2256](https://github.com/navikt/aksel/pull/2256))

### @navikt/ds-tokens

- Tokens: `data-theme="light"` vil nå tilbakestille theming ([#2238](https://github.com/navikt/aksel/pull/2238))

## 5.3.5

### @navikt/ds-react

- :bug: Popover: sjekk at det er et HTML-element som får fokus ([#2258](https://github.com/navikt/aksel/pull/2258))

## 5.3.4

### @navikt/aksel-icons

- :bug: SVG import map er nå riktig path ([#2250](https://github.com/navikt/aksel/pull/2250))

### @navikt/ds-css

- Alert: 12px -> 8px gap mellom tekst og ikon ved `size="small"` ([#2240](https://github.com/navikt/aksel/pull/2240))

## 5.3.3

### @navikt/ds-react

- HGrid: Har nå `align`-prop for bedre kontroll over child-elementer ([#2242](https://github.com/navikt/aksel/pull/2242))

### @navikt/ds-css

- HGrid: Har nå `align`-prop for bedre kontroll over child-elementer ([#2242](https://github.com/navikt/aksel/pull/2242))

## 5.3.2

### @navikt/ds-react

- Skeleton: Lagt til as-prop for inline brk av Skeleton med span ([#2239](https://github.com/navikt/aksel/pull/2239))

### @navikt/ds-css

- Skeleton: Lagt til as-prop for inline brk av Skeleton med span ([#2239](https://github.com/navikt/aksel/pull/2239))

## 5.3.1

### @navikt/ds-react

- Fix bug in monthpicker, only compare year and month for equality on date object ([#2231](https://github.com/navikt/aksel/pull/2231))

- :lipstick: GuidePanel: justert design ([#2227](https://github.com/navikt/aksel/pull/2227))

- :bug: DatePicker: Riktig skriftstørrelse på small input ([#2232](https://github.com/navikt/aksel/pull/2232))

### @navikt/ds-css

- :bug: fix missing accordion bottom box-shadow on last element (when opened) ([#2229](https://github.com/navikt/aksel/pull/2229))

- :lipstick: GuidePanel: justert design ([#2227](https://github.com/navikt/aksel/pull/2227))

## 5.3.0

### @navikt/ds-react

- Heading: Oppdatert med props `textColor`, `align`, `visuallyHidden`. ([#2211](https://github.com/navikt/aksel/pull/2211))

- Label: Oppdatert med props `textColor` og `visuallyHidden`. ([#2211](https://github.com/navikt/aksel/pull/2211))

- BodyLong, BodyShort, Detail: Oppdatert med props `textColor`,`weight`,`align`, `visuallyHidden` og `truncated`. ([#2211](https://github.com/navikt/aksel/pull/2211))

* :wheelchair: Textarea: Skjermleser-spesifikk tekst leses opp sammenhengende ([#2216](https://github.com/navikt/aksel/pull/2216))

### @navikt/ds-css

- Typography: Oppdatert med typo-klasser for `textColor`, `weight`, `align`, `visuallyHidden` og `truncated`. ([#2211](https://github.com/navikt/aksel/pull/2211))

## 5.2.1

### @navikt/ds-css

- Font: Fikset henting av italic-font ([#2220](https://github.com/navikt/aksel/pull/2220))

## 5.2.0

### @navikt/aksel-icons

- Ikoner: Oppdatert ikonpakke ([#2197](https://github.com/navikt/aksel/pull/2197))

### @navikt/ds-react

- Button: Ved bruk av `as`-prop vil `role="button"` nå bli lagt til. Native `onKeyUp` for `Space` er også implementert slik at standard `button`-interaksjon vil være likere uansett html-tag. ([#2154](https://github.com/navikt/aksel/pull/2154))

- Combobox: Fikset bruk av `useLayoutEffect` med SSR-safe metode. ([#2219](https://github.com/navikt/aksel/pull/2219))

- Hovering over combobox dropdown will move selection/focus in the list, so we don't end up with a split focus, and reversely when moving focus while hovering ([#2193](https://github.com/navikt/aksel/pull/2193))

### @navikt/ds-css

- CSS: Popover har nå 8px border-radius. Fikset padding-bug i Select-small. ([#2219](https://github.com/navikt/aksel/pull/2219))

- Hovering over combobox dropdown will move selection/focus in the list, so we don't end up with a split focus, and reversely when moving focus while hovering ([#2193](https://github.com/navikt/aksel/pull/2193))

## 5.1.0

### @navikt/ds-react

- :sparkles: Modal: mulighet for å rendre i portal ([#2209](https://github.com/navikt/aksel/pull/2209))

* :white_check_mark: Modal: use polyfill in JSDOM ([#2208](https://github.com/navikt/aksel/pull/2208))

* Datepicker: Input setter ikke nå aria-controls før popover åpnes ([#2213](https://github.com/navikt/aksel/pull/2213))

### @navikt/ds-css

- :lipstick: Modal: fjern kantlinje ([#2210](https://github.com/navikt/aksel/pull/2210))

- Tokens: Fikset table-token ([#2204](https://github.com/navikt/aksel/pull/2204))

## 5.0.3

### @navikt/ds-react

- ConfirmationPanel: Fikset opplesing av feilmelding ([#2199](https://github.com/navikt/aksel/pull/2199))

### @navikt/ds-css

- ConfirmationPanel: Fikset opplesing av feilmelding ([#2199](https://github.com/navikt/aksel/pull/2199))

- Checkbox: Fikset checkbox-alignment ved bruk av tailwindcss ([#2199](https://github.com/navikt/aksel/pull/2199))

### @navikt/ds-tokens

- ConfirmationPanel: Fikset opplesing av feilmelding ([#2199](https://github.com/navikt/aksel/pull/2199))

- Tokens: `--a-icon-alt-3` er nå i synk med figma ([#2199](https://github.com/navikt/aksel/pull/2199))

## 5.0.2

### @navikt/ds-react

- :label: Modal: Bedre type for `width` ([#2191](https://github.com/navikt/aksel/pull/2191))

## 5.0.1

### @navikt/ds-css

- Checkbox: Hotfix da checkmark ikke var sentrert hvis man brukte tailwind ([`90db7dd0c`](https://github.com/navikt/aksel/commit/90db7dd0c120c16a387d3169c05c1f33dc694323))

## 5.0.0

### @navikt/ds-react

- Oppdatert Modal - Se [Migrering](https://aksel.nav.no/grunnleggende/kode/migrering) ([#2135](https://github.com/navikt/aksel/pull/2135))

  - :sparkles: Støtte for header og footer
  - :boom: Bruker nå native dialog i stedet for react-modal (med polyfill for eldre nettlesere)
  - :boom: Provider: `appElement` er fjernet

* Table: ExpandableRow har oppdatert knapp for å matche Accordion og ExpansionCard ([#2178](https://github.com/navikt/aksel/pull/2178))

* Table: Har lagt til ny size: 'large'. ([#2178](https://github.com/navikt/aksel/pull/2178))

### @navikt/ds-css

- Oppdatert Modal - Se [Migrering](https://aksel.nav.no/grunnleggende/kode/migrering) ([#2135](https://github.com/navikt/aksel/pull/2135))

  - :sparkles: Støtte for header og footer
  - :boom: Bruker nå native dialog i stedet for react-modal (med polyfill for eldre nettlesere)

* Table: ExpandableRow har oppdatert knapp for å matche Accordion og ExpansionCard ([#2178](https://github.com/navikt/aksel/pull/2178))

* Table: Alle størrelser har justert padding. Small-size table bruker nå også standard typografi-størrelse (18px). ([#2178](https://github.com/navikt/aksel/pull/2178))

### @navikt/ds-tokens

- Gray: Gråfarger er nå mindre varme ([#2092](https://github.com/navikt/aksel/pull/2092))

- Action: Selected-varianter av action er nå 'blue' ('deepblue' før) ([#2092](https://github.com/navikt/aksel/pull/2092))

## 4.12.1

### @navikt/ds-react

- Added red border to Combobox in error state ([#2184](https://github.com/navikt/aksel/pull/2184))

### @navikt/ds-css

- Added red border to Combobox in error state ([#2184](https://github.com/navikt/aksel/pull/2184))

## 4.12.0

### @navikt/ds-react

- Combobox: La til støtte for feilmeldinger i Combobox ([#2182](https://github.com/navikt/aksel/pull/2182))

- CopyButton: Har nå prop 'iconPosition' for å høyre/venstre aligne ikon ([#2173](https://github.com/navikt/aksel/pull/2173))

* List: Fikset sentrering, margins ([#2168](https://github.com/navikt/aksel/pull/2168))

* Combobox: Kjører nå 'onChange' + 'onClear' når input blir reset programmatisk ([#2183](https://github.com/navikt/aksel/pull/2183))

* Combobox: Fikset custom-options i singleselect ([#2180](https://github.com/navikt/aksel/pull/2180))

* Combobox: Fjernet unødvendige 'onClear'-calls når man velger verdier ([#2170](https://github.com/navikt/aksel/pull/2170))

* Checkbox: Checkmark er nå SVG-ikon og ikke Base64 ([#2171](https://github.com/navikt/aksel/pull/2171))

* Combobox: Lukker nå nedtrekksmeny hvis man legger til ny option i singleselect ([#2177](https://github.com/navikt/aksel/pull/2177))

### @navikt/ds-css

- CopyButton: Har nå prop 'iconPosition' for å høyre/venstre aligne ikon ([#2173](https://github.com/navikt/aksel/pull/2173))

* List: Fikset sentrering, margins ([#2168](https://github.com/navikt/aksel/pull/2168))

* Checkbox: Checkmark er nå SVG-ikon og ikke Base64 ([#2171](https://github.com/navikt/aksel/pull/2171))

* Alert: Fikset alignment av status-ikon mot tekst ([#2179](https://github.com/navikt/aksel/pull/2179))

## 4.11.2

### @navikt/ds-css

- :lipstick: ToggleGroup: fjern semibold fra selected button ([#2167](https://github.com/navikt/aksel/pull/2167))

## 4.11.1

### @navikt/ds-css

- Border-radius: Fikset hardkodet border-radius i Datepicker, ToggleGroup og Combobox. ([#2159](https://github.com/navikt/aksel/pull/2159))

## 4.11.0

### @navikt/ds-react

- HGrid: Ny komponent 'HGrid' er ute i Beta: [Dokumentasjon](https://aksel.nav.no/komponenter/core/hgrid) ([#1838](https://github.com/navikt/aksel/pull/1838))

* Fixes bug where combobox list could not be closed after clicking a chip ([#2155](https://github.com/navikt/aksel/pull/2155))

* Grid: Markert som deprecated. Bruk nye 'HGrid' ([#2153](https://github.com/navikt/aksel/pull/2153))

### @navikt/ds-css

- HGrid: Ny komponent 'HGrid' er ute i Beta: [Dokumentasjon](https://aksel.nav.no/komponenter/core/hgrid) ([#1838](https://github.com/navikt/aksel/pull/1838))

* List: Fikset alignment av ikoner ([#2149](https://github.com/navikt/aksel/pull/2149))

* Font: La til egen font for semibold italic for bedre skalering cross-browser ([#2150](https://github.com/navikt/aksel/pull/2150))

## 4.10.2

### @navikt/ds-css

- Link: Fikset visited farger og inline SVG-reset ved bruk av tailwind

## 4.10.0

### @navikt/ds-react

- Link: La til 'variant', 'underline' og 'inlineText'-prop ([#2093](https://github.com/navikt/aksel/pull/2093))

### @navikt/ds-css

- Link: La til 'variant', 'underline' og 'inlineText'-prop ([#2093](https://github.com/navikt/aksel/pull/2093))

## 4.9.1

### @navikt/ds-react

- Button: Fikset aria-live bug der knapp alltid ble lest opp av skjermleser ved render ([#2143](https://github.com/navikt/aksel/pull/2143))

- Tweaks to combobox - updated example, small bugfixes, better affordance for selected options and added flag for "isAddedByUser" to onToggleSelected ([#2144](https://github.com/navikt/aksel/pull/2144))

### @navikt/ds-css

- Tweaks to combobox - updated example, small bugfixes, better affordance for selected options and added flag for "isAddedByUser" to onToggleSelected ([#2144](https://github.com/navikt/aksel/pull/2144))

## 4.9.0

### @navikt/ds-react

- Table: ExpandableRow kan nå åpnes med 'expandOnRowClick'-prop ([#2127](https://github.com/navikt/aksel/pull/2127))

### @navikt/ds-css

- Table: ExpandableRow kan nå åpnes med 'expandOnRowClick'-prop ([#2127](https://github.com/navikt/aksel/pull/2127))

## 4.8.0

### @navikt/ds-react

- Nye komponenter `VStack`, `HStack` og `Spacer` for å enklere kunne lage layout med flexbox og spacing-variabler. ([#2040](https://github.com/navikt/aksel/pull/2040))

### @navikt/ds-css

- Nye komponenter `VStack`, `HStack` og `Spacer` for å enklere kunne lage layout med flexbox og spacing-variabler. ([#2040](https://github.com/navikt/aksel/pull/2040))

## 4.7.4

### @navikt/ds-react

- Textfield: La til type 'time' som tilgjengelig option ([#2137](https://github.com/navikt/aksel/pull/2137))

### @navikt/ds-css

- Oppdatert bruk av REM i komponenter for forbedret utrykk ved font-scaling i browser ([#2126](https://github.com/navikt/aksel/pull/2126))

## 4.7.3

### @navikt/ds-react

- Chips: Removable Chips submitter ikke forms ved klikk lengre ([#2124](https://github.com/navikt/aksel/pull/2124))

## 4.7.2

### @navikt/ds-react

- Stepper: Fikset `hotizontal`-bug når step var `completed` ([#2116](https://github.com/navikt/aksel/pull/2116))

### @navikt/ds-css

- Stepper: Fikset `hotizontal`-bug når step var `completed` ([#2116](https://github.com/navikt/aksel/pull/2116))

## 4.7.1

### @navikt/ds-react

- Datepicker: Fikset bug ved bruk dynamisk oppdatering av minDate. Vist `month` vil nå alltid være oppdatert når datepicker åpnes ([#2117](https://github.com/navikt/aksel/pull/2117))

## 4.7.0

### @navikt/ds-react

- Ny komponent Combobox! ([#1868](https://github.com/navikt/aksel/pull/1868))

* Timeline: Har nå egen `axisLabelTemplates`-prop for axixlabel formatering ([#2109](https://github.com/navikt/aksel/pull/2109))

* Combobox post-release tweaks ([#2112](https://github.com/navikt/aksel/pull/2112))

### @navikt/ds-css

- Ny komponent Combobox! ([#1868](https://github.com/navikt/aksel/pull/1868))

## 4.6.1

### @navikt/ds-react

- Skjema: Labels og Legends bruker nå inline-flex når readOnly er satt ([#2089](https://github.com/navikt/aksel/pull/2089))

### @navikt/ds-css

- Skjema: Labels og Legends bruker nå inline-flex når readOnly er satt ([#2089](https://github.com/navikt/aksel/pull/2089))

## 4.6.0

### @navikt/ds-react

- Skjema: De fleste skjemakomponenter støtter nå `readOnly`-state ([#2080](https://github.com/navikt/aksel/pull/2080))

### @navikt/ds-css

- Skjema: De fleste skjemakomponenter har nå styling for `readOnly`-state ([#2080](https://github.com/navikt/aksel/pull/2080))

## 4.5.0

### @navikt/ds-react

- - Alert: La til `closeButton`-prop ([#2079](https://github.com/navikt/aksel/pull/2079))

### @navikt/ds-css

- - Alert: La til `closeButton`-prop ([#2079](https://github.com/navikt/aksel/pull/2079))

* - Button: Fikset outline-bug i tertiary-variant ved `:active`-state ([#2079](https://github.com/navikt/aksel/pull/2079))

## 4.4.2

### @navikt/ds-react

- Textarea: Fikset i18n for counter ([`718b3204d`](https://github.com/navikt/aksel/commit/718b3204d8714c4fc515dcad484424214bdc0c77))

## 4.4.1

### @navikt/ds-css

- :lipstick: Chat: fjernet border, satt avatar svg til 24x24px, byttet om "subtle" og "neutral" ([#2077](https://github.com/navikt/aksel/pull/2077))

## 4.4.0

### @navikt/ds-react

- Fikset klassenavn brukt for popover i Datepicker og Monthpicker ([PR](https://github.com/navikt/aksel/pull/2041))

### @navikt/ds-tailwind

- Shadow-tokens er oppdatert ([PR](https://github.com/navikt/aksel/pull/2041))

- Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600). ([PR](https://github.com/navikt/aksel/pull/2036))

### @navikt/ds-css

- Shadow-tokens er oppdatert: Datepicker har nå ikke border, Modal bruker shadow-xlarge, LinkCard bruker shadow-xsmall ([PR](https://github.com/navikt/aksel/pull/2041))

### @navikt/ds-tokens

- Shadow-tokens er oppdatert til mer tydeligere varianter ([PR](https://github.com/navikt/aksel/pull/2041))

## 4.3.0

### @navikt/ds-react

- Popover og Helptext har nå luft mot siden av skjerm på mindre flater ([PR](https://github.com/navikt/aksel/pull/2069))

### @navikt/ds-css

- Popover/Helptext: Maksbredde på 100vw - 1.5rem. Treffer ikke lengre kanten på skjermen. ([PR](https://github.com/navikt/aksel/pull/2069))

* ExpansionCard: Ved nesting av komponetene fikk man styling fra parent ([PR](https://github.com/navikt/aksel/pull/2067))

## 4.2.0

### @navikt/ds-react

- Oppdatert Chat: `size` og `variant`-prop, optional `avatar`, uu og ui-forbedringer ([PR](https://github.com/navikt/aksel/pull/2048))

### @navikt/ds-css

- Chat: `small`-size, innebygde varianter for farge og oppdatert utseende. ([PR](https://github.com/navikt/aksel/pull/2048))

## 4.1.7

### @navikt/ds-react

- Fikset JSDom-problemer ved testing av Timeline

- La til `wrapperClassname`-prop for HelpText ([PR](https://github.com/navikt/aksel/pull/2056))

## 4.1.6

### @navikt/ds-react

- Timeline-period brakk ved bruk av JSDom i vitest og jest

## 4.1.5

### @navikt/aksel-icons

- Nye ikoner `ChevronRightLast` og `ChevronLeftLast` ([PR](https://github.com/navikt/aksel/pull/2054))

### @navikt/ds-react

- `OverridableComponent` fungerer nå med komponenter som allerede bruker 'as'-prop. ([PR](https://github.com/navikt/aksel/pull/2051))

- Popover: `bubbleEscape`-prop tilbyr muligheten for escape-events til å sendes opp gjennom dom-treet. ([PR](https://github.com/navikt/aksel/pull/2052))

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

### @navikt/aksel-stylelint

- Deprecated klassenavn `navds-chips--icon-left` ([PR](https://github.com/navikt/aksel/pull/2035))

### @navikt/ds-react

- Chips: `neutral` og `action`-varianter for Chips.Toggle. `checkmark`-prop for Chips.Toggle ([PR](https://github.com/navikt/aksel/pull/2035))

- Ny komponent Skeleton! ([PR](https://github.com/navikt/aksel/pull/1821))

* La til JSDoc dokumentasjon for alle komponenter ([PR](https://github.com/navikt/aksel/pull/2034))

* Accordion: La til `indent`-prop ([PR](https://github.com/navikt/aksel/pull/2027))

### @navikt/ds-tailwind

- :tada: Fargetokens for datavisualisering. ([PR](https://github.com/navikt/aksel/pull/2032))

### @navikt/ds-css

- Chips: `neutral` og `action`-varianter av Chips.Toggle. Opt-out mulighet for Checkmark. Oppdatert checkmark-ikon ([PR](https://github.com/navikt/aksel/pull/2035))

- Alle description-felter på fieldsets har nå `text-subtle` som farge. ([PR](https://github.com/navikt/aksel/pull/2036))

### @navikt/ds-tokens

- :tada: Fargetokens for datavisualisering. ([PR](https://github.com/navikt/aksel/pull/2032))

- Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600). ([PR](https://github.com/navikt/aksel/pull/2036))

## 4.0.0

### @navikt/aksel

- Codemod for migrering av Datepicker/Monthpicker ut av Beta. `npx @navikt/aksel codemod v4-date` ([PR](https://github.com/navikt/aksel/pull/2026))

- Codemods for migrering fra `@navikt/ds-react-internal` til `@navikt/ds-react` [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h3b8538e1981d) ([PR](https://github.com/navikt/aksel/pull/2026))

### @navikt/ds-react

- Datepicker og Monthpicker er ute av beta. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h4ef68ae743b0) ([PR](https://github.com/navikt/aksel/pull/2026))

- Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react`. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h3b8538e1981d) ([PR](https://github.com/navikt/aksel/pull/2026))

### @navikt/ds-css

- All styling fra `@navikt/ds-css-internal` er flyttet til `@navikt/ds-css`. ([PR](https://github.com/navikt/aksel/pull/2026))

- classname-prefix er endret fra `navdsi` -> `navds` for flyttede komponenter.

- Fikset cascading-problem mellom dropdown og popover. Dropdown blir ikke lengre påvirket av import-rekkefølge av popover.

- Styling for flyttede komponenter finnes nå på CDN [Guide](https://aksel.nav.no/grunnleggende/kode/css-import)

## 3.4.2

### @navikt/aksel-stylelint

- La til riktige dependencies ([PR](https://github.com/navikt/aksel/pull/2017))

## 3.4.1

### @navikt/aksel-stylelint

- Inkluderer nå dist-mappe i release

## 3.4.0

### @navikt/aksel-stylelint

- Stylelint-pakke for Aksel ([PR](https://github.com/navikt/aksel/pull/1973))

### @navikt/ds-react

- Tag: `moderate`-variant ([PR](https://github.com/navikt/aksel/pull/2010))

### @navikt/ds-css

- Tag: `moderate`-variant ([PR](https://github.com/navikt/aksel/pull/2010))

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

### @navikt/aksel-icons

- Nye ikoner `FileParagraph` og `FilePlus` ([PR](https://github.com/navikt/aksel/pull/1998))

### @navikt/ds-react

- Datepicker: Oppdatert small-variant av Datepicker.Input. UI-oppdatert samtidig. ([PR](https://github.com/navikt/aksel/pull/1993))

- CopyButton: `xsmall`-variant for bruk i tabeller ([PR](https://github.com/navikt/aksel/pull/1994))

### @navikt/ds-css

- Datepicker: Fikset small-variant av datepicker-input. ([PR](https://github.com/navikt/aksel/pull/1993))

- CopyButton: `xsmall`-size for bruk i tabeller ([PR](https://github.com/navikt/aksel/pull/1994))

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

### @navikt/ds-react

- Oppdatert Label og Description spacing for alle skjemakomponenter ([PR](https://github.com/navikt/aksel/pull/1967))

### @navikt/ds-css

- Alle komponenter bruker nå default `:focus-visible` for fokusmarkering. Medfølger også fallback for `:focus` ([PR](https://github.com/navikt/aksel/pull/1966))

* Oppdatert Label og Description spacing for skjemakomponenter ([PR](https://github.com/navikt/aksel/pull/1967))

## 3.0.1

### @navikt/ds-react

- Fjernet `@navikt/ds-icons` fra dependencies

- Accordion: Oppdatert default headingSize brukt i i Accordion.Header

## 3.0.0

### @navikt/ds-react

- Accordion: left-aligner chevron, `neutral`-variant, `size`-prop ([PR](https://github.com/navikt/aksel/pull/1964))

- Bruker nå nå `@navikt/aksel-icons` for interne ikoner ([PR](https://github.com/navikt/aksel/pull/1964))

### @navikt/ds-css

- Accordion: Chevron er left-aligned, deler av styling er refaktorert, `size`-props og `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1964))

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

### @navikt/ds-react

- Fikset typografi-bruk for `Radio` og `Checkbox`.

### @navikt/ds-css

- Button: token for tertiary

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

### @navikt/ds-react

- ExpansioCard: Oppdatert typografibruk ([PR](https://github.com/navikt/aksel/pull/1870))

### @navikt/ds-css

- ExpansioCard: Oppdatert typografi ([PR](https://github.com/navikt/aksel/pull/1870))

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

### @navikt/ds-react

- List: la til støtte for nestede lister ([PR](https://github.com/navikt/aksel/pull/1823))

### @navikt/ds-css

- List: La til støtte for nesting ([PR](https://github.com/navikt/aksel/pull/1823))

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

* Select: `small`-variant er nå 32px (var 34px)

## 2.2.0

### @navikt/ds-react

- ToggleGroup: `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1789))

- Button: `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1789))

### @navikt/ds-css

- ToggleGroup: `Neutral`-variant. ([PR](https://github.com/navikt/aksel/pull/1789))

- Button: `Neutral`-variant.

### @navikt/ds-tokens

- Justeringer av semantiske fargetokens, statusfarger nå mer tydelig ([PR](https://github.com/navikt/aksel/pull/1787))

- Oppdatert neutral-tokens ([PR](https://github.com/navikt/aksel/pull/1789))

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

### @navikt/ds-react

- Datepicker/Monthpicker: år med 2 siffer i input fungerer nå

### @navikt/ds-tokens

- Fikset feil danger-hover token ([PR](https://github.com/navikt/aksel/pull/1665))

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

### @navikt/ds-react

- Fonter blir bruk i all typografi blir nå lastet fra CDN

### @navikt/ds-tailwind

- Alle token er oppdatert til nytt format. ([Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h76f47744d112))

### @navikt/ds-css

- Fontlasting: Fonter lastes nå fra NAV-CDN

- Tokens: Alle komponenter bruker nå semantiske tokens for som standard, med innebygd støtte for komponent-spesifikke tokens.

### @navikt/ds-tokens

- Alle token er oppdatert til nytt format. ([Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h76f47744d112))

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

### @navikt/ds-react

- Tag: `filles`-varianter ([PR](https://github.com/navikt/aksel/pull/1684))

- Ny komponent Chips! ([PR](https://github.com/navikt/aksel/pull/1668))

### @navikt/ds-css

- Tag: `filled`-varianter ([PR](https://github.com/navikt/aksel/pull/1684))

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

### @navikt/ds-css

- Fikset bruk av `:watch` for diverse parsere (less, parcel)

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
