import { describe, expect, test } from "vitest";
import { radiusTokenConfig } from "../tokens/radius";
import { semanticTokenConfig } from "../tokens/semantic";
import { semanticTokensForAllRoles } from "../tokens/semantic-roles";
import { spacingTokenConfig } from "../tokens/spacing";
import { completeGlobalScale } from "../util";

const ConfigKeysWithGroup = ["value", "type", "group"];
const ConfigKeys = ["value", "type"];

describe("Validate token configurations", () => {
  test(`Semantic tokens`, () => {
    expect(
      validateConfig(semanticTokenConfig(), ConfigKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Semantic tokens for all roles`, () => {
    expect(
      validateConfig(semanticTokensForAllRoles(), ConfigKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Global lightmode scale`, () => {
    expect(
      validateConfig(completeGlobalScale("light"), ConfigKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Global darmode scale`, () => {
    expect(
      validateConfig(completeGlobalScale("dark"), ConfigKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Spacing scale`, () => {
    expect(validateConfig(spacingTokenConfig, ConfigKeys)).toBeTruthy();
  });

  test(`Radius scale`, () => {
    expect(validateConfig(radiusTokenConfig, ConfigKeys)).toBeTruthy();
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
