import { describe, expect, test } from "vitest";
import { darksideTokenConfig } from "../darkside.tokens";
import { legacyTokenConfig } from "../legacy.tokens";

describe("Legacy token migration", () => {
  test("Token migration references exists", () => {
    Object.entries(legacyTokenConfig).forEach(([oldToken, config]) => {
      if (config.replacement.length > 1) {
        expect(
          config.replacement in darksideTokenConfig,
          `${oldToken} has valid replacement: ${config.replacement}`,
        ).toBeTruthy();
      }
    });
  });

  test("Has raw value if no reference is set", () => {
    Object.values(legacyTokenConfig).forEach((config) => {
      if (config.replacement.length === 0) {
        expect(config.raw.length > 0).toBeTruthy();
      }
    });
  });
});
