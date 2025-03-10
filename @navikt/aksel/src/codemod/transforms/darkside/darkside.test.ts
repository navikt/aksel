import { describe, expect, test } from "vitest";
import { newTokens, updatedTokens } from "./darkside.tokens";

describe("Darkside codemods", () => {
  test("Token migration references exists", () => {
    Object.entries(updatedTokens).forEach(([oldToken, config]) => {
      if (config.replacement.length > 1) {
        expect(
          config.replacement in newTokens,
          `${oldToken} has valid replacement: ${config.replacement}`,
        ).toBeTruthy();
      }
    });
  });

  test("Has raw value if no reference is set", () => {
    Object.values(updatedTokens).forEach((config) => {
      if (config.replacement.length === 0) {
        expect(config.raw.length > 0).toBeTruthy();
      }
    });
  });
});
