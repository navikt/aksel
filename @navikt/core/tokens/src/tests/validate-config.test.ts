import { describe, expect, test } from "vitest";
import {
  globalDarkTokens,
  globalLightTokens,
} from "../tokens/colors/global.tokens";
import { semanticTokensForAllRoles } from "../tokens/colors/semantic-role.tokens";
import { semanticRootTokens } from "../tokens/colors/semantic-root.tokens";
import { radiusTokenConfig } from "../tokens/radius";
import { spaceTokenConfig } from "../tokens/space";

const configKeysWithGroup = ["value", "type", "group"];
const configKeys = ["value", "type"];

describe("Validate token configurations", () => {
  test(`Semantic tokens lightmode`, () => {
    expect(
      validateConfig(semanticRootTokens("light"), configKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Semantic tokens darkmode`, () => {
    expect(
      validateConfig(semanticRootTokens("dark"), configKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Semantic tokens for all roles`, () => {
    expect(
      validateConfig(semanticTokensForAllRoles(), configKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Global lightmode scale`, () => {
    expect(validateConfig(globalLightTokens, configKeysWithGroup)).toBeTruthy();
  });

  test(`Global darkmode scale`, () => {
    expect(validateConfig(globalDarkTokens, configKeysWithGroup)).toBeTruthy();
  });

  test(`Space scale`, () => {
    expect(validateConfig(spaceTokenConfig, configKeys)).toBeTruthy();
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
    if (
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !Array.isArray(obj[key])
    ) {
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
