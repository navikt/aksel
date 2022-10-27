import { check } from "../../../utils/check";

const migration = "rename-prop";
const fixtures = ["rename"];

for (const fixture of fixtures) {
  check(__dirname, {
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
