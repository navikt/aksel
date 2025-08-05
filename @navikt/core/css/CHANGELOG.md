# @navikt/ds-css

## 7.25.2

## 7.25.1

## 7.25.0

### Minor Changes

- FileUpload: Allow for custom buttons in FileUpload.Item. ([#3906](https://github.com/navikt/aksel/pull/3906))

### Patch Changes

- Table: Selected rows are now highlighted with outline. ([#3898](https://github.com/navikt/aksel/pull/3898))

- Chat: Removed ol > li semantics, replaced with 'div'. ([#3904](https://github.com/navikt/aksel/pull/3904))

## 7.24.0

### Minor Changes

- LinkCard: :tada: Added new component 'LinkCard'. ([#3883](https://github.com/navikt/aksel/pull/3883))

- Table: :tada: Added prop 'stickyHeader', allowing header to remain sticky while scrolling in table. ([#3893](https://github.com/navikt/aksel/pull/3893))

### Patch Changes

- Forms: Added built-in scroll-margin to TextField, Textarea and Select. ([#3897](https://github.com/navikt/aksel/pull/3897))

- Switch: Size='small' are now visually comparable to radio and checkbox in the same size. ([#3892](https://github.com/navikt/aksel/pull/3892))

## 7.23.2

### Patch Changes

- Darkside: Outline Tag in high-contrast mode had wrong text-color. ([#3889](https://github.com/navikt/aksel/pull/3889))

- Darkside: Update padding for all 'panel' type components. ([#3864](https://github.com/navikt/aksel/pull/3864))

- Form components: Fix edge case where description container would take up space when empty ([#3866](https://github.com/navikt/aksel/pull/3866))

## 7.23.1

## 7.23.0

### Minor Changes

- Darkside: Renamed 'data-color-role' dynamic theme attribute to 'data-color'. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: Using attribute 'data-color' with one of the built-in colors from 'AkselColorRole' now allows re-coloring most components. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: All components has been updated to use 'data-color' attribute for coloring. As a side-effect, most component CSS is either updated or refactored. ([#3849](https://github.com/navikt/aksel/pull/3849))

### Patch Changes

- Tag: Outline-variant now uses bg-moderate, replacing bg-moderateA. ([#3865](https://github.com/navikt/aksel/pull/3865))

- Darkside: Fix icon size in small Tabs ([#3850](https://github.com/navikt/aksel/pull/3850))

- List: Fix issue with incorrect padding in Safari ([#3850](https://github.com/navikt/aksel/pull/3850))

## 7.22.0

### Minor Changes

- Darkside: Components now use new `radius`-tokens, replacing `border-radius`-tokens. ([#3784](https://github.com/navikt/aksel/pull/3784))

## 7.21.1

### Patch Changes

- Timeline: Add focus-markings to Popover dialogs. ([#3768](https://github.com/navikt/aksel/pull/3768))

## 7.21.0

### Patch Changes

- Darkside: Update Chips.Toggle hover-border. ([#3738](https://github.com/navikt/aksel/pull/3738))

## 7.20.0

### Minor Changes

- Combobox: Use option-value as `id` instead of `label`. ([#3735](https://github.com/navikt/aksel/pull/3735))

## 7.19.1

### Patch Changes

- Combobox: Singleselect selected value now uses the complete input-width when possible. ([#3734](https://github.com/navikt/aksel/pull/3734))

## 7.19.0

### Patch Changes

- Darkside: Togglegroup now has bg-input background. ([#3715](https://github.com/navikt/aksel/pull/3715))

- Combobox: Fix wrapping issue when ToggleListButton is hidden ([#3727](https://github.com/navikt/aksel/pull/3727))

## 7.18.0

### Patch Changes

- Table: Disabled expansion-rows now has same hover-effect as other rows. ([#3702](https://github.com/navikt/aksel/pull/3702))

## 7.17.4

### Patch Changes

- Modal: Updated animations for reduced movement. ([#3671](https://github.com/navikt/aksel/pull/3671))

## 7.17.3

### Patch Changes

- Darkside: Synced padding with Figma. ([#3651](https://github.com/navikt/aksel/pull/3651))

## 7.17.2

### Patch Changes

- Darkside: Removed stacking backgrounds with transparency in Combobox. ([`e769eed`](https://github.com/navikt/aksel/commit/e769eed269d327403b89935502f8fe431eca8cc9))

## 7.17.1

### Patch Changes

- ExpansionCard: Fixed bug where `@media print` would hide header content. ([#3634](https://github.com/navikt/aksel/pull/3634))

## 7.17.0

## 7.16.1

## 7.16.0

### Minor Changes

- Darkside: All classNames are now starts with `.aksel` instead of `.navds`. ([#3586](https://github.com/navikt/aksel/pull/3586))

## 7.15.0

## 7.14.3

### Patch Changes

- Darkside: Changed outline-offset for tabpanel from -4px to -3px. ([`06fecf2`](https://github.com/navikt/aksel/commit/06fecf2af1972a5d06ea452fc5b7431b064e1fc0))

## 7.14.2

## 7.14.1

## 7.14.0

### Minor Changes

- DatePicker: Updated `date.css` to support `react-day-picker v9`. ([#3525](https://github.com/navikt/aksel/pull/3525))

### Patch Changes

- Darkside: Added 'arrow' back to Tooltip. ([#3589](https://github.com/navikt/aksel/pull/3589))

## 7.13.0

### Patch Changes

- Darkside: Added support for `ConfirmationpPanel`, `Linkpanel`, `Panel` and `Dropdown`. Note that all of these will be deprecated in the future. ([#3581](https://github.com/navikt/aksel/pull/3581))

## 7.12.2

## 7.12.1

## 7.12.0

## 7.11.0

### Patch Changes

- ExpansionCard: Removed dynamic padding on button-element. ([#3532](https://github.com/navikt/aksel/pull/3532))

- Modal: Defaults to `margin: auto` for tailwind 4 support. ([#3532](https://github.com/navikt/aksel/pull/3532))

## 7.10.0

### Minor Changes

- Table: New prop `contentGutter` added to `ExpandableRow`-component. This allows user more control for content layout inside expandable element. ([#3507](https://github.com/navikt/aksel/pull/3507))

### Patch Changes

- Button: Using `<Loader />` within `icon`-prop now supported. ([#3515](https://github.com/navikt/aksel/pull/3515))

- Combobox: Always render `maxSelected` message when `isMultiSelect` is set. ([#3506](https://github.com/navikt/aksel/pull/3506))

## 7.9.2

### Patch Changes

- Table: Removed border-bottom for HeaderCell used in ExpandableRow. ([#3503](https://github.com/navikt/aksel/pull/3503))

## 7.9.1

### Patch Changes

- Link: :bug: Use inside Alert got wrong text-color while focused or active. ([#3489](https://github.com/navikt/aksel/pull/3489))

## 7.9.0

### Minor Changes

- ErrorSummary: :sparkles: new prop to prefix error with a warning icon. ([#3445](https://github.com/navikt/aksel/pull/3445))
  All form components: replace dot with warning icon in error message.

### Patch Changes

- Switch: Update switch to better reflect unchecked state. ([#3468](https://github.com/navikt/aksel/pull/3468))

- Select: :bug: Focus-border no longer cancels out error-border. ([#3465](https://github.com/navikt/aksel/pull/3465))

- Textarea: :bug: Focus-border no longer cancels out error-border. ([#3465](https://github.com/navikt/aksel/pull/3465))

## 7.8.1

### Patch Changes

- Alert: Link-components used within Alert variant='inline' now preserves default coloring ([#3461](https://github.com/navikt/aksel/pull/3461))

- Table: :fire: Removed cursor 'pointer' when 'ExpandableRow' is disabled. ([#3462](https://github.com/navikt/aksel/pull/3462))

## 7.8.0

### Minor Changes

- Combobox: Removed clear button, removed tokens staring with `--ac-combobox-clear`, deprecated props `clearButton`/`clearButtonLabel`. ([#3433](https://github.com/navikt/aksel/pull/3433))

### Patch Changes

- CSS: Resolved regression where the complete stylesheet was included in scoped 'components.css' file. ([#3427](https://github.com/navikt/aksel/pull/3427))

## 7.7.0

## 7.6.0

### Minor Changes

- ReadMore: Added size 'large'. ([#3372](https://github.com/navikt/aksel/pull/3372))

### Patch Changes

- Select: Now shows focus-outline when ':focus' is set trough pointer or label in all browsers. Chrome and Firefox handles `:focus-visible` differently for 'select', previously causing outline-border not to show in Firefox. ([#3415](https://github.com/navikt/aksel/pull/3415))

- Modal: Don't add scroll shadow when polyfilled ([#3408](https://github.com/navikt/aksel/pull/3408))

- Modal: Now shows up while screensharing with Vergic ([#3407](https://github.com/navikt/aksel/pull/3407))

- FileUpload: Remove browser styling from FileUpload.Item when used in list. ([#3413](https://github.com/navikt/aksel/pull/3413))

- Combobox: Single-select now shows cursor closer to selected item. ([#3384](https://github.com/navikt/aksel/pull/3384))

## 7.5.3

## 7.5.2

### Patch Changes

- Combobox: Fix issue where using arrow keys in list would make the entire page scroll ([#3364](https://github.com/navikt/aksel/pull/3364))

## 7.5.1

## 7.5.0

## 7.4.3

### Patch Changes

- Table.ColumnHeader: Inherit text alignment in button ([#3319](https://github.com/navikt/aksel/pull/3319))

## 7.4.2

## 7.4.1

### Patch Changes

- Combobox: :bug: Fix scroll issue when using arrow keys to navigate list ([#3269](https://github.com/navikt/aksel/pull/3269))

## 7.4.0

## 7.3.1

### Patch Changes

- Updated to Selectors Level 4 syntax. ([#3250](https://github.com/navikt/aksel/pull/3250))

## 7.3.0

### Minor Changes

- ActionMenu: :tada: New component! Replaces DropdownMenu as the go-to solution for floating menus. Includes support for grouping, sub-menus, checkboxes, radios and dividers. Read more in the [documentation](https://aksel.nav.no/komponenter/core/actionmenu). ([#3081](https://github.com/navikt/aksel/pull/3081))

### Patch Changes

- List.Item: Center icon horizontally inside it's container ([#3253](https://github.com/navikt/aksel/pull/3253))

## 7.2.1

### Patch Changes

- Combobox: Support PageUp/PageDown in dropdown list. ([#3158](https://github.com/navikt/aksel/pull/3158))

## 7.2.0

## 7.1.2

### Patch Changes

- List: Explicitly set list-style on ol to override reset-CSS ([#3202](https://github.com/navikt/aksel/pull/3202))

## 7.1.1

### Patch Changes

- List: Add indentation and remove overly verbose aria attributes ([#3184](https://github.com/navikt/aksel/pull/3184))

- Datepicker/Select: :lipstick: dim non-interactable icons when readonly is set. ([#3187](https://github.com/navikt/aksel/pull/3187))

- Combobox: :bug: implement missing readonly and disabled ([#3180](https://github.com/navikt/aksel/pull/3180))

## 7.1.0

### Patch Changes

- Accordion: Remove 'relative' positioning when focused. This resolves some issues where floating elements like popover ended up clipping. ([`9c1eba445`](https://github.com/navikt/aksel/commit/9c1eba44508f295cc6261ff96822b18557bd7ddc))

## 7.0.1

### Patch Changes

- List: :lipstick: make icons 24x24px large ([#3148](https://github.com/navikt/aksel/pull/3148))

## 7.0.0

### Patch Changes

- ErrorSummary: Focus heading instead of container for improved experience with screen reader. ([#3139](https://github.com/navikt/aksel/pull/3139))

## 6.17.0

## 6.16.3

### Patch Changes

- Combobox: :lipstick: hide caret on select ([#3071](https://github.com/navikt/aksel/pull/3071))

## 6.16.2

### Patch Changes

- Font: Reverted change introduced in v6.14 where font locations were changed. This caused a regression where every preload-instance to old font locations no longer worked. ([#3114](https://github.com/navikt/aksel/pull/3114))

## 6.16.1

### Patch Changes

- Table: Fixed background-clipping when using ExpandableRow. ([#3095](https://github.com/navikt/aksel/pull/3095))

## 6.16.0

### Minor Changes

- Primitives: Added `gridColumn`-prop for more grid alignment control. ([#3082](https://github.com/navikt/aksel/pull/3082))

### Patch Changes

- FormSummary: Added background color ([#3093](https://github.com/navikt/aksel/pull/3093))

- Modal: Added scroll shadows ([#3083](https://github.com/navikt/aksel/pull/3083))

## 6.15.0

## 6.14.0

### Minor Changes

- Fonts: Added built-in support for cyrillic, cyrillic-ext and latin-ext ([#3044](https://github.com/navikt/aksel/pull/3044))

## 6.13.0

### Minor Changes

- Modal: New prop `placement` for anchoring the modal to the top of the viewport. ([#3033](https://github.com/navikt/aksel/pull/3033))

## 6.12.0

### Minor Changes

- Primitives: Added support for padding, paddingInline, paddingBlock, margin, marginInline, marginBlock, width, minWidth, maxWidth, height, minHeight, maxHeight, position, inset, top, right, left, bottom, overflow, overflowX, overflowY, flexBasis, flexGrow, flexShrink to Box, HGrid and Stack. ([#3003](https://github.com/navikt/aksel/pull/3003))

### Patch Changes

- Alert: Fix alignment, add prop for toggling content max-width, and adjust title on close icon. ([#3007](https://github.com/navikt/aksel/pull/3007))

## 6.11.0

### Patch Changes

- CopyButton: Icon is now 20px for size small and xsmall. ([#2977](https://github.com/navikt/aksel/pull/2977))

- Button: Updated icon size for size="small" to 1.25rem. ([#2984](https://github.com/navikt/aksel/pull/2984))

- List: Changed List.Item to BodyLong, changed Item spacing from 1rem to 0.5rem. ([#2979](https://github.com/navikt/aksel/pull/2979))

## 6.10.1

### Patch Changes

- :lipstick: Remove bottom margin on last item in Stepper and adjust FormProgress accordingly ([#2971](https://github.com/navikt/aksel/pull/2971))

## 6.10.0

### Minor Changes

- ✨ Modal: add small version ([#2909](https://github.com/navikt/aksel/pull/2909))

## 6.9.0

### Patch Changes

- Increased padding size for contentBlockPadding on the Page primitive to 4 rem to reflect docs/Figma ([#2876](https://github.com/navikt/aksel/pull/2876))

- Fixed Combobox small sizing to align with other form fields ([#2801](https://github.com/navikt/aksel/pull/2801))

## 6.8.0

### Minor Changes

- :sparkles: Ny komponent: FormProgress ([#2855](https://github.com/navikt/aksel/pull/2855))

### Patch Changes

- HGrid: forenklet CSS. ([#2917](https://github.com/navikt/aksel/pull/2917))

## 6.7.1

### Patch Changes

- Progressbar: Tweak API, examples, stories and css ([#2892](https://github.com/navikt/aksel/pull/2892))

## 6.7.0

### Minor Changes

- :sparkles: Ny komponent: ProgressBar ([#2845](https://github.com/navikt/aksel/pull/2845))

### Patch Changes

- Checkbox, Radio: Erstatter `:focus-visible` med `:focus` for bedre UX brukt sammen med ErrorSummary. ([#2893](https://github.com/navikt/aksel/pull/2893))

- :lipstick: tweak CSS for timeline pins. ([#2889](https://github.com/navikt/aksel/pull/2889))

## 6.6.1

## 6.6.0

### Minor Changes

- :sparkles: Ny komponent FormSummary ([#2802](https://github.com/navikt/aksel/pull/2802))

## 6.5.0

## 6.4.1

### Patch Changes

- FileUpload: Item-illustrasjon er nå radius-full ([#2834](https://github.com/navikt/aksel/pull/2834))

## 6.4.0

## 6.3.6

## 6.3.5

## 6.3.4

### Patch Changes

- ReadMore: Padding-right på button er bumpet noen px ([#2806](https://github.com/navikt/aksel/pull/2806))

## 6.3.3

## 6.3.2

## 6.3.1

## 6.3.0

### Minor Changes

- FileUpload: Ny komponent `FileUpload` for å håndtere opplasting av filer, Dropzone og fil-visning ([#2504](https://github.com/navikt/aksel/pull/2504))

## 6.2.0

## 6.1.1

### Patch Changes

- Link: Fjern hover-farge ([#2767](https://github.com/navikt/aksel/pull/2767))

- Modal: Får nå fokus når åpnes i Safari ([#2688](https://github.com/navikt/aksel/pull/2688))

## 6.1.0

## 6.0.0

### Major Changes

- Tokens: La til nytt brekkpunkt `2xl` for `1440px`. Alle primitives er oppdatert for å reflektere oppdateringen. Brukere av Tailwind vil måtte sjekke at overskriving av `screen: "2xl"` ikke brekker app. ([#2623](https://github.com/navikt/aksel/pull/2623))

- Grid, ContentContainer: Komponenter er fjernet fra systemet. [Se migreringsguide](https://aksel.nav.no/grunnleggende/kode/migrering#dd2cfa9fb1d1). ([#2623](https://github.com/navikt/aksel/pull/2623))

- CSS: Oppdatert bruk av action-farger i systemet. Dette påvirker komponentene: Button, CopyButton, Dropdown, Combobox, ConfirmationPanel, Radio, Checkbox, Search, Select, TextField, Textarea, Helptext, LinkPanel, Link, ReadMore, Stepper og Tabs. Endringen skal ikke brekke noe så lenge man ikke har overskrevet farger manuelt. ([#2623](https://github.com/navikt/aksel/pull/2623))

- Tokens: Nye tokens `--a-text-action-hover`,`--a-icon-action-hover` og `--a-border-action-hover` ([#2623](https://github.com/navikt/aksel/pull/2623))

- Textarea: Fjernet div med klassen navds-textarea\_\_wrapper ([#2623](https://github.com/navikt/aksel/pull/2623))

## 5.18.3

## 5.18.2

## 5.18.1

## 5.18.0

## 5.17.5

### Patch Changes

- ExpansionCard: Padding-top for Content er justert opp 8px (medium) og 4px (small) ([#2699](https://github.com/navikt/aksel/pull/2699))

## 5.17.4

## 5.17.3

## 5.17.2

### Patch Changes

- Checkbox: I noen edgecaser ved bruk av shadow-dom ble ikke checkmark sentert i Checkbox ([#2682](https://github.com/navikt/aksel/pull/2682))

## 5.17.1

## 5.17.0

### Minor Changes

- Høykontrast: Komponenter støtter nå standard høykontrast-modus på Windows ([#2680](https://github.com/navikt/aksel/pull/2680))

## 5.16.0

### Minor Changes

- :sparkles: Combobox: Mulighet for å begrense hvor mange valg bruker kan ta ([#2260](https://github.com/navikt/aksel/pull/2260))

## 5.15.1

## 5.15.0

## 5.14.0

### Minor Changes

- Tag: Har nå innebygd støtte for ikoner ([#2611](https://github.com/navikt/aksel/pull/2611))

### Patch Changes

- Table: Checkbox nested i CheckboxGroup mister nå ikke padding ([#2612](https://github.com/navikt/aksel/pull/2612))

## 5.13.0

### Patch Changes

- Page: Lagt til ny bakgrunnsfarge `surface-subtle` og ny maksbredde på Page.Block `text` ([#2572](https://github.com/navikt/aksel/pull/2572))

## 5.12.5

## 5.12.4

## 5.12.3

### Patch Changes

- ExpansionCard: Divider mellom header og innhold ([#2566](https://github.com/navikt/aksel/pull/2566))

## 5.12.2

## 5.12.1

## 5.12.0

## 5.11.5

### Patch Changes

- Chips: La til token for checkmark-circle ([#2558](https://github.com/navikt/aksel/pull/2558))

## 5.11.4

### Patch Changes

- :bug: Modal: Hindre at elementer med sr-only posisjoneres feil ([#2541](https://github.com/navikt/aksel/pull/2541))

## 5.11.3

### Patch Changes

- :bug: Textarea: Skru av autosize ved manuell resize ([#2518](https://github.com/navikt/aksel/pull/2518))

- Page: La til `md`-bredde (768px) ([#2510](https://github.com/navikt/aksel/pull/2510))

## 5.11.2

## 5.11.1

### Patch Changes

- Switch: Byttet success-farger med action npr checked ([#2511](https://github.com/navikt/aksel/pull/2511))

## 5.11.0

### Minor Changes

- :sparkles: Textarea: Mulighet for å sette resize-retning ([#2494](https://github.com/navikt/aksel/pull/2494))

- :sparkles: Textarea: Eksperimentell støtte for automatisk scrollbar ([#2457](https://github.com/navikt/aksel/pull/2457))

### Patch Changes

- :wheelchair: Textarea: Forsinkelse ved live-opplesning av gjenstående tegn ([#2502](https://github.com/navikt/aksel/pull/2502))

## 5.10.4

## 5.10.3

### Patch Changes

- :bug: Textarea: Teller flyttet ut av tekstfeltet for å unngå overlapp og misforståelser ([#2483](https://github.com/navikt/aksel/pull/2483))

## 5.10.2

### Patch Changes

- Primtives: CSS-import for primitives er nå mer spesifikk ([#2469](https://github.com/navikt/aksel/pull/2469))

## 5.10.1

## 5.10.0

### Minor Changes

- Primitives: Ny komponent `Page` og `Page.Block` ([#2456](https://github.com/navikt/aksel/pull/2456))

## 5.9.2

## 5.9.1

### Patch Changes

- :lipstick: Modal: Bedre håndtering av mobiler i landskapsmodus ([#2444](https://github.com/navikt/aksel/pull/2444))

## 5.9.0

### Minor Changes

- Datepicker/Monthpicker: Hvis man bruker komponentene i Modal vil Popover bli erstattet med Modal uansett om man er på desktop eller mobil. ([#2419](https://github.com/navikt/aksel/pull/2419))

- Datepicker/Monthpicker/Popover: Fjernet `bubbleEscape`-prop. ([#2419](https://github.com/navikt/aksel/pull/2419))

- useDatepicker/useMonthPicker/useRangedpicker: Fjernet `openOnFocus`-prop, kan nå bare åpnes ved klikk på date-knapp i input. ([#2419](https://github.com/navikt/aksel/pull/2419))

- Datepicker/Monthpicker: Bytter nå automatisk til Modalvisning på mobil. ([#2419](https://github.com/navikt/aksel/pull/2419))

## 5.8.0

### Patch Changes

- :bug: Modal: Bedre støtte for Tooltip i Modal ([#2429](https://github.com/navikt/aksel/pull/2429))

## 5.7.6

### Patch Changes

- :lipstick: Chips.Toggle: Ikon i uvalgt tilstand ([#2395](https://github.com/navikt/aksel/pull/2395))

## 5.7.5

### Patch Changes

- Checkbox, Radio: Transparent-border fungerer nå bedre på mørkere bakgrunner ([#2388](https://github.com/navikt/aksel/pull/2388))

## 5.7.4

## 5.7.3

### Patch Changes

- Ny spacing token på 0.375rem ([#2370](https://github.com/navikt/aksel/pull/2370))

- Select: Tokenstøtte for å endre chevronfarge sammen med tekst ([#2383](https://github.com/navikt/aksel/pull/2383))

- HelpText: Knapp er visuelt mindre. Klikkflate er fortsatt 24px ([#2376](https://github.com/navikt/aksel/pull/2376))

## 5.7.2

## 5.7.1

### Patch Changes

- Radio: readonly håndterer nå hover-state bedre ([#2363](https://github.com/navikt/aksel/pull/2363))

## 5.7.0

### Patch Changes

- :lipstick: CopyButton: Justert padding, gap og animasjon ([#2355](https://github.com/navikt/aksel/pull/2355))

## 5.6.5

## 5.6.4

## 5.6.3

### Patch Changes

- :bug: Modal: Sett riktig tekstfarge ([#2340](https://github.com/navikt/aksel/pull/2340))

## 5.6.2

## 5.6.1

## 5.6.0

### Minor Changes

- Primitives: ny komponent Bleed ([#2278](https://github.com/navikt/aksel/pull/2278))

### Patch Changes

- :recycle: Box: Forenkling av CSS-variabler ([#2279](https://github.com/navikt/aksel/pull/2279))

- Accordion: Har nå 0.25rem padding-top mellom innhold og heading. ([#2310](https://github.com/navikt/aksel/pull/2310))

- Added cursor:pointer to Select component ([#2293](https://github.com/navikt/aksel/pull/2293))

- :bug: Box: sett border-radius riktig ([#2329](https://github.com/navikt/aksel/pull/2329))

- Stack: Kan nå endre direction, justify og align ved brekkpunkt. `Stack` er også nå en egen komponent sammen med `HStack` og `VStack`. ([#2286](https://github.com/navikt/aksel/pull/2286))

- Datepicker: Tilpasset padding og sizing på mobil. ([#2311](https://github.com/navikt/aksel/pull/2311))

- MonthPicker: Tilpasset padding og sizing på mobil. ([#2311](https://github.com/navikt/aksel/pull/2311))

## 5.5.0

### Minor Changes

- Box: Ny primitive, erstatter dagens `Panel` ([#2195](https://github.com/navikt/aksel/pull/2195))

### Patch Changes

- Skeleton: Width fungerer nå med inline-variant av Skeleton ([#2273](https://github.com/navikt/aksel/pull/2273))

## 5.4.1

## 5.4.0

### Minor Changes

- Primitives: Nye komponenter `Show` og `Hide` er lagt til. ([#2222](https://github.com/navikt/aksel/pull/2222))

### Patch Changes

- ErrorSummary: Har nå 8px border-radius ([#2256](https://github.com/navikt/aksel/pull/2256))

## 5.3.5

## 5.3.4

### Patch Changes

- Alert: 12px -> 8px gap mellom tekst og ikon ved `size="small"` ([#2240](https://github.com/navikt/aksel/pull/2240))

## 5.3.3

### Patch Changes

- HGrid: Har nå `align`-prop for bedre kontroll over child-elementer ([#2242](https://github.com/navikt/aksel/pull/2242))

## 5.3.2

### Patch Changes

- Skeleton: Lagt til as-prop for inline brk av Skeleton med span ([#2239](https://github.com/navikt/aksel/pull/2239))

## 5.3.1

### Patch Changes

- :bug: fix missing accordion bottom box-shadow on last element (when opened) ([#2229](https://github.com/navikt/aksel/pull/2229))

- :lipstick: GuidePanel: justert design ([#2227](https://github.com/navikt/aksel/pull/2227))

## 5.3.0

### Minor Changes

- Typography: Oppdatert med typo-klasser for `textColor`, `weight`, `align`, `visuallyHidden` og `truncated`. ([#2211](https://github.com/navikt/aksel/pull/2211))

## 5.2.1

### Patch Changes

- Font: Fikset henting av italic-font ([#2220](https://github.com/navikt/aksel/pull/2220))

## 5.2.0

### Patch Changes

- CSS: Popover har nå 8px border-radius. Fikset padding-bug i Select-small. ([#2219](https://github.com/navikt/aksel/pull/2219))

- Hovering over combobox dropdown will move selection/focus in the list, so we don't end up with a split focus, and reversely when moving focus while hovering ([#2193](https://github.com/navikt/aksel/pull/2193))

## 5.1.0

### Patch Changes

- :lipstick: Modal: fjern kantlinje ([#2210](https://github.com/navikt/aksel/pull/2210))

- Tokens: Fikset table-token ([#2204](https://github.com/navikt/aksel/pull/2204))

## 5.0.3

### Patch Changes

- ConfirmationPanel: Fikset opplesing av feilmelding ([#2199](https://github.com/navikt/aksel/pull/2199))

- Checkbox: Fikset checkbox-alignment ved bruk av tailwindcss ([#2199](https://github.com/navikt/aksel/pull/2199))

## 5.0.2

## 5.0.1

### Patch Changes

- Checkbox: Hotfix da checkmark ikke var sentrert hvis man brukte tailwind ([`90db7dd0c`](https://github.com/navikt/aksel/commit/90db7dd0c120c16a387d3169c05c1f33dc694323))

## 5.0.0

### Major Changes

- Oppdatert Modal - Se [Migrering](https://aksel.nav.no/grunnleggende/kode/migrering) ([#2135](https://github.com/navikt/aksel/pull/2135))

  - :sparkles: Støtte for header og footer
  - :boom: Bruker nå native dialog i stedet for react-modal (med polyfill for eldre nettlesere)

### Patch Changes

- Table: ExpandableRow har oppdatert knapp for å matche Accordion og ExpansionCard ([#2178](https://github.com/navikt/aksel/pull/2178))

- Table: Alle størrelser har justert padding. Small-size table bruker nå også standard typografi-størrelse (18px). ([#2178](https://github.com/navikt/aksel/pull/2178))

## 4.12.1

### Patch Changes

- Added red border to Combobox in error state ([#2184](https://github.com/navikt/aksel/pull/2184))

## 4.12.0

### Minor Changes

- CopyButton: Har nå prop 'iconPosition' for å høyre/venstre aligne ikon ([#2173](https://github.com/navikt/aksel/pull/2173))

### Patch Changes

- List: Fikset sentrering, margins ([#2168](https://github.com/navikt/aksel/pull/2168))

- Checkbox: Checkmark er nå SVG-ikon og ikke Base64 ([#2171](https://github.com/navikt/aksel/pull/2171))

- Alert: Fikset alignment av status-ikon mot tekst ([#2179](https://github.com/navikt/aksel/pull/2179))

## 4.11.2

### Patch Changes

- :lipstick: ToggleGroup: fjern semibold fra selected button ([#2167](https://github.com/navikt/aksel/pull/2167))

## 4.11.1

### Patch Changes

- Border-radius: Fikset hardkodet border-radius i Datepicker, ToggleGroup og Combobox. ([#2159](https://github.com/navikt/aksel/pull/2159))

## 4.11.0

### Minor Changes

- HGrid: Ny komponent 'HGrid' er ute i Beta: [Dokumentasjon](https://aksel.nav.no/komponenter/primitives/hgrid) ([#1838](https://github.com/navikt/aksel/pull/1838))

### Patch Changes

- List: Fikset alignment av ikoner ([#2149](https://github.com/navikt/aksel/pull/2149))

- Font: La til egen font for semibold italic for bedre skalering cross-browser ([#2150](https://github.com/navikt/aksel/pull/2150))

## 4.10.2

### Patch Changes

- Link: Fikset visited farger og inline SVG-reset ved bruk av tailwind

## 4.10.0

### Minor Changes

- Link: La til 'variant', 'underline' og 'inlineText'-prop ([#2093](https://github.com/navikt/aksel/pull/2093))

## 4.9.1

### Patch Changes

- Tweaks to combobox - updated example, small bugfixes, better affordance for selected options and added flag for "isAddedByUser" to onToggleSelected ([#2144](https://github.com/navikt/aksel/pull/2144))

## 4.9.0

### Minor Changes

- Table: ExpandableRow kan nå åpnes med 'expandOnRowClick'-prop ([#2127](https://github.com/navikt/aksel/pull/2127))

## 4.8.0

### Minor Changes

- Nye komponenter `VStack`, `HStack` og `Spacer` for å enklere kunne lage layout med flexbox og spacing-variabler. ([#2040](https://github.com/navikt/aksel/pull/2040))

## 4.7.4

### Patch Changes

- Oppdatert bruk av REM i komponenter for forbedret utrykk ved font-scaling i browser ([#2126](https://github.com/navikt/aksel/pull/2126))

## 4.7.3

## 4.7.2

### Patch Changes

- Stepper: Fikset `hotizontal`-bug når step var `completed` ([#2116](https://github.com/navikt/aksel/pull/2116))

## 4.7.1

## 4.7.0

### Minor Changes

- Ny komponent Combobox! ([#1868](https://github.com/navikt/aksel/pull/1868))

## 4.6.1

### Patch Changes

- Skjema: Labels og Legends bruker nå inline-flex når readOnly er satt ([#2089](https://github.com/navikt/aksel/pull/2089))

## 4.6.0

### Minor Changes

- Skjema: De fleste skjemakomponenter har nå styling for `readOnly`-state ([#2080](https://github.com/navikt/aksel/pull/2080))

## 4.5.0

### Minor Changes

- - Alert: La til `closeButton`-prop ([#2079](https://github.com/navikt/aksel/pull/2079))

### Patch Changes

- - Button: Fikset outline-bug i tertiary-variant ved `:active`-state ([#2079](https://github.com/navikt/aksel/pull/2079))

## 4.4.2

## 4.4.1

### Patch Changes

- :lipstick: Chat: fjernet border, satt avatar svg til 24x24px, byttet om "subtle" og "neutral" ([#2077](https://github.com/navikt/aksel/pull/2077))

## 4.4.0

### Minor Changes

- Shadow-tokens er oppdatert: Datepicker har nå ikke border, Modal bruker shadow-xlarge, LinkCard bruker shadow-xsmall ([PR](https://github.com/navikt/aksel/pull/2041))

## 4.3.0

### Minor Changes

- Popover/Helptext: Maksbredde på 100vw - 1.5rem. Treffer ikke lengre kanten på skjermen. ([PR](https://github.com/navikt/aksel/pull/2069))

### Patch Changes

- ExpansionCard: Ved nesting av komponetene fikk man styling fra parent ([PR](https://github.com/navikt/aksel/pull/2067))

## 4.2.0

### Minor Changes

- Chat: `small`-size, innebygde varianter for farge og oppdatert utseende. ([PR](https://github.com/navikt/aksel/pull/2048))

## 4.1.4

### Patch Changes

- Readmore: setter nå eksplisitt color for å ikke arve text-subtle fra parent. ([PR](https://github.com/navikt/aksel/pull/2049))

## 4.1.1

### Patch Changes

- :bug: Fikset cursor-markering av tekst i skeleton.

## 4.1.0

### Minor Changes

- Chips: `neutral` og `action`-varianter av Chips.Toggle. Opt-out mulighet for Checkmark. Oppdatert checkmark-ikon ([PR](https://github.com/navikt/aksel/pull/2035))

- Alle description-felter på fieldsets har nå `text-subtle` som farge. ([PR](https://github.com/navikt/aksel/pull/2036))

## 4.0.0

### Major Changes

- All styling fra `@navikt/ds-css-internal` er flyttet til `@navikt/ds-css`. ([PR](https://github.com/navikt/aksel/pull/2026))

- classname-prefix er endret fra `navdsi` -> `navds` for flyttede komponenter.

- Fikset cascading-problem mellom dropdown og popover. Dropdown blir ikke lengre påvirket av import-rekkefølge av popover.

- Styling for flyttede komponenter finnes nå på CDN [Guide](https://aksel.nav.no/grunnleggende/kode/css-import)

## 3.4.0

### Minor Changes

- Tag: `moderate`-variant ([PR](https://github.com/navikt/aksel/pull/2010))

## 3.2.3

### Patch Changes

- Datepicker: Fikset small-variant av datepicker-input. ([PR](https://github.com/navikt/aksel/pull/1993))

- CopyButton: `xsmall`-size for bruk i tabeller ([PR](https://github.com/navikt/aksel/pull/1994))

## 3.1.3

### Patch Changes

- :lipstick: Oppdatert utseende for ToggleGroup. `Medium` og `Small`-size er begge 10px lavere, mindre border-radius ([PR](https://github.com/navikt/aksel/pull/1976))

## 3.1.0

### Minor Changes

- Alle komponenter bruker nå default `:focus-visible` for fokusmarkering. Medfølger også fallback for `:focus` ([PR](https://github.com/navikt/aksel/pull/1966))

### Patch Changes

- Oppdatert Label og Description spacing for skjemakomponenter ([PR](https://github.com/navikt/aksel/pull/1967))

## 3.0.0

### Major Changes

- Accordion: Chevron er left-aligned, deler av styling er refaktorert, `size`-props og `neutral`-variant ([PR](https://github.com/navikt/aksel/pull/1964))

## 2.9.0

### Minor Changes

- CSS nå tilgjengelig som separate filer: Kan lastest fra CDN, minified-versjoner tilgjengelig ([PR](https://github.com/navikt/aksel/pull/1941))

## 2.8.9

### Patch Changes

- Button: Padding/border-radius tokens ([PR](https://github.com/navikt/aksel/pull/1905))

## 2.8.7

### Patch Changes

- Button: token for tertiary

## 2.8.6

### Patch Changes

- Alert, Chips og ErrorSummary har nå bedre utvalg av tokens

## 2.8.5

### Patch Changes

- Accordion: tokens for header-bakgrunn

- Select: Fikset tekstfarge på iphone ([PR](https://github.com/navikt/aksel/pull/1879))

## 2.8.2

### Patch Changes

- ExpansioCard: Oppdatert typografi ([PR](https://github.com/navikt/aksel/pull/1870))

## 2.7.8

### Patch Changes

- Tabs: La til focus-markering for Tabs.Panel ([PR](https://github.com/navikt/aksel/pull/1863))

## 2.7.5

### Patch Changes

- ToggleGroup: Fikset token-bug

## 2.4.3

### Patch Changes

- Select: Fikset disabled + opacity bug for Chrome

## 2.4.2

### Patch Changes

- List: La til støtte for nesting ([PR](https://github.com/navikt/aksel/pull/1823))

## 2.3.1

### Patch Changes

- Fikset feil bruk av fallback-tokens i Textarea og Timeline

## 2.3.0

### Minor Changes

- Select: Fikset sentrering av tekst i Firefox ([PR](https://github.com/navikt/aksel/pull/1813))

### Patch Changes

- Select: `small`-variant er nå 32px (var 34px)

## 2.2.0

### Minor Changes

- ToggleGroup: `Neutral`-variant. ([PR](https://github.com/navikt/aksel/pull/1789))

- Button: `Neutral`-variant.

## 2.1.2

### Patch Changes

- TextField: `small`-variant har nå 8px horisontal padding (før 4px)

## 2.0.12

### Patch Changes

- Radio: Fikset default visuell error-state ([PR](https://github.com/navikt/aksel/pull/1737))

## 2.0.5

### Patch Changes

- Button: Reverserte border-width endrinder (var 1.5px, nå 2px)

## 2.0.1

### Patch Changes

- Bugfixer ved bruk av tokens oppdatert i v2.0.0

## 2.0.0

### Major Changes

- Fontlasting: Fonter lastes nå fra NAV-CDN

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

- Tag: `filled`-varianter ([PR](https://github.com/navikt/aksel/pull/1684))

## 1.3.39

### Patch Changes

- Fikset bruk av `:watch` for diverse parsere (less, parcel)

## 1.3.24

### Patch Changes

- Tokens tilgjengeligjøres nå også på `:host`. Dette lar shadow-dom brukere konsumere tokens direkte.
