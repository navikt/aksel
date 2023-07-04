import { check } from "../../../../utils/check";

const migration = "pagination";
const fixtures = ["size", "idempotent", "import"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
