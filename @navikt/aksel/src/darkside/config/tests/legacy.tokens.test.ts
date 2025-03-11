import { describe, expect, test } from "vitest";
import * as jsTokens from "@navikt/ds-tokens/dist/tokens";
import { translateToken } from "../../../codemod/utils/translate-token";
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

  test("migration config should include every token in ds-tokens", () => {
    const legacyTokens = Object.keys(legacyTokenConfig).map((key) =>
      translateToken(`a-${key}`, "js").toLowerCase(),
    );
    console.info(JSON.stringify(legacyTokens, null, 2));
    Object.keys(jsTokens).forEach((key) => {
      expect(legacyTokens).toContain(key.toLowerCase());
    });
  });
});
