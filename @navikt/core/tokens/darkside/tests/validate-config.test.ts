import { describe, expect, test } from "vitest";
import { globalScale } from "../create-configuration";
import { contrastTokenConfig } from "../tokens/contrast";
import { neutralTokenConfig } from "../tokens/neutral";
import { radiusTokenConfig } from "../tokens/radius";
import { semanticTokenConfig } from "../tokens/semantic";
import { semanticTokensForAllRolesConfig } from "../tokens/semantic-roles";
import { spacingTokenConfig } from "../tokens/spacing";

const configKeysWithGroup = ["value", "type", "group"];
const configKeys = ["value", "type"];

describe("Validate token configurations", () => {
  test(`Semantic tokens`, () => {
    expect(
      validateConfig(semanticTokenConfig(), ConfigKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Semantic tokens for all roles`, () => {
    expect(
      validateConfig(semanticTokensForAllRolesConfig(), ConfigKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Contrast tokens`, () => {
    expect(
      validateConfig(contrastTokenConfig(), ConfigKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Global lightmode scale`, () => {
    expect(
      validateConfig(globalScale("light"), ConfigKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Global darkmode scale`, () => {
    expect(
      validateConfig(globalScale("dark"), ConfigKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Neutral light unique tokens`, () => {
    expect(
      validateConfig(neutralTokenConfig("light"), ConfigKeysWithGroup),
    ).toBeTruthy();
  });

  test(`Neutral dark unique tokens`, () => {
    expect(
      validateConfig(neutralTokenConfig("dark"), ConfigKeysWithGroup),
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
