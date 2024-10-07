import { TransformedToken } from "style-dictionary/types";
import { describe, expect, test } from "vitest";
import { generateTokenString } from "../sd-format";

const token: TransformedToken = {
  name: "AColorPrimary",
  value: "#000",
  path: ["A", "color", "primary"],
  original: {
    value: "#000",
    attributes: { category: "color", type: "primary" },
  },
  filePath: "/tokens/color.json",
  isSource: true,
};

describe("generateTokenString", () => {
  test("should generate ES6 token string", () => {
    const result = generateTokenString(token, "es6", false);
    expect(result).toBe(
      'export const ColorPrimary = "var(--a-color-primary)";',
    );
  });

  test("should generate CJS token string for the last token", () => {
    const result = generateTokenString(token, "cjs", true);
    expect(result).toBe('  "ColorPrimary": "var(--a-color-primary)"');
  });

  test("should generate CJS token string for a non-last token", () => {
    const result = generateTokenString(token, "cjs", false);
    expect(result).toBe('  "ColorPrimary": "var(--a-color-primary)",');
  });
});
