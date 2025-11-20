import selectorParser from "postcss-selector-parser";
import stylelint from "stylelint";

const ruleName = "aksel/no-legacy-classnames";
const url =
  "https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#aksel/no-legacy-classnames";
const prefix = "navds-";

export const messages = stylelint.utils.ruleMessages(ruleName, {
  unexpected: (value) =>
    `"${value}" no longer has any effect.\n\n` +
    `In Aksel version 8.0, all classNames from '@navikt/ds-css' use the '.aksel-'-prefix, \n` +
    `As the found className starts with '.navds'-its safe to assume that it no longer works as intended.\n` +
    "We still recommended not overriding the styling from Aksel where possible.",
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
