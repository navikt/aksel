import stylelint from "stylelint";
import { rules } from "./rules/index.js";

const rulesPlugins = Object.keys(rules).map((ruleName) => {
  return stylelint.createPlugin(`${ruleName}`, rules[ruleName]);
});

export default rulesPlugins;
