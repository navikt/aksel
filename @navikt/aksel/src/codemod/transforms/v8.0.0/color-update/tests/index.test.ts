import { check } from "../../../../utils/check";

const migration = "color-update";
const fixtures = ["all-variants", "complex-cases", "ignored"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
