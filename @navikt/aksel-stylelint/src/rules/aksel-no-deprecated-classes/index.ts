import selectorParser from "postcss-selector-parser";
import stylelint from "stylelint";
import { deprecations } from "../../deprecations";

const ruleName = "aksel/no-deprecated-classes";

export const messages = stylelint.utils.ruleMessages(ruleName, {
  unexpected: (value, secondaryOption) =>
    `Class "${value}" is deprecated. ` + secondaryOption,
});

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkRules((node) => {
      selectorParser((selectors) => {
        selectors.walkClasses((className) => {
          for (const deprecation of deprecations) {
            if (
              !deprecation.deprecatePrefix &&
              !deprecation.classes.includes(className.value)
            ) {
              continue;
            }

            if (
              deprecation.deprecatePrefix &&
              !deprecation.classes.some((x) => className.value.startsWith(x))
            ) {
              return;
            }
            stylelint.utils.report({
              message: messages.unexpected(
                className.value,
                deprecation.message,
              ),
              node,
              result: postcssResult,
              ruleName,
              word: className.value,
            });
          }
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
