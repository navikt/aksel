# :memo: PR Checklist

- [ ] :wastebasket: Are you deprecating a CSS class? (are you removing the last known reference to a CSS class?) add the class to the `@navikt/aksel-stylelint/src/deprecations.ts`

- [ ] :balance_scale: Is the feature/component/code sufficiently complex to warrant tests? (beyond storybook & snapshots) create tests

- [ ] :boom: Are there breaking changes? create codemod.

- [ ] Run `yarn changeset`
