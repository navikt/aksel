import stylelint from "stylelint";
import selectorParser from "postcss-selector-parser";

const ruleName = "@navikt/aksel-no-class-override";
const url =
  "https://github.com/navikt/aksel/@navikt/aksel-stylelint/README.md#aksel-no-class-override";
const classnameRegex = new RegExp(/^navdsi?-.+/);

export const messages = stylelint.utils.ruleMessages(ruleName, {
  unexpected: (value) => `Unexpected design system class name "${value}"`,
});

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkRules((node) => {
      selectorParser((selectors) => {
        selectors.walkClasses((className) => {
          if (!classnameRegex.test(className.value)) return;

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
