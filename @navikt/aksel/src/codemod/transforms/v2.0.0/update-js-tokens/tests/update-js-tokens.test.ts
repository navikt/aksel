import { check } from "../../../../utils/check";

const migration = "update-js-tokens";
const fixtures = ["complete"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
