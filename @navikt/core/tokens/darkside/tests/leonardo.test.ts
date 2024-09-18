import { describe, expect, test } from "vitest";
import { globalColorConfig } from "../leonardo";

describe("leonardo token setup", () => {
  Object.entries(globalColorConfig).forEach(([role, { colorKeys, ratios }]) => {
    test(`${role} should have correct colorKeys and ratios for each role`, () => {
      expect(colorKeys.length).toBeGreaterThan(0);
      expect(ratios.length).toEqual(10);
    });
  });
});
