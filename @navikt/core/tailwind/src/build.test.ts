import { describe, expect, test } from "vitest";
import { config } from "./build";

describe("V8 tailwind config", () => {
  test("should have correct color tokens", () => {
    const colorKeys = Object.keys(config.theme.colors);
    expect(colorKeys).not.toContain("spacing");
    expect(colorKeys).not.toContain("shadow");
    expect(colorKeys).not.toContain("font-weight");
    expect(colorKeys).not.toContain("font-size");
    expect(colorKeys).not.toContain("font-line-height");
    expect(colorKeys).not.toContain("font-family");
    expect(colorKeys).not.toContain("border-radius");
    expect(colorKeys).not.toContain("breakpoint");
  });
});
