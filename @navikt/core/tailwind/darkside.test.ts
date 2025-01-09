import { describe, expect, test } from "vitest";
import { breakpointsTokenConfig } from "../tokens/darkside/tokens/breakpoints";
import { config, extractTokensForCategory } from "./darkside";

describe("Darkside tailwind config", () => {
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

  test("should have correct screen breakpoints", () => {
    expect(config.theme.screens.sm).toBe(
      breakpointsTokenConfig.breakpoint.sm.value,
    );
    expect(config.theme.screens.md).toBe(
      breakpointsTokenConfig.breakpoint.md.value,
    );
    expect(config.theme.screens.lg).toBe(
      breakpointsTokenConfig.breakpoint.lg.value,
    );
    expect(config.theme.screens.xl).toBe(
      breakpointsTokenConfig.breakpoint.xl.value,
    );
    expect(config.theme.screens["2xl"]).toBe(
      breakpointsTokenConfig.breakpoint["2xl"].value,
    );
  });

  test("should have correct extended properties", () => {
    expect(config.theme.extend.shadow).toEqual(
      extractTokensForCategory("shadow"),
    );
    expect(config.theme.extend.fontWeight).toEqual(
      extractTokensForCategory("font-weight"),
    );
    expect(config.theme.extend.fontSize).toEqual(
      extractTokensForCategory("font-size"),
    );
    expect(config.theme.extend.lineHeight).toEqual(
      extractTokensForCategory("font-line-height"),
    );
    expect(config.theme.extend.fontFamily).toEqual(
      extractTokensForCategory("font-family"),
    );
    expect(config.theme.extend.borderRadius).toEqual(
      extractTokensForCategory("border-radius"),
    );
  });

  test("should extract tokens correctly for a given category", () => {
    const spacingTokens = extractTokensForCategory("spacing");
    Object.entries(spacingTokens).forEach(([key]) => {
      expect(key).not.toContain("spacing-");
    });
  });
});
