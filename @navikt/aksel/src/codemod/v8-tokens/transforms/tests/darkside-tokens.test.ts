import { check } from "../../../utils/check";

/* JS transforms */
for (const fixture of [
  "js-replace-all",
  "js-replace-some",
  "js-replace-border",
]) {
  check(__dirname, {
    fixture,
    migration: "v8-tokens-js",
    extension: "js",
  });
}

/* SCSS transforms */
for (const fixture of ["scss-complete"]) {
  check(__dirname, {
    fixture,
    migration: "v8-tokens-scss",
    extension: "scss",
  });
}

/* LESS transforms */
for (const fixture of ["less-complete"]) {
  check(__dirname, {
    fixture,
    migration: "v8-tokens-less",
    extension: "less",
  });
}

/* CSS transforms */
for (const fixture of ["css-complete"]) {
  check(__dirname, {
    fixture,
    migration: "v8-tokens-css",
    extension: "css",
  });

  check(__dirname, {
    fixture,
    migration: "v8-tokens-css",
    extension: "js",
  });
}

for (const fixture of ["css-edge-cases"]) {
  check(__dirname, {
    fixture,
    migration: "v8-tokens-css",
    extension: "css",
  });
}

/* Tailwind transforms */
for (const fixture of ["tw-complete"]) {
  check(__dirname, {
    fixture,
    migration: "v8-tokens-tailwind",
    extension: "js",
  });
}

for (const fixture of ["tw-complete"]) {
  check(__dirname, {
    fixture,
    migration: "v8-tokens-tailwind",
    extension: "css",
  });
}

for (const fixture of ["scss-edgecase"]) {
  check(__dirname, {
    fixture,
    migration: "v8-tokens-tailwind",
    extension: "scss",
  });
}
