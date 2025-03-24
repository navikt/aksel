import { check } from "../../../../utils/check";

const migration = "box-to-boxnew";
const fixtures = ["box"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
