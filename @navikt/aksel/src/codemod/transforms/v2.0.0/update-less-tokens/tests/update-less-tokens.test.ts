import { check } from "../../../../utils/check";

const migration = "update-less-tokens";
const fixtures = ["complete"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "less",
  });
}
