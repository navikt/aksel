---
description: "Editing @navikt/ds-css component styles: file setup, layers, selectors, tokens, deprecations."
applyTo: "@navikt/core/css/src/**"
---

# ds-css

- One file per component in `src/` (`badge.css`). A new file must be `@import`ed in `src/index.css` with the right `layer(...)`, otherwise it isn't bundled. Most components use `aksel.components.modules`; form controls go through `form/index.css`.
- Selectors use the `.aksel-<component>` prefix and BEM-ish `__part` / `--modifier`. State goes through `data-*` / ARIA attribute selectors, not extra modifier classes.
- Use tokens only: public `--ax-*`, component-internal `--__axc-*`. No hardcoded colors, spacing or radii. Stylelint flags unknown custom properties.
- Colors follow `data-color` (see nearby components). Don't add per-variant color selectors.
- Focus uses `:focus-visible` (outline + `outline-offset`). Check `forced-colors`, print and dark theme in Storybook.
- `prefers-reduced-motion` is handled globally in `baseline/baseline.css`. Don't duplicate it per component.
- `baseline/tokens.css` re-exports `@navikt/ds-tokens` build output. Edit tokens in `@navikt/core/tokens/src`, not here.
- Removing or renaming a class is breaking for consumers (for allready published components. Ignore for new components). Add it to `@navikt/aksel-stylelint/src/deprecations.ts`.
