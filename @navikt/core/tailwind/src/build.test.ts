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

/* https://tailwindcss.com/docs/theme#theme-variable-namespaces */
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

const getVariables = (css: string) =>
  css
    .split("\n")
    .filter((line) => line.trim().startsWith("--"))
    .map((line) => line.trim().split(":")[0]);

const nonColorCategories = [
  "space",
  "shadow",
  "font-weight",
  "font-size",
  "font-line-height",
  "font-family",
  "radius",
  "breakpoint",
  "opacity",
];

describe("Tailwind v4 config", () => {
  test("should have correct color tokens without non-color categories", () => {
    const colorKeys = Object.keys(v4Config.colors);
    const invalid = colorKeys.filter((key) =>
      nonColorCategories.some((category) => key.includes(category)),
    );

    expect(invalid).toEqual([]);
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

  test("uses `@theme inline` so aliases resolve where the utility is used", () => {
    expect(generateThemeCSS().split("\n")[0]).toBe("@theme inline {");
  });

  test("all generated variables should use allowed Tailwind v4 theme namespaces", () => {
    const variables = getVariables(generateThemeCSS());

    expect(variables.length).toBeGreaterThan(0);

    const invalid = variables.filter(
      (v) => !allowedVariables.some((prefix) => v.startsWith(prefix)),
    );

    expect(invalid).toEqual([]);
  });

  test("font families use the `--font-*` namespace", () => {
    expect(getVariables(generateThemeCSS())).toContain("--font-ax-font-family");
  });

  test("font-size keys don't collide with color keys in `text-ax-*`", () => {
    const colorKeys = Object.keys(v4Config.colors);
    const collisions = Object.keys(v4Config.fontSizes).filter((key) =>
      colorKeys.includes(key),
    );

    expect(collisions).toEqual([]);
  });
});
