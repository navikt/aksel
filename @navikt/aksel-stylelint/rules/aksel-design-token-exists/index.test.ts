import { getTestRule } from "jest-preset-stylelint";
import rule, { errorMessage, controlledPrefixes } from ".";

getTestRule()({
  plugins: ["./dist/index.js"],
  ruleName: rule.ruleName,
  config: true,

  accept: [
    {
      code: ".foo { --a-surface-action: 1px }",
      description: "existing '--a' token overridden",
    },
    {
      code: ".foo { --ac-accordion-header-bg-hover: 1px }",
      description: "existing '--ac' token overridden",
    },
  ],

  reject: [
    {
      code: ".foo { --a-does-not-exist: 1px }",
      description: "attempt to override nonexisting '--a' token",
      message: errorMessage(
        "prop",
        { prop: "--a-does-not-exist" },
        controlledPrefixes
      ),
      line: 1,
      endLine: 1,
      column: 8,
      endColumn: 31,
    },
    {
      code: ".foo \n { \n --ac-does-not-exist: 1px; \n }",
      description: "attempt to override nonexisting '--ac' token",
      message: errorMessage(
        "prop",
        { prop: "--ac-does-not-exist" },
        controlledPrefixes
      ),
      line: 3,
      endLine: 3,
      column: 2,
      endColumn: 27,
    },

    {
      code: ".foo { color: var(--a-bar) }",
      description: "attempt to use nonexsiting token",
      message: errorMessage(
        "value",
        { prop: "color" },
        controlledPrefixes,
        "--a-bar"
      ),
      line: 1,
      endLine: 1,
      column: 19,
      endColumn: 26,
    },
    {
      code: ".foo { width: var(--ac-bar, --a-baz) }",
      description: "attempt to use two nonexsiting tokens in one var()",
      warnings: [
        {
          message: errorMessage(
            "value",
            { prop: "width" },
            controlledPrefixes,
            "--ac-bar"
          ),
          line: 1,
          endLine: 1,
          column: 19,
          endColumn: 27,
        },
        {
          message: errorMessage(
            "value",
            { prop: "width" },
            controlledPrefixes,
            "--a-baz"
          ),
          line: 1,
          endLine: 1,
          column: 29,
          endColumn: 36,
        },
      ],
    },
    {
      code: ".foo { padding: var(--a-bar) var(--a-baz); }",
      description: "attempt to use two tokens as separate vars",
      warnings: [
        {
          message: errorMessage(
            "value",
            { prop: "padding" },
            controlledPrefixes,
            "--a-bar"
          ),
          line: 1,
          endLine: 1,
          column: 21,
          endColumn: 28,
        },
        {
          message: errorMessage(
            "value",
            { prop: "padding" },
            controlledPrefixes,
            "--a-baz"
          ),
          line: 1,
          endLine: 1,
          column: 34,
          endColumn: 41,
        },
      ],
    },
  ],
});
