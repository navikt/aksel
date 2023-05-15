import { check } from "../../../../utils/check";

const migration = "copybutton";
const fixtures = ["complete", "idempotent", "alias", "cleanup", "import"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
