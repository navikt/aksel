# Aksel React-components for "internal"-solutions

NOTICE: Package is deprecated. Use `@navikt/ds-react` instead.

NAVs designsystem React-components used for more internal facing surfaces.

- Uses styling from `@navikt/ds-css` and `@navikt/ds-internal-css`
- All components implemented with React.forwardRef!
- Most components extend native html-elements.

## Installation

```bash
  yarn add @navikt/ds-react-internal
  npm install @navikt/ds-react-internal
```

## Usage

Remember to also import @navikt/ds-css and @navikt/ds-css-internal to apply styling!

```javascript
import { Header } from "@navikt/ds-react-internal";

function App() {
  return (
    <Header>
      <Header.Title as="h1">Title</Header.Title>
    </Header>
  );
}
```

## Learn more

- [Docs](https://aksel.nav.no/komponenter)
- [Storybook](https://aksel.nav.no/storybook/)

## License

[MIT](https://github.com/navikt/aksel/blob/main/LICENCE)
