import { check } from "../../../../utils/check";

const migration = "tag-variant";
const fixtures = ["all-variants", "complex-cases", "ignored"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
