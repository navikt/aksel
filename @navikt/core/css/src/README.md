# Template for writing new CSS

## File setup

1. Create new CSS-file for component: "alert.css", "button.css" etc.
2. Import file in "index.css": `@import "./alert.css`
3. Add correct "layer" to import.

## Development

1. Write new CSS for component. Use prefix `.aksel`.
2. Run storybook: You are now developing new CSS 🎉

## Checklist

- Add new CSS-files under `core/css/src/`.
- Import new CSS-files in `core/css/src/index.css`
- New CSS-selectors should have `.aksel` as prefix.
- Use outline + outline-offset 3px for focus-markings.
- Use `:focus-visible` where possible.
- Check forced colors (high-contrast)
- Check print
- Test changes in Storybook.
