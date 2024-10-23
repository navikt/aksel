# Template for writing new CSS

## File setup

1. Create new CSS-file for component: "alert.darkside.css", "button.darkside.css" etc. Remember to add `.darkside.` for easier lookup.
2. Import file in "darkside/index.css": `@import "./alert.darkside.css`

Files will not be included in `/dist` for now to avoid it potentially polluting production-code. This will need to be revisited when we want to expose the new systems outside the team.

## Development

1. Write new CSS for component. Use same prefix `.navds` as before.
2. Run storybook and change from "Default (old)" to "Darkside (new)" in toolbar. You are now developing new CSS 🎉

## Syntax

- Test using outline + outline-offset for focus-markings.

## Checklist

- Add new CSS-files under `core/css/darkside`.
- New files should include `.darkside.` for easier lookup.
- Import new CSS-files in `core/css/darkside/index.css`
- New CSS-selectors should have `.navds` as prefix, same as original code.
- Test changes in Storybook by changing mode in toolbar from "default (old)" -> "darkside (new)"
