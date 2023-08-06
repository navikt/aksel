import stylelint from "stylelint";
import valueParser from "postcss-value-parser";

const ruleName = "aksel/no-internal-tokens";
const url =
  "https://github.com/navikt/aksel/blob/main/%40navikt/aksel-stylelint/README.md#aksel/no-internal-tokens";
const prefix = "--__ac-";

export const messages = stylelint.utils.ruleMessages(ruleName, {
  tokenUsed: (token, prop) =>
    `("${token}") not allowed.\n\n` +
    `"${token}" (inside decleration "${prop}") looks like an internal design token, ` +
    `because it starts with "${prefix}". Internal tokens should not be used outside the design system.`,
  tokenOverridden: (token) =>
    `("${token}") not allowed.\n\n` +
    `"${token}" looks like an internal design token, because it starts with "${prefix}". ` +
    `Internal tokens should not be overridden.`,
});

const getInternalTokensUsed = (value: string) => {
  const invalidValues: string[] = [];

  valueParser(value).walk((node) => {
    if (node.type === "word" && node.value.startsWith(prefix)) {
      invalidValues.push(node.value);
    }
  });

  return invalidValues;
};

const ruleFunction: stylelint.Rule = () => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walkDecls((node) => {
      getInternalTokensUsed(node.value).forEach((token) => {
        stylelint.utils.report({
          message: messages.tokenUsed(token, node.prop),
          node,
          result: postcssResult,
          ruleName,
          word: token,
        });
      });

      const isTokenOverride = node.prop.startsWith(prefix);
      if (isTokenOverride) {
        stylelint.utils.report({
          message: messages.tokenOverridden(node.prop),
          node,
          result: postcssResult,
          ruleName,
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};
ruleFunction.meta = { url };

export default ruleFunction;
