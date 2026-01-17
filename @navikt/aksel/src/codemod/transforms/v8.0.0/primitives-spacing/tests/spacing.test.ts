import { check } from "../../../../utils/check";

const migration = "spacing";
const fixtures = [
  "import",
  "valueAsObject",
  "importAlias",
  "subComponent",
  "idempotent",
  "directImport",
  "composed",
  "object-string",
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
