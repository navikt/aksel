import { TransformedToken } from "style-dictionary/types";
import { describe, expect, test } from "vitest";
import { createTokenName, figmaValue } from "../figma/create-tokens";

const baseToken: TransformedToken = {
  name: "tokenName",
  attributes: { item: "primary" },
  path: ["color", "background"],
  original: { value: "#000000" },
  filePath: "path/to/file.css",
  isSource: true,
};

describe("createTokenName", () => {
  test("should extract name from token with item attribute", () => {
    const token: TransformedToken = {
      ...baseToken,
      name: "tokenName",
    };
    expect(createTokenName({ ...token, attributes: { item: "primary" } })).toBe(
      "Primary",
    );
    expect(
      createTokenName({ ...token, attributes: { item: "bg-strong-hover" } }),
    ).toBe("Bg Strong Hover");
  });

  test("should create correct grouping for token with group attribute", () => {
    const token: TransformedToken = {
      ...baseToken,
      name: "tokenName",
      attributes: { item: "primary" },
      group: "color.background",
    };
    expect(createTokenName(token)).toBe("Color/Background/Primary");
  });

  test("should add 'Default' suffix for tokens with duplicate names", () => {
    const token: TransformedToken = {
      ...baseToken,
      name: "tokenName",
      attributes: { item: "accent" },
      group: "text.accent",
    };
    expect(createTokenName(token)).toBe("Text/Accent/Accent Default");
  });

  test("should add 'Radius' prefix for global-radius type tokens", () => {
    const token: TransformedToken = {
      ...baseToken,
      name: "tokenName",
      attributes: { item: "small" },
      type: "global-radius",
    };
    expect(createTokenName(token)).toBe("Radius Small");
  });

  test("should add 'Spacing' prefix for global-spacing type tokens", () => {
    const token: TransformedToken = {
      ...baseToken,
      name: "tokenName",
      attributes: { item: "4" },
      type: "global-spacing",
    };
    expect(createTokenName(token)).toBe("Spacing 4");
  });
});

describe("extracting figma value for token", () => {
  test("should convert rem to px for global-radius type tokens", () => {
    const token: TransformedToken = {
      ...baseToken,
      value: "1rem",
      type: "global-radius",
    };
    expect(figmaValue(token)).toBe(16);
  });

  test("should handle conversion of rem in float", () => {
    const token: TransformedToken = {
      ...baseToken,
      value: "0.25rem",
      type: "global-radius",
    };
    expect(figmaValue(token)).toBe(4);
  });

  test("should convert px to number for global-spacing type tokens", () => {
    const token: TransformedToken = {
      ...baseToken,
      value: "32px",
      type: "global-spacing",
    };
    expect(figmaValue(token)).toBe(32);
  });

  test("should return the original value for non-radius and non-spacing type tokens", () => {
    const token: TransformedToken = {
      ...baseToken,
      type: "color",
      value: "#111",
    };
    expect(figmaValue(token)).toBe("#111");
  });
});
