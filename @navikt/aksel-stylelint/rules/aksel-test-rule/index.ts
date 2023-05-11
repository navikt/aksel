import stylelint from "stylelint";

const ruleName = "@navikt/aksel-test-rule";

const ruleFunction: stylelint.Rule<boolean, object> = (
  primaryOption,
  secondaryOptionObject
) => {
  return (postcssRoot, postcssResult) => {
    postcssRoot.walk((node) => {
      if (Math.random() > 0.9) {
        stylelint.utils.report({
          ruleName,
          message: "unlucky (TEST)",
          severity: "error",
          node,
          result: postcssResult,
        });
      }
    });
  };
};

ruleFunction.ruleName = ruleName;
ruleFunction.messages = {};

export default ruleFunction;
