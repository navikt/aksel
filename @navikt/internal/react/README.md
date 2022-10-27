# NAV React-components for internal-solutions

NAVs internal React-components used for more internal facing surfaces.

- Uses styling from `@navikt/ds-css` and `@navikt/ds-internal-css`
- All components implemented with React.forwardRef!
- Most components extend native html-elements.

## Installation

Install `@navikt/ds-react-internal` with yarn

```bash
  yarn add @navikt/ds-react-internal
```

Install `@navikt/ds-react-internal` with npm

```bash
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

- [Designsystem documentation](https://aksel.nav.no/designsystem)
- [Component-docs](https://aksel.nav.no/designsystem/side/oversikt-komponenter)
- [Storybook](https://master--5f801fb2aea7820022de2936.chromatic.com/)

## License

[MIT](https://github.com/navikt/Designsystemet/blob/master/LICENCE)
