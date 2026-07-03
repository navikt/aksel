import { describe, expect, test } from "vitest";
import { config } from "./build-v3";
import { generateThemeCSS, v4Config } from "./build-v4";

describe("Tailwind v3 config", () => {
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

const allowedVariables = [
  "--color-",
  "--font-",
  "--text-",
  "--font-weight-",
  "--tracking-",
  "--leading-",
  "--tab-size-",
  "--breakpoint-",
  "--container-",
  "--spacing-",
  "--radius-",
  "--shadow-",
  "--inset-shadow-",
  "--drop-shadow-",
  "--blur-",
  "--perspective-",
  "--zoom-",
  "--aspect-",
  "--ease-",
  "--animate-",
  "--opacity-",
];

describe("Tailwind v4 config", () => {
  test("should have correct color tokens without non-color categories", () => {
    const colorKeys = Object.keys(v4Config.colors);
    expect(colorKeys).not.toContain("spacing");
    expect(colorKeys).not.toContain("shadow");
    expect(colorKeys).not.toContain("font-weight");
    expect(colorKeys).not.toContain("font-size");
    expect(colorKeys).not.toContain("font-line-height");
    expect(colorKeys).not.toContain("font-family");
    expect(colorKeys).not.toContain("border-radius");
    expect(colorKeys).not.toContain("breakpoint");
    expect(colorKeys.some((k) => k.includes("radius"))).toBe(false);
  });

  test("should have shadow tokens", () => {
    expect(Object.keys(v4Config.shadows).length).toBeGreaterThan(0);
  });

  test("should have font-size tokens", () => {
    expect(Object.keys(v4Config.fontSizes).length).toBeGreaterThan(0);
  });

  test("should have breakpoints", () => {
    expect(v4Config.breakpoints).toEqual({
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    });
  });

  test("should have radius tokens", () => {
    expect(Object.keys(v4Config.radius).length).toBeGreaterThan(0);
  });

  test("all generated variables should use allowed Tailwind v4 theme namespaces", () => {
    const css = generateThemeCSS();
    const variableLines = css
      .split("\n")
      .filter((line) => line.trim().startsWith("--"))
      .map((line) => line.trim().split(":")[0]);

    expect(variableLines.length).toBeGreaterThan(0);

    const invalid = variableLines.filter(
      (v) => !allowedVariables.some((prefix) => v.startsWith(prefix)),
    );

    expect(invalid).toEqual([]);
  });
});
