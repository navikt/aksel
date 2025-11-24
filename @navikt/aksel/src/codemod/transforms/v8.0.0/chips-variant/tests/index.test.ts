import { check } from "../../../../utils/check";

const migration = "chips-variant";

const fixtures = ["direct-import", "update-color"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
