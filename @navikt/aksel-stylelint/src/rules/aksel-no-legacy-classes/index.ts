import selectorParser from "postcss-selector-parser";
import stylelint from "stylelint";

const ruleName = "aksel/no-legacy-classes";
const url =
  "https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#aksel/no-legacy-classes";
const prefix = "navds-";

export const messages = stylelint.utils.ruleMessages(ruleName, {
  unexpected: (value) =>
    `".${value}" no longer has any effect.\n\n` +
    "As of Aksel version 8.0, all class names from '@navikt/ds-css' are prefixed with '.aksel-'.\n" +
    "Since this class name starts with '.navds-', it's safe to assume that it no longer works as intended.\n" +
    "We still discourage overriding the styling from Aksel when possible.",
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
ruleFunction.meta = { url };

export default ruleFunction;
