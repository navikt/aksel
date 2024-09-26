import { describe, expect, test } from "vitest";
import { config as darkModeConfig } from "../tokens/global-dark";
import { config as lightModeConfig } from "../tokens/global-light";

describe("Validate global token config", () => {
  describe("Lightmode should have correct colorKeys and ratios for each role", () => {
    Object.entries(lightModeConfig).forEach(([role, { colorKeys, ratios }]) => {
      test(`${role} should have correct colorKeys and ratios for each role`, () => {
        expect(colorKeys.length).toBeGreaterThan(0);
        expect(ratios.length).toEqual(10);
      });
    });
  });

  describe("Darkmode should have correct colorKeys and ratios for each role", () => {
    Object.entries(darkModeConfig).forEach(([role, { colorKeys, ratios }]) => {
      test(`${role} should have correct colorKeys and ratios for each role`, () => {
        expect(colorKeys.length).toBeGreaterThan(0);
        expect(ratios.length).toEqual(10);
      });
    });
  });
});
