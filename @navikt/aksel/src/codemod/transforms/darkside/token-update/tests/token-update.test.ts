import { check } from "../../../../utils/check";

const migration = "token-update";
const fixtures = ["complete"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "css",
  });
}
