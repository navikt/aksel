import { check } from "../../../../utils/check";

const migration = "nextjs-link";
const fixtures = [
  "actionmenu",
  "button",
  "dropdown",
  "with-attributes",
  "idempotent",
  "navlink",
  "plain-anchor",
  "button-variant",
  "linkpanel",
];

for (const fixture of fixtures) {
  check(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
}
