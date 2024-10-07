import { describe, expect, test } from "vitest";
import { contrastTokenConfig } from "../tokens/contrast";
import { globalColorDarkModeConfig } from "../tokens/global-dark";
import { globalColorLightModeConfig } from "../tokens/global-light";
import { radiusTokenConfig } from "../tokens/radius";
import { semanticTokenConfig } from "../tokens/semantic";
import { semanticTokensForAllRolesConfig } from "../tokens/semantic-roles";
import { spacingTokenConfig } from "../tokens/spacing";

const configKeysWithGroup = ["value", "type", "group"];
const configKeys = ["value", "type"];

describe("Validate token configurations", () => {
  test(`Semantic tokens lightmode`, () => {
    expect(
      validateConfig(semanticTokenConfig("light"), configKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Semantic tokens darkmode`, () => {
    expect(
      validateConfig(semanticTokenConfig("dark"), configKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Semantic tokens for all roles`, () => {
    expect(
      validateConfig(semanticTokensForAllRolesConfig(), configKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Contrast tokens`, () => {
    expect(
      validateConfig(contrastTokenConfig(), configKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Global lightmode scale`, () => {
    expect(
      validateConfig(globalColorLightModeConfig, configKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Global darkmode scale`, () => {
    expect(
      validateConfig(globalColorDarkModeConfig, configKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Spacing scale`, () => {
    expect(validateConfig(spacingTokenConfig, configKeys)).toBeTruthy();
  });

  test(`Radius scale`, () => {
    expect(validateConfig(radiusTokenConfig, configKeys)).toBeTruthy();
  });
});

function validateConfig(
  obj: Record<string, any>,
  requiredKeys: string[],
): boolean {
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if (!validateConfig(obj[key], requiredKeys)) {
        return false;
      }
    } else {
      for (const requiredKey of requiredKeys) {
        if (!(requiredKey in obj)) {
          throw new Error(
            `Missing required key: ${requiredKey} in object: ${JSON.stringify(
              obj,
            )}`,
          );
        }
      }
    }
  }
  return true;
}
