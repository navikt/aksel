import { check } from "../../../../utils/check";

const migration = "list";
const fixtures = [
  "list-demo",
  "list-heading-tag",
  "list-props",
  "list-size",
  "list-attributes",
  "import-alias",
  "existing-imports",
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
