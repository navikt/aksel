# Aksel v8.0.0 Changelog

## 🎉 Major Release: Darkside as Default

Aksel v8.0.0 marks the full migration to **Darkside**, our new design system baseline. This release brings improved theming, updated design tokens, a more consistent component API, and better support for dark mode.

---

## 📦 Package Updates

### @navikt/ds-tokens

#### ✨ Added

- **New default exports** without `/darkside` suffix:
  - `@navikt/ds-tokens/css` - CSS custom properties
  - `@navikt/ds-tokens/js` - JavaScript/TypeScript tokens
  - `@navikt/ds-tokens/scss` - SCSS variables
  - `@navikt/ds-tokens/less` - LESS variables

#### 💥 Breaking Changes

- **Removed** `/darkside` imports:
  - `@navikt/ds-tokens/darkside-css`
  - `@navikt/ds-tokens/darkside-js`
  - `@navikt/ds-tokens/darkside-scss`
  - `@navikt/ds-tokens/darkside-less`
- **Updated** spacing token prefix: `--a-spacing-*` → `--ax-spacing-*`
- **Removed** `docs.json` export

#### 🔧 Migration Tool

Run `npx @navikt/aksel@latest codemod v8-tokens` for interactive token migration.

---

### @navikt/ds-css

#### ✨ Added

- Darkside styles as default in main export

#### 💥 Breaking Changes

- **Removed** `/darkside` import path
- **Removed** all `navds-` prefixed CSS classes
- **Simplified** build process - removed PostCSS plugins (cssnano, postcss-combine-duplicated-selectors, etc.)
- **CDN**: Only `index.css` and `index.min.css` available now

#### 📝 Changes

- Moved CSS source to `src/` directory
- Updated browserslist configuration
- Internal CSS variables now use `--__axc-` prefix (changed from `--__ac-`)

---

### @navikt/ds-tailwind

#### 💥 Breaking Changes

- **Removed** old Tailwind configuration
- Main import now uses Darkside-based configuration

#### 📝 Changes

- Preset automatically includes new design tokens and utilities

---

### @navikt/ds-react

#### ✨ Added

- **New granular exports** for better tree-shaking:
  - `@navikt/ds-react/InlineMessage`
  - `@navikt/ds-react/GlobalAlert`
  - `@navikt/ds-react/InfoCard`
  - `@navikt/ds-react/LocalAlert`

#### 🔧 Version Bump

- Updated from `v7.33.2` to `v7.35.1`
- Updated dependencies:
  - `@navikt/aksel-icons`: `^7.35.1`
  - `@navikt/ds-tokens`: `^7.35.1`

---

### @navikt/aksel (CLI)

#### ✨ Added

All new v8.0.0 codemods:

1. **`v8-tokens`** - Interactive token migration assistant
2. **`v8-box`** - Migrate Box to new token system
3. **`v8-box-new`** - Rename Box.New to Box
4. **`v8-list`** - Migrate List component (title/description props)
5. **`v8-tag-variant`** - Update Tag variant + data-color props
6. **`v8-button-variant`** - Update Button variant + data-color props
7. **`v8-link-variant`** - Update Link variant + data-color props
8. **`v8-chips-variant`** - Update Chips variant + data-color props
9. **`v8-accordion-variant`** - Update Accordion variant + data-color props
10. **`v8-toggle-group-variant`** - Update ToggleGroup variant + data-color props
11. **`v8-prop-deprecate`** - Remove deprecated props from components
12. **`v8-primitive-spacing`** - Update Primitive spacing tokens
13. **`v8-token-spacing`** - Update CSS/SCSS/LESS spacing tokens
14. **`v8-token-spacing-js`** - Update JavaScript spacing tokens

#### 📝 Changes

- Added chalk colorization to status output
- Improved codemod testing and edge case handling
- Better error messages and migration warnings

#### 🔧 Dependencies

- Bumped `chalk` from `4.1.0` to `5.6.2`
- Bumped `clipboardy` from `2.3.0` to `5.0.0`

---

### @navikt/aksel-stylelint

#### ✨ Added

- **New rule**: `aksel/no-legacy-classes` - Warns about legacy `navds-` class usage

#### 💥 Breaking Changes

- **Removed rule**: `aksel/design-token-no-component-reference` (component tokens no longer exist)

#### 📝 Changes

- Adjusted rules for new token prefixes (`--ax-*` instead of `--a-*`)
- Updated token validation for new Darkside token system

---

## 🔧 Component Changes

### Accordion

#### 🗑️ Deprecated

- **`variant`** prop - Use `data-color` instead
  - `variant="neutral"` → `data-color="neutral"`
- **`headingSize`** prop - No longer has any effect

#### 🔧 Migration

Run `npx @navikt/aksel@latest codemod v8-accordion-variant`

---

### Alert

#### ✨ Added

- Granular exports available:
  - `GlobalAlert` from `@navikt/ds-react/GlobalAlert`
  - `LocalAlert` from `@navikt/ds-react/LocalAlert`
  - `InfoCard` from `@navikt/ds-react/InfoCard`
  - `InlineMessage` from `@navikt/ds-react/InlineMessage`

---

### Box

#### 💥 Breaking Changes

- **`Box`** now uses new token system (previously `Box.New` behavior)
- Token prefixes updated:
  - `background`: `--a-*` → `--ax-bg-*`
  - `borderColor`: `--a-*` → `--ax-border-*`
  - `shadow`: `--a-shadow-*` → `--ax-shadow-*`
- Internal CSS variable prefix: `--__ac-box-*` → `--__axc-box-*`

#### 🗑️ Deprecated

- **`Box.New`** - Use `Box` from `@navikt/ds-react/Box` instead

#### 📝 Changes

- Updated TypeScript types to use new token types from `@navikt/ds-tokens/types`
- Improved token type safety with specific token unions

#### 🔧 Migration

Run `npx @navikt/aksel@latest codemod v8-box` to migrate Box with legacy tokens.  
Run `npx @navikt/aksel@latest codemod v8-box-new` to rename Box.New instances.

---

### Button

#### 🗑️ Deprecated

- Variant-based color schemes replaced with `data-color`:
  - `variant="primary-neutral"` → `variant="primary"` + `data-color="neutral"`
  - `variant="secondary-neutral"` → `variant="secondary"` + `data-color="neutral"`
  - `variant="tertiary-neutral"` → `variant="tertiary"` + `data-color="neutral"`
  - `variant="danger"` → `variant="primary"` + `data-color="danger"`

#### ✨ Added

- **`data-color`** prop - Controls button color independently of variant

#### 📝 Changes

- Simplified CSS class logic - removed variant-specific classes in favor of data attributes
- Improved color consistency across design system

#### 🔧 Migration

Run `npx @navikt/aksel@latest codemod v8-button-variant`

---

### Chat

#### 🗑️ Deprecated

- **`variant`** prop - No effect, styling handled by design system

---

### Chips

#### 🗑️ Deprecated

- **`variant`** prop on `Chips.Toggle` - Use `data-color` instead
  - `variant="action"` → `data-color="accent"` (default)
  - `variant="neutral"` → `data-color="neutral"`

#### ✨ Added

- **`data-color`** prop - Controls chip color

#### 🔧 Migration

Run `npx @navikt/aksel@latest codemod v8-chips-variant`

---

### Checkbox

#### 📝 Changes

- **Now uses new implementation as default**
- Previously behind feature flag, now standard
- Improved styling and accessibility
- No API changes required

---

### CopyButton

#### 🗑️ Deprecated

- **`variant`** prop - No replacement

---

### Link

#### 🗑️ Deprecated

- **`variant`** prop - Use `data-color` instead
  - `variant="action"` → `data-color="accent"` (default)
  - `variant="neutral"` → `data-color="neutral"`
  - `variant="subtle"` → `data-color="neutral"`

#### ✨ Added

- **`data-color`** prop - Controls link color

#### 📝 Changes

- Removed variant-specific CSS classes
- Simplified color logic

#### 🔧 Migration

Run `npx @navikt/aksel@latest codemod v8-link-variant`

---

### List

#### 💥 Breaking Changes - Removed Props

- **`title`** - Move to separate `<Heading>` component before `<List>`
- **`description`** - Move to separate `<BodyShort>` component before `<List>`
- **`headingTag`** - No longer needed

#### 📝 Rationale

Improved component composition and flexibility by separating concerns. Titles and descriptions should be managed outside the list component.

#### 🔧 Migration

Run `npx @navikt/aksel@latest codemod v8-list` (may require manual adjustments for complex cases)

---

### Modal

#### 📝 Changes

- Removed `navds-modal__document-body` CSS class (internal change)
- Updated test to avoid "not wrapped in act" warning

---

### Page (Primitive)

#### 🗑️ Deprecated

- **`background`** prop - No longer has any effect

---

### Popover

#### 🗑️ Deprecated

- **`arrow`** prop - No longer has any effect (arrows always shown)

#### 📝 Changes

- Simplified offset calculation: default changed to `8` (was `16` with arrow, `4` without)
- Removed arrow ref and middleware (internal simplification)
- Cleaner implementation with omit utility for deprecated props

---

### Radio

#### 📝 Changes

- **Now uses new implementation as default**
- Previously behind feature flag, now standard
- Improved styling and accessibility
- No API changes required

---

### Select

#### 💥 Breaking Changes - Removed Props

- **`htmlSize`** - Removed with no replacement

---

### Stepper

#### 📝 Changes

- Kept `data-interactive` attribute for CSS styling requirements

---

### Tag

#### 💥 Breaking Changes

- **Complete variant system redesign**
- New variants: `outline`, `moderate`, `strong` (default: `outline`)
- Old variants deprecated but still functional through compatibility layer:
  - All `-filled` variants map to `strong`
  - All `-moderate` variants map to `moderate`
  - Base variants map to `outline`

#### ✨ Added

- **`data-color`** prop - Controls tag color (default: `"neutral"`)
- **`variant`** prop - Now accepts `"outline"`, `"moderate"`, or `"strong"`

#### 📝 Changes

- Removed variant-specific CSS classes
- Uses data attributes for styling
- Improved color consistency with rest of design system

#### 🔧 Migration

Run `npx @navikt/aksel@latest codemod v8-tag-variant`

---

### ToggleGroup

#### 🗑️ Deprecated

- **`variant`** prop - Use `data-color` instead

#### ✨ Added

- **`data-color`** prop - Controls toggle group color

#### 🔧 Migration

Run `npx @navikt/aksel@latest codemod v8-toggle-group-variant`

---

## 🎨 Styling & Theming

### CSS Variables

#### 💥 Breaking Changes

- Internal CSS variable prefix: `--__ac-*` → `--__axc-*`
- Spacing tokens: `--a-spacing-*` → `--ax-spacing-*`
- Background tokens: `--a-*` → `--ax-bg-*`
- Border tokens: `--a-*` → `--ax-border-*`
- Shadow tokens: `--a-shadow-*` → `--ax-shadow-*`

### Theme System

#### 📝 Changes

- Darkside is now the default (no need for `<Theme>` component for basic usage)
- Removed legacy theme checks and conditional logic
- Simplified theme context usage

---

## 🏗️ Infrastructure & Tooling

### Build System

#### 📝 Changes

- **@navikt/ds-css**: Simplified build process with esbuild and lightningcss
- **@navikt/ds-tokens**: Reorganized source structure (`darkside/` → `src/`)
- Removed unnecessary PostCSS plugins
- Improved build performance

### Testing

#### ✨ Added

- New Vitest tests for codemod functionality
- Improved Storybook test coverage
- Added tests for token migration status

#### 📝 Changes

- Rewrote old testing-library tests for Tooltip and Popover with Storybook
- Refactored Chromatic stories to use helper functions
- Fixed ESLint errors in tests

### CI/CD

#### ✨ Added

- GitHub Actions workflow for deploying v7 documentation (`aksel-v7-deploy.yml`)
- Trusted publishing for NPM packages

#### 📝 Changes

- Updated Dependabot configuration with cooldown and grouping
- Updated Playwright image version

### Dependencies

#### ⬆️ Upgraded

- `chalk`: `4.1.0` → `5.6.2`
- `clipboardy`: `2.3.0` → `5.0.0`
- `browserslist`: Updated to `^4.25.0`
- `mdast-util-to-hast`: `13.2.0` → `13.2.1`
- Storybook group: 9 packages updated
- Various other security and maintenance updates

#### 🔒 Security

- Resolved CVE-2025-66478
- Updated `node-forge`: `1.3.1` → `1.3.2`
- Updated `valibot`: `1.1.0` → `1.2.0`

---

## 📚 Documentation & Examples

### Website

#### ✨ Added

- GitHub issue link on 404 page with current URL
- New migration documentation
- Updated examples for all changed components

#### 📝 Changes

- Updated all component examples to use new APIs
- Migrated templates to use Darkside
- Adjusted color and styling examples
- Updated Select, Checkbox, Switch examples
- Fixed examples navigation in preview mode

### Examples

#### 📝 Changes

- **All example apps migrated to v8**:
  - `examples/astro`
  - `examples/next-appdir`
  - `examples/referansesider`
  - `examples/shadow-dom`
- Updated dependencies and configurations
- Verified compatibility with new token system

---

## 🐛 Bug Fixes

### Accordion

- Removed `aria-hidden` to prevent SiteImprove accessibility issues

### Modal

- Fixed test warnings about operations not wrapped in `act()`

### Website

- Added `type="button"` on sidebar subnav expand button to prevent form submission

### List

- Added warning for deprecated props in development mode (before full removal)

---

## 🔄 Migration Path

### Recommended Order

1. **Update package versions** to v8.x
2. **Update imports**:
   ```bash
   # Tokens
   npx @navikt/aksel@latest codemod v8-tokens
   
   # CSS in JavaScript
   # Change: @navikt/ds-css/darkside → @navikt/ds-css
   ```
3. **Run spacing codemods**:
   ```bash
   npx @navikt/aksel@latest codemod v8-token-spacing       # CSS/SCSS/LESS
   npx @navikt/aksel@latest codemod v8-token-spacing-js    # JavaScript/TypeScript
   npx @navikt/aksel@latest codemod v8-primitive-spacing   # Primitive components
   ```
4. **Run component variant codemods**:
   ```bash
   npx @navikt/aksel@latest codemod v8-button-variant
   npx @navikt/aksel@latest codemod v8-link-variant
   npx @navikt/aksel@latest codemod v8-tag-variant
   npx @navikt/aksel@latest codemod v8-chips-variant
   npx @navikt/aksel@latest codemod v8-accordion-variant
   npx @navikt/aksel@latest codemod v8-toggle-group-variant
   ```
5. **Run Box codemods**:
   ```bash
   npx @navikt/aksel@latest codemod v8-box              # Migrate Box to new tokens
   npx @navikt/aksel@latest codemod v8-box-new          # Rename Box.New to Box
   ```
6. **Run List codemod** (may need manual review):
   ```bash
   npx @navikt/aksel@latest codemod v8-list
   ```
7. **Clean up deprecated props**:
   ```bash
   npx @navikt/aksel@latest codemod v8-prop-deprecate
   ```
8. **Test thoroughly** and update custom styles if needed

---

## 📊 Statistics

- **960 files changed**, 13,982 insertions(+), 22,075 deletions(-)
- **65 commits** in this release
- **15 new codemods** to assist migration
- **All packages** synchronized to v7.35.1

---

## 🙏 Acknowledgments

This release represents a significant milestone in Aksel's evolution. Thank you to all contributors who helped test, provide feedback, and migrate internal NAV projects to Darkside.

For detailed migration instructions and component-specific changes, see the [Migration Guide](./V8_MIGRATION_GUIDE.md).

For questions or issues, please visit:
- Documentation: https://aksel.nav.no
- GitHub: https://github.com/navikt/aksel/issues
- Slack: #aksel (internal NAV)
