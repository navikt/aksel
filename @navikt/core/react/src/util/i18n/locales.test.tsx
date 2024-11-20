/* eslint-disable @vitest/expect-expect */
import { describe, expect, test } from "vitest";
import { Translations } from "./i18n.types";
import en from "./locales/en";
import nb from "./locales/nb";
import nn from "./locales/nn";

type NestedValue = string | Record<string, string | Record<string, string>>;

function checkValues(obj: Translations | NestedValue) {
  Object.entries(obj).forEach(([key, value]) => {
    if (key === "dateLocale") {
      return;
    }
    if (typeof value === "object") {
      checkValues(value);
    } else {
      expect(value).toBeTypeOf("string");
      expect(value).not.toBe("");
    }
  });
}

function checkPlaceholders(
  baseTrans: Translations | NestedValue, // Translations to check against
  trans: Translations | NestedValue, // Translations to check
) {
  Object.entries(baseTrans).forEach(([key, baseVal]: [string, NestedValue]) => {
    if (key === "dateLocale") {
      return;
    }
    if (typeof baseVal === "object") {
      checkPlaceholders(baseVal, trans[key]);
    } else {
      const correctPlaceholders = baseVal.match(/{[^}]*}/g) || [];
      const transToCheck = trans[key];
      // Check that all placeholders in base translation is present in the translation being checked
      correctPlaceholders.forEach((placeholder) => {
        expect(transToCheck).toContain(placeholder);
      });
      // Check that the translation does not have any extra (hence invalid) placeholders
      const transPlaceholders = transToCheck.match(/{[^}]*}/g) || [];
      expect(
        transPlaceholders.length,
        `Invalid placeholder(s): "${transToCheck}" (key=${key})`,
      ).toBe(correctPlaceholders.length);
    }
  });
}

describe("Locale", () => {
  test("NB should have no empty strings", () => checkValues(nb));
  test("NN should have no empty strings", () => checkValues(nn));
  test("EN should have no empty strings", () => checkValues(en));

  test("NN should have the same placeholders as NB", () =>
    checkPlaceholders(nb, nn));
  test("EN should have the same placeholders as NB", () =>
    checkPlaceholders(nb, en));
});
