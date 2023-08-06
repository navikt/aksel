### Description

<!-- PR description/motivation
add links to project-tasks, slack discussions etc here
-->

### Change summary

<!-- Short summary of changes in PR
- added variant x
- fixed bug in y
-->

### PR Checklist 📝 (Remove fields after check!)

#### New component? ✨

- Check that component-styling is correctly configured in `@navikt/core/css/config/_mappings.js`. This is needed for correct build and CDN upload.
- Check that styling is correctly exported from `@navikt/core/css/index.css`
- Check that correct tokens for component is documented in `@navikt/core/css/tokens.json`
- Check that only needed components and types are exported from `@navikt/core/react/src/index.ts`
- Add JSDoc to component (see other components for reference)
- Create storybook-stories for relevant component variations and compositions. Stories are used for [visual regression testing](https://www.chromatic.com/docs/), so make sure they are complete.
- Is the component sufficiently complex to warrant tests? Add some unit-tests for jest.

#### Component-updates 🎉

- Revalidate if everything under `New component` is still accounted for
- Deprecating/removing a CSS class? Add it to `@navikt/aksel-stylelint/src/deprecations.ts` with a suitable description. This helps stylelint-users keep their code clean and bug-free.

#### Documentation 📝

- Add/update component-demos for component `aksel.nav.no/website/pages/eksempler`
- Create/Update documentation in sanity if needed
  Note: Props, tokens and examples only updates to sanity on merge to main

#### Versioning 🏷️

- Run `yarn changeset` to generate a version-entry for change.
- - Bug/hotfix: Patch
- - New feature: Minor
- - Breaking change: Major
- Adding breaking changes? Consider adding a codemod for easier migration.
- Breaking changes also needs documentation under "Migration"-page on website
