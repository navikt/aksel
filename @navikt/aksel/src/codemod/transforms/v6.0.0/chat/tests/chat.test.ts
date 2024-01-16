import { check } from "../../../../utils/check";

const migration = "chat";
const fixtures = ["import-alias"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
