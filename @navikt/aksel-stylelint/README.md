# Aksel stylelint rules & plugins

## aksel-design-token-exists

This rule checks that if you use one of the reserved token prefixes `--a-` or `--ac-` then the token itself _must_ be provided by design system itself.


❌ Incorrect:

```css
html h1 {
    --a-my-own-color-bg-hover: #f2f2f2;
    ^^^^^^^^^^^^^^^^^^^^^^^^^
    background-color: var(--a-my-own-color-bg-hover, #ffffff);
                          ^^^^^^^^^^^^^^^^^^^^^^^^^
}
```

✅ Correct:

```css
html h1 {
    background-color: var(--ac-accordion-header-bg-hover, #ffffff);
}
```

## aksel-no-internal-tokens

Disallows use or override of internal Aksel design tokens. Internal tokens are not supposed to be used outside the design system, and they may be changed or removed without warning. Be aware that the rule simply checks the prefix of the token, and not if it actually exists in the design system. Even if it doesn't exist, using design system prefixes should be avoided.

❌ Incorrect:

```css
a { --__ac-some-property: pink; }
    ^^^^^^^
```

```css
a { color: var(--__ac-some-property); }
               ^^^^^^^
```

✅ Correct:

```css
a {
  --some-property: pink;
}
```

```css
a {
  color: var(--some-property);
}
```

## aksel-no-class-override

Warns when trying to override design system styling by using class selectors that starts with "navds-" or "navdsi-". Overriding styles in the design system is discouraged. We want to have consistent look and feel across applications. Even if it seems to work fine now, it might break on subsequent updates in the design system.

❌ Incorrect:

```css
.navds-button {}
 ^^^^^^
```

```css
.some-class .navdsi-header {}
             ^^^^^^^
```

✅ Correct:

```css
.some-class {
}
```

# Install

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

