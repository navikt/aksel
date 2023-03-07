# Aksel icons

800+ open source icons made by Aksel, NAVs designsystem-team

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

```jsx
import { StarIcon } from "@navikt/ds-icons";

function App() {
  return <StarIcon title="star" fontSize="1.5rem"/>;
}

Tip: Use the `title` prop for accessible icons.
```

### Sizing

Each icons `width` and `height` is default `1em`. This allows you to use the native `fontSize`-prop to adjust sizing. We recommend using at least 1.5rem/24px for best possible visual representation.

```jsx
<StarIcon fontSize="1.5rem" />
```

## Learn more

- [Docs](https://aksel.nav.no/ikoner)

## License

[MIT](https://github.com/navikt/aksel/blob/main/LICENCE)
