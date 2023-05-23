# Aksel stylelint rules & plugins

## aksel-design-token-exists

This stylelint rule will help you referrence or override a design token in the Aksel design system by making sure that it exists.

### Install

```bash
yarn add @navikt/aksel-stylelint
npm install -D @navikt/aksel-stylelint
```

### Options

```ts
interface PrimaryOptions {
  type PrimaryOptions = {
    controlledPrefixes?: (string | RegExp)[];
    tokenDefinitionsFile: string;
    overrideableTokenDefinitionsJSONFile: string;
  };
}
```

### How to configure

It should be sufficient for most cases to extend the recommended defaults.

```js
  "stylelint": {
    "extends": [
        ...
        "./@navikt/aksel-stylelint/dist/recommended"
    ],
    ...
  }
```

If you want to configure it further, or tweak the behaviour of the rule, you can look inside `@navikt/aksel-stylelint/recommended.ts`

```js
const stylelintConfig = {
  rules: {
    "@navikt/aksel-design-token-exists": {
      tokenDefinitionsFile: "@navikt/core/css/dist/index.css",
      overrideableTokenDefinitionsJSONFile: "@navikt/core/css/tokens.json",
    },
  },
};
```
