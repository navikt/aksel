import { describe, expect, test } from "vitest";
import { abbrName, capitalize, isNew } from "../index";

describe("Utils test", () => {
  test("isNew", () => {
    const before = new Date(new Date().setDate(new Date().getDate() - 180));
    const after = new Date(new Date().setDate(new Date().getDate() - 89));

    expect(isNew(before.toString())).toBeFalsy();
    expect(isNew(after.toString())).toBeTruthy();
  });

  test("capitalize", () => {
    const str1 = "teststr";
    const str2 = "TESTSTR";
    const str3 = "tESTSTR";
    const str4 = "Teststr";

    expect(capitalize(str1)).toEqual("Teststr");
    expect(capitalize(str2)).toEqual("TESTSTR");
    expect(capitalize(str3)).toEqual("TESTSTR");
    expect(capitalize(str4)).toEqual("Teststr");
  });

  test("abbrName", () => {
    expect(abbrName("Ola Normann")).toEqual("Ola Normann");
    expect(abbrName("Ola Test Normann")).toEqual("Ola T. Normann");
    expect(abbrName("Ola Test Test2 Normann")).toEqual("Ola T. T. Normann");
  });
});
