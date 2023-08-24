# Aksel React-components

React-components for NAVs designsystem.

- Uses styling defined in `@navikt/ds-css`
- All components implemented with React.forwardRef!
- Most components extend native html-elements.

## Installation

```bash
  yarn add @navikt/ds-react
  npm install @navikt/ds-react
```

## Usage

Remember to also import `@navikt/ds-css` for styling!

```javascript
import { Button } from "@navikt/ds-react";

function App() {
  return <Button variant="secondary">Click me!</Button>;
}
```

## Learn more

- [Docs](https://aksel.nav.no/komponenter)
- [Storybook](https://aksel.nav.no/storybook/)
- [ds-css README](https://github.com/navikt/aksel/blob/main/%40navikt/core/css/README.md)

## License

[MIT](https://github.com/navikt/aksel/blob/main/LICENSE)
