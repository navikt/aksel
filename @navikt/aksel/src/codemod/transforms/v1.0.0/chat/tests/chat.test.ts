import { check } from "../../../../utils/check";

const migration = "chat";
const fixtures = ["complete", "idempotent", "props", "renamed"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
