import { dateIsInCurrentMonth, hasNextYear } from "..";

const selectedDate = new Date("Feb 1 1994");

describe("Returns if date is in current month", () => {
  test("Date should be within current month (true)", () => {
    expect(dateIsInCurrentMonth(new Date(), new Date())).toBeTruthy();
  });

  test("Date should not be within current month (false)", () => {
    expect(
      dateIsInCurrentMonth(new Date("Sep 2 2021"), selectedDate)
    ).toBeFalsy();
    expect(
      dateIsInCurrentMonth(new Date("Sep 1 2021"), selectedDate)
    ).toBeFalsy();
    expect(
      dateIsInCurrentMonth(new Date("Sep 30 2021"), selectedDate)
    ).toBeFalsy();
  });
});

const years = [
  new Date(),
  new Date("Aug 5 2023"),
  new Date("Aug 5 2024"),
  new Date("Aug 5 2025"),
  new Date("Aug 5 2026"),
  new Date("Aug 5 2027"),
  new Date("Aug 5 2028"),
  new Date("Aug 5 2029"),
];

describe("Returns if year is at start or end of range", () => {
  test("Should have next year (true)", () => {
    expect(hasNextYear(new Date(), years, 1)).toBeTruthy();
  });
  test("Should have previous year (true)", () => {
    expect(hasNextYear(new Date("Aug 3 2024"), years, -1)).toBeTruthy();
  });
  test("Should not have next year (false)", () => {
    expect(hasNextYear(new Date("Aug 3 2029"), years, 1)).toBeFalsy();
  });
  test("Should not have previous year (false)", () => {
    expect(hasNextYear(new Date(), years, -1)).toBeFalsy();
  });
});
