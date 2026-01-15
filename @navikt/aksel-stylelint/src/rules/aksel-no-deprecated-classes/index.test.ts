import { testRule } from "stylelint-test-rule-node";
import rule, { messages } from ".";
import { deprecations } from "../../deprecations";

testRule({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [
    {
      code: ".aksel-deprecated-example-foo, .aksel-foo, .baz {}",
      description: "allowed class names",
    },
  ],

  reject: [
    {
      code: ".foo, \n .aksel-deprecated-example \n .bar {}",
      description: "selector with deprecated class name 1",
      message: messages.unexpected(
        "aksel-deprecated-example",
        deprecations[0].message,
      ),
      line: 2,
      endLine: 2,
      column: 3,
      endColumn: 27,
    },
    {
      code: ".foo .aksel-other-deprecated-example \n .bar {}",
      description: "selector with deprecated class name 2",
      message: messages.unexpected(
        "aksel-other-deprecated-example",
        deprecations[0].message,
      ),
      line: 1,
      endLine: 1,
      column: 7,
      endColumn: 37,
    },
    {
      code: ".foo, \n .aksel-deprecated-prefix-example-foo:hover \n .bar {}",
      description: "selector with deprecated class name prefix",
      message: messages.unexpected(
        "aksel-deprecated-prefix-example-foo",
        deprecations[1].message,
      ),
      line: 2,
      endLine: 2,
      column: 3,
      endColumn: 38,
    },
  ],
});
