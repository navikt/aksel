import { check } from "../../../../utils/check";

const migration = "box-new";
const fixtures = [
  "direct-import",
  "direct-alias-import",
  "sub-import",
  "sub-alias-import",
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
