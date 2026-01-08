import { testRule } from "stylelint-test-rule-node";
import rule, { messages } from ".";

testRule({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [
    {
      code: ".foo { --my-custom-color: var(--ax-warning-800); }",
      description: "existing '--ax-' token referenced",
    },
  ],

  reject: [
    {
      code: ".foo { --ax-border-default: red }",
      description: "existing '--ax-' token overridden",
      message: messages.propOverrideGlobal({ prop: "--ax-border-default" }),
      line: 1,
      endLine: 1,
      column: 8,
      endColumn: 27,
    },
    {
      code: ".foo { --ax-does-not-exist: 1px }",
      description: "attempt to override nonexistent '--ax-' token",
      warnings: [
        {
          message: messages.propOverrideGlobal({ prop: "--ax-does-not-exist" }),
          line: 1,
          endLine: 1,
          column: 8,
          endColumn: 27,
        },
      ],
    },
  ],
});
