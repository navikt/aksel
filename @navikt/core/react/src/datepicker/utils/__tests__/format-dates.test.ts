import { parseDate } from "../parse-date";
import { isValidDate } from "../util";
import nb from "date-fns/locale/nb";
import { getMonth } from "date-fns";

const check = (inp: string) =>
  expect(isValidDate(parseDate(inp, new Date(), nb)));

const parse = (inp: string) => parseDate(inp, new Date(), nb);

describe("Parse date-inputs to correct month", () => {
  test("No spaces", () => {
    expect(getMonth(parse("150522"))).toEqual(4);
    expect(getMonth(parse("11052022"))).toEqual(4);
    expect(getMonth(parse("15052022"))).toEqual(4);
  });
});
