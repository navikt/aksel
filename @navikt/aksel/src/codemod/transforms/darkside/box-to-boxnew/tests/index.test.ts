import { check } from "../../../../utils/check";

const migration = "box-to-boxnew";
const fixtures = [
  "box",
  "import",
  "import2",
  "idempotent",
  "idempotent-2",
  "box-radius",
  "box-simple",
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
