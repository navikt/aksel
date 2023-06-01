import { getTestRule } from "jest-preset-stylelint";
import rule, { messages } from ".";

getTestRule()({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [
    {
      code: ".foo { --ac-accordion-header-bg-hover: 1px; --ac-header-bg: red; }",
      description: "existing '--ac-' tokens overridden",
    },
    {
      code: ".foo { --my-custom-color: var(--a-orange-800); }",
      description: "existing '--a-' token referenced",
    },
  ],

  reject: [
    {
      code: ".foo { width: var(--ac-button-padding) }",
      description: "attempt to use '--ac-' token",
      message: messages.valueRefComponent(
        { prop: "width" },
        "--ac-button-padding"
      ),
      line: 1,
      endLine: 1,
      column: 19,
      endColumn: 38,
    },
  ],
});
