### :memo: PR Checklist

- [ ] :sparkles: New component? add mapping to `@navikt/core/css/config/_mappings.js`

- [ ] :wastebasket: Are you deprecating a CSS class? (are you removing the last known reference to a CSS class?) add the class to the `@navikt/aksel-stylelint/src/deprecations.ts`

- [ ] :balance_scale: Is the feature/component/code sufficiently complex to warrant tests? (beyond storybook & snapshots) create tests

- [ ] :boom: Are there breaking changes? create codemod.

- [ ] :test_tube: Are there useful variations and use-cases in the storybook stories? (for visual testing)

- [ ] Run `yarn changeset`
