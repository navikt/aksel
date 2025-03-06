import { check } from "../../../codemod/utils/check";

/* JS transforms */
for (const fixture of ["js-replace-all", "js-replace-some"]) {
  check(__dirname, {
    fixture,
    migration: "darkside-tokens-js",
    extension: "js",
  });
}
