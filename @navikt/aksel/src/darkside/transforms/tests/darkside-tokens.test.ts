import { check } from "../../../codemod/utils/check";

/* JS transforms */
for (const fixture of ["js-replace-all", "js-replace-some"]) {
  check(__dirname, {
    fixture,
    migration: "darkside-tokens-js",
    extension: "js",
  });
}

/* SCSS transforms */
for (const fixture of ["scss-complete"]) {
  check(__dirname, {
    fixture,
    migration: "darkside-tokens-scss",
    extension: "scss",
  });
}

/* LESS transforms */
for (const fixture of ["less-complete"]) {
  check(__dirname, {
    fixture,
    migration: "darkside-tokens-less",
    extension: "less",
  });
}

/* CSS transforms */
for (const fixture of ["css-complete"]) {
  check(__dirname, {
    fixture,
    migration: "darkside-tokens-css",
    extension: "css",
  });

  check(__dirname, {
    fixture,
    migration: "darkside-tokens-css",
    extension: "js",
  });
}

/* Tailwind transforms */
for (const fixture of ["tw-complete"]) {
  check(__dirname, {
    fixture,
    migration: "darkside-tokens-tailwind",
    extension: "css",
  });

  check(__dirname, {
    fixture,
    migration: "darkside-tokens-tailwind",
    extension: "js",
  });
}
