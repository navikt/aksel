import { describe, expect, test } from "vitest";
import { legacyTokenConfig } from "../legacy.tokens";
import { v8TokenConfig } from "../v8.tokens";

describe("Legacy token migration", () => {
  test("Token migration references exists", () => {
    Object.entries(legacyTokenConfig)
      .filter(([, config]) => config.replacement.length > 1)
      .forEach(([oldToken, config]) => {
        expect(
          config.replacement in v8TokenConfig,
          `${oldToken} has valid replacement: ${config.replacement}`,
        ).toBeTruthy();
      });
  });
});
