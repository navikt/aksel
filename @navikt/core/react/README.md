# NAV React-components

All of NAVs core React-components

- Uses styling from `@navikt/ds-css`
- All components implemented with React.forwardRef!
- Most components extend native html-elements.

## Installation

Install `@navikt/ds-react` with yarn

```bash
  yarn add @navikt/ds-react
```

Install `@navikt/ds-react` with npm

```bash
  npm install @navikt/ds-react
```

## Usage

Remember to also import @navikt/ds-css to apply styling! See README-link under "learn more"-section below.

```javascript
import { Button } from "@navikt/ds-react";

function App() {
  return <Button variant="secondary">Click me!</Button>;
}
```

## Learn more

- [Designsystem documentation](https://aksel.nav.no/designsystem)
- [Component-docs](https://aksel.nav.no/designsystem/side/oversikt-komponenter)
- [Storybook](https://master--5f801fb2aea7820022de2936.chromatic.com/)
- [ds-css README](https://github.com/navikt/Designsystemet/blob/master/%40navikt/core/css/README.md)

## License

[MIT](https://github.com/navikt/Designsystemet/blob/master/LICENCE)
