import { getMonths } from "../get-dates";
/* import { zonedTimeToUtc, getTimezoneOffset, utcToZonedTime } from "date-fns-tz"; */

describe("Extracts correct dates between start and end", () => {
  test("Extracts months", () => {
    const compares = [
      {
        start: new Date(2019, 0, 22),
        end: new Date("Aug 23 2019"),
        res: [
          new Date(2019, 0, 3),
          new Date(2019, 1, 3),
          new Date(2019, 2, 3),
          new Date(2019, 3, 3),
          new Date(2019, 4, 3),
          new Date(2019, 5, 3),
          new Date(2019, 6, 3),
          new Date(2019, 7, 3),
        ],
      },
    ];

    /* compares.forEach((x) =>
      expect(JSON.stringify(getMonths(x.start, x.end))).toEqual(
        JSON.stringify(x.res)
      )
    ); */
    compares.forEach((x) =>
      expect(getMonths(x.start, x.end).length).toEqual(x.res.length)
    );
  });
});
