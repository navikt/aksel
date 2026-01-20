/* eslint-disable vitest/expect-expect */
import { describe, expect, test } from "vitest";
import { Translations } from "./i18n.types";
import en from "./locales/en";
import nb from "./locales/nb";
import nn from "./locales/nn";

type NestedObject = Record<string, string | Record<string, string>>;

function checkValues(obj: Translations | NestedObject) {
  Object.entries(obj).forEach(
    ([key, value]: [string, string | NestedObject]) => {
      if (key === "dateLocale") {
        return;
      }
      if (typeof value === "object") {
        checkValues(value);
      } else {
        expect(value).toBeTypeOf("string");
        expect(value).not.toBe("");
      }
    },
  );
}

function checkTranslationPlaceholders(
  baseTranslations: Translations | NestedObject, // Translations to check against
  translations: Translations | NestedObject, // Translations to check
) {
  Object.entries(baseTranslations).forEach(
    ([key, baseVal]: [string, string | NestedObject]) => {
      if (key === "dateLocale") {
        return;
      }
      if (typeof baseVal === "object") {
        checkTranslationPlaceholders(baseVal, translations[key]);
      } else {
        const correctPlaceholders = baseVal.match(/{[^}]*}/g) || [];
        const transPlaceholders = translations[key].match(/{[^}]*}/g) || [];
        expect(
          transPlaceholders.sort(),
          `Wrong placeholders in "${translations[key]}" (key=${key})`,
        ).toEqual(correctPlaceholders.sort());
      }
    },
  );
}

describe("Locale", () => {
  test("NB should have no empty strings", () => checkValues(nb));
  test("NN should have no empty strings", () => checkValues(nn));
  test("EN should have no empty strings", () => checkValues(en));

  test("NN should have the same placeholders as NB", () =>
    checkTranslationPlaceholders(nb, nn));
  test("EN should have the same placeholders as NB", () =>
    checkTranslationPlaceholders(nb, en));
});
