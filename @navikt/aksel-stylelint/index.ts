import { createPlugin } from "stylelint";
import { rules } from "./rules";

const rulesPlugins = Object.keys(rules).map((ruleName) => {
  return createPlugin(`@navikt/${ruleName}`, rules[ruleName]);
});

export default rulesPlugins;
