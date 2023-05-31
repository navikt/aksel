import stylelint from "stylelint";
import { Node as PostCSSNode } from "postcss";
import valueParser from "postcss-value-parser";

import { getPackageVersion, isCustomProperty, tokenExists } from "../../utils";

const ruleName = "aksel-design-token-no-component-reference";
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

const checkDeclValue = (
  controlledPrefixes: string[],
  value: string,
  postcssResult: stylelint.PostcssResult,
  rootNode: PostCSSNode
) => {
  valueParser(value).walk((node) => {
    if (
      node.type === "word" &&
      isCustomProperty(node.value) &&
      node.value.startsWith(prefix_ac) &&
      tokenExists(controlledPrefixes, node.value)
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
};

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkDecls((node) => {
      checkDeclValue([prefix_ac], node.value, postcssResult, node);
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};
ruleFunction.meta = {
  url: `https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#${ruleName}`,
};

export default ruleFunction;
