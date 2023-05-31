import { getTestRule } from "jest-preset-stylelint";
import rule, { messages } from ".";

getTestRule()({
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
    {
      code: ".foo .navdsi-button \n .bar {}",
      description: "selector with disallowed class name .navdsi-*",
      message: messages.unexpected("navdsi-button"),
      line: 1,
      endLine: 1,
      column: 7,
      endColumn: 20,
    },
  ],
});
