/* eslint-disable @vitest/expect-expect */
import { describe, expect, test } from "vitest";
import { GenericNestedTranslationObject } from "./i18n.types";
import en from "./locales/en";
import nb from "./locales/nb";
import nn from "./locales/nn";

function checkValues(obj: GenericNestedTranslationObject) {
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
  test("NB should have no empty strings", () => checkValues(nb));
  test("NN should have no empty strings", () => checkValues(nn));
  test("EN should have no empty strings", () => checkValues(en));
});
