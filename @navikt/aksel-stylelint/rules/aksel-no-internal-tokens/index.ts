import stylelint from "stylelint";
import valueParser from "postcss-value-parser";

const ruleName = "@navikt/aksel-no-internal-tokens";
const url =
  "https://github.com/navikt/aksel/@navikt/aksel-stylelint/README.md#aksel-no-internal-tokens";

const getInternalTokensUsed = (controlledPrefixes: RegExp[], value: string) => {
  const invalidValues: string[] = [];

  valueParser(value).walk((node) => {
    if (
      node.type === "word" &&
      controlledPrefixes.some((prefix) => node.value.match(prefix))
    ) {
      invalidValues.push(node.value);
    }
  });

  return invalidValues;
};

const ruleFunction: stylelint.Rule = (primaryOption, secondaryOptionObject) => {
  return (postcssRoot, postcssResult) => {
    const options = Object.assign(
      { controlledPrefixes: [/^--__ac-.+/] },
      secondaryOptionObject
    );
    const { controlledPrefixes } = options;

    postcssRoot.walkDecls((node) => {
      getInternalTokensUsed(controlledPrefixes, node.value).forEach((token) => {
        stylelint.utils.report({
          message: `Unexpected internal Aksel design token "${token}" inside decleration "${node.prop}".`,
          node,
          result: postcssResult,
          ruleName,
          word: token,
        });
      });

      const isTokenOverride = controlledPrefixes.some(
        (prefix) => node.prop.match(prefix) !== null
      );
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
