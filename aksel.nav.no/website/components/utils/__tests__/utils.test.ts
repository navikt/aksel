import { abbrName, capitalize, dateStr, isNew } from "../index";

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

  test("dateStr", async () => {
    const date = "2022-06-09T11:05:48Z";
    const date2 = "2021-03-02T12:05:48Z";

    expect(await dateStr(date)).toEqual("9. juni 2022");
    expect(await dateStr(date2)).toEqual("2. mars 2021");
  });

  test("abbrName", () => {
    expect(abbrName("Ola Normann")).toEqual("Ola Normann");
    expect(abbrName("Ola Test Normann")).toEqual("Ola T. Normann");
    expect(abbrName("Ola Test Test2 Normann")).toEqual("Ola T. T. Normann");
  });
});
