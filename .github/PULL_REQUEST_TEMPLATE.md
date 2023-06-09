### :memo: PR Checklist

<!-- Remove non-relevant fields -->

- [ ] :sparkles: New component? Add CSS-mappings to `@navikt/core/css/config/_mappings.js`.

- [ ] :wastebasket: Are you deprecating a CSS class? (are you removing the last known reference to a CSS class?). Add it to `@navikt/aksel-stylelint/src/deprecations.ts` with a suitable description.

- [ ] :balance_scale: Is the feature/component/code sufficiently complex to warrant tests? Add some unit-tests :test_tube:

- [ ] :balance_scale: Does the feature/component add some complex user-interactions? Consider adding some [interaction-tests with storybook](https://storybook.js.org/docs/react/writing-tests/interaction-testing) :test_tube:

- [ ] :boom: Are there breaking changes? Consider adding a codemod for easier migration.

- [ ] :test_tube: Are all variations and cases shown in the storybook stories? Stories are used for [visual regression testing](https://www.chromatic.com/docs/), so make sure they are complete.

- [ ] Run `yarn changeset` for version and changelog generation
