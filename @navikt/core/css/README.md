# NAV designsystem styling

CSS-package containing design for @navikt/ds-react and more.

- All our tokens (Colors, border, shadows etc)
- Component-styling for `@navikt/ds-react` packages
- Normalize.css v8
- Fonts

## Installation

Install `@navikt/ds-css` with yarn

```bash
  yarn add @navikt/ds-css
```

Install `@navikt/ds-css` with npm

```bash
  npm install @navikt/ds-css
```

## Usage

You can import these styles once to make it accessible in your entire project. Typically you will add the following line to your root .js or .ts files.

```javascript
import "@navikt/ds-css";

function App() {
  return <Component />;
}
```

But you can also import it in a .css-file like this

```css
@import "@navikt/ds-css";
```

## Learn more

- [Designsystem documentation](https://aksel.nav.no/designsystem)
- [Storybook](https://master--5f801fb2aea7820022de2936.chromatic.com/)
- [ds-react README](https://github.com/navikt/Designsystemet/blob/master/%40navikt/core/react/README.md)

## License

[MIT](https://github.com/navikt/Designsystemet/blob/master/LICENCE)
