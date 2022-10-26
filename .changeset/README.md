# Changesets

To handle versioning and released, we use [Changesets](https://github.com/changesets/changesets) to [version](https://semver.org/) and publish our packages.

## Howto

- To create a new version, run `yarn changeset`
- select versions to change with arrowkeys + spacebar

`🦋 Which packages would you like to include?`

- Press the `Space` key to select `changed packages`, then press `Enter` to move to the next question.

`🦋 Which packages should have a major bump?`

- Press the `Enter` key to select none and move to the next question, _*or*_ navigate packages using the arrow keys and press the `Space` key to select the packages with changes that should target a major version.

`🦋 Which packages should have a minor bump?`

- Press the `Enter` key to select none so that your changes automatically target a patch bump, _*or*_ select packages using the up and down arrow keys and space if your changes should target a minor version.

- Commit and push up.

## Fixed versioning

All our "base"-packages are has fixed versioning. This means a semver-bump on any of them will bump all of them. Take

Current fixed packages

```
[
  "@navikt/ds-react",
  "@navikt/ds-css",
  "@navikt/ds-icons",
  "@navikt/ds-tokens",
  "@navikt/ds-tailwind",
  "@navikt/ds-css-internal",
  "@navikt/ds-react-internal",
  "@navikt/ds-codemod"
]
```
