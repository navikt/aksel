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

## @navikt/aksel-design-token-exists

Makes sure all referenced CSS-variables with prefix `--a-` or `--ac-` exists in Aksels token-collection. As a side-effect Aksel reserves these prefixes for its design-tokens.

❌ Incorrect:

```css
html {
    --a-my-own-color-bg-hover: #f2f2f2;
    ^^^^^^^^^^^^^^^^^^^^^^^^^
    background-color: var(--a-my-own-color-bg-hover);
                          ^^^^^^^^^^^^^^^^^^^^^^^^^
}
```

✅ Correct:

```css
html {
  background-color: var(--custom-tag-surface-default);
}
```

## @navikt/aksel-design-token-no-global-override

Makes sure you don't override global level tokens with `--a-`-prefix. Global/Semantic tokens are supposed to be used as is, and not overridden. That is unless you are theming your solution to match a different sub-brands or brands. In those cases we encourage to make all the changes in a single 'config'-file, then disable the rule for that file only.

❌ Incorrect:

```css
div {
    --a-surface-default: #f2f2f2;
    ^^^^^^^^^^^^^^^^^^^
}
```

✅ Correct:

```css
div {
  background-color: var(--a-surface-default);
}
```

## @navikt/aksel-design-token-no-component-reference

Makes sure you don't reference component level tokens with `--ac-`-prefix. Component level tokens are only supposed to be overridden, not referenced.
This is since they are by default not defined, leading to unknown side-effects when referenced incorrectly.

❌ Incorrect:

```css
html {
    stroke: var(--ac-button-loader-stroke);
                ^^^^^^^^^^^^^^^^^^^^^^^^^
}
```

✅ Correct:

```css
html {
  --ac-button-loader-stroke: lawngreen;
}
```

## @navikt/aksel-no-internal-tokens

Disallows use or override of internal Aksel design tokens. Internal tokens are not supposed to be used outside the design system, and may be changed or removed without warning. Be aware that the rule simply checks the prefix of the token, and not if it actually exists in the design system. Even if it doesn't exist, using design system prefixes should be avoided.

❌ Incorrect:

```css
a {
  --__ac-some-property: pink;
} ^^^^^^^^^^^^^^^^^^^^
```

```css
a {
  color: var(--__ac-some-property);
}            ^^^^^^^^^^^^^^^^^^^^
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

## @navikt/aksel-no-class-override

Warns when trying to override design system styling by using class selectors that starts with "navds-" or "navdsi-". Overriding styles in the design system is discouraged. We want to have consistent look and feel across applications. Even if it seems to work fine now, it might break on subsequent updates in the design system.

❌ Incorrect:

```css
.navds-button {
^^^^^^^^^^^^^
}
```

```css
.some-class .navdsi-header {
}           ^^^^^^^^^^^^^^
```

✅ Correct:

```css
.some-class {
}
```

## @navikt/aksel-no-deprecated-classes

Warns when you try to use deprecated class names.

❌ Incorrect:

```css
.navdsi-deprecated-example {
^^^^^^^^^^^^^^^^^^^^^^^^^^
}
```

✅ Correct:

```css
.guaranteed-not-deprecated {
}
```

🐛 Found a bug? https://github.com/navikt/aksel/issues
