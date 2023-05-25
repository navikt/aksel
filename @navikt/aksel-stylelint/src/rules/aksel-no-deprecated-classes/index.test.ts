import { getTestRule } from "jest-preset-stylelint";
import rule, { messages } from ".";
import { deprecations } from "../../deprecations";

getTestRule()({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [{ code: ".foo-navds-bar {}", description: "allowed class name" }],

  reject: [
    {
      code: ".foo, \n .navdsi-deprecated-example \n .bar {}",
      description: "selector with disallowed class name .navds-*",
      message: messages.unexpected(
        "navdsi-deprecated-example",
        deprecations[0].message
      ),
      line: 2,
      endLine: 2,
      column: 3,
      endColumn: 28,
    },
    {
      code: ".foo .navdsi-other-deprecated-example \n .bar {}",
      description: "selector with disallowed class name .navdsi-*",
      message: messages.unexpected(
        "navdsi-other-deprecated-example",
        deprecations[0].message
      ),
      line: 1,
      endLine: 1,
      column: 7,
      endColumn: 38,
    },
  ],
});
