# @navikt/ds-react

## 6.12.0

### Minor Changes

- Primitives: Added support for padding, paddingInline, paddingBlock, margin, marginInline, marginBlock, width, minWidth, maxWidth, height, minHeight, maxHeight, position, inset, top, right, left, bottom, overflow, overflowX, overflowY, flexBasis, flexGrow, flexShrink to Box, HGrid and Stack. ([#3003](https://github.com/navikt/aksel/pull/3003))

### Patch Changes

- ToggleGroup: Selecting already selected value now avoids sending extra event ([#3012](https://github.com/navikt/aksel/pull/3012))

- Alert: Fix alignment, add prop for toggling content max-width, and adjust title on close icon. ([#3007](https://github.com/navikt/aksel/pull/3007))

- Updated dependencies [[`ff8072e35`](https://github.com/navikt/aksel/commit/ff8072e352f4f84f802a6427e1692ff223af722c), [`f1d8e9c4d`](https://github.com/navikt/aksel/commit/f1d8e9c4d357226893da4fdc3feb8063d7d830bb)]:
  - @navikt/aksel-icons@6.12.0
  - @navikt/ds-tokens@6.12.0

## 6.11.0

### Minor Changes

- FileUpload: Added description-prop for Item. ([#2975](https://github.com/navikt/aksel/pull/2975))

- Pagination: Added prop for hidden heading. ([#2976](https://github.com/navikt/aksel/pull/2976))

- ToggleGroup: Added props `icon` and `label` as a replacement for `children`. Children is marked as deprecated and will be removed in a future major-version. ([#2929](https://github.com/navikt/aksel/pull/2929))

### Patch Changes

- List: Changed List.Item to BodyLong, changed Item spacing from 1rem to 0.5rem. ([#2979](https://github.com/navikt/aksel/pull/2979))

- Page: Removed surface-subtle from background-prop ([#2987](https://github.com/navikt/aksel/pull/2987))

- Updated dependencies []:
  - @navikt/ds-tokens@6.11.0
  - @navikt/aksel-icons@6.11.0

## 6.10.1

### Patch Changes

- Updated dependencies [[`2cd6b1a39`](https://github.com/navikt/aksel/commit/2cd6b1a3915388535523989c2e998081bc68206c)]:
  - @navikt/aksel-icons@6.10.1
  - @navikt/ds-tokens@6.10.1

## 6.10.0

### Minor Changes

- ✨ Modal: add small version ([#2909](https://github.com/navikt/aksel/pull/2909))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@6.10.0
  - @navikt/aksel-icons@6.10.0

## 6.9.0

### Patch Changes

- :bug: Modal: Fix issue where polyfill-classname was not applied when using SSR (Next.js) ([#2954](https://github.com/navikt/aksel/pull/2954))

- Combobox: Improved performance when parsing 1k or more options. ([#2937](https://github.com/navikt/aksel/pull/2937))

- Stepper: Removed unsafe_index prop. ([#2926](https://github.com/navikt/aksel/pull/2926))

- Added options row-reverse and column-reverse to direction prop on Stack. Should only be used with caution. ([#2876](https://github.com/navikt/aksel/pull/2876))

- Updated dependencies [[`1f3df8ad9`](https://github.com/navikt/aksel/commit/1f3df8ad9361bb18c51cdfcef441900bd73f1c1a)]:
  - @navikt/aksel-icons@6.9.0
  - @navikt/ds-tokens@6.9.0

## 6.8.0

### Minor Changes

- :sparkles: Ny komponent: FormProgress ([#2855](https://github.com/navikt/aksel/pull/2855))

### Patch Changes

- Stepper.Step: Set aria-current to "step" instead of true ([#2920](https://github.com/navikt/aksel/pull/2920))

- Updated dependencies []:
  - @navikt/ds-tokens@6.8.0
  - @navikt/aksel-icons@6.8.0

## 6.7.1

### Patch Changes

- Progressbar: Tweak API, examples, stories and css ([#2892](https://github.com/navikt/aksel/pull/2892))

- Combobox: Remove 'Ingen søketreff' when custom options allowed ([#2895](https://github.com/navikt/aksel/pull/2895))

- Datepicker, MonthPicker: Rekkefølgen på årstall i Select er reversert slik at siste år er øverst. Dette er endret for å være bedre tilpasset ekspertsystemer der de mest relevante årene ble vist lengst unna musepeker ved klikk. ([#2882](https://github.com/navikt/aksel/pull/2882))

- Updated dependencies []:
  - @navikt/ds-tokens@6.7.1
  - @navikt/aksel-icons@6.7.1

## 6.7.0

### Minor Changes

- :sparkles: Ny komponent: ProgressBar ([#2845](https://github.com/navikt/aksel/pull/2845))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@6.7.0
  - @navikt/aksel-icons@6.7.0

## 6.6.1

### Patch Changes

- Spacer: Er nå `span` (tidligere `div`). ([#2874](https://github.com/navikt/aksel/pull/2874))

- Updated dependencies []:
  - @navikt/ds-tokens@6.6.1
  - @navikt/aksel-icons@6.6.1

## 6.6.0

### Minor Changes

- :sparkles: Ny komponent FormSummary ([#2802](https://github.com/navikt/aksel/pull/2802))

### Patch Changes

- Combobox: Prevents "Enter" while Combobox is focused from submitting form. ([#2861](https://github.com/navikt/aksel/pull/2861))

- Updated dependencies []:
  - @navikt/ds-tokens@6.6.0
  - @navikt/aksel-icons@6.6.0

## 6.5.0

### Minor Changes

- Tabs: Ny prop `lazy` som rendrer innhold i TabPanel selv når panel er skjult (har fortsatt display:none) ([#2621](https://github.com/navikt/aksel/pull/2621))

- ToggleGroup: Erstattet bruk av dependency `@radix-ui/react-toggle-group` med egen implementasjon. ([#2620](https://github.com/navikt/aksel/pull/2620))

- Tabs: La til ny prop `fill` som lar Tabs.Tab-elementer strekke seg over tilgjengelig bredde. ([#2621](https://github.com/navikt/aksel/pull/2621))

- Tabs: Erstattet bruk av dependency `@radix-ui/react-tabs` med egen implementasjon. ([#2621](https://github.com/navikt/aksel/pull/2621))

### Patch Changes

- DatePicker/MonthPicker: Valgte datoer får nå `aria-pressed` for å bedre indikere valg for skjermleser. ([#2838](https://github.com/navikt/aksel/pull/2838))

- DatePicker/MonthPicker: `required`-prop stoppet ikke de-select av allerede valgt dato. ([#2838](https://github.com/navikt/aksel/pull/2838))

- ToggleGroup: La til ny prop `fill` som strekker ToggleGroup til å ta opp all tilgjengelig bredde. ([#2620](https://github.com/navikt/aksel/pull/2620))

- Updated dependencies []:
  - @navikt/ds-tokens@6.5.0
  - @navikt/aksel-icons@6.5.0

## 6.4.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@6.4.1
  - @navikt/aksel-icons@6.4.1

## 6.4.0

### Minor Changes

- FileUpload.Item: :boom: Endret API og støtte for å sette ID på knappen ([#2824](https://github.com/navikt/aksel/pull/2824))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@6.4.0
  - @navikt/aksel-icons@6.4.0

## 6.3.6

### Patch Changes

- DatePicker: Fjernet role gridcell fra dato-knapper. ([#2826](https://github.com/navikt/aksel/pull/2826))

- Updated dependencies []:
  - @navikt/ds-tokens@6.3.6
  - @navikt/aksel-icons@6.3.6

## 6.3.5

### Patch Changes

- Modal: Fjern tomt element ([#2819](https://github.com/navikt/aksel/pull/2819))

- Updated dependencies []:
  - @navikt/ds-tokens@6.3.5
  - @navikt/aksel-icons@6.3.5

## 6.3.4

### Patch Changes

- Switch: Fikset edgecase der checked Switch var visuelt unchecked ([#2810](https://github.com/navikt/aksel/pull/2810))

- FileUpload.Dropzone: id prop settes på button ([#2817](https://github.com/navikt/aksel/pull/2817))

- Updated dependencies []:
  - @navikt/ds-tokens@6.3.4
  - @navikt/aksel-icons@6.3.4

## 6.3.3

### Patch Changes

- FileUpload.Dropzone: Fiks feil med duplisert id ([#2805](https://github.com/navikt/aksel/pull/2805))

- useDatePicker: `isInvalid`-key i onValidate var hadde flipper boolean i noen tilfeller ([#2809](https://github.com/navikt/aksel/pull/2809))

- Updated dependencies []:
  - @navikt/ds-tokens@6.3.3
  - @navikt/aksel-icons@6.3.3

## 6.3.2

### Patch Changes

- FileUpload: Fiks feil ved import av json ([#2803](https://github.com/navikt/aksel/pull/2803))

- Updated dependencies []:
  - @navikt/ds-tokens@6.3.2
  - @navikt/aksel-icons@6.3.2

## 6.3.1

### Patch Changes

- FileUpload: Disabled dropzone stopper opplasting ([#2798](https://github.com/navikt/aksel/pull/2798))

- Updated dependencies []:
  - @navikt/ds-tokens@6.3.1
  - @navikt/aksel-icons@6.3.1

## 6.3.0

### Minor Changes

- Allow Combobox options as objects to support separate display text and value ([#2716](https://github.com/navikt/aksel/pull/2716))

- FileUpload: Ny komponent `FileUpload` for å håndtere opplasting av filer, Dropzone og fil-visning ([#2504](https://github.com/navikt/aksel/pull/2504))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@6.3.0
  - @navikt/aksel-icons@6.3.0

## 6.2.0

### Patch Changes

- Select: Fjern 'multiple' fra SelectProps ([#2782](https://github.com/navikt/aksel/pull/2782))

- Updated dependencies [[`331b4c4c0`](https://github.com/navikt/aksel/commit/331b4c4c00c323ad7a212bcd45889d2b80c09dee), [`dc5ea3b84`](https://github.com/navikt/aksel/commit/dc5ea3b8420a02690bc88dbbbb97eefe4ee7564d)]:
  - @navikt/aksel-icons@6.2.0
  - @navikt/ds-tokens@6.2.0

## 6.1.1

### Patch Changes

- Modal: Fikser uønsket lukking ved klikk-og-dra mellom backdrop og modal (f.eks. ved markering av tekst) dersom `closeOnBackdropClick` er `true`. ([#2752](https://github.com/navikt/aksel/pull/2752))

- Modal: Endre title på lukkeknapp til bare 'Lukk' ([#2688](https://github.com/navikt/aksel/pull/2688))

- Updated dependencies []:
  - @navikt/ds-tokens@6.1.1
  - @navikt/aksel-icons@6.1.1

## 6.1.0

### Minor Changes

- Komponenter støtter nå lokal import `@navikt/ds-react/Button`, [Dokumentasjon](https://aksel.nav.no/grunnleggende/kode/nextjs). ([#2745](https://github.com/navikt/aksel/pull/2745))

### Patch Changes

- Modal: Bedre feilmeldinger ved feil bruk av props ([#2744](https://github.com/navikt/aksel/pull/2744))

- Modal: Ikke opphev scroll lock ved lukking av nesta modal (DatePicker) ([#2743](https://github.com/navikt/aksel/pull/2743))

- Updated dependencies []:
  - @navikt/ds-tokens@6.1.0
  - @navikt/aksel-icons@6.1.0

## 6.0.0

### Major Changes

- Chat: Fjernet deprecated props `backgroundColor` og `avatarBgColor`. Bruk prop `variant` som erstatning. ([#2623](https://github.com/navikt/aksel/pull/2623))

- Search: Fjern 'type' fra SearchProps ([#2623](https://github.com/navikt/aksel/pull/2623))

- Tokens: La til nytt brekkpunkt `2xl` for `1440px`. Alle primitives er oppdatert for å reflektere oppdateringen. Brukere av Tailwind vil måtte sjekke at overskriving av `screen: "2xl"` ikke brekker app. ([#2623](https://github.com/navikt/aksel/pull/2623))

- ESM: ds-react og aksel-icons støtter nå native ESM 🎉 ([#2623](https://github.com/navikt/aksel/pull/2623))

- OverridableComponent: Fikset feil som tillot vilkårlige props ([#2623](https://github.com/navikt/aksel/pull/2623))

- Grid, ContentContainer: Komponenter er fjernet fra systemet. [Se migreringsguide](https://aksel.nav.no/grunnleggende/kode/migrering#dd2cfa9fb1d1). ([#2623](https://github.com/navikt/aksel/pull/2623))

- Table: SortState.direction har nå `none` tilgjengelig: `"ascending" | "descending" | "none"` ([#2623](https://github.com/navikt/aksel/pull/2623))

- Textarea: Fjernet div med klassen navds-textarea\_\_wrapper ([#2623](https://github.com/navikt/aksel/pull/2623))

- Modal: Strengere prop-typer ([#2623](https://github.com/navikt/aksel/pull/2623))

### Minor Changes

- SSR: ds-react og aksel-icons støtter nå `use client` og kan brukes i nextjs app-router uten lokal re-eksportering. ([#2623](https://github.com/navikt/aksel/pull/2623))

### Patch Changes

- Updated dependencies [[`636c1ad49`](https://github.com/navikt/aksel/commit/636c1ad49b8afde54b0a1105fecdc6d47f333522), [`636c1ad49`](https://github.com/navikt/aksel/commit/636c1ad49b8afde54b0a1105fecdc6d47f333522), [`636c1ad49`](https://github.com/navikt/aksel/commit/636c1ad49b8afde54b0a1105fecdc6d47f333522), [`636c1ad49`](https://github.com/navikt/aksel/commit/636c1ad49b8afde54b0a1105fecdc6d47f333522)]:
  - @navikt/ds-tokens@6.0.0
  - @navikt/aksel-icons@6.0.0

## 5.18.3

### Patch Changes

- Tooltip: Fikset regresjon der bruk av Tooltip ga hydration-error i nextjs ([#2738](https://github.com/navikt/aksel/pull/2738))

- Updated dependencies []:
  - @navikt/ds-tokens@5.18.3
  - @navikt/aksel-icons@5.18.3

## 5.18.2

### Patch Changes

- Modal: Oppdatert intern håntering av context i komponent ([#2714](https://github.com/navikt/aksel/pull/2714))

- Updated dependencies []:
  - @navikt/ds-tokens@5.18.2
  - @navikt/aksel-icons@5.18.2

## 5.18.1

### Patch Changes

- Panel: Komponent er nå markert som deprecated. Bruk `Box` i fremtiden. ([#2712](https://github.com/navikt/aksel/pull/2712))

- Updated dependencies []:
  - @navikt/ds-tokens@5.18.1
  - @navikt/aksel-icons@5.18.1

## 5.18.0

### Minor Changes

- Portal: Ny komponent `Portal` som lar deg enkelt bruke `createPortal`, også på serversiden ([#2697](https://github.com/navikt/aksel/pull/2697))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@5.18.0
  - @navikt/aksel-icons@5.18.0

## 5.17.5

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@5.17.5
  - @navikt/aksel-icons@5.17.5

## 5.17.4

### Patch Changes

- Bleed: `marginInline='full'` og `reflectivePadding` kan nå brukes sammen. ([#2695](https://github.com/navikt/aksel/pull/2695))

- Updated dependencies []:
  - @navikt/ds-tokens@5.17.4
  - @navikt/aksel-icons@5.17.4

## 5.17.3

### Patch Changes

- :bug: Textarea: maxLength virker nå selv om man sender inn onChange uten å sende inn value ([#2690](https://github.com/navikt/aksel/pull/2690))

- Updated dependencies []:
  - @navikt/ds-tokens@5.17.3
  - @navikt/aksel-icons@5.17.3

## 5.17.2

### Patch Changes

- :bug: Textarea: Sett riktig høyde når brukt i Modal + StrictMode ([#2679](https://github.com/navikt/aksel/pull/2679))

- DatePicker: Knapper fikk ikke riktig aria-label ([#2678](https://github.com/navikt/aksel/pull/2678))

- Textarea: debounce ResizeObserver for å unngå feilmelding ([#2685](https://github.com/navikt/aksel/pull/2685))

- Updated dependencies []:
  - @navikt/ds-tokens@5.17.2
  - @navikt/aksel-icons@5.17.2

## 5.17.1

### Patch Changes

- Eksponer variabelen "role" i Search-komponenten ([#2667](https://github.com/navikt/aksel/pull/2667))

- Updated dependencies []:
  - @navikt/ds-tokens@5.17.1
  - @navikt/aksel-icons@5.17.1

## 5.17.0

### Minor Changes

- Høykontrast: Komponenter støtter nå standard høykontrast-modus på Windows ([#2680](https://github.com/navikt/aksel/pull/2680))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@5.17.0
  - @navikt/aksel-icons@5.17.0

## 5.16.0

### Minor Changes

- :sparkles: Combobox: Mulighet for å begrense hvor mange valg bruker kan ta ([#2260](https://github.com/navikt/aksel/pull/2260))

### Patch Changes

- Updated dependencies [[`eff9b5ecc`](https://github.com/navikt/aksel/commit/eff9b5ecce2817e3823ce61be7635359eec98451)]:
  - @navikt/aksel-icons@5.16.0
  - @navikt/ds-tokens@5.16.0

## 5.15.1

### Patch Changes

- HelpText: HelpText-state ble ikke riktig oppdatert ved klikk ([#2643](https://github.com/navikt/aksel/pull/2643))

- Updated dependencies []:
  - @navikt/ds-tokens@5.15.1
  - @navikt/aksel-icons@5.15.1

## 5.15.0

### Patch Changes

- Updated dependencies [[`9c5288c40`](https://github.com/navikt/aksel/commit/9c5288c40559499fa4940e491890bc5dcabfe5da)]:
  - @navikt/aksel-icons@5.15.0
  - @navikt/ds-tokens@5.15.0

## 5.14.0

### Minor Changes

- Intern state: Komponenter respekterer nå `e.preventDefault()` bedre når event overskrives internt i komponent. ([#2610](https://github.com/navikt/aksel/pull/2610))

- Tag: Har nå innebygd støtte for ikoner ([#2611](https://github.com/navikt/aksel/pull/2611))

- Table: Table.DataCell og Table.HeaderCell har nå `textSize`-prop for å justere font-size mellom 18px og 16px. ([#2613](https://github.com/navikt/aksel/pull/2613))

### Patch Changes

- Internt API: Oppdatert intern import/export av hooks og typer fra utils ([#2618](https://github.com/navikt/aksel/pull/2618))

- Intern-API: Erstattet `mergeRefs` i `useMemo` med lokal `useMergeRefs`-hook ([#2609](https://github.com/navikt/aksel/pull/2609))

- Updated dependencies []:
  - @navikt/ds-tokens@5.14.0
  - @navikt/aksel-icons@5.14.0

## 5.13.0

### Minor Changes

- Accordion.Item, Dropdown, ReadMore og Tooltip: Har en ny prop `onOpenChange?: (open: boolean) => void;` som forteller nå-state når `open`-state endrer seg. Dette vil være nyttig hvis man ikke bruker controlled-state, men fortsatt ønsker å vite om komponenten er `open` eller ikke (f.eks logging). ([#2585](https://github.com/navikt/aksel/pull/2585))

- Controlled-state: Accordion.Item, Dropdown, ReadMore, Table.ExpandableRow og Tooltip har oppdatert intern håndtering av controlled state. Endringen skal ikke påvirke dagens API. ([#2585](https://github.com/navikt/aksel/pull/2585))

### Patch Changes

- Page: Lagt til ny bakgrunnsfarge `surface-subtle` og ny maksbredde på Page.Block `text` ([#2572](https://github.com/navikt/aksel/pull/2572))

- Updated dependencies [[`145ce2e5f`](https://github.com/navikt/aksel/commit/145ce2e5f71d397acfa3306ed7b0e4253b9e02f6)]:
  - @navikt/ds-tokens@5.13.0
  - @navikt/aksel-icons@5.13.0

## 5.12.5

### Patch Changes

- MonthPicker: MonthCaption satt forrige/neste-knapper til `disabled` når de skulle være `enabled`. ([#2601](https://github.com/navikt/aksel/pull/2601))

- Updated dependencies []:
  - @navikt/ds-tokens@5.12.5
  - @navikt/aksel-icons@5.12.5

## 5.12.4

### Patch Changes

- Accessibility improvements to Radio and Checkbox component, so each label is only announced once with screen readers ([#2562](https://github.com/navikt/aksel/pull/2562))

- Updated dependencies []:
  - @navikt/ds-tokens@5.12.4
  - @navikt/aksel-icons@5.12.4

## 5.12.3

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@5.12.3
  - @navikt/aksel-icons@5.12.3

## 5.12.2

### Patch Changes

- :memo: Modal: Oppdatert JSDoc ([#2567](https://github.com/navikt/aksel/pull/2567))

- Updated dependencies []:
  - @navikt/ds-tokens@5.12.2
  - @navikt/aksel-icons@5.12.2

## 5.12.1

### Patch Changes

- Checkbox: Checkmark tilpasses bedre fontsize ([#2563](https://github.com/navikt/aksel/pull/2563))

- Datepicker: Lukk-knapp i modal har nå type button for å unngå form-submition ([#2568](https://github.com/navikt/aksel/pull/2568))

- Updated dependencies []:
  - @navikt/ds-tokens@5.12.1
  - @navikt/aksel-icons@5.12.1

## 5.12.0

### Patch Changes

- Updated dependencies [[`7ff93e389`](https://github.com/navikt/aksel/commit/7ff93e389f7a399c5ceee463c1f463eb2971104b)]:
  - @navikt/aksel-icons@5.12.0
  - @navikt/ds-tokens@5.12.0

## 5.11.5

### Patch Changes

- Chips: La til token for checkmark-circle ([#2558](https://github.com/navikt/aksel/pull/2558))

- Updated dependencies []:
  - @navikt/ds-tokens@5.11.5
  - @navikt/aksel-icons@5.11.5

## 5.11.4

### Patch Changes

- Fix issue where clicking in Combobox.FilteredOptions after scrolling selected the wrong element ([#2536](https://github.com/navikt/aksel/pull/2536))

- Updated dependencies []:
  - @navikt/ds-tokens@5.11.4
  - @navikt/aksel-icons@5.11.4

## 5.11.3

### Patch Changes

- :bug: Textarea: Skru av autosize ved manuell resize ([#2518](https://github.com/navikt/aksel/pull/2518))

- :bug: Popover: Ikke lukk ved klikk inni når parent er fokuserbar ([#2521](https://github.com/navikt/aksel/pull/2521))

- Page: La til `md`-bredde (768px) ([#2510](https://github.com/navikt/aksel/pull/2510))

- Updated dependencies []:
  - @navikt/ds-tokens@5.11.3
  - @navikt/aksel-icons@5.11.3

## 5.11.2

### Patch Changes

- ⬆️ upgrade date-fns version & make it minor-version agnostic ([#2514](https://github.com/navikt/aksel/pull/2514))

- Updated dependencies []:
  - @navikt/ds-tokens@5.11.2
  - @navikt/aksel-icons@5.11.2

## 5.11.1

### Patch Changes

- Switch: Byttet success-farger med action npr checked ([#2511](https://github.com/navikt/aksel/pull/2511))

- Updated dependencies []:
  - @navikt/ds-tokens@5.11.1
  - @navikt/aksel-icons@5.11.1

## 5.11.0

### Minor Changes

- :sparkles: Textarea: Mulighet for å sette resize-retning ([#2494](https://github.com/navikt/aksel/pull/2494))

- :sparkles: Textarea: Eksperimentell støtte for automatisk scrollbar ([#2457](https://github.com/navikt/aksel/pull/2457))

### Patch Changes

- :wheelchair: Textarea: Forsinkelse ved live-opplesning av gjenstående tegn ([#2502](https://github.com/navikt/aksel/pull/2502))

- Updated dependencies [[`bc259f5b3`](https://github.com/navikt/aksel/commit/bc259f5b306319c0e08397d5300596fc1d43353e)]:
  - @navikt/aksel-icons@5.11.0
  - @navikt/ds-tokens@5.11.0

## 5.10.4

### Patch Changes

- Gjør lukknapp i Alert til type button ([#2497](https://github.com/navikt/aksel/pull/2497))

- Updated dependencies []:
  - @navikt/ds-tokens@5.10.4
  - @navikt/aksel-icons@5.10.4

## 5.10.3

### Patch Changes

- :wheelchair: Textarea: Byttet fra `aria-live` til `role=status` på telleren for bedre semantikk ([#2483](https://github.com/navikt/aksel/pull/2483))

- :bug: Textarea: Teller flyttet ut av tekstfeltet for å unngå overlapp og misforståelser ([#2483](https://github.com/navikt/aksel/pull/2483))

- ErrorSummary: Gjør det mulig å rendre ErrorSummary.Item conditionally ([#2484](https://github.com/navikt/aksel/pull/2484))

- Updated dependencies []:
  - @navikt/ds-tokens@5.10.3
  - @navikt/aksel-icons@5.10.3

## 5.10.2

### Patch Changes

- OverridableComponent: Fungerer nå bedre ved bruk av typeof <komponent> ([#2474](https://github.com/navikt/aksel/pull/2474))

- Updated dependencies []:
  - @navikt/ds-tokens@5.10.2
  - @navikt/aksel-icons@5.10.2

## 5.10.1

### Patch Changes

- Table: Håndterer nå sjekk for interaktive elementer i ExpandableRow bedre ([#2461](https://github.com/navikt/aksel/pull/2461))

- Updated dependencies []:
  - @navikt/ds-tokens@5.10.1
  - @navikt/aksel-icons@5.10.1

## 5.10.0

### Minor Changes

- Primitives: Ny komponent `Page` og `Page.Block` ([#2456](https://github.com/navikt/aksel/pull/2456))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@5.10.0
  - @navikt/aksel-icons@5.10.0

## 5.9.2

### Patch Changes

- :bug: Datepicker lukker ikke lenger modalen den er i ([#2451](https://github.com/navikt/aksel/pull/2451))

- Updated dependencies []:
  - @navikt/ds-tokens@5.9.2
  - @navikt/aksel-icons@5.9.2

## 5.9.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@5.9.1
  - @navikt/aksel-icons@5.9.1

## 5.9.0

### Minor Changes

- Datepicker/Monthpicker: Hvis man bruker komponentene i Modal vil Popover bli erstattet med Modal uansett om man er på desktop eller mobil. ([#2419](https://github.com/navikt/aksel/pull/2419))

- Datepicker/Monthpicker/Popover: Fjernet `bubbleEscape`-prop. ([#2419](https://github.com/navikt/aksel/pull/2419))

- useDatepicker/useMonthPicker/useRangedpicker: Fjernet `openOnFocus`-prop, kan nå bare åpnes ved klikk på date-knapp i input. ([#2419](https://github.com/navikt/aksel/pull/2419))

- Datepicker/Monthpicker: Bytter nå automatisk til Modalvisning på mobil. ([#2419](https://github.com/navikt/aksel/pull/2419))

### Patch Changes

- Added useVirtualFocus hook - used in Combobox for now ([#2394](https://github.com/navikt/aksel/pull/2394))

- Updated dependencies []:
  - @navikt/ds-tokens@5.9.0
  - @navikt/aksel-icons@5.9.0

## 5.8.0

### Minor Changes

- :sparkles: Modal: Støtte for å lukke ved klikk utenfor ([#2386](https://github.com/navikt/aksel/pull/2386))

### Patch Changes

- Autocomplete in combobox will not change formatting of the letters while being typed, but will use the casing of the autocompleted word when selecting the option. ([#2207](https://github.com/navikt/aksel/pull/2207))

- Accordion: Fikset dom-validering ved bruk av `div` i `button`. ([#2426](https://github.com/navikt/aksel/pull/2426))

- :bug: Modal: Bedre støtte for Tooltip i Modal ([#2429](https://github.com/navikt/aksel/pull/2429))

- Updated dependencies []:
  - @navikt/ds-tokens@5.8.0
  - @navikt/aksel-icons@5.8.0

## 5.7.6

### Patch Changes

- :lipstick: Chips.Toggle: Ikon i uvalgt tilstand ([#2395](https://github.com/navikt/aksel/pull/2395))

- Updated dependencies []:
  - @navikt/ds-tokens@5.7.6
  - @navikt/aksel-icons@5.7.6

## 5.7.5

### Patch Changes

- Loader: Har nå riktig `ref`-type. ([#2391](https://github.com/navikt/aksel/pull/2391))

- Updated dependencies []:
  - @navikt/ds-tokens@5.7.5
  - @navikt/aksel-icons@5.7.5

## 5.7.4

### Patch Changes

- Datepicker: Fungerer nå bedre i Modal ([#2400](https://github.com/navikt/aksel/pull/2400))

- Updated dependencies []:
  - @navikt/ds-tokens@5.7.4
  - @navikt/aksel-icons@5.7.4

## 5.7.3

### Patch Changes

- Forms: Fikset bug der size='small' ikke oppdaterte typografi. ([#2372](https://github.com/navikt/aksel/pull/2372))

- HelpText: Knapp er visuelt mindre. Klikkflate er fortsatt 24px ([#2376](https://github.com/navikt/aksel/pull/2376))

- Updated dependencies [[`3d3e90760`](https://github.com/navikt/aksel/commit/3d3e9076088c5e72ed89fb97109b75dcf6e09d96)]:
  - @navikt/ds-tokens@5.7.3
  - @navikt/aksel-icons@5.7.3

## 5.7.2

### Patch Changes

- MonthPicker: Fikset tastaturnavigasjon ([#2374](https://github.com/navikt/aksel/pull/2374))

- Updated dependencies []:
  - @navikt/ds-tokens@5.7.2
  - @navikt/aksel-icons@5.7.2

## 5.7.1

### Patch Changes

- Radio: readonly håndterer nå hover-state bedre ([#2363](https://github.com/navikt/aksel/pull/2363))

- Updated dependencies []:
  - @navikt/ds-tokens@5.7.1
  - @navikt/aksel-icons@5.7.1

## 5.7.0

### Patch Changes

- Chores: Ryddet opp i sirkulære depdendencies ([#2366](https://github.com/navikt/aksel/pull/2366))

- :lipstick: CopyButton: Justert padding, gap og animasjon ([#2355](https://github.com/navikt/aksel/pull/2355))

- Updated dependencies [[`99fca2a56`](https://github.com/navikt/aksel/commit/99fca2a566e7464506f5d64ca1c8f11834cb63ef)]:
  - @navikt/aksel-icons@5.7.0
  - @navikt/ds-tokens@5.7.0

## 5.6.5

### Patch Changes

- Datepicker: Popover legger seg nå ikke ovenfor input ([#2349](https://github.com/navikt/aksel/pull/2349))

- Updated dependencies []:
  - @navikt/ds-tokens@5.6.5
  - @navikt/aksel-icons@5.6.5

## 5.6.4

### Patch Changes

- :lipstick: DatePicker: Litt smalere inputfelt ([#2354](https://github.com/navikt/aksel/pull/2354))

- Updated dependencies []:
  - @navikt/ds-tokens@5.6.4
  - @navikt/aksel-icons@5.6.4

## 5.6.3

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@5.6.3
  - @navikt/aksel-icons@5.6.3

## 5.6.2

### Patch Changes

- Updated dependencies [[`0f3066d87`](https://github.com/navikt/aksel/commit/0f3066d87aa4adc3ac1b744dd6cab15b5943efd6)]:
  - @navikt/ds-tokens@5.6.2
  - @navikt/aksel-icons@5.6.2

## 5.6.1

### Patch Changes

- Added aria-hidden to AccordionContent when closed, to fix issue where Radio labels were omitted when opening/closing AccordionItems ([#2338](https://github.com/navikt/aksel/pull/2338))

- Updated dependencies []:
  - @navikt/ds-tokens@5.6.1
  - @navikt/aksel-icons@5.6.1

## 5.6.0

### Minor Changes

- :recycle: Refaktorering og småfikser ([#2265](https://github.com/navikt/aksel/pull/2265))

  - Refaktorering som følge av nye ESLint-regler
  - AccordionItem/ToggleGroup: Støtte for 'id'-prop
  - MonthPicker: Mer presis type for 'onMonthSelect' prop

- Datepicker: Tilbyr nå muligheten til å bruke `onWeekNumberClick`. ([#2311](https://github.com/navikt/aksel/pull/2311))

- Primitives: ny komponent Bleed ([#2278](https://github.com/navikt/aksel/pull/2278))

### Patch Changes

- Accordion: Console.error når Accordion blir brukt feil. ([#2310](https://github.com/navikt/aksel/pull/2310))

- Stack: Kan nå endre direction, justify og align ved brekkpunkt. `Stack` er også nå en egen komponent sammen med `HStack` og `VStack`. ([#2286](https://github.com/navikt/aksel/pull/2286))

- Primitives: Show/Hide støtter nå `asChild`-api ([#2312](https://github.com/navikt/aksel/pull/2312))

- Remove tabIndex="-1" on Popover to fix VoiceOver navigation issue inside Popover ([#2303](https://github.com/navikt/aksel/pull/2303))

- Updated dependencies [[`540b8c711`](https://github.com/navikt/aksel/commit/540b8c711dd17ac0bf004f4a35d807d1d9416316), [`d426a9471`](https://github.com/navikt/aksel/commit/d426a9471b09fd16355fc70b0c05e5bd69cdef00), [`522d136a8`](https://github.com/navikt/aksel/commit/522d136a844423bf4097bd30ae44a534484da088)]:
  - @navikt/aksel-icons@5.6.0
  - @navikt/ds-tokens@5.6.0

## 5.5.0

### Minor Changes

- Box: Ny primitive, erstatter dagens `Panel` ([#2195](https://github.com/navikt/aksel/pull/2195))

### Patch Changes

- Skeleton: Width fungerer nå med inline-variant av Skeleton ([#2273](https://github.com/navikt/aksel/pull/2273))

- Updated dependencies [[`83c9194a4`](https://github.com/navikt/aksel/commit/83c9194a480fd3d184f673815522f230ed5d77bb)]:
  - @navikt/ds-tokens@5.5.0
  - @navikt/aksel-icons@5.5.0

## 5.4.1

### Patch Changes

- MonthPicker: Fikset kalkulering av fromDate/toDate ([#2269](https://github.com/navikt/aksel/pull/2269))

- Updated dependencies []:
  - @navikt/aksel-icons@5.4.1

## 5.4.0

### Minor Changes

- Primitives: Nye komponenter `Show` og `Hide` er lagt til. ([#2222](https://github.com/navikt/aksel/pull/2222))

### Patch Changes

- Search: Kjører nå bare preventDefault ved Escape når `input` inneholder tekst ([#2245](https://github.com/navikt/aksel/pull/2245))

- Updated dependencies []:
  - @navikt/aksel-icons@5.4.0

## 5.3.5

### Patch Changes

- :bug: Popover: sjekk at det er et HTML-element som får fokus ([#2258](https://github.com/navikt/aksel/pull/2258))

- Updated dependencies []:
  - @navikt/aksel-icons@5.3.5

## 5.3.4

### Patch Changes

- Updated dependencies [[`27dacfdbe`](https://github.com/navikt/aksel/commit/27dacfdbe96a861b19c20d4494485c863d0ee8d9)]:
  - @navikt/aksel-icons@5.3.4

## 5.3.3

### Patch Changes

- HGrid: Har nå `align`-prop for bedre kontroll over child-elementer ([#2242](https://github.com/navikt/aksel/pull/2242))

- Updated dependencies []:
  - @navikt/aksel-icons@5.3.3

## 5.3.2

### Patch Changes

- Skeleton: Lagt til as-prop for inline brk av Skeleton med span ([#2239](https://github.com/navikt/aksel/pull/2239))

- Updated dependencies []:
  - @navikt/aksel-icons@5.3.2

## 5.3.1

### Patch Changes

- Fix bug in monthpicker, only compare year and month for equality on date object ([#2231](https://github.com/navikt/aksel/pull/2231))

- :lipstick: GuidePanel: justert design ([#2227](https://github.com/navikt/aksel/pull/2227))

- :bug: DatePicker: Riktig skriftstørrelse på small input ([#2232](https://github.com/navikt/aksel/pull/2232))

- Updated dependencies []:
  - @navikt/aksel-icons@5.3.1

## 5.3.0

### Minor Changes

- Heading: Oppdatert med props `textColor`, `align`, `visuallyHidden`. ([#2211](https://github.com/navikt/aksel/pull/2211))

- Label: Oppdatert med props `textColor` og `visuallyHidden`. ([#2211](https://github.com/navikt/aksel/pull/2211))

- BodyLong, BodyShort, Detail: Oppdatert med props `textColor`,`weight`,`align`, `visuallyHidden` og `truncated`. ([#2211](https://github.com/navikt/aksel/pull/2211))

### Patch Changes

- :wheelchair: Textarea: Skjermleser-spesifikk tekst leses opp sammenhengende ([#2216](https://github.com/navikt/aksel/pull/2216))

- Updated dependencies []:
  - @navikt/aksel-icons@5.3.0

## 5.2.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@5.2.1

## 5.2.0

### Patch Changes

- Button: Ved bruk av `as`-prop vil `role="button"` nå bli lagt til. Native `onKeyUp` for `Space` er også implementert slik at standard `button`-interaksjon vil være likere uansett html-tag. ([#2154](https://github.com/navikt/aksel/pull/2154))

- Combobox: Fikset bruk av `useLayoutEffect` med SSR-safe metode. ([#2219](https://github.com/navikt/aksel/pull/2219))

- Hovering over combobox dropdown will move selection/focus in the list, so we don't end up with a split focus, and reversely when moving focus while hovering ([#2193](https://github.com/navikt/aksel/pull/2193))

- Updated dependencies [[`7e789158c`](https://github.com/navikt/aksel/commit/7e789158ce03357c2a2b2173a2c29c7fb6e6bcbb)]:
  - @navikt/aksel-icons@5.2.0

## 5.1.0

### Minor Changes

- :sparkles: Modal: mulighet for å rendre i portal ([#2209](https://github.com/navikt/aksel/pull/2209))

### Patch Changes

- :white_check_mark: Modal: use polyfill in JSDOM ([#2208](https://github.com/navikt/aksel/pull/2208))

- Datepicker: Input setter ikke nå aria-controls før popover åpnes ([#2213](https://github.com/navikt/aksel/pull/2213))

- Updated dependencies []:
  - @navikt/aksel-icons@5.1.0

## 5.0.3

### Patch Changes

- ConfirmationPanel: Fikset opplesing av feilmelding ([#2199](https://github.com/navikt/aksel/pull/2199))

- Updated dependencies []:
  - @navikt/aksel-icons@5.0.3

## 5.0.2

### Patch Changes

- :label: Modal: Bedre type for `width` ([#2191](https://github.com/navikt/aksel/pull/2191))

- Updated dependencies []:
  - @navikt/aksel-icons@5.0.2

## 5.0.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@5.0.1

## 5.0.0

### Major Changes

- Oppdatert Modal - Se [Migrering](https://aksel.nav.no/grunnleggende/kode/migrering) ([#2135](https://github.com/navikt/aksel/pull/2135))

  - :sparkles: Støtte for header og footer
  - :boom: Bruker nå native dialog i stedet for react-modal (med polyfill for eldre nettlesere)
  - :boom: Provider: `appElement` er fjernet

### Patch Changes

- Table: ExpandableRow har oppdatert knapp for å matche Accordion og ExpansionCard ([#2178](https://github.com/navikt/aksel/pull/2178))

- Table: Har lagt til ny size: 'large'. ([#2178](https://github.com/navikt/aksel/pull/2178))

- Updated dependencies []:
  - @navikt/aksel-icons@5.0.0

## 4.12.1

### Patch Changes

- Added red border to Combobox in error state ([#2184](https://github.com/navikt/aksel/pull/2184))

- Updated dependencies []:
  - @navikt/aksel-icons@4.12.1

## 4.12.0

### Minor Changes

- Combobox: La til støtte for feilmeldinger i Combobox ([#2182](https://github.com/navikt/aksel/pull/2182))

- CopyButton: Har nå prop 'iconPosition' for å høyre/venstre aligne ikon ([#2173](https://github.com/navikt/aksel/pull/2173))

### Patch Changes

- List: Fikset sentrering, margins ([#2168](https://github.com/navikt/aksel/pull/2168))

- Combobox: Kjører nå 'onChange' + 'onClear' når input blir reset programmatisk ([#2183](https://github.com/navikt/aksel/pull/2183))

- Combobox: Fikset custom-options i singleselect ([#2180](https://github.com/navikt/aksel/pull/2180))

- Combobox: Fjernet unødvendige 'onClear'-calls når man velger verdier ([#2170](https://github.com/navikt/aksel/pull/2170))

- Checkbox: Checkmark er nå SVG-ikon og ikke Base64 ([#2171](https://github.com/navikt/aksel/pull/2171))

- Combobox: Lukker nå nedtrekksmeny hvis man legger til ny option i singleselect ([#2177](https://github.com/navikt/aksel/pull/2177))

- Updated dependencies []:
  - @navikt/aksel-icons@4.12.0

## 4.11.2

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.11.2

## 4.11.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.11.1

## 4.11.0

### Minor Changes

- HGrid: Ny komponent 'HGrid' er ute i Beta: [Dokumentasjon](https://aksel.nav.no/komponenter/primitives/hgrid) ([#1838](https://github.com/navikt/aksel/pull/1838))

### Patch Changes

- Fixes bug where combobox list could not be closed after clicking a chip ([#2155](https://github.com/navikt/aksel/pull/2155))

- Grid: Markert som deprecated. Bruk nye 'HGrid' ([#2153](https://github.com/navikt/aksel/pull/2153))

- Updated dependencies []:
  - @navikt/aksel-icons@4.11.0

## 4.10.2

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.10.2

## 4.10.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.10.1

## 4.10.0

### Minor Changes

- Link: La til 'variant', 'underline' og 'inlineText'-prop ([#2093](https://github.com/navikt/aksel/pull/2093))

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.10.0

## 4.9.1

### Patch Changes

- Button: Fikset aria-live bug der knapp alltid ble lest opp av skjermleser ved render ([#2143](https://github.com/navikt/aksel/pull/2143))

- Tweaks to combobox - updated example, small bugfixes, better affordance for selected options and added flag for "isAddedByUser" to onToggleSelected ([#2144](https://github.com/navikt/aksel/pull/2144))

- Updated dependencies []:
  - @navikt/aksel-icons@4.9.1

## 4.9.0

### Minor Changes

- Table: ExpandableRow kan nå åpnes med 'expandOnRowClick'-prop ([#2127](https://github.com/navikt/aksel/pull/2127))

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.9.0

## 4.8.0

### Minor Changes

- Nye komponenter `VStack`, `HStack` og `Spacer` for å enklere kunne lage layout med flexbox og spacing-variabler. ([#2040](https://github.com/navikt/aksel/pull/2040))

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.8.0

## 4.7.4

### Patch Changes

- Textfield: La til type 'time' som tilgjengelig option ([#2137](https://github.com/navikt/aksel/pull/2137))

- Updated dependencies []:
  - @navikt/aksel-icons@4.7.4

## 4.7.3

### Patch Changes

- Chips: Removable Chips submitter ikke forms ved klikk lengre ([#2124](https://github.com/navikt/aksel/pull/2124))

- Updated dependencies []:
  - @navikt/aksel-icons@4.7.3

## 4.7.2

### Patch Changes

- Stepper: Fikset `hotizontal`-bug når step var `completed` ([#2116](https://github.com/navikt/aksel/pull/2116))

- Updated dependencies []:
  - @navikt/aksel-icons@4.7.2

## 4.7.1

### Patch Changes

- Datepicker: Fikset bug ved bruk dynamisk oppdatering av minDate. Vist `month` vil nå alltid være oppdatert når datepicker åpnes ([#2117](https://github.com/navikt/aksel/pull/2117))

- Updated dependencies []:
  - @navikt/aksel-icons@4.7.1

## 4.7.0

### Minor Changes

- Ny komponent Combobox! ([#1868](https://github.com/navikt/aksel/pull/1868))

### Patch Changes

- Timeline: Har nå egen `axisLabelTemplates`-prop for axixlabel formatering ([#2109](https://github.com/navikt/aksel/pull/2109))

- Combobox post-release tweaks ([#2112](https://github.com/navikt/aksel/pull/2112))

- Updated dependencies []:
  - @navikt/aksel-icons@4.7.0

## 4.6.1

### Patch Changes

- Skjema: Labels og Legends bruker nå inline-flex når readOnly er satt ([#2089](https://github.com/navikt/aksel/pull/2089))

- Updated dependencies []:
  - @navikt/aksel-icons@4.6.1

## 4.6.0

### Minor Changes

- Skjema: De fleste skjemakomponenter støtter nå `readOnly`-state ([#2080](https://github.com/navikt/aksel/pull/2080))

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.6.0

## 4.5.0

### Minor Changes

- - Alert: La til `closeButton`-prop ([#2079](https://github.com/navikt/aksel/pull/2079))

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.5.0

## 4.4.2

### Patch Changes

- Textarea: Fikset i18n for counter ([`718b3204d`](https://github.com/navikt/aksel/commit/718b3204d8714c4fc515dcad484424214bdc0c77))

- Updated dependencies []:
  - @navikt/aksel-icons@4.4.2

## 4.4.1

### Patch Changes

- Updated dependencies []:
  - @navikt/aksel-icons@4.4.1

## 4.4.0

### Minor Changes

- Fikset klassenavn brukt for popover i Datepicker og Monthpicker ([PR](https://github.com/navikt/aksel/pull/2041))

## 4.3.0

### Minor Changes

- Popover og Helptext har nå luft mot siden av skjerm på mindre flater ([PR](https://github.com/navikt/aksel/pull/2069))

## 4.2.0

### Minor Changes

- Oppdatert Chat: `size` og `variant`-prop, optional `avatar`, uu og ui-forbedringer ([PR](https://github.com/navikt/aksel/pull/2048))

## 4.1.7

### Patch Changes

- Fikset JSDom-problemer ved testing av Timeline

- La til `wrapperClassname`-prop for HelpText ([PR](https://github.com/navikt/aksel/pull/2056))

## 4.1.6

### Patch Changes

- Timeline-period brakk ved bruk av JSDom i vitest og jest

## 4.1.5

### Patch Changes

- `OverridableComponent` fungerer nå med komponenter som allerede bruker 'as'-prop. ([PR](https://github.com/navikt/aksel/pull/2051))

- Popover: `bubbleEscape`-prop tilbyr muligheten for escape-events til å sendes opp gjennom dom-treet. ([PR](https://github.com/navikt/aksel/pull/2052))

## 4.1.3

### Patch Changes

- `className` ble ikke riktig forwardet til ikke-klikkbar Period i Timeline

## 4.1.2

### Patch Changes

- La til JSDoc for Skeleton-komponent

## 4.1.0

### Minor Changes

- Chips: `neutral` og `action`-varianter for Chips.Toggle. `checkmark`-prop for Chips.Toggle ([PR](https://github.com/navikt/aksel/pull/2035))

- Ny komponent Skeleton! ([PR](https://github.com/navikt/aksel/pull/1821))

### Patch Changes

- La til JSDoc dokumentasjon for alle komponenter ([PR](https://github.com/navikt/aksel/pull/2034))

- Accordion: La til `indent`-prop ([PR](https://github.com/navikt/aksel/pull/2027))

## 4.0.0

### Major Changes

- Datepicker og Monthpicker er ute av beta. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h4ef68ae743b0) ([PR](https://github.com/navikt/aksel/pull/2026))

- Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react`. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h3b8538e1981d) ([PR](https://github.com/navikt/aksel/pull/2026))

## 3.4.0

### Minor Changes

- Tag: `moderate`-variant ([PR](https://github.com/navikt/aksel/pull/2010))

## 3.3.1

### Patch Changes

- CopyButton: native `Clipboard API` ([PR](https://github.com/navikt/aksel/pull/2005))

## 3.3.0

### Patch Changes

- Timeline: popover/tooltip vises nå på hover, ikke onClick. ([PR](https://github.com/navikt/aksel/pull/1995))

## 3.2.4

### Patch Changes

- Search: Støtter nå htmlSize-prop ([PR](https://github.com/navikt/aksel/pull/2000))

## 3.2.3

### Patch Changes

- Datepicker: Oppdatert small-variant av Datepicker.Input. UI-oppdatert samtidig. ([PR](https://github.com/navikt/aksel/pull/1993))

- CopyButton: `xsmall`-variant for bruk i tabeller ([PR](https://github.com/navikt/aksel/pull/1994))

## 3.2.2

### Patch Changes

- CopyButton: Fjernet use client directive fra komponent. (warning i vite/rollup)

## 3.2.0

### Minor Changes

- Ny komponent CopyButton! Erstatter `CopyToClipboard` som nå er tagget som deprecated ([PR](https://github.com/navikt/aksel/pull/1982))

## 3.1.0

### Patch Changes

- Oppdatert Label og Description spacing for alle skjemakomponenter ([PR](https://github.com/navikt/aksel/pull/1967))

## 3.0.1

### Patch Changes

- Fjernet `@navikt/ds-icons` fra dependencies

- Accordion: Oppdatert default headingSize brukt i i Accordion.Header

## 3.0.0

### Major Changes

- Accordion: left-aligner chevron, `neutral`-variant, `size`-prop ([PR](https://github.com/navikt/aksel/pull/1964))

- Bruker nå nå `@navikt/aksel-icons` for interne ikoner ([PR](https://github.com/navikt/aksel/pull/1964))

## 2.9.1

### Patch Changes

- ExpansionCard: Støtter nå `aria-labelledby` i tillegg til `aria-label` ([PR](https://github.com/navikt/aksel/pull/1944))

## 2.8.16

### Patch Changes

- ExpansionCard: ExpansionCard.Content sendte ikke `className` videre

- Datepicker. Bedre håndtering av visning for out-of-range-datoer ([PR](https://github.com/navikt/aksel/pull/1929))

## 2.8.14

### Patch Changes

- Datepicker/Monthpicker: Oppdaterer vist måneder ved popover åpne/lukk. Fikser out-of-range håndtering av `today`

## 2.8.10

### Patch Changes

- Datepicker/Monthpicker: refaktorert event-handling i hooks ([PR](https://github.com/navikt/aksel/pull/1907))

## 2.8.7

### Patch Changes

- Fikset typografi-bruk for `Radio` og `Checkbox`.

## 2.8.3

### Patch Changes

- Textarea: oppdatert counter-tekst + mulighet for lokalisering ([PR](https://github.com/navikt/aksel/pull/1875))

## 2.8.2

### Patch Changes

- ExpansioCard: Oppdatert typografibruk ([PR](https://github.com/navikt/aksel/pull/1870))

## 2.8.1

### Patch Changes

- ExpansionCard: Oppdaetrt standard title-size til `medium`

## 2.8.0

### Minor Changes

- Ny komponent ExpansionCard! ([PR](https://github.com/navikt/aksel/pull/1820))

## 2.6.2

### Patch Changes

- Textarea: Fikset React v18 problem med `TextareaAutosize`

## 2.6.1

### Patch Changes

- Search: `onSearchClick`-prop for lettere submit-handling

## 2.5.1

### Patch Changes

- List: Refaktorert nestede lister

## 2.4.2

### Patch Changes

- List: la til støtte for nestede lister ([PR](https://github.com/navikt/aksel/pull/1823))

## 2.4.1

### Patch Changes

- Datepicker: la til `fixedWeeks`-prop for å alltid vise 6 uker i Datepicker.Standalone ([PR](https://github.com/navikt/aksel/pull/1827))

## 2.4.0

### Minor Changes

- Ny komponent List! ([PR](https://github.com/navikt/aksel/pull/1807))

## 2.2.0

### Minor Changes

- ToggleGroup: `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1789))

- Button: `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1789))

## 2.1.7

### Patch Changes

- Datepicker: Fikset rekkefølge på `onValidate` og `onRangeChange` i useRangepicker-hook

## 2.1.6

### Patch Changes

- Datepicker/Monthpicker: `openOnFocus`-prop for manuell håndtering av popover ([PR](https://github.com/navikt/aksel/pull/1777))

## 2.1.5

### Patch Changes

- Datepicker: ESM import fra date-fns fungerer nå

## 2.1.4

### Patch Changes

- Datepicker: Fikset edgecase i `useRangepicker` der valg av startdato etter sluttdato ga feil output

## 2.1.3

### Patch Changes

- Monthpicker: håndterer visning av år riktig ([PR](https://github.com/navikt/aksel/pull/1771))

## 2.1.1

### Patch Changes

- Fikset `@types/react` v18 feil introdusert i v2.0.6 ([PR](https://github.com/navikt/aksel/pull/1759))

## 2.1.0

### Minor Changes

- Datepicker/Monthpicker: år med 2 siffer i input fungerer nå

## 2.0.18

### Patch Changes

- Datepicker: Bedre typer for `ref`

## 2.0.15

### Patch Changes

- Chat: `toptextPosition`-prop for horisontal plassering av navn og dato. ([PR](https://github.com/navikt/aksel/pull/1748))

## 2.0.14

### Patch Changes

- Oppdatert `@floating-ui/react`-versjon

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

- Fonter blir bruk i all typografi blir nå lastet fra CDN

## 1.5.10

### Patch Changes

- Modal: `parentSelector`-prop i Modal ([PR](https://github.com/navikt/aksel/pull/1717))

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

- Tag: `filles`-varianter ([PR](https://github.com/navikt/aksel/pull/1684))

- Ny komponent Chips! ([PR](https://github.com/navikt/aksel/pull/1668))

## 1.4.4

### Patch Changes

- Datepicker: Eksponerer `onValidation`-typer

## 1.4.3

### Patch Changes

- Datepicker: Validering og inputFormat funksjonalitet

## 1.4.1

### Patch Changes

- Datepicker: Følger språkrådets dato-formatering for måneder.

## 1.4.0

### Minor Changes

- Ny komponent Provider! For håndtering av global config på tvers av komponenter

## 1.3.39

### Patch Changes

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

## 1.2.0

### Minor Changes

- Dropdown: `closeOnSelect`-prop for å skru av/på lukking av dropdown ved valg

## 1.1.0

### Minor Changes

- Dropdown: `onSelect`-prop for callback ved valg av element

## 1.0.0

## Major Changes

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
