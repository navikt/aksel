import { getTestRule } from "jest-preset-stylelint";
import rule, { messages } from ".";
import { deprecations } from "../../deprecations";

getTestRule()({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [
    {
      code: ".navds-foo, navdsi-bar, .baz {}",
      description: "allowed class names",
      // Allowed because this rule only checks deprecated class names. See also aksel-no-class-override.
    },
  ],

  reject: [
    {
      code: ".foo, \n .navdsi-deprecated-example \n .bar {}",
      description: "selector with deprecated class name 1",
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
      description: "selector with deprecated class name 2",
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
