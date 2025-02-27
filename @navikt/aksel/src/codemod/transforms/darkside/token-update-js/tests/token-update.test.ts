import { check } from "../../../../utils/check";

const migration = "token-update";
const fixtures = ["replace-all", "replace-some"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
