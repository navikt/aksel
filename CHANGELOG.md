# Changelog

## 7.32.0

### @navikt/aksel-icons

- Icons: Updated `SignLanguageTwoHands`-design. ([#4115](https://github.com/navikt/aksel/pull/4115))

- Icons: :tada: Added some new icons `ChairTable`, `Footprint`, `Lifebuoy`, `OpenBook`, `OpenMagazine` and `Slide`. ([#4115](https://github.com/navikt/aksel/pull/4115))

### @navikt/ds-react

- ReadMore: You can now reach the content by tabbing ([#4116](https://github.com/navikt/aksel/pull/4116))

### @navikt/ds-css

- ReadMore: You can now reach the content by tabbing ([#4116](https://github.com/navikt/aksel/pull/4116))

- Darkside: Adjust GuidePanel arrow position ([#4120](https://github.com/navikt/aksel/pull/4120))

- Process: Adjusted active-marking ([#4118](https://github.com/navikt/aksel/pull/4118))

## 7.31.0

### @navikt/ds-react

- Table: Add 'onRowClick' callback-prop to allow for selecting rows by clicking the row itself. ([#4107](https://github.com/navikt/aksel/pull/4107))

- Combobox: Dropdown-element is now position='fixed', allowing for better placement on smaller screens and inside Modals. ([#4106](https://github.com/navikt/aksel/pull/4106))

* Darkside: Avoid empty aria-describedby in Radio and Checkbox ([#4111](https://github.com/navikt/aksel/pull/4111))

### @navikt/ds-css

- Combobox: Dropdown-element is now position='fixed', allowing for better placement on smaller screens and inside Modals. ([#4106](https://github.com/navikt/aksel/pull/4106))

* Darkside: Adjust visually-hidden typography css ([#4103](https://github.com/navikt/aksel/pull/4103))

* Darkside: Adjusted arrow on GuidePanel poster variant ([#4101](https://github.com/navikt/aksel/pull/4101))

## 7.30.1

### @navikt/ds-react

- Darkside: ExpansionCardContent now defaults to app-color defined in `Theme`, fixing a regression causing all content to be colored `neutral`. ([#4075](https://github.com/navikt/aksel/pull/4075))

- Darkside: Improved screen reader experience in Radio and Checkbox by moving description out of label ([#4066](https://github.com/navikt/aksel/pull/4066))

### @navikt/ds-css

- Darkside: Improved screen reader experience in Radio and Checkbox by moving description out of label ([#4066](https://github.com/navikt/aksel/pull/4066))

## 7.30.0

### @navikt/ds-react

- FormSummary: Changed `FormSummary.Header`-component to `<div />` instead of `<header />`. ([#4032](https://github.com/navikt/aksel/pull/4032))

- FormSummary: Added new component `<FormSummary.Footer />`, we now require `<FormSummary.EditLink />` to be placed in footer instead of header. ([#4032](https://github.com/navikt/aksel/pull/4032))

* Datepicker: Fix regression causing clickable weeknumber to have no applied styles in Darkside. ([#4081](https://github.com/navikt/aksel/pull/4081))

* Timeline: Adjusted type for `onSelectPeriod()` and fixed warning when using refs in React 19 ([#4076](https://github.com/navikt/aksel/pull/4076))

### @navikt/ds-css

- FormSummary: Changed `FormSummary.Header`-component to `<div />` instead of `<header />`. ([#4032](https://github.com/navikt/aksel/pull/4032))

- FormSummary: Added new component `<FormSummary.Footer />`, we now require `<FormSummary.EditLink />` to be placed in footer instead of header. ([#4032](https://github.com/navikt/aksel/pull/4032))

## 7.29.1

### @navikt/ds-react

- Checkbox, List: Updated SVG-usage to avoid using rem-values directly on `width` and `height`-attributes. ([#4048](https://github.com/navikt/aksel/pull/4048))

### @navikt/ds-css

- Checkbox, List: Updated SVG-usage to avoid using rem-values directly on `width` and `height`-attributes. ([#4048](https://github.com/navikt/aksel/pull/4048))

- Darkside: Fix styling for small readOnly checked Radio ([#4051](https://github.com/navikt/aksel/pull/4051))

- Checkbox: Fix styling for indeterminate state with description ([#4051](https://github.com/navikt/aksel/pull/4051))

## 7.29.0

### @navikt/aksel-icons

- Icons: :tada: New icons `CheckmarkHeavy` and `PageBreak`. ([#4038](https://github.com/navikt/aksel/pull/4038))

### @navikt/ds-react

- Stepper: Mark `interactive`-prop as deprecated. For completely static 'Steppers', consider using the new `Process`-component. ([#4007](https://github.com/navikt/aksel/pull/4007))

- LinkCard: Added new prop `arrowPosition` for centering the arrow if necessary. ([#4021](https://github.com/navikt/aksel/pull/4021))

- Process: :tada: New component Process! The component consists of a vertical line of events where each event can contain information, actions, links or status indicators. [You can find the documentation here :memo:](https://aksel.nav.no/komponenter/core/process). ([#3950](https://github.com/navikt/aksel/pull/3950))

* ToggleGroup: Improved screen reader experience by using `aria-labelledby` instead of `aria-describedby` for the label ([#4028](https://github.com/navikt/aksel/pull/4028))

* Accordion: Mark `headingSize` as deprecated. ([#3993](https://github.com/navikt/aksel/pull/3993))

* Fieldset: Improved screen reader experience by using `aria-labelledby` for both legend and description ([#4029](https://github.com/navikt/aksel/pull/4029))

* Box: Fixed bug where darkside-css did not properly apply border-radius. ([#4009](https://github.com/navikt/aksel/pull/4009))

### @navikt/ds-css

- LinkCard: Added new prop `arrowPosition` for centering the arrow if necessary. ([#4021](https://github.com/navikt/aksel/pull/4021))

- Process: :tada: New component Process! The component consists of a vertical line of events where each event can contain information, actions, links or status indicators. [You can find the documentation here :memo:](https://aksel.nav.no/komponenter/core/process). ([#3950](https://github.com/navikt/aksel/pull/3950))

* Darkside: Fix issue with focus outline on checkbox in expandable table row content ([#3998](https://github.com/navikt/aksel/pull/3998))

* Darkside: Fix arrow in Tooltip ([#4018](https://github.com/navikt/aksel/pull/4018))

### @navikt/aksel

- CLI: Codemods now only run on relevant files. This resolves cases where codemods for js/ts-files tried and failed to parse css/scss/less-files. ([#4016](https://github.com/navikt/aksel/pull/4016))

## 7.28.1

### @navikt/ds-react

- Form components: Improved a11y when using JSX in description ([#3990](https://github.com/navikt/aksel/pull/3990))

- Fieldset/CheckboxGroup/RadioGroup: Connect description to fieldset with `aria-describedby` ([#3974](https://github.com/navikt/aksel/pull/3974))

## 7.28.0

### @navikt/aksel-icons

- Icons: :tada: New icons 'ArrowCirclepathReverse' and 'ArrowsAllDirections'. ([#3979](https://github.com/navikt/aksel/pull/3979))

### @navikt/ds-react

- Types: Exported `UseRangeDatepickerOptions` and `UseDatepickerOptions` types from Datepicker hooks. ([#3983](https://github.com/navikt/aksel/pull/3983))

## 7.27.1

### @navikt/ds-react

- Radio/Checkbox: :bug: Fix issue where label was not announced by screen readers in Firefox ([#3973](https://github.com/navikt/aksel/pull/3973))

- Stepper: Increase size of circle from 28px to 32px to sync with new Process component. ([#3968](https://github.com/navikt/aksel/pull/3968))

### @navikt/ds-css

- Stepper: Increase size of circle from 28px to 32px to sync with new Process component. ([#3968](https://github.com/navikt/aksel/pull/3968))

## 7.27.0

### @navikt/aksel-icons

- Icons: ChatAdd did not have 'currentColor' on parts of shape. ([#3963](https://github.com/navikt/aksel/pull/3963))

### @navikt/ds-react

- Darkside: Using 'Theme' to set current color-theme now works when root-node does not set light or dark class. ([#3961](https://github.com/navikt/aksel/pull/3961))

### @navikt/ds-tokens

- Darkside: Using 'Theme' to set current color-theme now works when root-node does not set light or dark class. ([#3961](https://github.com/navikt/aksel/pull/3961))

### @navikt/ds-css

- Combobox: Focus styling did not check for `:has` selector-support correctly. ([#3965](https://github.com/navikt/aksel/pull/3965))

## 7.26.0

### @navikt/aksel-icons

- Icons: New icons 'ChatAdd' and 'Theme'. ([#3958](https://github.com/navikt/aksel/pull/3958))

## 7.25.2

### @navikt/aksel

- CLI: Codemods now respect filepath globs instead of ignoring some based on file-extension. ([#3955](https://github.com/navikt/aksel/pull/3955))

## 7.25.1

### @navikt/ds-react

- Modal: When open, now updates body with correct className. ([#3922](https://github.com/navikt/aksel/pull/3922))

- Search: Forward 'data-color' to SearchButton. ([#3922](https://github.com/navikt/aksel/pull/3922))

### @navikt/ds-tokens

- Darkside: Updated Meta-lime 300 and 400. ([#3928](https://github.com/navikt/aksel/pull/3928))

## 7.25.0

### @navikt/ds-react

- FileUpload: Allow for custom buttons in FileUpload.Item. ([#3906](https://github.com/navikt/aksel/pull/3906))

* Chat: Removed ol > li semantics, replaced with 'div'. ([#3904](https://github.com/navikt/aksel/pull/3904))

### @navikt/ds-css

- FileUpload: Allow for custom buttons in FileUpload.Item. ([#3906](https://github.com/navikt/aksel/pull/3906))

* Table: Selected rows are now highlighted with outline. ([#3898](https://github.com/navikt/aksel/pull/3898))

* Chat: Removed ol > li semantics, replaced with 'div'. ([#3904](https://github.com/navikt/aksel/pull/3904))

## 7.24.0

### @navikt/ds-react

- LinkCard: :tada: Added new component 'LinkCard'. ([#3883](https://github.com/navikt/aksel/pull/3883))

- Table: :tada: Added prop 'stickyHeader', allowing header to remain sticky while scrolling in table. ([#3893](https://github.com/navikt/aksel/pull/3893))

* Switch: Size='small' are now visually comparable to radio and checkbox in the same size. ([#3892](https://github.com/navikt/aksel/pull/3892))

### @navikt/ds-css

- LinkCard: :tada: Added new component 'LinkCard'. ([#3883](https://github.com/navikt/aksel/pull/3883))

- Table: :tada: Added prop 'stickyHeader', allowing header to remain sticky while scrolling in table. ([#3893](https://github.com/navikt/aksel/pull/3893))

* Forms: Added built-in scroll-margin to TextField, Textarea and Select. ([#3897](https://github.com/navikt/aksel/pull/3897))

* Switch: Size='small' are now visually comparable to radio and checkbox in the same size. ([#3892](https://github.com/navikt/aksel/pull/3892))

### @navikt/aksel-stylelint

- Switch: Removed 'navds-switch\_\_checkmark' css class. ([#3892](https://github.com/navikt/aksel/pull/3892))

## 7.23.2

### @navikt/ds-css

- Darkside: Outline Tag in high-contrast mode had wrong text-color. ([#3889](https://github.com/navikt/aksel/pull/3889))

- Darkside: Update padding for all 'panel' type components. ([#3864](https://github.com/navikt/aksel/pull/3864))

- Form components: Fix edge case where description container would take up space when empty ([#3866](https://github.com/navikt/aksel/pull/3866))

## 7.23.1

### @navikt/ds-react

- Darkside: Search now correctly respects 'clearButton'-prop when set to false. ([#3854](https://github.com/navikt/aksel/pull/3854))

## 7.23.0

### @navikt/aksel-icons

- Icons: :tada: Added new icons 'SquareGrid' and 'SquareGridFill'. ([#3851](https://github.com/navikt/aksel/pull/3851))

### @navikt/ds-react

- Datepicker: Upgraded 'react-day-picker' dependency to v9.7.0 from v9.6.1. ([#3820](https://github.com/navikt/aksel/pull/3820))

- Darkside: Renamed 'data-color-role' dynamic theme attribute to 'data-color'. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: Using attribute 'data-color' with one of the built-in colors from 'AkselColorRole' now allows re-coloring most components. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: Adding type '@navikt/ds-react/types/theme' to your local 'tsconfig.json' types-field allows autocomplete for all available color-palettes in attribute 'data-color'. You can extend 'CustomAkselColor'-type to use your own color-palettes. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: All components has been updated to use 'data-color' attribute for coloring. As a side-effect, most component CSS is either updated or refactored. ([#3849](https://github.com/navikt/aksel/pull/3849))

* Timeline: Reverted regression that lead to 'aria-controls' being ignored when passed to Pin or Period. ([#3828](https://github.com/navikt/aksel/pull/3828))

* Timeline: Removed 'aria-haspopup' from pins and periods. ([#3834](https://github.com/navikt/aksel/pull/3834))

* ErrorSummary: Heading size is now 'xsmall' for non-medium sizes and remains 'small' when size='medium'. ([#3806](https://github.com/navikt/aksel/pull/3806))

### @navikt/ds-tokens

- Darkside: Renamed 'data-color-role' dynamic theme attribute to 'data-color'. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: 'Accent' is now set as the default color palette in components when no other options are set. ([#3849](https://github.com/navikt/aksel/pull/3849))

### @navikt/ds-css

- Darkside: Renamed 'data-color-role' dynamic theme attribute to 'data-color'. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: Using attribute 'data-color' with one of the built-in colors from 'AkselColorRole' now allows re-coloring most components. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: All components has been updated to use 'data-color' attribute for coloring. As a side-effect, most component CSS is either updated or refactored. ([#3849](https://github.com/navikt/aksel/pull/3849))

* Tag: Outline-variant now uses bg-moderate, replacing bg-moderateA. ([#3865](https://github.com/navikt/aksel/pull/3865))

* Darkside: Fix icon size in small Tabs ([#3850](https://github.com/navikt/aksel/pull/3850))

* List: Fix issue with incorrect padding in Safari ([#3850](https://github.com/navikt/aksel/pull/3850))

## 7.22.0

### @navikt/ds-react

- Box: Add support for new `radius`-tokens that will replace `borderRadius`-tokens when `darkside` is set as main. ([#3784](https://github.com/navikt/aksel/pull/3784))

* ConfirmationPanel: Now tagged as deprecated. [See documentation](https://aksel.nav.no/komponenter/legacy/confirmationpanel#99622218e7f0) for more information. ([#3789](https://github.com/navikt/aksel/pull/3789))

### @navikt/ds-tokens

- Border-radius: Add new `radius`-tokens that will replace `border-radius`-tokens. T-shirt sizing is replaced with numbers reflecting its value. `--a-border-radius-medium` is now `--ax-radius-4`. Until darkside-theming is mainlined, we will continue to support both new and legacy border-radius side by side. ([#3784](https://github.com/navikt/aksel/pull/3784))

### @navikt/ds-css

- Darkside: Components now use new `radius`-tokens, replacing `border-radius`-tokens. ([#3784](https://github.com/navikt/aksel/pull/3784))

### @navikt/ds-tailwind

- Border-radius: Removed `rounded`-value based on aksel token-config. Use built-in values from tailwindcss as replacement [Tailwindcss docs](https://tailwindcss.com/docs/border-radius). ([#3784](https://github.com/navikt/aksel/pull/3784))

### @navikt/aksel

- Darkside: Added migration-support for border-radius token update. ([#3784](https://github.com/navikt/aksel/pull/3784))

## 7.21.1

### @navikt/ds-react

- ExpansionCard: Omit `onToggle` from extending `HTMLAttributes<HTMLDivElement>` to avoid overlapping with popover api. ([#3773](https://github.com/navikt/aksel/pull/3773))

### @navikt/ds-css

- Timeline: Add focus-markings to Popover dialogs. ([#3768](https://github.com/navikt/aksel/pull/3768))

## 7.21.0

### @navikt/aksel-icons

- Icons: New icon 'Cpu'. ([#3740](https://github.com/navikt/aksel/pull/3740))

### @navikt/ds-react

- Chat: Add 'toptextHeadingLevel'-prop to allow changing h-level based on semantics. ([#3739](https://github.com/navikt/aksel/pull/3739))

### @navikt/ds-css

- Darkside: Update Chips.Toggle hover-border. ([#3738](https://github.com/navikt/aksel/pull/3738))

## 7.20.0

### @navikt/ds-react

- Combobox: Use option-value as `id` instead of `label`. ([#3735](https://github.com/navikt/aksel/pull/3735))

- Timeline: Add `placement`-prop for periods for more fine-grained control over Popover-placement. ([#3736](https://github.com/navikt/aksel/pull/3736))

### @navikt/ds-css

- Combobox: Use option-value as `id` instead of `label`. ([#3735](https://github.com/navikt/aksel/pull/3735))

## 7.19.1

### @navikt/ds-react

- Darkside: Using `Page`-component would always give errors when using new `Theme`-component. ([`208adb8`](https://github.com/navikt/aksel/commit/208adb8b3f1a93a872782a8f309fed65b6b112d2))

### @navikt/ds-css

- Combobox: Singleselect selected value now uses the complete input-width when possible. ([#3734](https://github.com/navikt/aksel/pull/3734))

## 7.19.0

### @navikt/ds-react

- Darkside: `<Theme />`-component no longer defaults to `light`-theme className when no theme is provided. ([#3720](https://github.com/navikt/aksel/pull/3720))

### @navikt/ds-tokens

- Darkside: Update global 'meta-purple' color. ([#3703](https://github.com/navikt/aksel/pull/3703))

### @navikt/ds-css

- Darkside: Togglegroup now has bg-input background. ([#3715](https://github.com/navikt/aksel/pull/3715))

- Combobox: Fix wrapping issue when ToggleListButton is hidden ([#3727](https://github.com/navikt/aksel/pull/3727))

## 7.18.0

### @navikt/ds-react

- Darkside: Throw error if invalid Box-props are used with new Theme instead of warnings. ([#3697](https://github.com/navikt/aksel/pull/3697))

### @navikt/ds-css

- Table: Disabled expansion-rows now has same hover-effect as other rows. ([#3702](https://github.com/navikt/aksel/pull/3702))

## 7.17.4

### @navikt/ds-css

- Modal: Updated animations for reduced movement. ([#3671](https://github.com/navikt/aksel/pull/3671))

## 7.17.3

### @navikt/ds-react

- Datepicker: Fixed a bug where while ranged datepicker, setting `from` to `undefined` while `to` were defined did not allow selecting new dates. ([#3655](https://github.com/navikt/aksel/pull/3655))

### @navikt/ds-css

- Darkside: Synced padding with Figma. ([#3651](https://github.com/navikt/aksel/pull/3651))

## 7.17.2

### @navikt/ds-css

- Darkside: Removed stacking backgrounds with transparency in Combobox. ([`e769eed`](https://github.com/navikt/aksel/commit/e769eed269d327403b89935502f8fe431eca8cc9))

## 7.17.1

### @navikt/ds-css

- ExpansionCard: Fixed bug where `@media print` would hide header content. ([#3634](https://github.com/navikt/aksel/pull/3634))

## 7.17.0

### @navikt/ds-react

- List: aria-label and aria-labelledby is forwarded to list-element. ([#3626](https://github.com/navikt/aksel/pull/3626))

## 7.16.1

### @navikt/ds-react

- React 19: Resolve unknown-type in Slot. ([#3627](https://github.com/navikt/aksel/pull/3627))

## 7.16.0

### @navikt/ds-css

- Darkside: All classNames are now starts with `.aksel` instead of `.navds`. ([#3586](https://github.com/navikt/aksel/pull/3586))

## 7.15.0

### @navikt/aksel

- CLI: Added primitives migration to new space-tokens. Run `npx @navikt/aksel migration primitive-spacing` to start migrating now. This update is supported for old and new (darkside) system. ([#3597](https://github.com/navikt/aksel/pull/3597))

- CLI: Added js/ts migration to new space-tokens. Run `npx @navikt/aksel migration token-spacing-js` to start migrating now. This update is supported for old and new (darkside) system. ([#3597](https://github.com/navikt/aksel/pull/3597))

## 7.14.3

### @navikt/ds-css

- Darkside: Changed outline-offset for tabpanel from -4px to -3px. ([`06fecf2`](https://github.com/navikt/aksel/commit/06fecf2af1972a5d06ea452fc5b7431b064e1fc0))

## 7.14.2

### @navikt/ds-tokens

- Darkside: :lipstick: Bumped `bg-raised` token to `neutral-200` in darkmode. ([`441d8b7`](https://github.com/navikt/aksel/commit/441d8b732cb4820e6fe37ad87200c5b5eb31e5cf))

## 7.14.1

### @navikt/ds-react

- Datepicker: Fixed regression where some fromDate/toDate instances lead to that date ending up as disabled. ([#3602](https://github.com/navikt/aksel/pull/3602))

## 7.14.0

### @navikt/aksel-icons

- Icons: :tada: New icons `LineHeight`, `SpaceHorizontal` and `SpaceVertical`. ([#3587](https://github.com/navikt/aksel/pull/3587))

### @navikt/ds-react

- DatePicker: Refactored locally to support `react-day-picker v9`. No external API has been changed. ([#3525](https://github.com/navikt/aksel/pull/3525))

- MonthPicker: Refactored locally and no longer depends on `react-day-picker v9`. No external API has been changed. ([#3525](https://github.com/navikt/aksel/pull/3525))

- Dependencies: `react-day-picker` bumped to `v9.5.0`. ([#3525](https://github.com/navikt/aksel/pull/3525))

- Dependencies: `date-fns` bumped to `^4.0.0`. ([#3525](https://github.com/navikt/aksel/pull/3525))

* Darkside: Added 'arrow' back to Tooltip. ([#3589](https://github.com/navikt/aksel/pull/3589))

### @navikt/ds-css

- DatePicker: Updated `date.css` to support `react-day-picker v9`. ([#3525](https://github.com/navikt/aksel/pull/3525))

* Darkside: Added 'arrow' back to Tooltip. ([#3589](https://github.com/navikt/aksel/pull/3589))

## 7.13.0

### @navikt/aksel-icons

- Icons: :tada: New icons `ExpandVertical` and `QuestionmarkCircle` ([#3583](https://github.com/navikt/aksel/pull/3583))

### @navikt/ds-react

- Darkside: Added support for `ConfirmationpPanel`, `Linkpanel`, `Panel` and `Dropdown`. Note that all of these will be deprecated in the future. ([#3581](https://github.com/navikt/aksel/pull/3581))

### @navikt/ds-css

- Darkside: Added support for `ConfirmationpPanel`, `Linkpanel`, `Panel` and `Dropdown`. Note that all of these will be deprecated in the future. ([#3581](https://github.com/navikt/aksel/pull/3581))

### @navikt/ds-tailwind

- Tailwind: Added `darkside`-support with import `@navikt/ds-tailwind/darkside-tw3`. ([#3580](https://github.com/navikt/aksel/pull/3580))

## 7.12.2

### @navikt/ds-react

- Box: Added export for `BoxNew`. ([`8576400`](https://github.com/navikt/aksel/commit/857640026368153b64171f1cf954b9abac493ee8))

## 7.12.1

### @navikt/ds-react

- Theme: Theme-prop is now optional. ([`f269311`](https://github.com/navikt/aksel/commit/f269311dbbeb09e8fa0ba93a19aa430f0dd17255))

## 7.12.0

### @navikt/ds-react

- List: Marked `title`, `headingTag` and `description` properties as deprecated. These will not be supported in future versions and should be migrated from when possible. ([#3537](https://github.com/navikt/aksel/pull/3537))

* Table: Updated sorting icons for ascending and descending. ([#3536](https://github.com/navikt/aksel/pull/3536))

## 7.11.0

### @navikt/aksel-icons

- Icons: Added new icons 'SortUp' and 'SortDown' 🎉. ([#3528](https://github.com/navikt/aksel/pull/3528))

### @navikt/ds-css

- ExpansionCard: Removed dynamic padding on button-element. ([#3532](https://github.com/navikt/aksel/pull/3532))

- Modal: Defaults to `margin: auto` for tailwind 4 support. ([#3532](https://github.com/navikt/aksel/pull/3532))

## 7.10.0

### @navikt/ds-react

- Table: New prop `contentGutter` added to `ExpandableRow`-component. This allows user more control for content layout inside expandable element. ([#3507](https://github.com/navikt/aksel/pull/3507))

* Combobox: Always render `maxSelected` message when `isMultiSelect` is set. ([#3506](https://github.com/navikt/aksel/pull/3506))

### @navikt/ds-css

- Table: New prop `contentGutter` added to `ExpandableRow`-component. This allows user more control for content layout inside expandable element. ([#3507](https://github.com/navikt/aksel/pull/3507))

* Button: Using `<Loader />` within `icon`-prop now supported. ([#3515](https://github.com/navikt/aksel/pull/3515))

* Combobox: Always render `maxSelected` message when `isMultiSelect` is set. ([#3506](https://github.com/navikt/aksel/pull/3506))

## 7.9.2

### @navikt/ds-css

- Table: Removed border-bottom for HeaderCell used in ExpandableRow. ([#3503](https://github.com/navikt/aksel/pull/3503))

## 7.9.1

### @navikt/ds-css

- Link: :bug: Use inside Alert got wrong text-color while focused or active. ([#3489](https://github.com/navikt/aksel/pull/3489))

## 7.9.0

### @navikt/ds-react

- ErrorSummary: :sparkles: new prop to prefix error with a warning icon. ([#3445](https://github.com/navikt/aksel/pull/3445))
  All form components: replace dot with warning icon in error message.

* Button: Fix edge-case where setting "loading={true}" in a Modal caused the button to get 0 width and not show spinner ([#3252](https://github.com/navikt/aksel/pull/3252))

* Switch: Update switch to better reflect unchecked state. ([#3468](https://github.com/navikt/aksel/pull/3468))

* Textarea: resize immediately upon receiving resize event (eg. inside modal opening). ([#3463](https://github.com/navikt/aksel/pull/3463))

### @navikt/ds-css

- ErrorSummary: :sparkles: new prop to prefix error with a warning icon. ([#3445](https://github.com/navikt/aksel/pull/3445))
  All form components: replace dot with warning icon in error message.

* Switch: Update switch to better reflect unchecked state. ([#3468](https://github.com/navikt/aksel/pull/3468))

* Select: :bug: Focus-border no longer cancels out error-border. ([#3465](https://github.com/navikt/aksel/pull/3465))

* Textarea: :bug: Focus-border no longer cancels out error-border. ([#3465](https://github.com/navikt/aksel/pull/3465))

## 7.8.1

### @navikt/ds-react

- Combobox: Only open dropdown-list onClick, not onFocus. ([#3440](https://github.com/navikt/aksel/pull/3440))

- Combobox: Fix issue where you could select more options than defined in maxSelected ([#3434](https://github.com/navikt/aksel/pull/3434))

- Timeline: In cases where earliest found date were after current date, timeline-start ended up defaulting to current date. ([#3458](https://github.com/navikt/aksel/pull/3458))

### @navikt/ds-css

- Alert: Link-components used within Alert variant='inline' now preserves default coloring ([#3461](https://github.com/navikt/aksel/pull/3461))

- Table: :fire: Removed cursor 'pointer' when 'ExpandableRow' is disabled. ([#3462](https://github.com/navikt/aksel/pull/3462))

## 7.8.0

### @navikt/ds-react

- Chips.Removable: Removed prop `removeLabel` ([#3429](https://github.com/navikt/aksel/pull/3429))

- i18n: :sparkles: Implemented i18n support for all components. Components come with support for nb, nn and en locales ([Docs](https://aksel.nav.no/komponenter/core/provider#84d7ea5ec517)) ([#3429](https://github.com/navikt/aksel/pull/3429))

- Combobox: Removed clear button, removed tokens staring with `--ac-combobox-clear`, deprecated props `clearButton`/`clearButtonLabel`. ([#3433](https://github.com/navikt/aksel/pull/3433))

- Combobox: Changed prop `maxSelected` to number ([#3433](https://github.com/navikt/aksel/pull/3433))

- DatePicker/MonthPicker: Added new `translations` prop and deprecated `locale` prop ([#3429](https://github.com/navikt/aksel/pull/3429))

* Timeline: Deprecated prop `axisLabelTemplates`. Use [Provider](https://aksel.nav.no/komponenter/core/provider#84d7ea5ec517) if you still need to change the date formats. ([#3429](https://github.com/navikt/aksel/pull/3429))

* Search: Deprecated prop `clearButtonLabel`. Use [Provider](https://aksel.nav.no/komponenter/core/provider#84d7ea5ec517) if you still need to change the label. ([#3429](https://github.com/navikt/aksel/pull/3429))

* Textarea: Deprecated prop `i18n`. Use [Provider](https://aksel.nav.no/komponenter/core/provider#84d7ea5ec517) if you still need to change these texts. ([#3429](https://github.com/navikt/aksel/pull/3429))

### @navikt/ds-css

- Combobox: Removed clear button, removed tokens staring with `--ac-combobox-clear`, deprecated props `clearButton`/`clearButtonLabel`. ([#3433](https://github.com/navikt/aksel/pull/3433))

* CSS: Resolved regression where the complete stylesheet was included in scoped 'components.css' file. ([#3427](https://github.com/navikt/aksel/pull/3427))

### @navikt/aksel-stylelint

- Combobox: Removed clear button, removed tokens staring with `--ac-combobox-clear`, deprecated props `clearButton`/`clearButtonLabel`. ([#3433](https://github.com/navikt/aksel/pull/3433))

## 7.7.0

### @navikt/ds-react

- CopyButton: Removed prop `activeTitle`. Use `activeText` instead. ([#3426](https://github.com/navikt/aksel/pull/3426))

- Combobox: :boom: Removed prop `toggleListButtonLabel` ([#3409](https://github.com/navikt/aksel/pull/3409))

* Combobox: Hid buttons from screen readers, added `title` on clear button, removed sr-only text on toggle list button. ([#3409](https://github.com/navikt/aksel/pull/3409))

* InternalHeader.UserButton: Remove `title`-attribute on icon and improved types. ([#3424](https://github.com/navikt/aksel/pull/3424))

* CopyButton: Fix issue where state changes are announced multiple times using VO in Chrome ([#3374](https://github.com/navikt/aksel/pull/3374))

## 7.6.0

### @navikt/aksel-icons

- Icons: Added new icons 'TruckPercent' and 'ShieldCheckmark' 🎉. ([#3416](https://github.com/navikt/aksel/pull/3416))

### @navikt/ds-react

- ActionMenu: Added 'align'-prop to 'ActionMenu.Content'. This allows menu to 'start' or 'end' align in reference to anchor. ([#3414](https://github.com/navikt/aksel/pull/3414))

- ReadMore: Added size 'large'. ([#3372](https://github.com/navikt/aksel/pull/3372))

* DatePicker/MonthPicker: Remove pointerEvents=none on CalendarIcon so that the title shows up as tooltip on hover ([#3390](https://github.com/navikt/aksel/pull/3390))

* Combobox: Single-select now shows cursor closer to selected item. ([#3384](https://github.com/navikt/aksel/pull/3384))

### @navikt/ds-css

- ReadMore: Added size 'large'. ([#3372](https://github.com/navikt/aksel/pull/3372))

* Select: Now shows focus-outline when ':focus' is set trough pointer or label in all browsers. Chrome and Firefox handles `:focus-visible` differently for 'select', previously causing outline-border not to show in Firefox. ([#3415](https://github.com/navikt/aksel/pull/3415))

* Modal: Don't add scroll shadow when polyfilled ([#3408](https://github.com/navikt/aksel/pull/3408))

* Modal: Now shows up while screensharing with Vergic ([#3407](https://github.com/navikt/aksel/pull/3407))

* FileUpload: Remove browser styling from FileUpload.Item when used in list. ([#3413](https://github.com/navikt/aksel/pull/3413))

* Combobox: Single-select now shows cursor closer to selected item. ([#3384](https://github.com/navikt/aksel/pull/3384))

## 7.5.3

### @navikt/ds-react

- Allow RC versions of React 19 through peerDependencies ([#3391](https://github.com/navikt/aksel/pull/3391))

## 7.5.2

### @navikt/ds-react

- Combobox: Fix issue where using arrow keys in list would make the entire page scroll ([#3364](https://github.com/navikt/aksel/pull/3364))

### @navikt/ds-css

- Combobox: Fix issue where using arrow keys in list would make the entire page scroll ([#3364](https://github.com/navikt/aksel/pull/3364))

## 7.5.1

### @navikt/aksel

- Chore: Manually bump version to sync npm and github-releases ([`aa7c2d9`](https://github.com/navikt/aksel/commit/aa7c2d9598434d6304432daa20e0a1eeedd03b1b))

## 7.5.0

### @navikt/aksel-icons

- Icons: 🎉 Added FileJpeg, FilePng and MedicalThermometer. ([#3332](https://github.com/navikt/aksel/pull/3332))

### @navikt/ds-react

- React: Allow all react versions above 17.0.0 trough peerDependencies. ([#3334](https://github.com/navikt/aksel/pull/3334))

* Datepicker: Use of 'open'-prop set to 'true' on first render could lead to the dialog not opening. ([#3333](https://github.com/navikt/aksel/pull/3333))

## 7.4.3

### @navikt/ds-react

- Pagination: More precise type for renderItem ([#3275](https://github.com/navikt/aksel/pull/3275))

### @navikt/ds-css

- Table.ColumnHeader: Inherit text alignment in button ([#3319](https://github.com/navikt/aksel/pull/3319))

## 7.4.2

### @navikt/ds-react

- Combobox: Pressing 'Enter' after canceling autocomplete could result in using matching options in list. ([#3306](https://github.com/navikt/aksel/pull/3306))

## 7.4.1

### @navikt/ds-react

- Tabs.List: Remove redundant icon titles ([#3282](https://github.com/navikt/aksel/pull/3282))

- Combobox: onToggleSelected is now called with correct value when autocomplete and new values are allowed. ([#3287](https://github.com/navikt/aksel/pull/3287))

- Combobox: :bug: Fix scroll issue when using arrow keys to navigate list ([#3269](https://github.com/navikt/aksel/pull/3269))

- Search: Remove redundant role attribute ([#3280](https://github.com/navikt/aksel/pull/3280))

- Monthpicker: Add allowed input format 'MMyyyy'. ([#3285](https://github.com/navikt/aksel/pull/3285))

### @navikt/ds-css

- Combobox: :bug: Fix scroll issue when using arrow keys to navigate list ([#3269](https://github.com/navikt/aksel/pull/3269))

## 7.4.0

### @navikt/ds-react

- Combobox: Enable option to add a new value while autocompleting and highlight matches in FilteredOptions. ([#3225](https://github.com/navikt/aksel/pull/3225))

* Date/MonthPicker: Upgrade react-day-picker to fix issue with React 19 ([#3268](https://github.com/navikt/aksel/pull/3268))

* Combobox: Don't scroll when browsing list with mouse ([#3265](https://github.com/navikt/aksel/pull/3265))

* Avoid warning about element.ref in React 19 ([#3268](https://github.com/navikt/aksel/pull/3268))

* Checkbox: Remove redundant attribute aria-checked ([#3274](https://github.com/navikt/aksel/pull/3274))

## 7.3.1

### @navikt/ds-react

- Combobox: :bug: Remove virtual focus on input blur instead of moving it ([#3261](https://github.com/navikt/aksel/pull/3261))

### @navikt/ds-css

- Updated to Selectors Level 4 syntax. ([#3250](https://github.com/navikt/aksel/pull/3250))

## 7.3.0

### @navikt/ds-react

- ActionMenu: :tada: New component! Replaces DropdownMenu as the go-to solution for floating menus. Includes support for grouping, sub-menus, checkboxes, radios and dividers. Read more in the [documentation](https://aksel.nav.no/komponenter/core/actionmenu). ([#3081](https://github.com/navikt/aksel/pull/3081))

* Accordion: Remove redundant icon title ([#3230](https://github.com/navikt/aksel/pull/3230))

* Modal: Close button now avoids triggering when repeated keystrokes are detected. This helps stop accidental closing of Modal when 'Enter'-key is held down. ([#3081](https://github.com/navikt/aksel/pull/3081))

### @navikt/ds-css

- ActionMenu: :tada: New component! Replaces DropdownMenu as the go-to solution for floating menus. Includes support for grouping, sub-menus, checkboxes, radios and dividers. Read more in the [documentation](https://aksel.nav.no/komponenter/core/actionmenu). ([#3081](https://github.com/navikt/aksel/pull/3081))

* List.Item: Center icon horizontally inside it's container ([#3253](https://github.com/navikt/aksel/pull/3253))

## 7.2.1

### @navikt/ds-react

- Combobox: Disable autocomple in Firefox on Android to prevent bug ([#3201](https://github.com/navikt/aksel/pull/3201))

- Combobox: Support PageUp/PageDown in dropdown list. ([#3158](https://github.com/navikt/aksel/pull/3158))

### @navikt/ds-css

- Combobox: Support PageUp/PageDown in dropdown list. ([#3158](https://github.com/navikt/aksel/pull/3158))

## 7.2.0

### @navikt/ds-react

- FileUpload: :boom: Remove UNSAFE-prefix ([#3205](https://github.com/navikt/aksel/pull/3205))

- List: :sparkles: New size 'large' ([#3207](https://github.com/navikt/aksel/pull/3207))

* Performance: :zap: Optimized memoization for rerendring in some components. ([#3197](https://github.com/navikt/aksel/pull/3197))

## 7.1.2

### @navikt/ds-css

- List: Explicitly set list-style on ol to override reset-CSS ([#3202](https://github.com/navikt/aksel/pull/3202))

## 7.1.1

### @navikt/ds-react

- List: Add indentation and remove overly verbose aria attributes ([#3184](https://github.com/navikt/aksel/pull/3184))

- Combobox: :bug: implement missing readonly and disabled ([#3180](https://github.com/navikt/aksel/pull/3180))

### @navikt/ds-css

- List: Add indentation and remove overly verbose aria attributes ([#3184](https://github.com/navikt/aksel/pull/3184))

- Datepicker/Select: :lipstick: dim non-interactable icons when readonly is set. ([#3187](https://github.com/navikt/aksel/pull/3187))

- Combobox: :bug: implement missing readonly and disabled ([#3180](https://github.com/navikt/aksel/pull/3180))

### @navikt/aksel-stylelint

- List: :boom: Removed class names "navds-list--nested" and "navds-list\_\_item-content" ([#3184](https://github.com/navikt/aksel/pull/3184))

## 7.1.0

### @navikt/ds-react

- Pagination: :lipstick: Updated font-weight to 600 and marked 'page'-prop on 'Item' as deprecated. ([#3164](https://github.com/navikt/aksel/pull/3164))

* Combobox: :label: Better typing for maxSelected prop ([#3169](https://github.com/navikt/aksel/pull/3169))

* ErrorSummary: Remove aria-attributes. ([#3171](https://github.com/navikt/aksel/pull/3171))

### @navikt/ds-css

- Accordion: Remove 'relative' positioning when focused. This resolves some issues where floating elements like popover ended up clipping. ([`9c1eba445`](https://github.com/navikt/aksel/commit/9c1eba44508f295cc6261ff96822b18557bd7ddc))

### @navikt/aksel-stylelint

- Pagination: :boom: Added some classNames to list of deprecated (removed) classes. ([#3164](https://github.com/navikt/aksel/pull/3164))

## 7.0.1

### @navikt/ds-react

- Combobox: Fix issue with whitespace in the ID of options with multiple spaces ([#3162](https://github.com/navikt/aksel/pull/3162))

### @navikt/ds-css

- List: :lipstick: make icons 24x24px large ([#3148](https://github.com/navikt/aksel/pull/3148))

## 7.0.0

### @navikt/aksel-icons

- Icons: Removed renamed icons. [See migration guide for changes](https://aksel.nav.no/grunnleggende/kode/migrering#194b60833d9e). ([#3139](https://github.com/navikt/aksel/pull/3139))

### @navikt/ds-react

- ErrorSummary: Added fallback text for `heading`. ([#3139](https://github.com/navikt/aksel/pull/3139))

- Tooltip: :boom: Updated labeling of items inside Tooltip. [See migration guide for how to update](https://aksel.nav.no/grunnleggende/kode/migrering#3b5cf05fd100). ([#3139](https://github.com/navikt/aksel/pull/3139))

* ErrorSummary: Focus heading instead of container for improved experience with screen reader. ([#3139](https://github.com/navikt/aksel/pull/3139))

### @navikt/ds-css

- ErrorSummary: Focus heading instead of container for improved experience with screen reader. ([#3139](https://github.com/navikt/aksel/pull/3139))

### @navikt/ds-tailwind

- Tailwind: Extended 'screens'-config in theme to match Aksel breakpoints. Tailwind and Primitives can now be used side by side with matching dynamic breakpoints. [See migration guide for potential issues when adopting](https://aksel.nav.no/grunnleggende/kode/migrering#3a2340f6f69b). ([#3139](https://github.com/navikt/aksel/pull/3139))

## 6.17.0

### @navikt/aksel-icons

- Icons: New 'face' icons for 'Engagement'-category. ([#3134](https://github.com/navikt/aksel/pull/3134))

### @navikt/ds-react

- Combobox: Add support for `onBlur`, and omit props that have no effect. ([#3125](https://github.com/navikt/aksel/pull/3125))

## 6.16.3

### @navikt/aksel-icons

- Icons: Updated Clipboard icons. ([#3113](https://github.com/navikt/aksel/pull/3113))

### @navikt/ds-react

- Combobox :children_crossing: single select now hides selected value when typing, onBlur clears input ([#3124](https://github.com/navikt/aksel/pull/3124))

- Combobox: :lipstick: hide caret on select ([#3071](https://github.com/navikt/aksel/pull/3071))

- :bug: Combobox: trailing spaces no longer work like wildcards for autocomplete suggestions ([#3105](https://github.com/navikt/aksel/pull/3105))

- Fixed bug in Combobox where the wrong option was selected on Enter if the autocompleted word was not the first in FilteredOptions ([#3110](https://github.com/navikt/aksel/pull/3110))

### @navikt/ds-css

- Combobox: :lipstick: hide caret on select ([#3071](https://github.com/navikt/aksel/pull/3071))

## 6.16.2

### @navikt/ds-css

- Font: Reverted change introduced in v6.14 where font locations were changed. This caused a regression where every preload-instance to old font locations no longer worked. ([#3114](https://github.com/navikt/aksel/pull/3114))

## 6.16.1

### @navikt/ds-react

- Table: Corrected the type of onSortChange ([#3103](https://github.com/navikt/aksel/pull/3103))

- :adhesive_bandage: Combobox: Placeholder goes away when an option is selected ([#3101](https://github.com/navikt/aksel/pull/3101))

- Table: Fixed background-clipping when using ExpandableRow. ([#3095](https://github.com/navikt/aksel/pull/3095))

### @navikt/ds-css

- Table: Fixed background-clipping when using ExpandableRow. ([#3095](https://github.com/navikt/aksel/pull/3095))

### @navikt/aksel

- Aksel-CLI: Bump jscodeshift-add-imports to 1.0.11. ([#3099](https://github.com/navikt/aksel/pull/3099))

## 6.16.0

### @navikt/ds-react

- Primitives: Added `gridColumn`-prop for more grid alignment control. ([#3082](https://github.com/navikt/aksel/pull/3082))

### @navikt/ds-tokens

- Tokens: Adjusted Green 400 to comply with AA 3.00 contrast. ([#3091](https://github.com/navikt/aksel/pull/3091))

### @navikt/ds-css

- Primitives: Added `gridColumn`-prop for more grid alignment control. ([#3082](https://github.com/navikt/aksel/pull/3082))

* FormSummary: Added background color ([#3093](https://github.com/navikt/aksel/pull/3093))

* Modal: Added scroll shadows ([#3083](https://github.com/navikt/aksel/pull/3083))

## 6.15.0

### @navikt/aksel-icons

- Icons: New icon-series for 'SplitHorizontal' and 'SplitVertical' ([#3072](https://github.com/navikt/aksel/pull/3072))

### @navikt/ds-react

- Combobox: Can no longer remove options with backspace when shouldShowSelectedOptions is false ([#3076](https://github.com/navikt/aksel/pull/3076))

- Refactored Combobox FilteredOptions ([#3073](https://github.com/navikt/aksel/pull/3073))

## 6.14.0

### @navikt/ds-react

- Breaking change: Combobox.onChange now receive only value as argument, instead of ChangeEvent ([#2974](https://github.com/navikt/aksel/pull/2974))

- Improved search in Combobox - find hits anywhere in the label ([#2974](https://github.com/navikt/aksel/pull/2974))

* Tabs, ToggleGroup: Rovingfocus now respects shift, alt, ctrl and meta-keys when navigating. ([#3041](https://github.com/navikt/aksel/pull/3041))

* Prevent NullPointer when adding a new/custom option in Combobox single-select ([#3054](https://github.com/navikt/aksel/pull/3054))

* Combobox: Entering an already selected option and pressing enter no longer removes it ([#3061](https://github.com/navikt/aksel/pull/3061))

* Combobox: Description is now connected to the input field via aria-describedby ([#3065](https://github.com/navikt/aksel/pull/3065))

* Prevent Escape in open Combobox from closing Modals ([#3053](https://github.com/navikt/aksel/pull/3053))

### @navikt/ds-tokens

- Fonts: Added built-in support for cyrillic, cyrillic-ext and latin-ext ([#3044](https://github.com/navikt/aksel/pull/3044))

### @navikt/ds-css

- Fonts: Added built-in support for cyrillic, cyrillic-ext and latin-ext ([#3044](https://github.com/navikt/aksel/pull/3044))

## 6.13.0

### @navikt/ds-react

- Modal: New prop `placement` for anchoring the modal to the top of the viewport. ([#3033](https://github.com/navikt/aksel/pull/3033))

### @navikt/ds-css

- Modal: New prop `placement` for anchoring the modal to the top of the viewport. ([#3033](https://github.com/navikt/aksel/pull/3033))

## 6.12.0

### @navikt/aksel-icons

- Icons: New icon ChildHairEyes ([#3020](https://github.com/navikt/aksel/pull/3020))

* Icons: FigureCombination icon adjusted ([#3031](https://github.com/navikt/aksel/pull/3031))

### @navikt/ds-react

- Primitives: Added support for padding, paddingInline, paddingBlock, margin, marginInline, marginBlock, width, minWidth, maxWidth, height, minHeight, maxHeight, position, inset, top, right, left, bottom, overflow, overflowX, overflowY, flexBasis, flexGrow, flexShrink to Box, HGrid and Stack. ([#3003](https://github.com/navikt/aksel/pull/3003))

* ToggleGroup: Selecting already selected value now avoids sending extra event ([#3012](https://github.com/navikt/aksel/pull/3012))

* Alert: Fix alignment, add prop for toggling content max-width, and adjust title on close icon. ([#3007](https://github.com/navikt/aksel/pull/3007))

### @navikt/ds-css

- Primitives: Added support for padding, paddingInline, paddingBlock, margin, marginInline, marginBlock, width, minWidth, maxWidth, height, minHeight, maxHeight, position, inset, top, right, left, bottom, overflow, overflowX, overflowY, flexBasis, flexGrow, flexShrink to Box, HGrid and Stack. ([#3003](https://github.com/navikt/aksel/pull/3003))

* Alert: Fix alignment, add prop for toggling content max-width, and adjust title on close icon. ([#3007](https://github.com/navikt/aksel/pull/3007))

## 6.11.0

### @navikt/ds-react

- FileUpload: Added description-prop for Item. ([#2975](https://github.com/navikt/aksel/pull/2975))

- Pagination: Added prop for hidden heading. ([#2976](https://github.com/navikt/aksel/pull/2976))

- ToggleGroup: Added props `icon` and `label` as a replacement for `children`. Children is marked as deprecated and will be removed in a future major-version. ([#2929](https://github.com/navikt/aksel/pull/2929))

* List: Changed List.Item to BodyLong, changed Item spacing from 1rem to 0.5rem. ([#2979](https://github.com/navikt/aksel/pull/2979))

* Page: Removed surface-subtle from background-prop ([#2987](https://github.com/navikt/aksel/pull/2987))

### @navikt/ds-css

- CopyButton: Icon is now 20px for size small and xsmall. ([#2977](https://github.com/navikt/aksel/pull/2977))

- Button: Updated icon size for size="small" to 1.25rem. ([#2984](https://github.com/navikt/aksel/pull/2984))

- List: Changed List.Item to BodyLong, changed Item spacing from 1rem to 0.5rem. ([#2979](https://github.com/navikt/aksel/pull/2979))

## 6.10.1

### @navikt/aksel-icons

- Icons: Added back support for sourcemapping. ([#2978](https://github.com/navikt/aksel/pull/2978))

### @navikt/ds-css

- :lipstick: Remove bottom margin on last item in Stepper and adjust FormProgress accordingly ([#2971](https://github.com/navikt/aksel/pull/2971))

## 6.10.0

### @navikt/ds-react

- ✨ Modal: add small version ([#2909](https://github.com/navikt/aksel/pull/2909))

### @navikt/ds-css

- ✨ Modal: add small version ([#2909](https://github.com/navikt/aksel/pull/2909))

## 6.9.0

### @navikt/aksel-icons

- Icons: New icons for geometric shapes ([#2927](https://github.com/navikt/aksel/pull/2927))

### @navikt/ds-react

- :bug: Modal: Fix issue where polyfill-classname was not applied when using SSR (Next.js) ([#2954](https://github.com/navikt/aksel/pull/2954))

- Combobox: Improved performance when parsing 1k or more options. ([#2937](https://github.com/navikt/aksel/pull/2937))

- Stepper: Removed unsafe_index prop. ([#2926](https://github.com/navikt/aksel/pull/2926))

- Added options row-reverse and column-reverse to direction prop on Stack. Should only be used with caution. ([#2876](https://github.com/navikt/aksel/pull/2876))

### @navikt/ds-css

- Increased padding size for contentBlockPadding on the Page primitive to 4 rem to reflect docs/Figma ([#2876](https://github.com/navikt/aksel/pull/2876))

- Fixed Combobox small sizing to align with other form fields ([#2801](https://github.com/navikt/aksel/pull/2801))

## 6.8.0

### @navikt/ds-react

- :sparkles: Ny komponent: FormProgress ([#2855](https://github.com/navikt/aksel/pull/2855))

* Stepper.Step: Set aria-current to "step" instead of true ([#2920](https://github.com/navikt/aksel/pull/2920))

### @navikt/ds-css

- :sparkles: Ny komponent: FormProgress ([#2855](https://github.com/navikt/aksel/pull/2855))

* HGrid: forenklet CSS. ([#2917](https://github.com/navikt/aksel/pull/2917))

## 6.7.1

### @navikt/ds-react

- Progressbar: Tweak API, examples, stories and css ([#2892](https://github.com/navikt/aksel/pull/2892))

- Combobox: Remove 'Ingen søketreff' when custom options allowed ([#2895](https://github.com/navikt/aksel/pull/2895))

- Datepicker, MonthPicker: Rekkefølgen på årstall i Select er reversert slik at siste år er øverst. Dette er endret for å være bedre tilpasset ekspertsystemer der de mest relevante årene ble vist lengst unna musepeker ved klikk. ([#2882](https://github.com/navikt/aksel/pull/2882))

### @navikt/ds-css

- Progressbar: Tweak API, examples, stories and css ([#2892](https://github.com/navikt/aksel/pull/2892))

## 6.7.0

### @navikt/ds-react

- :sparkles: Ny komponent: ProgressBar ([#2845](https://github.com/navikt/aksel/pull/2845))

### @navikt/ds-css

- :sparkles: Ny komponent: ProgressBar ([#2845](https://github.com/navikt/aksel/pull/2845))

* Checkbox, Radio: Erstatter `:focus-visible` med `:focus` for bedre UX brukt sammen med ErrorSummary. ([#2893](https://github.com/navikt/aksel/pull/2893))

* :lipstick: tweak CSS for timeline pins. ([#2889](https://github.com/navikt/aksel/pull/2889))

## 6.6.1

### @navikt/ds-react

- Spacer: Er nå `span` (tidligere `div`). ([#2874](https://github.com/navikt/aksel/pull/2874))

## 6.6.0

### @navikt/ds-react

- :sparkles: Ny komponent FormSummary ([#2802](https://github.com/navikt/aksel/pull/2802))

* Combobox: Prevents "Enter" while Combobox is focused from submitting form. ([#2861](https://github.com/navikt/aksel/pull/2861))

### @navikt/ds-css

- :sparkles: Ny komponent FormSummary ([#2802](https://github.com/navikt/aksel/pull/2802))

### @navikt/aksel

- Aksel CLI: Fjernet deprecated komponenter fra css oversikt. ([#2860](https://github.com/navikt/aksel/pull/2860))

## 6.5.0

### @navikt/ds-react

- Tabs: Ny prop `lazy` som rendrer innhold i TabPanel selv når panel er skjult (har fortsatt display:none) ([#2621](https://github.com/navikt/aksel/pull/2621))

- ToggleGroup: Erstattet bruk av dependency `@radix-ui/react-toggle-group` med egen implementasjon. ([#2620](https://github.com/navikt/aksel/pull/2620))

- Tabs: La til ny prop `fill` som lar Tabs.Tab-elementer strekke seg over tilgjengelig bredde. ([#2621](https://github.com/navikt/aksel/pull/2621))

- Tabs: Erstattet bruk av dependency `@radix-ui/react-tabs` med egen implementasjon. ([#2621](https://github.com/navikt/aksel/pull/2621))

* DatePicker/MonthPicker: Valgte datoer får nå `aria-pressed` for å bedre indikere valg for skjermleser. ([#2838](https://github.com/navikt/aksel/pull/2838))

* DatePicker/MonthPicker: `required`-prop stoppet ikke de-select av allerede valgt dato. ([#2838](https://github.com/navikt/aksel/pull/2838))

* ToggleGroup: La til ny prop `fill` som strekker ToggleGroup til å ta opp all tilgjengelig bredde. ([#2620](https://github.com/navikt/aksel/pull/2620))

## 6.4.1

### @navikt/ds-css

- FileUpload: Item-illustrasjon er nå radius-full ([#2834](https://github.com/navikt/aksel/pull/2834))

## 6.4.0

### @navikt/ds-react

- FileUpload.Item: :boom: Endret API og støtte for å sette ID på knappen ([#2824](https://github.com/navikt/aksel/pull/2824))

## 6.3.6

### @navikt/ds-react

- DatePicker: Fjernet role gridcell fra dato-knapper. ([#2826](https://github.com/navikt/aksel/pull/2826))

## 6.3.5

### @navikt/ds-react

- Modal: Fjern tomt element ([#2819](https://github.com/navikt/aksel/pull/2819))

## 6.3.4

### @navikt/ds-react

- Switch: Fikset edgecase der checked Switch var visuelt unchecked ([#2810](https://github.com/navikt/aksel/pull/2810))

- FileUpload.Dropzone: id prop settes på button ([#2817](https://github.com/navikt/aksel/pull/2817))

### @navikt/ds-css

- ReadMore: Padding-right på button er bumpet noen px ([#2806](https://github.com/navikt/aksel/pull/2806))

## 6.3.3

### @navikt/ds-react

- FileUpload.Dropzone: Fiks feil med duplisert id ([#2805](https://github.com/navikt/aksel/pull/2805))

- useDatePicker: `isInvalid`-key i onValidate var hadde flipper boolean i noen tilfeller ([#2809](https://github.com/navikt/aksel/pull/2809))

## 6.3.2

### @navikt/ds-react

- FileUpload: Fiks feil ved import av json ([#2803](https://github.com/navikt/aksel/pull/2803))

## 6.3.1

### @navikt/ds-react

- FileUpload: Disabled dropzone stopper opplasting ([#2798](https://github.com/navikt/aksel/pull/2798))

## 6.3.0

### @navikt/ds-react

- Allow Combobox options as objects to support separate display text and value ([#2716](https://github.com/navikt/aksel/pull/2716))

- FileUpload: Ny komponent `FileUpload` for å håndtere opplasting av filer, Dropzone og fil-visning ([#2504](https://github.com/navikt/aksel/pull/2504))

### @navikt/ds-css

- FileUpload: Ny komponent `FileUpload` for å håndtere opplasting av filer, Dropzone og fil-visning ([#2504](https://github.com/navikt/aksel/pull/2504))

## 6.2.0

### @navikt/aksel-icons

- Ikoner: Nytt ikon `archive` ([#2772](https://github.com/navikt/aksel/pull/2772))

- Ikoner: Nytt ikon `opensource` ([#2787](https://github.com/navikt/aksel/pull/2787))

### @navikt/ds-react

- Select: Fjern 'multiple' fra SelectProps ([#2782](https://github.com/navikt/aksel/pull/2782))

## 6.1.1

### @navikt/ds-react

- Modal: Fikser uønsket lukking ved klikk-og-dra mellom backdrop og modal (f.eks. ved markering av tekst) dersom `closeOnBackdropClick` er `true`. ([#2752](https://github.com/navikt/aksel/pull/2752))

- Modal: Endre title på lukkeknapp til bare 'Lukk' ([#2688](https://github.com/navikt/aksel/pull/2688))

### @navikt/ds-css

- Link: Fjern hover-farge ([#2767](https://github.com/navikt/aksel/pull/2767))

- Modal: Får nå fokus når åpnes i Safari ([#2688](https://github.com/navikt/aksel/pull/2688))

## 6.1.0

### @navikt/ds-react

- Komponenter støtter nå lokal import `@navikt/ds-react/Button`, [Dokumentasjon](https://aksel.nav.no/grunnleggende/kode/nextjs). ([#2745](https://github.com/navikt/aksel/pull/2745))

* Modal: Bedre feilmeldinger ved feil bruk av props ([#2744](https://github.com/navikt/aksel/pull/2744))

* Modal: Ikke opphev scroll lock ved lukking av nesta modal (DatePicker) ([#2743](https://github.com/navikt/aksel/pull/2743))

## 6.0.0

### @navikt/aksel-icons

- ESM: ds-react og aksel-icons støtter nå native ESM 🎉 ([#2623](https://github.com/navikt/aksel/pull/2623))

* SSR: ds-react og aksel-icons støtter nå `use client` og kan brukes i nextjs app-router uten lokal re-eksportering. ([#2623](https://github.com/navikt/aksel/pull/2623))

### @navikt/ds-react

- Chat: Fjernet deprecated props `backgroundColor` og `avatarBgColor`. Bruk prop `variant` som erstatning. ([#2623](https://github.com/navikt/aksel/pull/2623))

- Search: Fjern 'type' fra SearchProps ([#2623](https://github.com/navikt/aksel/pull/2623))

- Tokens: La til nytt brekkpunkt `2xl` for `1440px`. Alle primitives er oppdatert for å reflektere oppdateringen. Brukere av Tailwind vil måtte sjekke at overskriving av `screen: "2xl"` ikke brekker app. ([#2623](https://github.com/navikt/aksel/pull/2623))

- ESM: ds-react og aksel-icons støtter nå native ESM 🎉 ([#2623](https://github.com/navikt/aksel/pull/2623))

- OverridableComponent: Fikset feil som tillot vilkårlige props ([#2623](https://github.com/navikt/aksel/pull/2623))

- Grid, ContentContainer: Komponenter er fjernet fra systemet. [Se migreringsguide](https://aksel.nav.no/grunnleggende/kode/migrering#dd2cfa9fb1d1). ([#2623](https://github.com/navikt/aksel/pull/2623))

- Table: SortState.direction har nå `none` tilgjengelig: `"ascending" | "descending" | "none"` ([#2623](https://github.com/navikt/aksel/pull/2623))

- Textarea: Fjernet div med klassen navds-textarea\_\_wrapper ([#2623](https://github.com/navikt/aksel/pull/2623))

- Modal: Strengere prop-typer ([#2623](https://github.com/navikt/aksel/pull/2623))

* SSR: ds-react og aksel-icons støtter nå `use client` og kan brukes i nextjs app-router uten lokal re-eksportering. ([#2623](https://github.com/navikt/aksel/pull/2623))

### @navikt/ds-tokens

- Tokens: La til nytt brekkpunkt `2xl` for `1440px`. Alle primitives er oppdatert for å reflektere oppdateringen. Brukere av Tailwind vil måtte sjekke at overskriving av `screen: "2xl"` ikke brekker app. ([#2623](https://github.com/navikt/aksel/pull/2623))

- Tokens: Fjernet token `--a-z-index-modal` da den ikke lengre blir konsumert i systemet. ([#2623](https://github.com/navikt/aksel/pull/2623))

### @navikt/ds-css

- Tokens: La til nytt brekkpunkt `2xl` for `1440px`. Alle primitives er oppdatert for å reflektere oppdateringen. Brukere av Tailwind vil måtte sjekke at overskriving av `screen: "2xl"` ikke brekker app. ([#2623](https://github.com/navikt/aksel/pull/2623))

- Grid, ContentContainer: Komponenter er fjernet fra systemet. [Se migreringsguide](https://aksel.nav.no/grunnleggende/kode/migrering#dd2cfa9fb1d1). ([#2623](https://github.com/navikt/aksel/pull/2623))

- CSS: Oppdatert bruk av action-farger i systemet. Dette påvirker komponentene: Button, CopyButton, Dropdown, Combobox, ConfirmationPanel, Radio, Checkbox, Search, Select, TextField, Textarea, Helptext, LinkPanel, Link, ReadMore, Stepper og Tabs. Endringen skal ikke brekke noe så lenge man ikke har overskrevet farger manuelt. ([#2623](https://github.com/navikt/aksel/pull/2623))

- Tokens: Nye tokens `--a-text-action-hover`,`--a-icon-action-hover` og `--a-border-action-hover` ([#2623](https://github.com/navikt/aksel/pull/2623))

- Textarea: Fjernet div med klassen navds-textarea\_\_wrapper ([#2623](https://github.com/navikt/aksel/pull/2623))

### @navikt/ds-tailwind

- Tokens: La til nytt brekkpunkt `2xl` for `1440px`. Alle primitives er oppdatert for å reflektere oppdateringen. Brukere av Tailwind vil måtte sjekke at overskriving av `screen: "2xl"` ikke brekker app. ([#2623](https://github.com/navikt/aksel/pull/2623))

### @navikt/aksel

- Chat: Fjernet deprecated props `backgroundColor` og `avatarBgColor`. Bruk prop `variant` som erstatning. ([#2623](https://github.com/navikt/aksel/pull/2623))

### @navikt/aksel-stylelint

- Textarea: Fjernet div med klassen navds-textarea\_\_wrapper ([#2623](https://github.com/navikt/aksel/pull/2623))

## 5.18.3

### @navikt/ds-react

- Tooltip: Fikset regresjon der bruk av Tooltip ga hydration-error i nextjs ([#2738](https://github.com/navikt/aksel/pull/2738))

## 5.18.2

### @navikt/ds-react

- Modal: Oppdatert intern håntering av context i komponent ([#2714](https://github.com/navikt/aksel/pull/2714))

## 5.18.1

### @navikt/ds-react

- Panel: Komponent er nå markert som deprecated. Bruk `Box` i fremtiden. ([#2712](https://github.com/navikt/aksel/pull/2712))

## 5.18.0

### @navikt/ds-react

- Portal: Ny komponent `Portal` som lar deg enkelt bruke `createPortal`, også på serversiden ([#2697](https://github.com/navikt/aksel/pull/2697))

## 5.17.5

### @navikt/ds-css

- ExpansionCard: Padding-top for Content er justert opp 8px (medium) og 4px (small) ([#2699](https://github.com/navikt/aksel/pull/2699))

## 5.17.4

### @navikt/ds-react

- Bleed: `marginInline='full'` og `reflectivePadding` kan nå brukes sammen. ([#2695](https://github.com/navikt/aksel/pull/2695))

## 5.17.3

### @navikt/ds-react

- :bug: Textarea: maxLength virker nå selv om man sender inn onChange uten å sende inn value ([#2690](https://github.com/navikt/aksel/pull/2690))

## 5.17.2

### @navikt/ds-react

- :bug: Textarea: Sett riktig høyde når brukt i Modal + StrictMode ([#2679](https://github.com/navikt/aksel/pull/2679))

- DatePicker: Knapper fikk ikke riktig aria-label ([#2678](https://github.com/navikt/aksel/pull/2678))

- Textarea: debounce ResizeObserver for å unngå feilmelding ([#2685](https://github.com/navikt/aksel/pull/2685))

### @navikt/ds-css

- Checkbox: I noen edgecaser ved bruk av shadow-dom ble ikke checkmark sentert i Checkbox ([#2682](https://github.com/navikt/aksel/pull/2682))

## 5.17.1

### @navikt/ds-react

- Eksponer variabelen "role" i Search-komponenten ([#2667](https://github.com/navikt/aksel/pull/2667))

## 5.17.0

### @navikt/ds-react

- Høykontrast: Komponenter støtter nå standard høykontrast-modus på Windows ([#2680](https://github.com/navikt/aksel/pull/2680))

### @navikt/ds-css

- Høykontrast: Komponenter støtter nå standard høykontrast-modus på Windows ([#2680](https://github.com/navikt/aksel/pull/2680))

## 5.16.0

### @navikt/aksel-icons

- Ikoner: Nytt ikon `LocationPin` ✨ ([#2672](https://github.com/navikt/aksel/pull/2672))

### @navikt/ds-react

- :sparkles: Combobox: Mulighet for å begrense hvor mange valg bruker kan ta ([#2260](https://github.com/navikt/aksel/pull/2260))

### @navikt/ds-css

- :sparkles: Combobox: Mulighet for å begrense hvor mange valg bruker kan ta ([#2260](https://github.com/navikt/aksel/pull/2260))

### @navikt/ds-tailwind

- Tailwind: La til ny `maxWidth` for text ([#2652](https://github.com/navikt/aksel/pull/2652))

## 5.15.1

### @navikt/ds-react

- HelpText: HelpText-state ble ikke riktig oppdatert ved klikk ([#2643](https://github.com/navikt/aksel/pull/2643))

## 5.15.0

### @navikt/aksel-icons

- Ikoner: Synket ikoner med Figma. Lagt til nytt ikon `FigureChild` ([#2629](https://github.com/navikt/aksel/pull/2629))

## 5.14.0

### @navikt/ds-react

- Intern state: Komponenter respekterer nå `e.preventDefault()` bedre når event overskrives internt i komponent. ([#2610](https://github.com/navikt/aksel/pull/2610))

- Tag: Har nå innebygd støtte for ikoner ([#2611](https://github.com/navikt/aksel/pull/2611))

- Table: Table.DataCell og Table.HeaderCell har nå `textSize`-prop for å justere font-size mellom 18px og 16px. ([#2613](https://github.com/navikt/aksel/pull/2613))

* Internt API: Oppdatert intern import/export av hooks og typer fra utils ([#2618](https://github.com/navikt/aksel/pull/2618))

* Intern-API: Erstattet `mergeRefs` i `useMemo` med lokal `useMergeRefs`-hook ([#2609](https://github.com/navikt/aksel/pull/2609))

### @navikt/ds-css

- Tag: Har nå innebygd støtte for ikoner ([#2611](https://github.com/navikt/aksel/pull/2611))

* Table: Checkbox nested i CheckboxGroup mister nå ikke padding ([#2612](https://github.com/navikt/aksel/pull/2612))

## 5.13.0

### @navikt/ds-react

- Accordion.Item, Dropdown, ReadMore og Tooltip: Har en ny prop `onOpenChange?: (open: boolean) => void;` som forteller nå-state når `open`-state endrer seg. Dette vil være nyttig hvis man ikke bruker controlled-state, men fortsatt ønsker å vite om komponenten er `open` eller ikke (f.eks logging). ([#2585](https://github.com/navikt/aksel/pull/2585))

- Controlled-state: Accordion.Item, Dropdown, ReadMore, Table.ExpandableRow og Tooltip har oppdatert intern håndtering av controlled state. Endringen skal ikke påvirke dagens API. ([#2585](https://github.com/navikt/aksel/pull/2585))

* Page: Lagt til ny bakgrunnsfarge `surface-subtle` og ny maksbredde på Page.Block `text` ([#2572](https://github.com/navikt/aksel/pull/2572))

### @navikt/ds-tokens

- Tokens: Ny token `--a-text-width-max: 576px` ([#2572](https://github.com/navikt/aksel/pull/2572))

### @navikt/ds-css

- Page: Lagt til ny bakgrunnsfarge `surface-subtle` og ny maksbredde på Page.Block `text` ([#2572](https://github.com/navikt/aksel/pull/2572))

## 5.12.5

### @navikt/ds-react

- MonthPicker: MonthCaption satt forrige/neste-knapper til `disabled` når de skulle være `enabled`. ([#2601](https://github.com/navikt/aksel/pull/2601))

## 5.12.4

### @navikt/ds-react

- Accessibility improvements to Radio and Checkbox component, so each label is only announced once with screen readers ([#2562](https://github.com/navikt/aksel/pull/2562))

### @navikt/aksel-stylelint

- Stylelint: Støtter nå stylelint v16 ([#2591](https://github.com/navikt/aksel/pull/2591))

## 5.12.3

### @navikt/ds-css

- ExpansionCard: Divider mellom header og innhold ([#2566](https://github.com/navikt/aksel/pull/2566))

## 5.12.2

### @navikt/ds-react

- :memo: Modal: Oppdatert JSDoc ([#2567](https://github.com/navikt/aksel/pull/2567))

## 5.12.1

### @navikt/ds-react

- Checkbox: Checkmark tilpasses bedre fontsize ([#2563](https://github.com/navikt/aksel/pull/2563))

- Datepicker: Lukk-knapp i modal har nå type button for å unngå form-submition ([#2568](https://github.com/navikt/aksel/pull/2568))

## 5.12.0

### @navikt/aksel-icons

- Ikoner: Oppdatert ikonpakke med diverse bugdfixes og oppdateringer av stroke ([#2538](https://github.com/navikt/aksel/pull/2538))

## 5.11.5

### @navikt/ds-react

- Chips: La til token for checkmark-circle ([#2558](https://github.com/navikt/aksel/pull/2558))

### @navikt/ds-css

- Chips: La til token for checkmark-circle ([#2558](https://github.com/navikt/aksel/pull/2558))

## 5.11.4

### @navikt/ds-react

- Fix issue where clicking in Combobox.FilteredOptions after scrolling selected the wrong element ([#2536](https://github.com/navikt/aksel/pull/2536))

### @navikt/ds-css

- :bug: Modal: Hindre at elementer med sr-only posisjoneres feil ([#2541](https://github.com/navikt/aksel/pull/2541))

## 5.11.3

### @navikt/ds-react

- :bug: Textarea: Skru av autosize ved manuell resize ([#2518](https://github.com/navikt/aksel/pull/2518))

- :bug: Popover: Ikke lukk ved klikk inni når parent er fokuserbar ([#2521](https://github.com/navikt/aksel/pull/2521))

- Page: La til `md`-bredde (768px) ([#2510](https://github.com/navikt/aksel/pull/2510))

### @navikt/ds-css

- :bug: Textarea: Skru av autosize ved manuell resize ([#2518](https://github.com/navikt/aksel/pull/2518))

- Page: La til `md`-bredde (768px) ([#2510](https://github.com/navikt/aksel/pull/2510))

## 5.11.2

### @navikt/ds-react

- ⬆️ upgrade date-fns version & make it minor-version agnostic ([#2514](https://github.com/navikt/aksel/pull/2514))

## 5.11.1

### @navikt/ds-react

- Switch: Byttet success-farger med action npr checked ([#2511](https://github.com/navikt/aksel/pull/2511))

### @navikt/ds-css

- Switch: Byttet success-farger med action npr checked ([#2511](https://github.com/navikt/aksel/pull/2511))

## 5.11.0

### @navikt/aksel-icons

- Ikoner: Nytt ikon `PushPin` ([#2503](https://github.com/navikt/aksel/pull/2503))

### @navikt/ds-react

- :sparkles: Textarea: Mulighet for å sette resize-retning ([#2494](https://github.com/navikt/aksel/pull/2494))

- :sparkles: Textarea: Eksperimentell støtte for automatisk scrollbar ([#2457](https://github.com/navikt/aksel/pull/2457))

* :wheelchair: Textarea: Forsinkelse ved live-opplesning av gjenstående tegn ([#2502](https://github.com/navikt/aksel/pull/2502))

### @navikt/ds-css

- :sparkles: Textarea: Mulighet for å sette resize-retning ([#2494](https://github.com/navikt/aksel/pull/2494))

- :sparkles: Textarea: Eksperimentell støtte for automatisk scrollbar ([#2457](https://github.com/navikt/aksel/pull/2457))

* :wheelchair: Textarea: Forsinkelse ved live-opplesning av gjenstående tegn ([#2502](https://github.com/navikt/aksel/pull/2502))

## 5.10.4

### @navikt/ds-react

- Gjør lukknapp i Alert til type button ([#2497](https://github.com/navikt/aksel/pull/2497))

## 5.10.3

### @navikt/ds-react

- :wheelchair: Textarea: Byttet fra `aria-live` til `role=status` på telleren for bedre semantikk ([#2483](https://github.com/navikt/aksel/pull/2483))

- :bug: Textarea: Teller flyttet ut av tekstfeltet for å unngå overlapp og misforståelser ([#2483](https://github.com/navikt/aksel/pull/2483))

- ErrorSummary: Gjør det mulig å rendre ErrorSummary.Item conditionally ([#2484](https://github.com/navikt/aksel/pull/2484))

### @navikt/ds-css

- :bug: Textarea: Teller flyttet ut av tekstfeltet for å unngå overlapp og misforståelser ([#2483](https://github.com/navikt/aksel/pull/2483))

### @navikt/ds-tailwind

- typescript types for tailwind preset ([#2486](https://github.com/navikt/aksel/pull/2486))

## 5.10.2

### @navikt/ds-react

- OverridableComponent: Fungerer nå bedre ved bruk av typeof <komponent> ([#2474](https://github.com/navikt/aksel/pull/2474))

### @navikt/ds-css

- Primtives: CSS-import for primitives er nå mer spesifikk ([#2469](https://github.com/navikt/aksel/pull/2469))

## 5.10.1

### @navikt/ds-react

- Table: Håndterer nå sjekk for interaktive elementer i ExpandableRow bedre ([#2461](https://github.com/navikt/aksel/pull/2461))

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

### @navikt/ds-tokens

- Ny spacing token på 0.375rem ([#2370](https://github.com/navikt/aksel/pull/2370))

### @navikt/ds-css

- Ny spacing token på 0.375rem ([#2370](https://github.com/navikt/aksel/pull/2370))

- Select: Tokenstøtte for å endre chevronfarge sammen med tekst ([#2383](https://github.com/navikt/aksel/pull/2383))

- HelpText: Knapp er visuelt mindre. Klikkflate er fortsatt 24px ([#2376](https://github.com/navikt/aksel/pull/2376))

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

### @navikt/ds-tokens

- Box: Ny primitive, erstatter dagens `Panel` ([#2195](https://github.com/navikt/aksel/pull/2195))

### @navikt/ds-css

- Box: Ny primitive, erstatter dagens `Panel` ([#2195](https://github.com/navikt/aksel/pull/2195))

* Skeleton: Width fungerer nå med inline-variant av Skeleton ([#2273](https://github.com/navikt/aksel/pull/2273))

## 5.4.1

### @navikt/ds-react

- MonthPicker: Fikset kalkulering av fromDate/toDate ([#2269](https://github.com/navikt/aksel/pull/2269))

## 5.4.0

### @navikt/ds-react

- Primitives: Nye komponenter `Show` og `Hide` er lagt til. ([#2222](https://github.com/navikt/aksel/pull/2222))

* Search: Kjører nå bare preventDefault ved Escape når `input` inneholder tekst ([#2245](https://github.com/navikt/aksel/pull/2245))

### @navikt/ds-tokens

- Tokens: `data-theme="light"` vil nå tilbakestille theming ([#2238](https://github.com/navikt/aksel/pull/2238))

### @navikt/ds-css

- Primitives: Nye komponenter `Show` og `Hide` er lagt til. ([#2222](https://github.com/navikt/aksel/pull/2222))

* ErrorSummary: Har nå 8px border-radius ([#2256](https://github.com/navikt/aksel/pull/2256))

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

### @navikt/ds-tokens

- ConfirmationPanel: Fikset opplesing av feilmelding ([#2199](https://github.com/navikt/aksel/pull/2199))

- Tokens: `--a-icon-alt-3` er nå i synk med figma ([#2199](https://github.com/navikt/aksel/pull/2199))

### @navikt/ds-css

- ConfirmationPanel: Fikset opplesing av feilmelding ([#2199](https://github.com/navikt/aksel/pull/2199))

- Checkbox: Fikset checkbox-alignment ved bruk av tailwindcss ([#2199](https://github.com/navikt/aksel/pull/2199))

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

### @navikt/ds-tokens

- Gray: Gråfarger er nå mindre varme ([#2092](https://github.com/navikt/aksel/pull/2092))

- Action: Selected-varianter av action er nå 'blue' ('deepblue' før) ([#2092](https://github.com/navikt/aksel/pull/2092))

### @navikt/ds-css

- Oppdatert Modal - Se [Migrering](https://aksel.nav.no/grunnleggende/kode/migrering) ([#2135](https://github.com/navikt/aksel/pull/2135))

  - :sparkles: Støtte for header og footer
  - :boom: Bruker nå native dialog i stedet for react-modal (med polyfill for eldre nettlesere)

* Table: ExpandableRow har oppdatert knapp for å matche Accordion og ExpansionCard ([#2178](https://github.com/navikt/aksel/pull/2178))

* Table: Alle størrelser har justert padding. Small-size table bruker nå også standard typografi-størrelse (18px). ([#2178](https://github.com/navikt/aksel/pull/2178))

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

- HGrid: Ny komponent 'HGrid' er ute i Beta: [Dokumentasjon](https://aksel.nav.no/komponenter/primitives/hgrid) ([#1838](https://github.com/navikt/aksel/pull/1838))

* Fixes bug where combobox list could not be closed after clicking a chip ([#2155](https://github.com/navikt/aksel/pull/2155))

* Grid: Markert som deprecated. Bruk nye 'HGrid' ([#2153](https://github.com/navikt/aksel/pull/2153))

### @navikt/ds-css

- HGrid: Ny komponent 'HGrid' er ute i Beta: [Dokumentasjon](https://aksel.nav.no/komponenter/primitives/hgrid) ([#1838](https://github.com/navikt/aksel/pull/1838))

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

### @navikt/ds-tokens

- Shadow-tokens er oppdatert til mer tydeligere varianter ([PR](https://github.com/navikt/aksel/pull/2041))

### @navikt/ds-css

- Shadow-tokens er oppdatert: Datepicker har nå ikke border, Modal bruker shadow-xlarge, LinkCard bruker shadow-xsmall ([PR](https://github.com/navikt/aksel/pull/2041))

### @navikt/ds-tailwind

- Shadow-tokens er oppdatert ([PR](https://github.com/navikt/aksel/pull/2041))

- Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600). ([PR](https://github.com/navikt/aksel/pull/2036))

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

### @navikt/ds-react

- Chips: `neutral` og `action`-varianter for Chips.Toggle. `checkmark`-prop for Chips.Toggle ([PR](https://github.com/navikt/aksel/pull/2035))

- Ny komponent Skeleton! ([PR](https://github.com/navikt/aksel/pull/1821))

* La til JSDoc dokumentasjon for alle komponenter ([PR](https://github.com/navikt/aksel/pull/2034))

* Accordion: La til `indent`-prop ([PR](https://github.com/navikt/aksel/pull/2027))

### @navikt/ds-tokens

- :tada: Fargetokens for datavisualisering. ([PR](https://github.com/navikt/aksel/pull/2032))

- Oppdatert text-subtle og icon-subtle tokens til 700-skala (tidligere 600). ([PR](https://github.com/navikt/aksel/pull/2036))

### @navikt/ds-css

- Chips: `neutral` og `action`-varianter av Chips.Toggle. Opt-out mulighet for Checkmark. Oppdatert checkmark-ikon ([PR](https://github.com/navikt/aksel/pull/2035))

- Alle description-felter på fieldsets har nå `text-subtle` som farge. ([PR](https://github.com/navikt/aksel/pull/2036))

### @navikt/ds-tailwind

- :tada: Fargetokens for datavisualisering. ([PR](https://github.com/navikt/aksel/pull/2032))

### @navikt/aksel-stylelint

- Deprecated klassenavn `navds-chips--icon-left` ([PR](https://github.com/navikt/aksel/pull/2035))

## 4.0.0

### @navikt/ds-react

- Datepicker og Monthpicker er ute av beta. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h4ef68ae743b0) ([PR](https://github.com/navikt/aksel/pull/2026))

- Komponenter i `@navikt/ds-react-internal` er flyttet over til `@navikt/ds-react`. [Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h3b8538e1981d) ([PR](https://github.com/navikt/aksel/pull/2026))

### @navikt/ds-css

- All styling fra `@navikt/ds-css-internal` er flyttet til `@navikt/ds-css`. ([PR](https://github.com/navikt/aksel/pull/2026))

- classname-prefix er endret fra `navdsi` -> `navds` for flyttede komponenter.

- Fikset cascading-problem mellom dropdown og popover. Dropdown blir ikke lengre påvirket av import-rekkefølge av popover.

- Styling for flyttede komponenter finnes nå på CDN [Guide](https://aksel.nav.no/grunnleggende/kode/css-import)

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

### @navikt/ds-react

- Tag: `moderate`-variant ([PR](https://github.com/navikt/aksel/pull/2010))

### @navikt/ds-css

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

- CopyButton: Fjernet use client directive fra komponent. (warning i vite/rollup)

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

### @navikt/ds-tokens

- Breakpoint-tokens lagt til ([PR](https://github.com/navikt/aksel/pull/1832))

### @navikt/ds-tailwind

- Breakpoint-tokens er lagt til. Overskriver native tailwind-breakpoints ([PR](https://github.com/navikt/aksel/pull/1832))

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

### @navikt/ds-tokens

- Justeringer av semantiske fargetokens, statusfarger nå mer tydelig ([PR](https://github.com/navikt/aksel/pull/1787))

- Oppdatert neutral-tokens ([PR](https://github.com/navikt/aksel/pull/1789))

### @navikt/ds-css

- ToggleGroup: `Neutral`-variant. ([PR](https://github.com/navikt/aksel/pull/1789))

- Button: `Neutral`-variant.

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

### @navikt/ds-tokens

- Alle token er oppdatert til nytt format. ([Guide](https://aksel.nav.no/grunnleggende/kode/migrering#h76f47744d112))

### @navikt/ds-css

- Fontlasting: Fonter lastes nå fra NAV-CDN

- Tokens: Alle komponenter bruker nå semantiske tokens for som standard, med innebygd støtte for komponent-spesifikke tokens.

### @navikt/ds-tailwind

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
