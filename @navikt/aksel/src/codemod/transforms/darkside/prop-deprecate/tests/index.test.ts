import { check } from "../../../../utils/check";

const migration = "prop-deprecate";
const fixtures = ["import"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
