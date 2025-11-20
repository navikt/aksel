import { check } from "../../../../utils/check";

const migration = "box-new";
const fixtures = [];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
