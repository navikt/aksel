import { check } from "../../../../utils/check";

const migration = "tabs";
const fixtures = ["complete", "idempotent", "props"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
