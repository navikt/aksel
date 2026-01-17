import { testRule } from "stylelint-test-rule-node";
import rule, { messages } from ".";

testRule({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [{ code: ".foo-aksel-bar {}", description: "allowed class name" }],

  reject: [
    {
      code: ".foo, \n .aksel-button \n .bar {}",
      description: "selector with disallowed class name .aksel-*",
      message: messages.unexpected("aksel-button"),
      line: 2,
      endLine: 2,
      column: 3,
      endColumn: 15,
    },
  ],
});
