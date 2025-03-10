import { describe, expect, test } from "vitest";
import { createCompositeTwRegex } from "./tokenRegex";

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
});
