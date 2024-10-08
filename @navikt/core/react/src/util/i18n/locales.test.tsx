/* eslint-disable @vitest/expect-expect */
import { describe, expect, test } from "vitest";
import { TranslationObject } from "./i18n.types";
import en from "./locales/en";
import nb from "./locales/nb";
import nn from "./locales/nn";

function compareKeys(a: TranslationObject, b: TranslationObject) {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  expect(aKeys).toEqual(bKeys);
  aKeys.forEach((key) => {
    if (typeof a[key] === "object") {
      expect(b[key]).toBeTypeOf("object");
      if (typeof b[key] === "object") {
        compareKeys(a[key], b[key]);
      }
    }
  });
}

function checkValues(obj: TranslationObject) {
  Object.values(obj).forEach((value) => {
    if (typeof value === "object") {
      checkValues(value);
    } else {
      expect(value).toBeTypeOf("string");
      expect(value).not.toBe("");
    }
  });
}

describe("Locale", () => {
  test("NB and NN should have the same keys", () => compareKeys(nb, nn));
  test("NB and EN should have the same keys", () => compareKeys(nb, en));
  test("NB should have no empty strings", () => checkValues(nb));
  test("NN should have no empty strings", () => checkValues(nn));
  test("EN should have no empty strings", () => checkValues(en));
});
