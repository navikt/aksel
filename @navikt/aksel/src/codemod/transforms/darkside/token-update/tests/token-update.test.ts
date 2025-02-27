import { check } from "../../../../utils/check";

const migration = "token-update";
const fixtures = ["complete"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "css",
  });

  check(__dirname, {
    fixture,
    migration,
    extension: "scss",
  });

  check(__dirname, {
    fixture,
    migration,
    extension: "less",
  });

  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
