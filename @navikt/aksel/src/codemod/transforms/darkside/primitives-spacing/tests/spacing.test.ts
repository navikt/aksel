import { check } from "../../../../utils/check";

const migration = "spacing";
const fixtures = ["import", "valueAsObject", "importAlias", "subComponent"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
