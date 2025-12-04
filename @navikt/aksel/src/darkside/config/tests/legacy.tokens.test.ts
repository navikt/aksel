import { describe, expect, test } from "vitest";
import * as jsTokens from "@navikt/ds-tokens/dist/tokens";
import { translateToken } from "../../../codemod/utils/translate-token";
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

  test("migration config should include every token in ds-tokens", () => {
    const legacyTokens = Object.keys(legacyTokenConfig).map((key) =>
      translateToken(`a-${key}`, "js").toLowerCase(),
    );
    Object.keys(jsTokens).forEach((key) => {
      expect(legacyTokens).toContain(key.toLowerCase());
    });
  });
});
