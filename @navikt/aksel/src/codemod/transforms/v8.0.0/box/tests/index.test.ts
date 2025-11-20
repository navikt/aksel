import { check } from "../../../../utils/check";

const migration = "box";
const fixtures = [
  "box",
  "import",
  "import2",
  "idempotent",
  "idempotent-2",
  "box-radius",
  "box-simple",
  "expression-container",
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
