import { check } from "../../../../utils/check";

const migration = "box-to-boxnew";
const fixtures = ["box", "import", "import2", "idempotent", "idempotent-2"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
