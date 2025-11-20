import { check } from "../../../../utils/check";

const migration = "color-update";
const fixtures = ["..."];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
