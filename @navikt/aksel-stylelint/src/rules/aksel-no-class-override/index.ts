import selectorParser from "postcss-selector-parser";
import stylelint from "stylelint";

const ruleName = "aksel/no-class-override";
const prefix = "aksel-";

export const messages = stylelint.utils.ruleMessages(ruleName, {
  unexpected: (value) =>
    `Overriding "${value}" not allowed. \n\n` +
    `"${value}" looks like a class name used in the design system, ` +
    `because it starts with "${prefix}". ` +
    "It is not recommended to override the styling in the design system.",
});

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkRules((node) => {
      selectorParser((selectors) => {
        selectors.walkClasses((className) => {
          if (!className.value.startsWith(prefix)) {
            return;
          }
          stylelint.utils.report({
            message: messages.unexpected(className.value),
            node,
            result: postcssResult,
            ruleName,
            word: className.value,
          });
        });
      }).processSync(node.selector);
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = messages;
ruleFunction.meta = {
  url: `https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#${ruleName}`,
};

export default ruleFunction;
