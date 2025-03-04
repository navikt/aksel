import valueParser from "postcss-value-parser";
import stylelint from "stylelint";
import { getPackageVersion, isCustomProperty, tokenExists } from "../../utils";

const ruleName = "aksel/design-token-no-component-reference";
const packageVersion = getPackageVersion();

const prefix_ac = "--ac-";

export const messages = stylelint.utils.ruleMessages(ruleName, {
  valueRefComponent: (node: any, invalidValue: string) =>
    `Referencing ("${prefix_ac}*") not allowed.\n\n` +
    `Property "${node.prop}" has offending value "${invalidValue}". ` +
    `The value references a component level token ("${prefix_ac}"). ` +
    `It is better to either reference a global level token ("--a-") or ` +
    `create a custom token instead. ` +
    `\n\nVersion: ${packageVersion}`,
});

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkDecls((rootNode) => {
      valueParser(rootNode.value).walk((node) => {
        if (
          node.type === "word" &&
          isCustomProperty(node.value) &&
          node.value.startsWith(prefix_ac) &&
          tokenExists([prefix_ac], node.value)
        ) {
          stylelint.utils.report({
            message: messages.valueRefComponent(rootNode, node.value),
            node: rootNode,
            result: postcssResult,
            ruleName,
            word: node.value,
          });
        }
      });
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};
ruleFunction.meta = {
  url: `https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#${ruleName}`,
};

export default ruleFunction;
