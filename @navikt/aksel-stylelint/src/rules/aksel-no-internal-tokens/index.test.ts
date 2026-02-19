import { testRule } from "stylelint-test-rule-node";
import rule, { messages } from "./index.js";

testRule({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [
    {
      code: ".foo { --bar--__axc-baz: 1px }",
      description: "non-internal token defined",
    },
    {
      code: ".foo { font-size: var(--bar--__axc-baz) }",
      description: "non-internal token used",
    },
  ],

  reject: [
    {
      code: ".foo { --__axc-bar: 1px; }",
      description: "internal token overridden",
      message: messages.tokenOverridden("--__axc-bar"),
      line: 1,
      endLine: 1,
      column: 8,
      endColumn: 25,
    },
    {
      code: ".foo { color: var(--__axc-bar) }",
      description: "one internal token used",
      message: messages.tokenUsed("--__axc-bar", "color"),
      line: 1,
      endLine: 1,
      column: 19,
      endColumn: 30,
    },
    {
      code: ".foo { width: var(--__axc-bar, --__axc-baz) }",
      description: "two internal tokens used in one var()",
      warnings: [
        {
          message: messages.tokenUsed("--__axc-bar", "width"),
          line: 1,
          endLine: 1,
          column: 19,
          endColumn: 30,
        },
        {
          message: messages.tokenUsed("--__axc-baz", "width"),
          line: 1,
          endLine: 1,
          column: 32,
          endColumn: 43,
        },
      ],
    },
    {
      code: ".foo { padding: var(--__axc-bar) var(--__axc-baz); }",
      description: "two internal tokens used as separate vars",
      warnings: [
        {
          message: messages.tokenUsed("--__axc-bar", "padding"),
          line: 1,
          endLine: 1,
          column: 21,
          endColumn: 32,
        },
        {
          message: messages.tokenUsed("--__axc-baz", "padding"),
          line: 1,
          endLine: 1,
          column: 38,
          endColumn: 49,
        },
      ],
    },
  ],
});
