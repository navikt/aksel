const stylelint = require("stylelint");

const ruleName = "aksel/at-rule-disallowed-list";

const messages = stylelint.utils.ruleMessages(ruleName, {
  /**
   * @type {stylelint.RuleMessageFunc}
   */
  rejected: (atRuleName, atRuleParams) => {
    return `Unexpected @${atRuleName} rule${
      atRuleParams ? ` "${atRuleParams}"` : ""
    }`;
  },
});

/** @typedef {(string | RegExp)[]} DisallowedPatterns */

/**
 * @typedef {{[atRuleName: string]: DisallowedPatterns}} PrimaryOptions
 */

const { rule } = stylelint.createPlugin(
  ruleName,
  /** @param {PrimaryOptions} primary */
  (primary) => {
    return (root, result) => {
      console.count(`Running: ${ruleName}`);
      const validOptions = stylelint.utils.validateOptions(result, ruleName, {
        actual: primary,
        possible: validateAllowedValuesOption,
      });

      if (!validOptions) {
        throw new Error(
          `Invalid options were provided to the [${ruleName}] stylelint plugin.\n`
        );
      }

      root.walkAtRules((atRule) => {
        const atRuleName = atRule.name;
        const disallowedPatterns = primary[atRuleName];

        if (!disallowedPatterns) return;

        const atRuleId = atRule.params;

        const found = ["test1", "test2"];

        found.forEach(() => {
          stylelint.utils.report({
            ruleName,
            result,
            node: atRule,
            message: messages.rejected(atRuleName, atRuleId),
          });
        });
      });
    };
  }
);

module.exports = {
  rule,
  ruleName,
  messages,
};

/**
 * @param {unknown} option - `primary` option.
 */
function validateAllowedValuesOption(option) {
  return true;
}
