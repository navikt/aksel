import { check } from "../../../../utils/check";

const migration = "box-new";
const fixtures = [
  "direct-import",
  "direct-alias-import",
  "sub-import",
  "sub-alias-import",
  "mixed-import",
  "idempotent",
  "comments",
  "alias-with-existing-box",
  "alias-with-existing-box-2",
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
