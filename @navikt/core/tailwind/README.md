# Aksel tailwind-preset

Custom tailwind-preset based on `@navikt/ds-tokens`.

## Installation

```bash
  yarn add @navikt/ds-tailwind
  npm install @navikt/ds-tailwind
```

## Use with tailwind v3

```javascript
// tailwind.config.js

module.exports = {
  presets: [require("@navikt/ds-tailwind")],
};
```

## Use with tailwind v4

```css
@import "tailwindcss";
@import "@navikt/ds-tailwind/v4";
```

## Learn more

- [Docs](https://aksel.nav.no/grunnleggende/kode/tailwind)

## License

[MIT](https://github.com/navikt/aksel/blob/main/LICENSE)
