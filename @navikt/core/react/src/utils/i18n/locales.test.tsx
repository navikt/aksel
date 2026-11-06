import { describe, expect, test } from "vitest";
import type { Translations } from "./i18n.types";
import en from "./locales/en";
import nb from "./locales/nb";
import nn from "./locales/nn";

type NestedObject = Record<string, string | Record<string, string>>;

/** Flattens nested translations to `[path, value]` pairs, skipping `dateLocale`. */
function flattenTranslations(
  obj: Translations | NestedObject,
  prefix = "",
): [string, unknown][] {
  const entries: [string, unknown][] = [];

  for (const [key, value] of Object.entries(obj)) {
    if (key === "dateLocale") {
      continue;
    }

    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object") {
      entries.push(...flattenTranslations(value as NestedObject, path));
    } else {
      entries.push([path, value]);
    }
  }

  return entries;
}

function getPlaceholders(value: unknown) {
  return (typeof value === "string" ? value.match(/{[^}]*}/g) : null) ?? [];
}

describe("Locale", () => {
  test.each([
    ["NB", nb],
    ["NN", nn],
    ["EN", en],
  ])("%s should have no empty strings", (_, locale) => {
    for (const [path, value] of flattenTranslations(locale)) {
      expect({ path, type: typeof value }).toEqual({ path, type: "string" });
      expect({ path, empty: value === "" }).toEqual({ path, empty: false });
    }
  });

  test.each([
    ["NN", nn],
    ["EN", en],
  ])("%s should have the same placeholders as NB", (_, locale) => {
    const translations = new Map(flattenTranslations(locale));

    for (const [path, baseValue] of flattenTranslations(nb)) {
      const value = translations.get(path);
      expect({
        path,
        value,
        placeholders: getPlaceholders(value).sort(),
      }).toEqual({
        path,
        value,
        placeholders: getPlaceholders(baseValue).sort(),
      });
    }
  });
});
