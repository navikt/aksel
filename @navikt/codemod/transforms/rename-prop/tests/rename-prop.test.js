"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("../../../utils/check");
const migration = "rename-prop";
const fixtures = ["rename"];
for (const fixture of fixtures) {
  (0, check_1.check)(__dirname, {
    fixture,
    migration,
    extension: "js",
    options: {
      component: "SpeechBubble",
      from: "illustration",
      to: "avatar",
    },
  });
}
