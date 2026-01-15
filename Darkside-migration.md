# Changes

- Storybook now defaults to darkside always, removed dynamic mode/css loading

## Components

## Types

Removed string | {} notation from AkselColor-type.

### Typo

Added "contrast"-option to `textColor` prop.

### Accordion

`headingSize` now has no effect

Deprecated

- variant

### Chips

Deprecated

- variant

### Chat

Deprecated

- variant

### CopyButton

Deprecated

- variant

### List

Removed

- title
- description
- headingTag

### Modal

- `navds-modal__document-body`-css

### Popover

`arrow` now has no effect

### Tag

Changed

- Variants now `outline`, `moderate` and `strong`
- Legacy-variants still avaliable, but hidden.

Deprecated

- variant

### Link

`variant="subtle"` now just defaults to neutral

Deprecated

- variant

### Checkbox

- Now uses new implementation as default

### Radio

- Now uses new implementation as default

## Primitives

### Page

`background`-prop now has no effect

### Box

Changes:

- Box now has the same props as BoxNew

Deprecated

- BoxNew tagged as deprecated

## CSS

Old css removed

- Moved into src-dir (no external effect)

Only index.css and index.min.css avaliable trough CDN now
All classNames with `navds` prefix removed
`/darkside`-import removed. Regular import now just "darkside"

## Tailwind

Old config removed, regular import now just new config

## Tokens

Old tokens removed

/darkside imports removed. Direct import `@navikt/ds-tokens` now uses darkside config.

Removed

- `@navikt/ds-tokens/darkside-js`
- `@navikt/ds-tokens/darkside-css` ++

Added

- `@navikt/ds-tokens/js`
- `@navikt/ds-tokens/css` ++

## CLI

Added a bunch of new codemods

## Stylelint

- Added rule "aksel/no-legacy-classes".
- Removed rule "aksel/design-token-no-component-reference" since we don't have any component tokens anymore.
- Adjusted existing rules according to new tokens/prefixes.
