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
      code: ".foo { --a-does-not-exist: 1px }",
      description: "attempt to override nonexistent '--a-' token",
      warnings: [
        {
          message: messages.propNotExist({ prop: "--a-does-not-exist" }),
          line: 1,
          endLine: 1,
          column: 8,
          endColumn: 26,
        },
      ],
    },
    {
      code: ".foo \n { \n --ac-does-not-exist: 1px; \n }",
      description: "attempt to override nonexistent '--ac-' token",
      message: messages.propNotExist({ prop: "--ac-does-not-exist" }),
      line: 3,
      endLine: 3,
      column: 2,
      endColumn: 21,
    },

    {
      code: ".foo { color: var(--a-bar) }",
      description: "attempt to use nonexistent token",
      message: messages.valueNotExist({ prop: "color" }, "--a-bar"),
      line: 1,
      endLine: 1,
      column: 19,
      endColumn: 26,
    },
    {
      code: ".foo { width: var(--ac-bar, --a-baz) }",
      description: "attempt to use two nonexistent tokens in one var()",
      warnings: [
        {
          message: messages.valueNotExist({ prop: "width" }, "--ac-bar"),
          line: 1,
          endLine: 1,
          column: 19,
          endColumn: 27,
        },
        {
          message: messages.valueNotExist({ prop: "width" }, "--a-baz"),
          line: 1,
          endLine: 1,
          column: 29,
          endColumn: 36,
        },
      ],
    },
    {
      code: ".foo { padding: var(--a-bar) var(--a-baz); }",
      description: "attempt to use two nonexistent tokens as separate vars",
      warnings: [
        {
          message: messages.valueNotExist({ prop: "padding" }, "--a-bar"),
          line: 1,
          endLine: 1,
          column: 21,
          endColumn: 28,
        },
        {
          message: messages.valueNotExist({ prop: "padding" }, "--a-baz"),
          line: 1,
          endLine: 1,
          column: 34,
          endColumn: 41,
        },
      ],
    },
  ],
});
