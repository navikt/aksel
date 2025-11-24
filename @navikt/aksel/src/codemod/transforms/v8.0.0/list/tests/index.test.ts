import { check } from "../../../../utils/check";

const migration = "list";
const fixtures = ["list-demo", "list-heading-tag", "list-props", "list-size"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
