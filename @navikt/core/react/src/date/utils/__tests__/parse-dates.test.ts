import { parseDate } from "..";
import { isValidDate } from "..";
import nb from "date-fns/locale/nb";
import getMonth from "date-fns/getMonth";

const check = (inp: string) =>
  expect(isValidDate(parseDate(inp, new Date(), nb, "date", false)));

const checkTwoDigit = (inp: string) =>
  expect(isValidDate(parseDate(inp, new Date(), nb, "date", true)));

const parse = (inp: string) => parseDate(inp, new Date(), nb, "date", false);

describe("Parse date-inputs with 4-digit years", () => {
  test("No spaces", () => {
    check("11052022").toBeTruthy();
    check("15052022").toBeTruthy();
  });

  test(". divider", () => {
    check("1.5.2022").toBeTruthy();
    check("11.05.2022").toBeTruthy();
  });

  test("/ divider", () => {
    check("1/5/2022").toBeTruthy();
    check("10/5/2022").toBeTruthy();
    check("1/05/2022").toBeTruthy();
    check("10/05/2022").toBeTruthy();
  });

  test("- divider", () => {
    check("1-5-2022").toBeTruthy();
    check("10-5-2022").toBeTruthy();
    check("1-05-2022").toBeTruthy();
    check("10-05-2022").toBeTruthy();
  });
});

describe("Parse date-inputs with 2-digit years", () => {
  test("No spaces", () => {
    checkTwoDigit("110522").toBeTruthy();
    checkTwoDigit("150522").toBeTruthy();
  });

  test(". divider", () => {
    checkTwoDigit("1.5.22").toBeTruthy();
    checkTwoDigit("11.05.22").toBeTruthy();
  });

  test("/ divider", () => {
    checkTwoDigit("1/5/22").toBeTruthy();
    checkTwoDigit("10/5/22").toBeTruthy();
    checkTwoDigit("1/05/22").toBeTruthy();
    checkTwoDigit("10/05/22").toBeTruthy();
  });

  test("- divider", () => {
    checkTwoDigit("1-5-22").toBeTruthy();
    checkTwoDigit("10-5-22").toBeTruthy();
    checkTwoDigit("1-05-22").toBeTruthy();
    checkTwoDigit("10-05-22").toBeTruthy();
  });

  test("Dissallow 1 and 3 digit years", () => {
    checkTwoDigit("11052").toBeFalsy();
    checkTwoDigit("1105222").toBeFalsy();
    checkTwoDigit("1105999").toBeFalsy();
  });

  test("Dissallow date before year 1000", () => {
    checkTwoDigit("11050999").toBeFalsy();
    checkTwoDigit("11050010").toBeFalsy();
    checkTwoDigit("11051000").toBeTruthy();
  });
});

describe("Parse date-inputs to correct month", () => {
  test("No spaces", () => {
    expect(getMonth(parse("11052022"))).toEqual(4);
    expect(getMonth(parse("15052022"))).toEqual(4);
  });
});
