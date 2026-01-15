# Aksel stylelint rules & plugins

This stylelint plugin is useful when working with the [Aksel design system](https://aksel.nav.no/).

It is designed to be useful for both _internal_ and _external_ developers, so _everyone_ should install this 🙌.

> **Warning**
> The version of this plugin **_MUST MATCH_** the version of the other design system packages used in your project for the linting to make sense!
> Otherwise you are very likely to get _incorrect_ errors that tell you to use the wrong token names.

# Install

```bash
yarn add -D @navikt/aksel-stylelint
npm install -D @navikt/aksel-stylelint
```

### How to configure

It should be sufficient for most cases to extend the recommended defaults.

```js
  "stylelint": {
    "extends": [
        ...
        "@navikt/aksel-stylelint/recommended"
    ],
    ...
  }
```

## aksel/design-token-exists

Makes sure all referenced CSS-variables with prefix `--ax-` exists in Aksel's token-collection. As a side-effect Aksel reserves these prefixes for its design-tokens.

❌ Incorrect:

```css
html {
    --ax-my-own-color-bg-hover: #f2f2f2;
    ^^^^^^^^^^^^^^^^^^^^^^^^^^
    background-color: var(--ax-my-own-color-bg-hover);
                          ^^^^^^^^^^^^^^^^^^^^^^^^^^
}
```

✅ Correct:

```css
html {
  background-color: var(--ax-bg-default);
}
```

## aksel/design-token-no-global-override

Makes sure you don't override Aksel design tokens with `--ax-`-prefix. Design tokens are supposed to be used as is, and not overridden. That is unless you are theming your solution to match a different brand. In those cases we encourage to make all the changes in a single 'config'-file, then disable the rule for that file only.

❌ Incorrect:

```css
div {
    --ax-surface-default: #f2f2f2;
    ^^^^^^^^^^^^^^^^^^^^
}
```

✅ Correct:

```css
div {
  background-color: var(--ax-surface-default);
}
```

## aksel/no-internal-tokens

Disallows use or override of internal Aksel CSS variables. Internal CSS variables are not supposed to be used outside the design system, and may be changed or removed without warning. Be aware that the rule simply checks the prefix of the token, and not if it actually exists in the design system. Even if it doesn't exist, using design system prefixes should be avoided.

❌ Incorrect:

```css
a {
  --__axc-some-property: pink;
} ^^^^^^^^^^^^^^^^^^^^^
```

```css
a {
  color: var(--__axc-some-property);
}            ^^^^^^^^^^^^^^^^^^^^^
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

## aksel/no-class-override

Warns when trying to override design system styling by using class selectors that starts with "aksel-". Overriding styles in the design system is discouraged. We want to have consistent look and feel across applications. Even if it seems to work fine now, it might break on subsequent updates in the design system.

❌ Incorrect:

```css
.aksel-button {
 ^^^^^^^^^^^^
}
```

✅ Correct:

```css
.some-class {
}
```

## aksel/no-deprecated-classes

Warns when you try to use deprecated class names.

❌ Incorrect:

```css
.aksel-deprecated-example {
 ^^^^^^^^^^^^^^^^^^^^^^^^
}
```

## aksel/no-legacy-classes

Warns when trying to to use legacy class names starting with `.navds`. As of version 8.0, all class names are prefixed with `.aksel`, so all old overrides no longer work.

We still discourage overriding class names from `@navikt/ds-css`:

- Add your own `className` instead of referencing Aksel classes directly.
- Open a GitHub issue if what you need to do isn't straightforward, and we'll work together to find a solution.

❌ Incorrect:

```css
.navds-button {
 ^^^^^^^^^^^^
}
```

🐛 Found a bug? https://github.com/navikt/aksel/issues
