import { check } from "../../../../utils/check";

const migration = "spacing";
const fixtures = [
  "import",
  "valueAsObject",
  "importAlias",
  "subComponent",
  "idempotent",
  "directImport",
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}

check(__dirname, {
  fixture: "css-module-test",
  migration,
  extension: "css",
});
