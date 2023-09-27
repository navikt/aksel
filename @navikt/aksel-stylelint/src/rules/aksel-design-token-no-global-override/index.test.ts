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
      code: ".foo { --a-surface-action: 1px }",
      description: "existing '--a-' token overridden",
      message: messages.propOverrideGlobal({ prop: "--a-surface-action" }),
      line: 1,
      endLine: 1,
      column: 8,
      endColumn: 26,
    },
    {
      code: ".foo { --a-does-not-exist: 1px }",
      description: "attempt to override nonexistent '--a-' token",
      warnings: [
        {
          message: messages.propOverrideGlobal({ prop: "--a-does-not-exist" }),
          line: 1,
          endLine: 1,
          column: 8,
          endColumn: 26,
        },
      ],
    },
  ],
});
