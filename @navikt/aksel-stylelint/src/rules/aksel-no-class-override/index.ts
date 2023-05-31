import stylelint from "stylelint";
import selectorParser from "postcss-selector-parser";

const ruleName = "aksel-no-class-override";
const url =
  "https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#aksel-no-class-override";
const prefixes = ["navds-", "navdsi-"];

export const messages = stylelint.utils.ruleMessages(ruleName, {
  unexpected: (value) =>
    `("${value}") not allowed.\n\n` +
    `"${value}" looks like a class name used in the design system, ` +
    `because it starts with "${prefixes.join('" or "')}". ` +
    "It is not recommended to override the styling in the design system.",
});

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkRules((node) => {
      selectorParser((selectors) => {
        selectors.walkClasses((className) => {
          if (!prefixes.some((prefix) => className.value.startsWith(prefix))) {
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
ruleFunction.meta = { url };

export default ruleFunction;
