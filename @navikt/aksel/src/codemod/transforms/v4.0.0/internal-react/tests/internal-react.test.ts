import { check } from "../../../../utils/check";

const migration = "internal-react";
const fixtures = ["complete"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
