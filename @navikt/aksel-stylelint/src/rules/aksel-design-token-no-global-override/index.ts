import stylelint from "stylelint";
import { getPackageVersion, isCustomProperty } from "../../utils";

const ruleName = "aksel/design-token-no-global-override";
const prefix = "--ax-";
const packageVersion = getPackageVersion();

export const messages = stylelint.utils.ruleMessages(ruleName, {
  propOverrideGlobal: (node: any) =>
    `Overriding "${node.prop}" not allowed. \n\n` +
    `Property "${node.prop}" tries to override a design token by using the prefix "${prefix}". ` +
    `Overriding design tokens should only be done when creating custom themes.` +
    `\n\nVersion: ${packageVersion}`,
});

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkDecls((node) => {
      if (isCustomProperty(node.prop) && node.prop.startsWith(prefix)) {
        stylelint.utils.report({
          message: messages.propOverrideGlobal(node),
          node,
          result: postcssResult,
          ruleName,
          word: node.prop,
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};
ruleFunction.meta = {
  url: `https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#${ruleName}`,
};

export default ruleFunction;
