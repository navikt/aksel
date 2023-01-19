import { parseDate } from "../parse-date";
import nb from "date-fns/locale/nb";
import { formatDateForInput } from "../format-date";

const parse = (inp: string) => parseDate(inp, new Date(), nb, "date", false);
const parseTwoDigit = (inp: string) =>
  parseDate(inp, new Date(), nb, "date", true);

describe("Format date to correct output", () => {
  test("formatDateForInput", () => {
    expect(formatDateForInput(parse("15/05/2022"), nb, "date")).toEqual(
      "15.05.2022"
    );
    expect(formatDateForInput(parse("1/5/2022"), nb, "date")).toEqual(
      "01.05.2022"
    );
    expect(formatDateForInput(parse("1/05/2022"), nb, "date")).toEqual(
      "01.05.2022"
    );
    expect(formatDateForInput(parse("15/5/2022"), nb, "date")).toEqual(
      "15.05.2022"
    );
  });
  test("formatDateForInput with twoDigitYears", () => {
    expect(formatDateForInput(parseTwoDigit("15/05/22"), nb, "date")).toEqual(
      "15.05.2022"
    );
    expect(formatDateForInput(parseTwoDigit("1/5/95"), nb, "date")).toEqual(
      "01.05.1995"
    );
  });
});
