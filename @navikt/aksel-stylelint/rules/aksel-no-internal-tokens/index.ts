import stylelint from "stylelint";
import valueParser from "postcss-value-parser";

const ruleName = "@navikt/aksel-no-internal-tokens";
const url =
  "https://github.com/navikt/aksel/@navikt/aksel-stylelint/README.md#aksel-no-internal-tokens";
const prefixRegex = new RegExp(/^--__ac-.+/);

const getInternalTokensUsed = (value: string) => {
  const invalidValues: string[] = [];

  valueParser(value).walk((node) => {
    if (node.type === "word" && prefixRegex.test(node.value)) {
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
          message: `Unexpected internal Aksel design token "${token}" inside decleration "${node.prop}".`,
          node,
          result: postcssResult,
          ruleName,
          word: token,
        });
      });

      const isTokenOverride = prefixRegex.test(node.prop);
      if (isTokenOverride) {
        stylelint.utils.report({
          message: `Unexpected internal Aksel design token "${node.prop}".`,
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
