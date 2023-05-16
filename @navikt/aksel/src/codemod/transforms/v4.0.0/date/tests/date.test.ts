import { check } from "../../../../utils/check";

const migration = "date";
const fixtures = ["idempotent"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
