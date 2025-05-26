// https://github.com/changesets/changesets/blob/main/docs/modifying-changelog-format.md

const svitejsChangelogFunctions = require("@svitejs/changesets-changelog-github-compact");

const getDependencyReleaseLine = async () => {
  /*
  Would normally generate something like this:
  ```
    - Updated dependencies []:
      - @navikt/ds-tokens@7.18.0
      - @navikt/aksel-icons@7.18.0
  ```
  */
  return "";
};

module.exports = {
  getReleaseLine: svitejsChangelogFunctions.default.getReleaseLine,
  getDependencyReleaseLine,
};
