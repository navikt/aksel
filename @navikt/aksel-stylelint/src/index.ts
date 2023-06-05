import { createPlugin } from "stylelint";
import { rules } from "./rules";

const rulesPlugins = Object.keys(rules).map((ruleName) => {
  return createPlugin(`${ruleName}`, rules[ruleName]);
});

export default rulesPlugins;
