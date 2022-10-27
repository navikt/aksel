import { parseDate } from "..";
import { isValidDate } from "..";
import nb from "date-fns/locale/nb";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";

const check = (inp: string) =>
  expect(isValidDate(parseDate(inp, new Date(), nb, "date")));

const parse = (inp: string) => parseDate(inp, new Date(), nb, "date");

describe("Parse date-inputs", () => {
  test("No spaces", () => {
    check("150522").toBeTruthy();
    check("11052022").toBeTruthy();
    check("15052022").toBeTruthy();
  });

  test(". divider", () => {
    check("1.5.22").toBeTruthy();
    check("1.5.2022").toBeTruthy();
    check("11.05.22").toBeTruthy();
    check("11.05.2022").toBeTruthy();
  });

  test("/ divider", () => {
    check("1/5/22").toBeTruthy();
    check("10/5/22").toBeTruthy();
    check("1/5/2022").toBeTruthy();
    check("10/5/2022").toBeTruthy();
    check("1/05/22").toBeTruthy();
    check("10/05/22").toBeTruthy();
    check("1/05/2022").toBeTruthy();
    check("10/05/2022").toBeTruthy();
  });

  test("- divider", () => {
    check("1-5-22").toBeTruthy();
    check("10-5-22").toBeTruthy();
    check("1-5-2022").toBeTruthy();
    check("10-5-2022").toBeTruthy();
    check("1-05-22").toBeTruthy();
    check("10-05-22").toBeTruthy();
    check("1-05-2022").toBeTruthy();
    check("10-05-2022").toBeTruthy();
  });
});

describe("Parse date-inputs to correct year", () => {
  test("No spaces", () => {
    expect(getYear(parse("150522"))).toEqual(2022);
  });

  test(". divider", () => {
    expect(getYear(parse("1.05.22"))).toEqual(2022);
    expect(getYear(parse("11.05.22"))).toEqual(2022);
    expect(getYear(parse("1.5.22"))).toEqual(2022);
    expect(getYear(parse("11.5.22"))).toEqual(2022);
  });

  test("/ divider", () => {
    expect(getYear(parse("1/5/22"))).toEqual(2022);
    expect(getYear(parse("10/5/22"))).toEqual(2022);
    expect(getYear(parse("1/05/22"))).toEqual(2022);
    expect(getYear(parse("10/05/22"))).toEqual(2022);
  });

  test("- divider", () => {
    expect(getYear(parse("1-5-22"))).toEqual(2022);
    expect(getYear(parse("10-5-22"))).toEqual(2022);
    expect(getYear(parse("1-05-22"))).toEqual(2022);
    expect(getYear(parse("10-05-22"))).toEqual(2022);
  });
});

describe("Parse date-inputs to correct month", () => {
  test("No spaces", () => {
    expect(getMonth(parse("150522"))).toEqual(4);
    expect(getMonth(parse("11052022"))).toEqual(4);
    expect(getMonth(parse("15052022"))).toEqual(4);
  });
});
