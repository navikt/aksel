import stylelint from "stylelint";

const ruleName = "rule/aksel-stylelint-test";
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: "Expected ...",
});
const meta = {
  url: "https://github.com/aksel/stylelint-foo/blob/main/src/rules/foo-bar/README.md",
  // deprecated: true,
};

const ruleFunction: stylelint.Rule<boolean, object> = (
  primaryOption,
  secondaryOptionObject
) => {
  console.log(primaryOption, secondaryOptionObject);
  return (postcssRoot, postcssResult) => {
    // console.log(postcssRoot)
    // const validOptions = stylelint.utils.validateOptions(
    //   postcssResult,
    //   ruleName,
    //   {
    //     /* .. */
    //   }
    // );

    // if (!validOptions) {
    //   return;
    // }

    // console.log('TEST!')
    // console.log("##### ",!!stylelint, !!(stylelint.utils), !!(stylelint.utils.report));

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
ruleFunction.messages = messages;
ruleFunction.meta = meta;

const plugin = stylelint.createPlugin(ruleName, ruleFunction);

export default plugin;
