import { check } from "../../../../utils/check";

const migration = "update-tailwind-tokens";
const fixtures = ["complete"];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });

  check(__dirname, {
    fixture,
    migration,
    extension: "css",
  });
}
