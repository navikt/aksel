# @navikt/ds-react

## 7.35.0

### Patch Changes

- Combobox: Add locale-support for 'Ingen søketreff'. ([#4324](https://github.com/navikt/aksel/pull/4324))

- Updated dependencies []:
  - @navikt/ds-tokens@7.35.0
  - @navikt/aksel-icons@7.35.0

## 7.34.0

### Minor Changes

- LocalAlert: :tada: New component replacing regular `<Alert />`. ([#4186](https://github.com/navikt/aksel/pull/4186))

- GlobalAlert: :tada: New component replacing `<Alert fullWidth>`, now with built-in centering of content. ([#4186](https://github.com/navikt/aksel/pull/4186))

- InlineMessage: :tada: New component replacing `<Alert inline />`. ([#4186](https://github.com/navikt/aksel/pull/4186))

- InfoCard: :tada: New component replacing `<Alert variant="info" />`. Used for content you want to highlight. ([#4186](https://github.com/navikt/aksel/pull/4186))

### Patch Changes

- Updated dependencies [[`a405824`](https://github.com/navikt/aksel/commit/a4058247d01292217a2209fbfbd83b9f816dcdd7), [`efebc5f`](https://github.com/navikt/aksel/commit/efebc5fbbb3e955df5050086aef68812052a837d)]:
  - @navikt/aksel-icons@7.34.0
  - @navikt/ds-tokens@7.34.0

## 7.33.5

### Patch Changes

- Datepicker: Avoid rendering Datepicker dialog when not open. ([#4300](https://github.com/navikt/aksel/pull/4300))

- Updated dependencies []:
  - @navikt/ds-tokens@7.33.5
  - @navikt/aksel-icons@7.33.5

## 7.33.4

### Patch Changes

- Textarea: Set height on first render to `auto` instead of `0px` to reduce layout shift when SSR ([#4295](https://github.com/navikt/aksel/pull/4295))

- Updated dependencies []:
  - @navikt/ds-tokens@7.33.4
  - @navikt/aksel-icons@7.33.4

## 7.33.3

### Patch Changes

- Popover: Children no longer re-mounts on open toggle. ([#4281](https://github.com/navikt/aksel/pull/4281))

- Updated dependencies []:
  - @navikt/ds-tokens@7.33.3
  - @navikt/aksel-icons@7.33.3

## 7.33.2

### Patch Changes

- Timeline: Pins before or after date-range are now hidden. ([#4266](https://github.com/navikt/aksel/pull/4266))

- useRangeDatepicker: `defaultSelected` no longer overrides `defaultMonth` when `defaultSelected.from` is `undefined` ([#4267](https://github.com/navikt/aksel/pull/4267))

- Modal: Improve scroll-lock interaction for sticky elements. ([#4269](https://github.com/navikt/aksel/pull/4269))

- Updated dependencies []:
  - @navikt/ds-tokens@7.33.2
  - @navikt/aksel-icons@7.33.2

## 7.33.1

### Patch Changes

- Portal: Update `<Portal />` to respect dom and render-order. Removed `asChild`-prop. ([#4239](https://github.com/navikt/aksel/pull/4239))

- Updated dependencies []:
  - @navikt/ds-tokens@7.33.1
  - @navikt/aksel-icons@7.33.1

## 7.33.0

### Minor Changes

- Process: Added new prop `isTruncated` to `<Process />`. This allows you to add a connector to the start of first event and end of last event to visualize a "truncated" process. ([#4196](https://github.com/navikt/aksel/pull/4196))

- Dependencies: Added `react-dom` to `peerDependencies`. ([#4237](https://github.com/navikt/aksel/pull/4237))

### Patch Changes

- Timeline: Popups now have an accessible name. ([#4242](https://github.com/navikt/aksel/pull/4242))

- Updated dependencies []:
  - @navikt/ds-tokens@7.33.0
  - @navikt/aksel-icons@7.33.0

## 7.32.5

### Patch Changes

- Modal: Improved scroll locking. ([#4234](https://github.com/navikt/aksel/pull/4234))

- Updated dependencies []:
  - @navikt/ds-tokens@7.32.5
  - @navikt/aksel-icons@7.32.5

## 7.32.4

### Patch Changes

- Combobox: Fix issue with toggle list button ([#4228](https://github.com/navikt/aksel/pull/4228))

- Accordion: Heading size with `size="medium"` changed from 20px to 18px. This change is for Darkside only. ([#4209](https://github.com/navikt/aksel/pull/4209))

- Updated dependencies []:
  - @navikt/ds-tokens@7.32.4
  - @navikt/aksel-icons@7.32.4

## 7.32.3

### Patch Changes

- Combobox: Fix bug in highlighting when using custom filtering logic ([#4195](https://github.com/navikt/aksel/pull/4195))

- Switch: Replace use of `div` inside `<label />` with `span`. ([#4184](https://github.com/navikt/aksel/pull/4184))

- Maintenance: Update dependency-arrays for some layout-effects. ([#4191](https://github.com/navikt/aksel/pull/4191))

- Updated dependencies [[`db055ae`](https://github.com/navikt/aksel/commit/db055ae69334dbab602a9944d46adfe634248eea)]:
  - @navikt/aksel-icons@7.32.3
  - @navikt/ds-tokens@7.32.3

## 7.32.2

### Patch Changes

- Helptext: Avoid screen-readers reading title twice. ([#4169](https://github.com/navikt/aksel/pull/4169))

- Combobox: Popup remains open when opening with voiceover in quick-nav mode. ([#4158](https://github.com/navikt/aksel/pull/4158))

- Dependency: Update '@floating-ui/react-dom' to v2.1.6. ([#4154](https://github.com/navikt/aksel/pull/4154))

- Updated dependencies []:
  - @navikt/ds-tokens@7.32.2
  - @navikt/aksel-icons@7.32.2

## 7.32.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.32.1
  - @navikt/aksel-icons@7.32.1

## 7.32.0

### Patch Changes

- ReadMore: You can now reach the content by tabbing ([#4116](https://github.com/navikt/aksel/pull/4116))

- Updated dependencies [[`ca4880e`](https://github.com/navikt/aksel/commit/ca4880ee162b882d8bf52d8e27c4c8d82349765e), [`ca4880e`](https://github.com/navikt/aksel/commit/ca4880ee162b882d8bf52d8e27c4c8d82349765e)]:
  - @navikt/aksel-icons@7.32.0
  - @navikt/ds-tokens@7.32.0

## 7.31.0

### Minor Changes

- Table: Add 'onRowClick' callback-prop to allow for selecting rows by clicking the row itself. ([#4107](https://github.com/navikt/aksel/pull/4107))

- Combobox: Dropdown-element is now position='fixed', allowing for better placement on smaller screens and inside Modals. ([#4106](https://github.com/navikt/aksel/pull/4106))

### Patch Changes

- Darkside: Avoid empty aria-describedby in Radio and Checkbox ([#4111](https://github.com/navikt/aksel/pull/4111))

- Updated dependencies []:
  - @navikt/ds-tokens@7.31.0
  - @navikt/aksel-icons@7.31.0

## 7.30.1

### Patch Changes

- Darkside: ExpansionCardContent now defaults to app-color defined in `Theme`, fixing a regression causing all content to be colored `neutral`. ([#4075](https://github.com/navikt/aksel/pull/4075))

- Darkside: Improved screen reader experience in Radio and Checkbox by moving description out of label ([#4066](https://github.com/navikt/aksel/pull/4066))

- Updated dependencies []:
  - @navikt/ds-tokens@7.30.1
  - @navikt/aksel-icons@7.30.1

## 7.30.0

### Minor Changes

- FormSummary: Changed `FormSummary.Header`-component to `<div />` instead of `<header />`. ([#4032](https://github.com/navikt/aksel/pull/4032))

- FormSummary: Added new component `<FormSummary.Footer />`, we now require `<FormSummary.EditLink />` to be placed in footer instead of header. ([#4032](https://github.com/navikt/aksel/pull/4032))

### Patch Changes

- Datepicker: Fix regression causing clickable weeknumber to have no applied styles in Darkside. ([#4081](https://github.com/navikt/aksel/pull/4081))

- Timeline: Adjusted type for `onSelectPeriod()` and fixed warning when using refs in React 19 ([#4076](https://github.com/navikt/aksel/pull/4076))

- Updated dependencies []:
  - @navikt/ds-tokens@7.30.0
  - @navikt/aksel-icons@7.30.0

## 7.29.1

### Patch Changes

- Checkbox, List: Updated SVG-usage to avoid using rem-values directly on `width` and `height`-attributes. ([#4048](https://github.com/navikt/aksel/pull/4048))

- Updated dependencies []:
  - @navikt/ds-tokens@7.29.1
  - @navikt/aksel-icons@7.29.1

## 7.29.0

### Minor Changes

- Stepper: Mark `interactive`-prop as deprecated. For completely static 'Steppers', consider using the new `Process`-component. ([#4007](https://github.com/navikt/aksel/pull/4007))

- LinkCard: Added new prop `arrowPosition` for centering the arrow if necessary. ([#4021](https://github.com/navikt/aksel/pull/4021))

- Process: :tada: New component Process! The component consists of a vertical line of events where each event can contain information, actions, links or status indicators. [You can find the documentation here :memo:](https://aksel.nav.no/komponenter/core/process). ([#3950](https://github.com/navikt/aksel/pull/3950))

### Patch Changes

- ToggleGroup: Improved screen reader experience by using `aria-labelledby` instead of `aria-describedby` for the label ([#4028](https://github.com/navikt/aksel/pull/4028))

- Accordion: Mark `headingSize` as deprecated. ([#3993](https://github.com/navikt/aksel/pull/3993))

- Fieldset: Improved screen reader experience by using `aria-labelledby` for both legend and description ([#4029](https://github.com/navikt/aksel/pull/4029))

- Box: Fixed bug where darkside-css did not properly apply border-radius. ([#4009](https://github.com/navikt/aksel/pull/4009))

- Updated dependencies [[`887b474`](https://github.com/navikt/aksel/commit/887b47431b88d0ca5e42cb605252abe502dba64a)]:
  - @navikt/aksel-icons@7.29.0
  - @navikt/ds-tokens@7.29.0

## 7.28.1

### Patch Changes

- Form components: Improved a11y when using JSX in description ([#3990](https://github.com/navikt/aksel/pull/3990))

- Fieldset/CheckboxGroup/RadioGroup: Connect description to fieldset with `aria-describedby` ([#3974](https://github.com/navikt/aksel/pull/3974))

- Updated dependencies []:
  - @navikt/ds-tokens@7.28.1
  - @navikt/aksel-icons@7.28.1

## 7.28.0

### Patch Changes

- Types: Exported `UseRangeDatepickerOptions` and `UseDatepickerOptions` types from Datepicker hooks. ([#3983](https://github.com/navikt/aksel/pull/3983))

- Updated dependencies [[`b24ebb3`](https://github.com/navikt/aksel/commit/b24ebb3499c70480e53127836e1eed5b3d210d3e)]:
  - @navikt/aksel-icons@7.28.0
  - @navikt/ds-tokens@7.28.0

## 7.27.1

### Patch Changes

- Radio/Checkbox: :bug: Fix issue where label was not announced by screen readers in Firefox ([#3973](https://github.com/navikt/aksel/pull/3973))

- Stepper: Increase size of circle from 28px to 32px to sync with new Process component. ([#3968](https://github.com/navikt/aksel/pull/3968))

- Updated dependencies []:
  - @navikt/ds-tokens@7.27.1
  - @navikt/aksel-icons@7.27.1

## 7.27.0

### Minor Changes

- Darkside: Using 'Theme' to set current color-theme now works when root-node does not set light or dark class. ([#3961](https://github.com/navikt/aksel/pull/3961))

### Patch Changes

- Updated dependencies [[`3d9c55e`](https://github.com/navikt/aksel/commit/3d9c55ed7d0a09b4c470bf76907b7ad10b5355d3), [`92985b8`](https://github.com/navikt/aksel/commit/92985b881460747164da3b15f8e1aa0f444c1375)]:
  - @navikt/aksel-icons@7.27.0
  - @navikt/ds-tokens@7.27.0

## 7.26.0

### Patch Changes

- Updated dependencies [[`ab84fea`](https://github.com/navikt/aksel/commit/ab84fea35878ff7272abf2389f3d3c7121abfb47)]:
  - @navikt/aksel-icons@7.26.0
  - @navikt/ds-tokens@7.26.0

## 7.25.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.25.2
  - @navikt/aksel-icons@7.25.2

## 7.25.1

### Patch Changes

- Modal: When open, now updates body with correct className. ([#3922](https://github.com/navikt/aksel/pull/3922))

- Search: Forward 'data-color' to SearchButton. ([#3922](https://github.com/navikt/aksel/pull/3922))

- Updated dependencies [[`435f528`](https://github.com/navikt/aksel/commit/435f528d65713171533a6adfbd5f9cafd34539ba)]:
  - @navikt/ds-tokens@7.25.1
  - @navikt/aksel-icons@7.25.1

## 7.25.0

### Minor Changes

- FileUpload: Allow for custom buttons in FileUpload.Item. ([#3906](https://github.com/navikt/aksel/pull/3906))

### Patch Changes

- Chat: Removed ol > li semantics, replaced with 'div'. ([#3904](https://github.com/navikt/aksel/pull/3904))

- Updated dependencies []:
  - @navikt/ds-tokens@7.25.0
  - @navikt/aksel-icons@7.25.0

## 7.24.0

### Minor Changes

- LinkCard: :tada: Added new component 'LinkCard'. ([#3883](https://github.com/navikt/aksel/pull/3883))

- Table: :tada: Added prop 'stickyHeader', allowing header to remain sticky while scrolling in table. ([#3893](https://github.com/navikt/aksel/pull/3893))

### Patch Changes

- Switch: Size='small' are now visually comparable to radio and checkbox in the same size. ([#3892](https://github.com/navikt/aksel/pull/3892))

- Updated dependencies []:
  - @navikt/ds-tokens@7.24.0
  - @navikt/aksel-icons@7.24.0

## 7.23.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.23.2
  - @navikt/aksel-icons@7.23.2

## 7.23.1

### Patch Changes

- Darkside: Search now correctly respects 'clearButton'-prop when set to false. ([#3854](https://github.com/navikt/aksel/pull/3854))

- Updated dependencies []:
  - @navikt/ds-tokens@7.23.1
  - @navikt/aksel-icons@7.23.1

## 7.23.0

### Minor Changes

- Datepicker: Upgraded 'react-day-picker' dependency to v9.7.0 from v9.6.1. ([#3820](https://github.com/navikt/aksel/pull/3820))

- Darkside: Renamed 'data-color-role' dynamic theme attribute to 'data-color'. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: Using attribute 'data-color' with one of the built-in colors from 'AkselColorRole' now allows re-coloring most components. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: Adding type '@navikt/ds-react/types/theme' to your local 'tsconfig.json' types-field allows autocomplete for all available color-palettes in attribute 'data-color'. You can extend 'CustomAkselColor'-type to use your own color-palettes. ([#3849](https://github.com/navikt/aksel/pull/3849))

- Darkside: All components has been updated to use 'data-color' attribute for coloring. As a side-effect, most component CSS is either updated or refactored. ([#3849](https://github.com/navikt/aksel/pull/3849))

### Patch Changes

- Timeline: Reverted regression that lead to 'aria-controls' being ignored when passed to Pin or Period. ([#3828](https://github.com/navikt/aksel/pull/3828))

- Timeline: Removed 'aria-haspopup' from pins and periods. ([#3834](https://github.com/navikt/aksel/pull/3834))

- ErrorSummary: Heading size is now 'xsmall' for non-medium sizes and remains 'small' when size='medium'. ([#3806](https://github.com/navikt/aksel/pull/3806))

- Updated dependencies [[`77129e8`](https://github.com/navikt/aksel/commit/77129e8b6f178815439bea34881d0fe26cbd274c), [`77129e8`](https://github.com/navikt/aksel/commit/77129e8b6f178815439bea34881d0fe26cbd274c), [`0932335`](https://github.com/navikt/aksel/commit/0932335a9e1323d50eeaa85ccca1db11b31d297d)]:
  - @navikt/ds-tokens@7.23.0
  - @navikt/aksel-icons@7.23.0

## 7.22.0

### Minor Changes

- Box: Add support for new `radius`-tokens that will replace `borderRadius`-tokens when `darkside` is set as main. ([#3784](https://github.com/navikt/aksel/pull/3784))

### Patch Changes

- ConfirmationPanel: Now tagged as deprecated. [See documentation](https://aksel.nav.no/komponenter/legacy/confirmationpanel#99622218e7f0) for more information. ([#3789](https://github.com/navikt/aksel/pull/3789))

- Updated dependencies [[`1619b52`](https://github.com/navikt/aksel/commit/1619b52008c0bb5a994d4ccfccbd5620b45e6da8)]:
  - @navikt/ds-tokens@7.22.0
  - @navikt/aksel-icons@7.22.0

## 7.21.1

### Patch Changes

- ExpansionCard: Omit `onToggle` from extending `HTMLAttributes<HTMLDivElement>` to avoid overlapping with popover api. ([#3773](https://github.com/navikt/aksel/pull/3773))

- Updated dependencies []:
  - @navikt/ds-tokens@7.21.1
  - @navikt/aksel-icons@7.21.1

## 7.21.0

### Minor Changes

- Chat: Add 'toptextHeadingLevel'-prop to allow changing h-level based on semantics. ([#3739](https://github.com/navikt/aksel/pull/3739))

### Patch Changes

- Updated dependencies [[`8ea18b0`](https://github.com/navikt/aksel/commit/8ea18b07a3bec913e04fc274983da83daca86983)]:
  - @navikt/aksel-icons@7.21.0
  - @navikt/ds-tokens@7.21.0

## 7.20.0

### Minor Changes

- Combobox: Use option-value as `id` instead of `label`. ([#3735](https://github.com/navikt/aksel/pull/3735))

- Timeline: Add `placement`-prop for periods for more fine-grained control over Popover-placement. ([#3736](https://github.com/navikt/aksel/pull/3736))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.20.0
  - @navikt/aksel-icons@7.20.0

## 7.19.1

### Patch Changes

- Darkside: Using `Page`-component would always give errors when using new `Theme`-component. ([`208adb8`](https://github.com/navikt/aksel/commit/208adb8b3f1a93a872782a8f309fed65b6b112d2))

- Updated dependencies []:
  - @navikt/ds-tokens@7.19.1
  - @navikt/aksel-icons@7.19.1

## 7.19.0

### Minor Changes

- Darkside: `<Theme />`-component no longer defaults to `light`-theme className when no theme is provided. ([#3720](https://github.com/navikt/aksel/pull/3720))

### Patch Changes

- Updated dependencies [[`d77e7e2`](https://github.com/navikt/aksel/commit/d77e7e203e522ed3a7fcdef5ca6abe6169314fb6)]:
  - @navikt/ds-tokens@7.19.0
  - @navikt/aksel-icons@7.19.0

## 7.18.0

### Minor Changes

- Darkside: Throw error if invalid Box-props are used with new Theme instead of warnings. ([#3697](https://github.com/navikt/aksel/pull/3697))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.18.0
  - @navikt/aksel-icons@7.18.0

## 7.17.4

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.17.4
  - @navikt/aksel-icons@7.17.4

## 7.17.3

### Patch Changes

- Datepicker: Fixed a bug where while ranged datepicker, setting `from` to `undefined` while `to` were defined did not allow selecting new dates. ([#3655](https://github.com/navikt/aksel/pull/3655))

- Updated dependencies []:
  - @navikt/ds-tokens@7.17.3
  - @navikt/aksel-icons@7.17.3

## 7.17.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.17.2
  - @navikt/aksel-icons@7.17.2

## 7.17.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.17.1
  - @navikt/aksel-icons@7.17.1

## 7.17.0

### Minor Changes

- List: aria-label and aria-labelledby is forwarded to list-element. ([#3626](https://github.com/navikt/aksel/pull/3626))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.17.0
  - @navikt/aksel-icons@7.17.0

## 7.16.1

### Patch Changes

- React 19: Resolve unknown-type in Slot. ([#3627](https://github.com/navikt/aksel/pull/3627))

- Updated dependencies []:
  - @navikt/ds-tokens@7.16.1
  - @navikt/aksel-icons@7.16.1

## 7.16.0

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.16.0
  - @navikt/aksel-icons@7.16.0

## 7.15.0

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.15.0
  - @navikt/aksel-icons@7.15.0

## 7.14.3

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.14.3
  - @navikt/aksel-icons@7.14.3

## 7.14.2

### Patch Changes

- Updated dependencies [[`441d8b7`](https://github.com/navikt/aksel/commit/441d8b732cb4820e6fe37ad87200c5b5eb31e5cf)]:
  - @navikt/ds-tokens@7.14.2
  - @navikt/aksel-icons@7.14.2

## 7.14.1

### Patch Changes

- Datepicker: Fixed regression where some fromDate/toDate instances lead to that date ending up as disabled. ([#3602](https://github.com/navikt/aksel/pull/3602))

- Updated dependencies []:
  - @navikt/ds-tokens@7.14.1
  - @navikt/aksel-icons@7.14.1

## 7.14.0

### Minor Changes

- DatePicker: Refactored locally to support `react-day-picker v9`. No external API has been changed. ([#3525](https://github.com/navikt/aksel/pull/3525))

- MonthPicker: Refactored locally and no longer depends on `react-day-picker v9`. No external API has been changed. ([#3525](https://github.com/navikt/aksel/pull/3525))

- Dependencies: `react-day-picker` bumped to `v9.5.0`. ([#3525](https://github.com/navikt/aksel/pull/3525))

- Dependencies: `date-fns` bumped to `^4.0.0`. ([#3525](https://github.com/navikt/aksel/pull/3525))

### Patch Changes

- Darkside: Added 'arrow' back to Tooltip. ([#3589](https://github.com/navikt/aksel/pull/3589))

- Updated dependencies [[`5937d08`](https://github.com/navikt/aksel/commit/5937d085c0bee19fe3625574d58aadffee0c6cf9)]:
  - @navikt/aksel-icons@7.14.0
  - @navikt/ds-tokens@7.14.0

## 7.13.0

### Patch Changes

- Darkside: Added support for `ConfirmationpPanel`, `Linkpanel`, `Panel` and `Dropdown`. Note that all of these will be deprecated in the future. ([#3581](https://github.com/navikt/aksel/pull/3581))

- Updated dependencies [[`636eb05`](https://github.com/navikt/aksel/commit/636eb05bf56ba2c8513704c61882fde369c2e67b)]:
  - @navikt/aksel-icons@7.13.0
  - @navikt/ds-tokens@7.13.0

## 7.12.2

### Patch Changes

- Box: Added export for `BoxNew`. ([`8576400`](https://github.com/navikt/aksel/commit/857640026368153b64171f1cf954b9abac493ee8))

- Updated dependencies []:
  - @navikt/ds-tokens@7.12.2
  - @navikt/aksel-icons@7.12.2

## 7.12.1

### Patch Changes

- Theme: Theme-prop is now optional. ([`f269311`](https://github.com/navikt/aksel/commit/f269311dbbeb09e8fa0ba93a19aa430f0dd17255))

- Updated dependencies []:
  - @navikt/ds-tokens@7.12.1
  - @navikt/aksel-icons@7.12.1

## 7.12.0

### Minor Changes

- List: Marked `title`, `headingTag` and `description` properties as deprecated. These will not be supported in future versions and should be migrated from when possible. ([#3537](https://github.com/navikt/aksel/pull/3537))

### Patch Changes

- Table: Updated sorting icons for ascending and descending. ([#3536](https://github.com/navikt/aksel/pull/3536))

- Updated dependencies []:
  - @navikt/ds-tokens@7.12.0
  - @navikt/aksel-icons@7.12.0

## 7.11.0

### Patch Changes

- Updated dependencies [[`6c81fc0`](https://github.com/navikt/aksel/commit/6c81fc0b239a02499412d350af65389833d59b26)]:
  - @navikt/aksel-icons@7.11.0
  - @navikt/ds-tokens@7.11.0

## 7.10.0

### Minor Changes

- Table: New prop `contentGutter` added to `ExpandableRow`-component. This allows user more control for content layout inside expandable element. ([#3507](https://github.com/navikt/aksel/pull/3507))

### Patch Changes

- Combobox: Always render `maxSelected` message when `isMultiSelect` is set. ([#3506](https://github.com/navikt/aksel/pull/3506))

- Updated dependencies []:
  - @navikt/ds-tokens@7.10.0
  - @navikt/aksel-icons@7.10.0

## 7.9.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.9.2
  - @navikt/aksel-icons@7.9.2

## 7.9.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.9.1
  - @navikt/aksel-icons@7.9.1

## 7.9.0

### Minor Changes

- ErrorSummary: :sparkles: new prop to prefix error with a warning icon. ([#3445](https://github.com/navikt/aksel/pull/3445))
  All form components: replace dot with warning icon in error message.

### Patch Changes

- Button: Fix edge-case where setting "loading={true}" in a Modal caused the button to get 0 width and not show spinner ([#3252](https://github.com/navikt/aksel/pull/3252))

- Switch: Update switch to better reflect unchecked state. ([#3468](https://github.com/navikt/aksel/pull/3468))

- Textarea: resize immediately upon receiving resize event (eg. inside modal opening). ([#3463](https://github.com/navikt/aksel/pull/3463))

- Updated dependencies []:
  - @navikt/ds-tokens@7.9.0
  - @navikt/aksel-icons@7.9.0

## 7.8.1

### Patch Changes

- Combobox: Only open dropdown-list onClick, not onFocus. ([#3440](https://github.com/navikt/aksel/pull/3440))

- Combobox: Fix issue where you could select more options than defined in maxSelected ([#3434](https://github.com/navikt/aksel/pull/3434))

- Timeline: In cases where earliest found date were after current date, timeline-start ended up defaulting to current date. ([#3458](https://github.com/navikt/aksel/pull/3458))

- Updated dependencies []:
  - @navikt/ds-tokens@7.8.1
  - @navikt/aksel-icons@7.8.1

## 7.8.0

### Minor Changes

- Chips.Removable: Removed prop `removeLabel` ([#3429](https://github.com/navikt/aksel/pull/3429))

- i18n: :sparkles: Implemented i18n support for all components. Components come with support for nb, nn and en locales ([Docs](https://aksel.nav.no/komponenter/core/provider#84d7ea5ec517)) ([#3429](https://github.com/navikt/aksel/pull/3429))

- Combobox: Removed clear button, removed tokens staring with `--ac-combobox-clear`, deprecated props `clearButton`/`clearButtonLabel`. ([#3433](https://github.com/navikt/aksel/pull/3433))

- Combobox: Changed prop `maxSelected` to number ([#3433](https://github.com/navikt/aksel/pull/3433))

- DatePicker/MonthPicker: Added new `translations` prop and deprecated `locale` prop ([#3429](https://github.com/navikt/aksel/pull/3429))

### Patch Changes

- Timeline: Deprecated prop `axisLabelTemplates`. Use [Provider](https://aksel.nav.no/komponenter/core/provider#84d7ea5ec517) if you still need to change the date formats. ([#3429](https://github.com/navikt/aksel/pull/3429))

- Search: Deprecated prop `clearButtonLabel`. Use [Provider](https://aksel.nav.no/komponenter/core/provider#84d7ea5ec517) if you still need to change the label. ([#3429](https://github.com/navikt/aksel/pull/3429))

- Textarea: Deprecated prop `i18n`. Use [Provider](https://aksel.nav.no/komponenter/core/provider#84d7ea5ec517) if you still need to change these texts. ([#3429](https://github.com/navikt/aksel/pull/3429))

- Updated dependencies []:
  - @navikt/ds-tokens@7.8.0
  - @navikt/aksel-icons@7.8.0

## 7.7.0

### Minor Changes

- CopyButton: Removed prop `activeTitle`. Use `activeText` instead. ([#3426](https://github.com/navikt/aksel/pull/3426))

- Combobox: :boom: Removed prop `toggleListButtonLabel` ([#3409](https://github.com/navikt/aksel/pull/3409))

### Patch Changes

- Combobox: Hid buttons from screen readers, added `title` on clear button, removed sr-only text on toggle list button. ([#3409](https://github.com/navikt/aksel/pull/3409))

- InternalHeader.UserButton: Remove `title`-attribute on icon and improved types. ([#3424](https://github.com/navikt/aksel/pull/3424))

- CopyButton: Fix issue where state changes are announced multiple times using VO in Chrome ([#3374](https://github.com/navikt/aksel/pull/3374))

- Updated dependencies []:
  - @navikt/ds-tokens@7.7.0
  - @navikt/aksel-icons@7.7.0

## 7.6.0

### Minor Changes

- ActionMenu: Added 'align'-prop to 'ActionMenu.Content'. This allows menu to 'start' or 'end' align in reference to anchor. ([#3414](https://github.com/navikt/aksel/pull/3414))

- ReadMore: Added size 'large'. ([#3372](https://github.com/navikt/aksel/pull/3372))

### Patch Changes

- DatePicker/MonthPicker: Remove pointerEvents=none on CalendarIcon so that the title shows up as tooltip on hover ([#3390](https://github.com/navikt/aksel/pull/3390))

- Combobox: Single-select now shows cursor closer to selected item. ([#3384](https://github.com/navikt/aksel/pull/3384))

- Updated dependencies [[`9c5b32f`](https://github.com/navikt/aksel/commit/9c5b32f9bae885585b5f50b637505017482b1d59)]:
  - @navikt/aksel-icons@7.6.0
  - @navikt/ds-tokens@7.6.0

## 7.5.3

### Patch Changes

- Allow RC versions of React 19 through peerDependencies ([#3391](https://github.com/navikt/aksel/pull/3391))

- Updated dependencies []:
  - @navikt/ds-tokens@7.5.3
  - @navikt/aksel-icons@7.5.3

## 7.5.2

### Patch Changes

- Combobox: Fix issue where using arrow keys in list would make the entire page scroll ([#3364](https://github.com/navikt/aksel/pull/3364))

- Updated dependencies []:
  - @navikt/ds-tokens@7.5.2
  - @navikt/aksel-icons@7.5.2

## 7.5.1

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.5.1
  - @navikt/aksel-icons@7.5.1

## 7.5.0

### Minor Changes

- React: Allow all react versions above 17.0.0 trough peerDependencies. ([#3334](https://github.com/navikt/aksel/pull/3334))

### Patch Changes

- Datepicker: Use of 'open'-prop set to 'true' on first render could lead to the dialog not opening. ([#3333](https://github.com/navikt/aksel/pull/3333))

- Updated dependencies [[`47a4dd6`](https://github.com/navikt/aksel/commit/47a4dd6c4c37a9ced9df1f21529e8a6244b342b1)]:
  - @navikt/aksel-icons@7.5.0
  - @navikt/ds-tokens@7.5.0

## 7.4.3

### Patch Changes

- Pagination: More precise type for renderItem ([#3275](https://github.com/navikt/aksel/pull/3275))

- Updated dependencies []:
  - @navikt/ds-tokens@7.4.3
  - @navikt/aksel-icons@7.4.3

## 7.4.2

### Patch Changes

- Combobox: Pressing 'Enter' after canceling autocomplete could result in using matching options in list. ([#3306](https://github.com/navikt/aksel/pull/3306))

- Updated dependencies []:
  - @navikt/ds-tokens@7.4.2
  - @navikt/aksel-icons@7.4.2

## 7.4.1

### Patch Changes

- Tabs.List: Remove redundant icon titles ([#3282](https://github.com/navikt/aksel/pull/3282))

- Combobox: onToggleSelected is now called with correct value when autocomplete and new values are allowed. ([#3287](https://github.com/navikt/aksel/pull/3287))

- Combobox: :bug: Fix scroll issue when using arrow keys to navigate list ([#3269](https://github.com/navikt/aksel/pull/3269))

- Search: Remove redundant role attribute ([#3280](https://github.com/navikt/aksel/pull/3280))

- Monthpicker: Add allowed input format 'MMyyyy'. ([#3285](https://github.com/navikt/aksel/pull/3285))

- Updated dependencies []:
  - @navikt/ds-tokens@7.4.1
  - @navikt/aksel-icons@7.4.1

## 7.4.0

### Minor Changes

- Combobox: Enable option to add a new value while autocompleting and highlight matches in FilteredOptions. ([#3225](https://github.com/navikt/aksel/pull/3225))

### Patch Changes

- Date/MonthPicker: Upgrade react-day-picker to fix issue with React 19 ([#3268](https://github.com/navikt/aksel/pull/3268))

- Combobox: Don't scroll when browsing list with mouse ([#3265](https://github.com/navikt/aksel/pull/3265))

- Avoid warning about element.ref in React 19 ([#3268](https://github.com/navikt/aksel/pull/3268))

- Checkbox: Remove redundant attribute aria-checked ([#3274](https://github.com/navikt/aksel/pull/3274))

- Updated dependencies []:
  - @navikt/ds-tokens@7.4.0
  - @navikt/aksel-icons@7.4.0

## 7.3.1

### Patch Changes

- Combobox: :bug: Remove virtual focus on input blur instead of moving it ([#3261](https://github.com/navikt/aksel/pull/3261))

- Updated dependencies []:
  - @navikt/ds-tokens@7.3.1
  - @navikt/aksel-icons@7.3.1

## 7.3.0

### Minor Changes

- ActionMenu: :tada: New component! Replaces DropdownMenu as the go-to solution for floating menus. Includes support for grouping, sub-menus, checkboxes, radios and dividers. Read more in the [documentation](https://aksel.nav.no/komponenter/core/actionmenu). ([#3081](https://github.com/navikt/aksel/pull/3081))

### Patch Changes

- Accordion: Remove redundant icon title ([#3230](https://github.com/navikt/aksel/pull/3230))

- Modal: Close button now avoids triggering when repeated keystrokes are detected. This helps stop accidental closing of Modal when 'Enter'-key is held down. ([#3081](https://github.com/navikt/aksel/pull/3081))

- Updated dependencies []:
  - @navikt/ds-tokens@7.3.0
  - @navikt/aksel-icons@7.3.0

## 7.2.1

### Patch Changes

- Combobox: Disable autocomple in Firefox on Android to prevent bug ([#3201](https://github.com/navikt/aksel/pull/3201))

- Combobox: Support PageUp/PageDown in dropdown list. ([#3158](https://github.com/navikt/aksel/pull/3158))

- Updated dependencies []:
  - @navikt/ds-tokens@7.2.1
  - @navikt/aksel-icons@7.2.1

## 7.2.0

### Minor Changes

- FileUpload: :boom: Remove UNSAFE-prefix ([#3205](https://github.com/navikt/aksel/pull/3205))

- List: :sparkles: New size 'large' ([#3207](https://github.com/navikt/aksel/pull/3207))

### Patch Changes

- Performance: :zap: Optimized memoization for rerendring in some components. ([#3197](https://github.com/navikt/aksel/pull/3197))

- Updated dependencies []:
  - @navikt/ds-tokens@7.2.0
  - @navikt/aksel-icons@7.2.0

## 7.1.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@7.1.2
  - @navikt/aksel-icons@7.1.2

## 7.1.1

### Patch Changes

- List: Add indentation and remove overly verbose aria attributes ([#3184](https://github.com/navikt/aksel/pull/3184))

- Combobox: :bug: implement missing readonly and disabled ([#3180](https://github.com/navikt/aksel/pull/3180))

- Updated dependencies []:
  - @navikt/ds-tokens@7.1.1
  - @navikt/aksel-icons@7.1.1

## 7.1.0

### Minor Changes

- Pagination: :lipstick: Updated font-weight to 600 and marked 'page'-prop on 'Item' as deprecated. ([#3164](https://github.com/navikt/aksel/pull/3164))

### Patch Changes

- Combobox: :label: Better typing for maxSelected prop ([#3169](https://github.com/navikt/aksel/pull/3169))

- ErrorSummary: Remove aria-attributes. ([#3171](https://github.com/navikt/aksel/pull/3171))

- Updated dependencies []:
  - @navikt/ds-tokens@7.1.0
  - @navikt/aksel-icons@7.1.0

## 7.0.1

### Patch Changes

- Combobox: Fix issue with whitespace in the ID of options with multiple spaces ([#3162](https://github.com/navikt/aksel/pull/3162))

- Updated dependencies []:
  - @navikt/ds-tokens@7.0.1
  - @navikt/aksel-icons@7.0.1

## 7.0.0

### Major Changes

- ErrorSummary: Added fallback text for `heading`. ([#3139](https://github.com/navikt/aksel/pull/3139))

- Tooltip: :boom: Updated labeling of items inside Tooltip. [See migration guide for how to update](https://aksel.nav.no/grunnleggende/kode/migrering#3b5cf05fd100). ([#3139](https://github.com/navikt/aksel/pull/3139))

### Patch Changes

- ErrorSummary: Focus heading instead of container for improved experience with screen reader. ([#3139](https://github.com/navikt/aksel/pull/3139))

- Updated dependencies [[`1c11a6a3b`](https://github.com/navikt/aksel/commit/1c11a6a3b95fe6d0f5015d3b073e05fe5912071b)]:
  - @navikt/aksel-icons@7.0.0
  - @navikt/ds-tokens@7.0.0

## 6.17.0

### Minor Changes

- Combobox: Add support for `onBlur`, and omit props that have no effect. ([#3125](https://github.com/navikt/aksel/pull/3125))

### Patch Changes

- Updated dependencies [[`1b2dc8896`](https://github.com/navikt/aksel/commit/1b2dc88968ca99d8b24f94ca51843063472dfa95)]:
  - @navikt/aksel-icons@6.17.0
  - @navikt/ds-tokens@6.17.0

## 6.16.3

### Patch Changes

- Combobox :children_crossing: single select now hides selected value when typing, onBlur clears input ([#3124](https://github.com/navikt/aksel/pull/3124))

- Combobox: :lipstick: hide caret on select ([#3071](https://github.com/navikt/aksel/pull/3071))

- :bug: Combobox: trailing spaces no longer work like wildcards for autocomplete suggestions ([#3105](https://github.com/navikt/aksel/pull/3105))

- Fixed bug in Combobox where the wrong option was selected on Enter if the autocompleted word was not the first in FilteredOptions ([#3110](https://github.com/navikt/aksel/pull/3110))

- Updated dependencies [[`9907ef08a`](https://github.com/navikt/aksel/commit/9907ef08a639cb2ee3b2af1ef76a30faadd7b340)]:
  - @navikt/aksel-icons@6.16.3
  - @navikt/ds-tokens@6.16.3

## 6.16.2

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@6.16.2
  - @navikt/aksel-icons@6.16.2

## 6.16.1

### Patch Changes

- Table: Corrected the type of onSortChange ([#3103](https://github.com/navikt/aksel/pull/3103))

- :adhesive_bandage: Combobox: Placeholder goes away when an option is selected ([#3101](https://github.com/navikt/aksel/pull/3101))

- Table: Fixed background-clipping when using ExpandableRow. ([#3095](https://github.com/navikt/aksel/pull/3095))

- Updated dependencies []:
  - @navikt/ds-tokens@6.16.1
  - @navikt/aksel-icons@6.16.1

## 6.16.0

### Minor Changes

- Primitives: Added `gridColumn`-prop for more grid alignment control. ([#3082](https://github.com/navikt/aksel/pull/3082))

### Patch Changes

- Updated dependencies [[`9e6808d31`](https://github.com/navikt/aksel/commit/9e6808d31fc2bdb60399b409ad7fe739d3da20d1)]:
  - @navikt/ds-tokens@6.16.0
  - @navikt/aksel-icons@6.16.0

## 6.15.0

### Patch Changes

- Combobox: Can no longer remove options with backspace when shouldShowSelectedOptions is false ([#3076](https://github.com/navikt/aksel/pull/3076))

- Refactored Combobox FilteredOptions ([#3073](https://github.com/navikt/aksel/pull/3073))

- Updated dependencies [[`ea3e88146`](https://github.com/navikt/aksel/commit/ea3e881467d27d43464ff9d111369a6b8539f593)]:
  - @navikt/aksel-icons@6.15.0
  - @navikt/ds-tokens@6.15.0

## 6.14.0

### Minor Changes

- Breaking change: Combobox.onChange now receive only value as argument, instead of ChangeEvent ([#2974](https://github.com/navikt/aksel/pull/2974))

- Improved search in Combobox - find hits anywhere in the label ([#2974](https://github.com/navikt/aksel/pull/2974))

### Patch Changes

- Tabs, ToggleGroup: Rovingfocus now respects shift, alt, ctrl and meta-keys when navigating. ([#3041](https://github.com/navikt/aksel/pull/3041))

- Prevent NullPointer when adding a new/custom option in Combobox single-select ([#3054](https://github.com/navikt/aksel/pull/3054))

- Combobox: Entering an already selected option and pressing enter no longer removes it ([#3061](https://github.com/navikt/aksel/pull/3061))

- Combobox: Description is now connected to the input field via aria-describedby ([#3065](https://github.com/navikt/aksel/pull/3065))

- Prevent Escape in open Combobox from closing Modals ([#3053](https://github.com/navikt/aksel/pull/3053))

- Updated dependencies [[`8fd183cc9`](https://github.com/navikt/aksel/commit/8fd183cc909a1f27a0a9f496415d280c1207a479)]:
  - @navikt/ds-tokens@6.14.0
  - @navikt/aksel-icons@6.14.0

## 6.13.0

### Minor Changes

- Modal: New prop `placement` for anchoring the modal to the top of the viewport. ([#3033](https://github.com/navikt/aksel/pull/3033))

### Patch Changes

- Updated dependencies []:
  - @navikt/ds-tokens@6.13.0
  - @navikt/aksel-icons@6.13.0

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
