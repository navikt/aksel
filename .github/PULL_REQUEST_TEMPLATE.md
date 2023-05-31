# :memo: Checklist

<details>

<summary>Are you making a tool?</summary>

> Something that could be downloaded separately outside the greater context of the monorepo. It should be self-contained, as well as non-trusting of the dependencies of its dependencies.

### Are there any implicit dependencies that should be made explicit?

- [ ] review external dependencies. handy command: `grep -hE 'import.*? from "[^.]' -R ./src --exclude='*.test.*' | sort -u`

</details>

## Are you deprecating a CSS class? (are you removing the last known reference to a CSS class?)

- [ ] add the class to the `@navikt/aksel-stylelint/src/deprecations.ts`

## :balance_scale: Is the feature/component/code sufficiently complex to warrant tests? (beyond storybook & snapshots)

- [ ] create tests

## Does the PR need a codemod? (breaking changes)

- [ ] create codemod

## Run changeset

- [ ] `yarn changeset`
