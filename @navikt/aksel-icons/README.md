# Aksel icons

800+ open source icons made by Aksel, Nav's design system team.

- Designed for 24x24px
- Available in React and SVG
- Accessible with use of `title`-prop
- Suffixed with `Icon`

## Install

```bash
  yarn add @navikt/aksel-icons
  npm install @navikt/aksel-icons
```

## Use

For previous users of `@navikt/ds-icons`, this package utilizes the same API. The only difference is that the icons are suffixed with `Icon` to avoid naming conflicts and visual changes to the icons themselves.

```jsx
import { StarIcon } from "@navikt/aksel-icons";

function App() {
  return <StarIcon title="star" fontSize="1.5rem" />;
}
```

Tip: Use the `title` prop for accessible icons.

### Sizing

Each icon's `width` and `height` is default `1em`. This allows you to use the native `fontSize`-prop to adjust sizing. We recommend using at least 1.5rem/24px for the best possible visual representation.

```jsx
<StarIcon fontSize="1.5rem" />
```

### Direct svg-import

All icons are available in raw SVG-format behind `/svg`. Note that svg-files do not have the suffix `Icon`.

```js
import StarIcon from "@navikt/aksel-icons/svg/Star.svg";
```

If using typescript, TS might complain about not finding types related to the svg-format. Add a `*.d.ts` file with this declaration to fix this. (This was copied from next/image-types/global.d.ts since next solves this internally, but should work elsewhere)

```ts
declare module "*.svg" {
  /**
   * Use `any` to avoid conflicts with
   * `@svgr/webpack` plugin or
   * `babel-plugin-inline-react-svg` plugin.
   */
  const content: any;

  export default content;
}
```

### CSS custom properties

All icons are available as CSS custom properties behind `/css`, one file per icon. Each file declares a `--aksel-icon-<kebab-case-name>` variable on `:root`, containing the icon as an SVG data URI.

```css
@import "@navikt/aksel-icons/css/MagnifyingGlass.css";

.search-button::before {
  content: "";
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  background-color: currentColor;
  mask: var(--aksel-icon-magnifying-glass) center / contain no-repeat;
}
```

To get every icon, import `@navikt/aksel-icons/css/index.css`. This file contains all ~1000 icons (≈700 kB, ≈135 kB gzipped), so prefer importing only the icons you use.

- Icons added with CSS are decorative only. Give the parent element an accessible name, e.g. with visible text or `aria-label`.
- In forced colors mode (e.g. Windows High Contrast), `background-color` is overridden. Set `forced-color-adjust: none` or use `background-color: CanvasText` inside `@media (forced-colors: active)`.
- If you use a Content Security Policy, `img-src` must allow `data:`.

## [Learn more](https://aksel.nav.no/ikoner)

## License

[MIT](https://github.com/navikt/aksel/blob/main/LICENSE)
