"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("../../../../utils/check");
const migration = "update-css-tokens";
const fixtures = ["complete"];
for (const fixture of fixtures) {
  (0, check_1.check)(__dirname, {
    fixture,
    migration,
    extension: "js",
  });
  (0, check_1.check)(__dirname, {
    fixture,
    migration,
    extension: "css",
  });
}
