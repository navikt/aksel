import { testRule } from "stylelint-test-rule-node";
import rule, { messages } from "./index.js";

testRule({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [{ code: ".foo-navds-bar {}", description: "allowed class name" }],

  reject: [
    {
      code: ".foo, \n .navds-button \n .bar {}",
      description: "selector with disallowed class name .navds-*",
      message: messages.unexpected("navds-button"),
      line: 2,
      endLine: 2,
      column: 3,
      endColumn: 15,
    },
  ],
});
