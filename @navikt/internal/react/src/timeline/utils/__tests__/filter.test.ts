import { getFirstDate, getLastDate } from "..";

const dates = [
  { start: new Date("Jan 4 2022"), end: new Date("Sep 5 2023") },
  { start: new Date("Mar 4 2021"), end: new Date("Dec 5 2022") },
  { start: new Date("May 4 2022"), end: new Date("Oct 5 2026") },
  { start: new Date("Apr 1 2020"), end: new Date("Sep 5 2020") },
];

describe("Returns the earliest date in array", () => {
  test("Date should be the earliest in array (Apr 1 2020)", () => {
    expect(getFirstDate(dates).toDateString()).toEqual(
      new Date("Apr 1 2020").toDateString()
    );
  });
});

describe("Returns the latest date in array", () => {
  test("Date should be the latest in array (Oct 5 2026)", () => {
    expect(getLastDate(dates).toDateString()).toEqual(
      new Date("Oct 5 2026").toDateString()
    );
  });
});
