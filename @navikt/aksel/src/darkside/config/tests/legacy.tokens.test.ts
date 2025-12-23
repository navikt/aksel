import { describe, expect, test } from "vitest";
import { darksideTokenConfig } from "../darkside.tokens";
import { legacyTokenConfig } from "../legacy.tokens";

describe("Legacy token migration", () => {
  test("Token migration references exists", () => {
    Object.entries(legacyTokenConfig)
      .filter(([, config]) => config.replacement.length > 1)
      .forEach(([oldToken, config]) => {
        expect(
          config.replacement in darksideTokenConfig,
          `${oldToken} has valid replacement: ${config.replacement}`,
        ).toBeTruthy();
      });
  });
});
