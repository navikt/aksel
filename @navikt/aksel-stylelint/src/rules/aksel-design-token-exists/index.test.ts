import { testRule } from "stylelint-test-rule-node";
import rule, { messages } from "./index.js";

testRule({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [
    {
      code: ".foo { --ax-font-line-height-large: 1px; --ax-border-default: red; }",
      description: "existing '--ax-' tokens overridden",
    },
    {
      code: ".foo { --my-custom-color: var(--ax-warning-800); }",
      description: "existing '--ax-' token referenced",
    },
  ],

  reject: [
    {
      code: ".foo { --ax-does-not-exist: 1px }",
      description: "attempt to override nonexistent '--ax-' token",
      warnings: [
        {
          message: messages.propNotExist({ prop: "--ax-does-not-exist" }),
          line: 1,
          endLine: 1,
          column: 8,
          endColumn: 27,
        },
      ],
    },

    {
      code: ".foo { color: var(--ax-bar) }",
      description: "attempt to use nonexistent token",
      message: messages.valueNotExist({ prop: "color" }, "--ax-bar"),
      line: 1,
      endLine: 1,
      column: 19,
      endColumn: 27,
    },
    {
      code: ".foo { width: var(--ax-bar, --ax-baz) }",
      description: "attempt to use two nonexistent tokens in one var()",
      warnings: [
        {
          message: messages.valueNotExist({ prop: "width" }, "--ax-bar"),
          line: 1,
          endLine: 1,
          column: 19,
          endColumn: 27,
        },
        {
          message: messages.valueNotExist({ prop: "width" }, "--ax-baz"),
          line: 1,
          endLine: 1,
          column: 29,
          endColumn: 37,
        },
      ],
    },
    {
      code: ".foo { padding: var(--ax-bar) var(--ax-baz); }",
      description: "attempt to use two nonexistent tokens as separate vars",
      warnings: [
        {
          message: messages.valueNotExist({ prop: "padding" }, "--ax-bar"),
          line: 1,
          endLine: 1,
          column: 21,
          endColumn: 29,
        },
        {
          message: messages.valueNotExist({ prop: "padding" }, "--ax-baz"),
          line: 1,
          endLine: 1,
          column: 35,
          endColumn: 43,
        },
      ],
    },
  ],
});
