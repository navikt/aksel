import { describe, expect, test } from "vitest";
import { createCompositeTwRegex, getTokenRegex } from "../token-regex";

describe("createCompositeTwRegex", () => {
  test("should generate a regex that matches simple tokens", () => {
    // Note: There appears to be a bug in the createCompositeTwRegex implementation
    // The regex string starts with '/' which makes it invalid
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    // This test will fail if the regex is malformed
    expect(regex).toBeInstanceOf(RegExp);

    expect("text-red").toMatch(regex);
    expect("text-blue").toMatch(regex);
    expect('class="text-red"').toMatch(regex);
    expect('class="text-blue"').toMatch(regex);
  });

  test("should match tokens with the colon prefix format", () => {
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    // Should match the tokens with colon prefix
    expect("md:text-red").toMatch(regex);
    expect("md:text-blue").toMatch(regex);
    expect('class="md:text-red"').toMatch(regex);
    expect('class="md:text-blue"').toMatch(regex);
  });

  test("should match tokens at the start of a string", () => {
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    expect("text-red is my class").toMatch(regex);
    expect("md:text-blue is my class").toMatch(regex);
  });

  test("should match tokens at the end of a string", () => {
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    expect("my class is text-red").toMatch(regex);
    expect("my class is md:text-red").toMatch(regex);
  });

  test("should match tokens with whitespace boundaries", () => {
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    expect("text-blue text-red").toMatch(regex);
    expect('class="text-red text-blue"').toMatch(regex);
  });

  test("should find multiple matches across newline", () => {
    const regex = createCompositeTwRegex([
      "text-red",
      "text-blue",
      "bg-accent-soft",
    ]);

    const input = `className="test text-red test text-blue \n @apply md:bg-accent-soft"`;
    const matches = [...input.matchAll(regex)];
    expect(matches.length).toBe(3);
  });

  test("should not match tokens that are part of other words", () => {
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    expect("text-red-200").not.toMatch(regex);
    expect(" test-text-red-100 ").not.toMatch(regex);
  });

  test("should not match tokens that have a colon already before them", () => {
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    const input = "sm::text-red";
    const matches = [...input.matchAll(regex)];
    expect(matches.length).toBe(0);
  });

  test("should match tokens with different prefixes", () => {
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    expect("hover:text-red").toMatch(regex);
    expect("focus:text-blue").toMatch(regex);
    expect('class="hover:text-red focus:text-blue"').toMatch(regex);
  });

  test("should match tokens with multiple colons", () => {
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    expect("md:hover:text-red").toMatch(regex);
    expect("lg:focus:text-blue").toMatch(regex);
    expect('class="md:hover:text-red lg:focus:text-blue"').toMatch(regex);
  });

  test("should match tokens with special characters", () => {
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    expect("text-red!").toMatch(regex);
    expect("text-blue?").toMatch(regex);
    expect('class="text-red! text-blue?"').toMatch(regex);
  });

  test("should not match tokens with numbers", () => {
    const regex = createCompositeTwRegex(["text-red", "text-blue"]);

    expect("text-red-100").not.toMatch(regex);
    expect("text-blue-200").not.toMatch(regex);
    expect('class="text-red-100 text-blue-200"').not.toMatch(regex);
  });
});

describe("getTokenRegex CSS", () => {
  test("should match tokens with whitespace boundaries", () => {
    const regex = getTokenRegex("--a-text-red", "css");

    expect("var(--a-text-red)").toMatch(regex);
    expect(" var(--a-text-red) ").toMatch(regex);
    expect(" var(--a-text-red, var(--my-custom-token)) ").toMatch(regex);
    expect(" var(--my-custom-token, var(--a-text-red)) ").toMatch(regex);
    expect('style="var(--a-text-red)"').toMatch(regex);
  });

  test("should not match tokens that are part of other words", () => {
    const regex = getTokenRegex("--a-text-red", "css");

    expect("var(--a-text-red-200)").not.toMatch(regex);
    expect("test-text-red-100").not.toMatch(regex);
  });

  test("should not match partial names", () => {
    const regex = getTokenRegex("--a-text-red", "css");

    expect("var(-a-text-red-200)").not.toMatch(regex);
    expect("$a-text-red").not.toMatch(regex);
    expect("@a-text-red").not.toMatch(regex);
    expect("text-red").not.toMatch(regex);
  });
});

describe("getTokenRegex SCSS", () => {
  test("should match tokens with whitespace boundaries", () => {
    const regex = getTokenRegex("--a-text-red", "scss");

    expect("$a-text-red").toMatch(regex);
    expect(" $a-text-red ").toMatch(regex);
    expect("common.$a-text-red").toMatch(regex);
    expect(" common.$a-text-red ").toMatch(regex);
    expect(" common.$a-text-red").toMatch(regex);
    expect("common.$a-text-red ").toMatch(regex);
  });

  test("should not match tokens that are part of other words", () => {
    const regex = getTokenRegex("--a-text-red", "scss");

    expect("$a-text-red-200").not.toMatch(regex);
    expect("$a-a-text-red").not.toMatch(regex);
    expect("$a-a-text-red-200").not.toMatch(regex);
  });

  test("should not match partial names", () => {
    const regex = getTokenRegex("--a-text-red", "scss");

    expect("var(--a-text-red-200)").not.toMatch(regex);
    expect("@a-text-red").not.toMatch(regex);
    expect("text-red").not.toMatch(regex);
  });
});

describe("getTokenRegex Less", () => {
  test("should match tokens with whitespace boundaries", () => {
    const regex = getTokenRegex("--a-text-red", "less");

    expect("@a-text-red").toMatch(regex);
    expect(" @a-text-red ").toMatch(regex);
  });

  test("should not match tokens that are part of other words", () => {
    const regex = getTokenRegex("--a-text-red", "less");

    expect("@a-text-red-200").not.toMatch(regex);
    expect("@a-a-text-red").not.toMatch(regex);
    expect("@a-a-text-red-200").not.toMatch(regex);
  });

  test("should not match partial names", () => {
    const regex = getTokenRegex("--a-text-red", "less");

    expect("var(--a-text-red-200)").not.toMatch(regex);
    expect("$a-text-red").not.toMatch(regex);
    expect("text-red").not.toMatch(regex);
  });
});

describe("getTokenRegex JS", () => {
  test("should match tokens with whitespace boundaries", () => {
    const regex = getTokenRegex("--a-text-red", "js");

    expect("ATextRed").toMatch(regex);
    expect(" ATextRed ").toMatch(regex);
    // biome-ignore lint/suspicious/noTemplateCurlyInString: Testing token match inside template string
    expect(" background: `${ATextRed}` ").toMatch(regex);
  });

  test("should not match tokens that are part of other words", () => {
    const regex = getTokenRegex("--a-text-red", "js");

    expect("ATextRed200").not.toMatch(regex);
    expect("AATextRed200").not.toMatch(regex);

    /* Since we cant do a positive lookbehind, these cases will be matched */
    expect("AATextRed").toMatch(regex);
  });
});
