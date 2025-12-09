# Aksel v8.0.0 Migration Guide

This guide covers the migration from Aksel v7 to v8, which introduces **Darkside** as the default design system. Darkside brings improved theming, updated tokens, and a more consistent API across all components.

## 🚀 Quick Migration

The fastest way to migrate is using our automated codemods:

```bash
# Run all v8 codemods
npx @navikt/aksel@latest codemod v8-box
npx @navikt/aksel@latest codemod v8-box-new
npx @navikt/aksel@latest codemod v8-list
npx @navikt/aksel@latest codemod v8-tag-variant
npx @navikt/aksel@latest codemod v8-button-variant
npx @navikt/aksel@latest codemod v8-link-variant
npx @navikt/aksel@latest codemod v8-chips-variant
npx @navikt/aksel@latest codemod v8-accordion-variant
npx @navikt/aksel@latest codemod v8-toggle-group-variant
npx @navikt/aksel@latest codemod v8-prop-deprecate
npx @navikt/aksel@latest codemod v8-primitive-spacing
npx @navikt/aksel@latest codemod v8-token-spacing
npx @navikt/aksel@latest codemod v8-token-spacing-js
npx @navikt/aksel@latest codemod v8-tokens
```

---

## 📦 Package Changes

### @navikt/ds-tokens

**Breaking Changes:**

- **Removed `/darkside` imports** - Darkside is now the default
  - ❌ `@navikt/ds-tokens/darkside-css` → ✅ `@navikt/ds-tokens/css`
  - ❌ `@navikt/ds-tokens/darkside-js` → ✅ `@navikt/ds-tokens/js`
  - ❌ `@navikt/ds-tokens/darkside-scss` → ✅ `@navikt/ds-tokens/scss`
  - ❌ `@navikt/ds-tokens/darkside-less` → ✅ `@navikt/ds-tokens/less`

- **New spacing tokens** - All spacing tokens now use `--ax-spacing-*` prefix
  - Run `npx @navikt/aksel@latest codemod v8-token-spacing` for CSS/SCSS/LESS
  - Run `npx @navikt/aksel@latest codemod v8-token-spacing-js` for JavaScript

**Migration:**

```diff
- import "@navikt/ds-tokens/darkside-css";
+ import "@navikt/ds-tokens/css";

- import tokens from "@navikt/ds-tokens/darkside-js";
+ import tokens from "@navikt/ds-tokens/js";
```

### @navikt/ds-css

**Breaking Changes:**

- **Removed `/darkside` import** - Darkside is now the default
  - ❌ `@navikt/ds-css/darkside` → ✅ `@navikt/ds-css`

- **Removed `navds-` prefixed classes** - All classes now use the default Darkside naming
- **CDN**: Only `index.css` and `index.min.css` are available via CDN

**Migration:**

```diff
- import "@navikt/ds-css/darkside";
+ import "@navikt/ds-css";
```

### @navikt/ds-tailwind

**Breaking Changes:**

- **Removed old config** - Darkside config is now the default
  - The regular import now uses the new Darkside-based configuration

**Migration:**

```diff
// tailwind.config.js
- preset: [require("@navikt/ds-tailwind/old")]
+ preset: [require("@navikt/ds-tailwind")]
```

### @navikt/ds-react

**New Exports:**

- `InlineMessage` - Now available as a separate export
- `GlobalAlert` - Now available as a separate export
- `InfoCard` - Now available as a separate export  
- `LocalAlert` - Now available as a separate export

```javascript
import { InlineMessage } from "@navikt/ds-react/InlineMessage";
import { GlobalAlert } from "@navikt/ds-react/GlobalAlert";
import { InfoCard } from "@navikt/ds-react/InfoCard";
import { LocalAlert } from "@navikt/ds-react/LocalAlert";
```

---

## 🔧 Component Changes

### Accordion

**Deprecated:**

- `variant` prop - Use `data-color` instead
  - `variant="neutral"` → `data-color="neutral"`
- `headingSize` prop - No longer has any effect (removed in implementation)

**Migration:**

```diff
- <Accordion variant="neutral">
+ <Accordion data-color="neutral">
```

Run `npx @navikt/aksel@latest codemod v8-accordion-variant` to migrate automatically.

### Box

**Breaking Changes:**

- `Box` now uses the new token system (previously `Box.New`)
- `Box.New` is deprecated - use `Box` instead
- Token prefixes updated:
  - `background` now uses `--ax-bg-*` tokens instead of `--a-*`
  - `borderColor` now uses `--ax-border-*` tokens
  - `shadow` now uses `--ax-shadow-*` tokens

**Deprecated:**

- `Box.New` - Use `Box` from `@navikt/ds-react/Box` instead

**Migration:**

```diff
- <Box.New background="default" borderColor="default">
+ <Box background="default" borderColor="default">
```

```diff
- import { Box } from "@navikt/ds-react";
- <Box.New ... />
+ import { Box } from "@navikt/ds-react/Box";
+ <Box ... />
```

Run `npx @navikt/aksel@latest codemod v8-box` to migrate Box with legacy tokens.  
Run `npx @navikt/aksel@latest codemod v8-box-new` to rename Box.New to Box.

### Button

**Deprecated:**

- Variant-based coloring replaced with `data-color` prop
  - `variant="primary-neutral"` → `variant="primary"` + `data-color="neutral"`
  - `variant="secondary-neutral"` → `variant="secondary"` + `data-color="neutral"`
  - `variant="tertiary-neutral"` → `variant="tertiary"` + `data-color="neutral"`
  - `variant="danger"` → `variant="primary"` + `data-color="danger"`

**New Props:**

- `data-color` - Controls button color independently of variant

**Migration:**

```diff
- <Button variant="primary-neutral">
+ <Button variant="primary" data-color="neutral">

- <Button variant="danger">
+ <Button variant="primary" data-color="danger">
```

Run `npx @navikt/aksel@latest codemod v8-button-variant` to migrate automatically.

### Chips

**Deprecated:**

- `variant` prop on `Chips.Toggle` - Use `data-color` instead
  - `variant="action"` → `data-color="accent"` (default)
  - `variant="neutral"` → `data-color="neutral"`

**New Props:**

- `data-color` - Controls chip color

**Migration:**

```diff
- <Chips.Toggle variant="neutral">
+ <Chips.Toggle data-color="neutral">
```

Run `npx @navikt/aksel@latest codemod v8-chips-variant` to migrate automatically.

### Chat

**Deprecated:**

- `variant` prop - No replacement, variant styling removed

### CopyButton

**Deprecated:**

- `variant` prop - No replacement, variant styling removed

### Link

**Deprecated:**

- `variant` prop - Use `data-color` instead
  - `variant="action"` → `data-color="accent"` (default)
  - `variant="neutral"` → `data-color="neutral"`
  - `variant="subtle"` → `data-color="neutral"`

**New Props:**

- `data-color` - Controls link color

**Migration:**

```diff
- <Link variant="neutral">
+ <Link data-color="neutral">
```

Run `npx @navikt/aksel@latest codemod v8-link-variant` to migrate automatically.

### List

**Breaking Changes - Removed Props:**

- `title` - Moved outside component, use `<Heading>` before `<List>`
- `description` - Moved outside component, use `<BodyShort>` before `<List>`
- `headingTag` - No longer needed

**Migration:**

```diff
- <List title="My List" description="List description">
-   <List.Item>Item 1</List.Item>
- </List>

+ <Heading size="small" as="h3">My List</Heading>
+ <BodyShort>List description</BodyShort>
+ <List>
+   <List.Item>Item 1</List.Item>
+ </List>
```

Run `npx @navikt/aksel@latest codemod v8-list` to migrate automatically (note: may require manual adjustments).

### Modal

**Changes:**

- Removed `navds-modal__document-body` CSS class - internal change, no user action needed

### Page (Primitive)

**Deprecated:**

- `background` prop - No longer has any effect

### Popover

**Deprecated:**

- `arrow` prop - No longer has any effect, arrows are always shown
- `offset` default changed from `16` (with arrow) or `4` (without) to `8`

### Select

**Breaking Changes - Removed Props:**

- `htmlSize` - Removed, no replacement

**Migration:**

```diff
- <Select htmlSize={5}>
+ <Select>
```

### Tag

**Breaking Changes:**

- Variant system completely redesigned
- New variants: `outline`, `moderate`, `strong`
- Old variants (`info`, `success`, `warning`, `error`, `alt1`, `alt2`, `alt3`, `neutral` with `-filled` and `-moderate` suffixes) are deprecated but still work

**New Props:**

- `data-color` - Controls tag color (default: `"neutral"`)
- `variant` - Now accepts `"outline"`, `"moderate"`, or `"strong"` (default: `"outline"`)

**Migration:**

```diff
- <Tag variant="info-filled">
+ <Tag variant="strong" data-color="info">

- <Tag variant="success-moderate">
+ <Tag variant="moderate" data-color="success">

- <Tag variant="warning">
+ <Tag variant="outline" data-color="warning">
```

Run `npx @navikt/aksel@latest codemod v8-tag-variant` to migrate automatically.

### Checkbox & Radio

**Changes:**

- Now use new implementation as default (previously behind feature flag)
- No API changes, improved styling and accessibility

### ToggleGroup

**Deprecated:**

- `variant` prop - Use `data-color` instead
  - Similar migration pattern to other components

Run `npx @navikt/aksel@latest codemod v8-toggle-group-variant` to migrate automatically.

---

## 🎨 Styling & Tokens

### CSS Variable Prefix Changes

All internal CSS variables have been updated:

- `--__ac-*` → `--__axc-*`

This is an internal change and should not affect consumer code unless you're overriding internal variables.

### Spacing Tokens

All spacing tokens now use the `--ax-spacing-*` prefix:

```diff
- var(--a-spacing-4)
+ var(--ax-spacing-4)
```

Run `npx @navikt/aksel@latest codemod v8-token-spacing` to migrate CSS/SCSS/LESS files.  
Run `npx @navikt/aksel@latest codemod v8-token-spacing-js` to migrate JavaScript/TypeScript files.

---

## 🛠️ Stylelint

### New Rules

- `aksel/no-legacy-classes` - Warns about legacy `navds-*` class usage

### Removed Rules

- `aksel/design-token-no-component-reference` - Removed since component tokens no longer exist

### Updated Rules

- Existing rules adjusted for new token prefixes and naming conventions

---

## 📝 Summary

### What's New

- **Darkside as default** - Improved theming with better dark mode support
- **Unified color system** - `data-color` prop for consistent coloring across components
- **New spacing tokens** - More flexible and semantic spacing system
- **Improved component APIs** - More consistent prop naming and behavior
- **Better tree-shaking** - More granular exports for smaller bundle sizes

### Breaking Changes

1. Token import paths changed (removed `/darkside`)
2. CSS import paths changed (removed `/darkside`)
3. Box API updated to use new tokens
4. List component API changed (title/description removed)
5. Select `htmlSize` prop removed
6. Several component `variant` props deprecated in favor of `data-color`

### Recommended Migration Steps

1. **Update dependencies** to v8.x
2. **Update imports** for tokens and CSS
3. **Run codemods** in order:
   - Token migrations first (`v8-token-spacing`, `v8-token-spacing-js`, `v8-tokens`)
   - Component migrations next (all `v8-*-variant` codemods)
   - Box migrations (`v8-box`, `v8-box-new`)
   - List migration (`v8-list`)
   - Property deprecation cleanup (`v8-prop-deprecate`)
4. **Test thoroughly** - especially components with `data-color` changes
5. **Update custom CSS** if you override Aksel classes
6. **Review Stylelint warnings** for legacy class usage

### Need Help?

- Full documentation: https://aksel.nav.no
- GitHub Issues: https://github.com/navikt/aksel/issues
- Slack: #aksel (internal NAV)
