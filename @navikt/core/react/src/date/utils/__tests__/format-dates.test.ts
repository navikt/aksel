import { parseDate } from "../parse-date";
import nb from "date-fns/locale/nb";
import { formatDateForInput } from "../format-date";

const parse = (inp: string) => parseDate(inp, new Date(), nb, "date");

describe("Format date to correct output", () => {
  test("formatDateForInput", () => {
    expect(formatDateForInput(parse("15/05/22"), nb, "date")).toEqual(
      "15.05.2022"
    );
    expect(formatDateForInput(parse("1/5/22"), nb, "date")).toEqual(
      "01.05.2022"
    );
    expect(formatDateForInput(parse("1/05/22"), nb, "date")).toEqual(
      "01.05.2022"
    );
    expect(formatDateForInput(parse("15/5/22"), nb, "date")).toEqual(
      "15.05.2022"
    );
  });
});
