# Aksel styling

CSS for NAVs designsystem.

- Css tokens (Colors, border, shadows etc)
- Component-styling for `@navikt/ds-react` packages
- Normalize.css v8
- Font-loading

## Installation

```bash
  yarn add @navikt/ds-css
  npm install @navikt/ds-css
```

## Usage

Import styles once to make it accessible for your entire project. Typically you will add the following line to your root .tsx file.

```javascript
import "@navikt/ds-css";

function App() {
  return <Component />;
}
```

But you can import it in a .css-file

```css
@import "@navikt/ds-css";
```

## Learn more

- [Docs](https://aksel.nav.no/komponenter)
- [Storybook](https://aksel.nav.no/storybook/)
- [ds-react README](https://github.com/navikt/aksel/blob/main/%40navikt/core/react/README.md)

## License

[MIT](https://github.com/navikt/aksel/blob/main/LICENCE)
