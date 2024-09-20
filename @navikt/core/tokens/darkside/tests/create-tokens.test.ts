import { TransformedToken } from "style-dictionary/types";
import { describe, expect, it } from "vitest";
import { extractTokenName } from "../figma/create-tokens";

const baseToken: TransformedToken = {
  name: "tokenName",
  attributes: { item: "primary" },
  path: ["color", "background"],
  original: { value: "#000000" },
  filePath: "path/to/file.css",
  isSource: true,
};

describe("extractTokenName", () => {
  it("should extract name from token with item attribute", () => {
    const token: TransformedToken = {
      ...baseToken,
      name: "tokenName",
    };
    expect(
      extractTokenName({ ...token, attributes: { item: "primary" } }),
    ).toBe("Primary");
    expect(
      extractTokenName({ ...token, attributes: { item: "bg-strong-hover" } }),
    ).toBe("Bg Strong Hover");
  });

  it("should create correct grouping for token with group attribute", () => {
    const token: TransformedToken = {
      ...baseToken,
      name: "tokenName",
      attributes: { item: "primary" },
      group: "color.background",
    };
    expect(extractTokenName(token)).toBe("Color/Background/Primary");
  });

  it("should add 'Default' suffix for tokens with duplicate names", () => {
    const token: TransformedToken = {
      ...baseToken,
      name: "tokenName",
      attributes: { item: "accent" },
      group: "text.accent",
    };
    expect(extractTokenName(token)).toBe("Text/Accent/Accent Default");
  });

  it("should add 'Radius' prefix for global-radius type tokens", () => {
    const token: TransformedToken = {
      ...baseToken,
      name: "tokenName",
      attributes: { item: "small" },
      type: "global-radius",
    };
    expect(extractTokenName(token)).toBe("Radius Small");
  });

  it("should add 'Spacing' prefix for global-spacing type tokens", () => {
    const token: TransformedToken = {
      ...baseToken,
      name: "tokenName",
      attributes: { item: "4" },
      type: "global-spacing",
    };
    expect(extractTokenName(token)).toBe("Spacing 4");
  });
});
