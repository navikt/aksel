import { check } from "../../../../utils/check";

const migration = "internal-react";
const fixtures = ["import", "import-add", "import-alias", "import-edgecase"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
