import { getTestRule } from "jest-preset-stylelint";
import rule, { messages } from ".";

getTestRule()({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [
    {
      code: ".foo { --bar--__ac-baz: 1px }",
      description: "non-internal token defined",
    },
    {
      code: ".foo { font-size: var(--bar--__ac-baz) }",
      description: "non-internal token used",
    },
  ],

  reject: [
    {
      code: ".foo { --__ac-bar: 1px; }",
      description: "internal token overridden",
      message: messages.tokenOverridden("--__ac-bar"),
      line: 1,
      endLine: 1,
      column: 8,
      endColumn: 24,
    },
    {
      code: ".foo { color: var(--__ac-bar) }",
      description: "one internal token used",
      message: messages.tokenUsed("--__ac-bar", "color"),
      line: 1,
      endLine: 1,
      column: 19,
      endColumn: 29,
    },
    {
      code: ".foo { width: var(--__ac-bar, --__ac-baz) }",
      description: "two internal token used in one var()",
      warnings: [
        {
          message: messages.tokenUsed("--__ac-bar", "width"),
          line: 1,
          endLine: 1,
          column: 19,
          endColumn: 29,
        },
        {
          message: messages.tokenUsed("--__ac-baz", "width"),
          line: 1,
          endLine: 1,
          column: 31,
          endColumn: 41,
        },
      ],
    },
    {
      code: ".foo { padding: var(--__ac-bar) var(--__ac-baz); }",
      description: "two internal token used as separate vars",
      warnings: [
        {
          message: messages.tokenUsed("--__ac-bar", "padding"),
          line: 1,
          endLine: 1,
          column: 21,
          endColumn: 31,
        },
        {
          message: messages.tokenUsed("--__ac-baz", "padding"),
          line: 1,
          endLine: 1,
          column: 37,
          endColumn: 47,
        },
      ],
    },
  ],
});
