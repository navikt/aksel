import { setYear } from "date-fns";
import { describe, expect, test } from "vitest";
import { dateIsInCurrentMonth, isValidDate } from "./check-dates";

describe("dateIsInCurrentMonth", () => {
  test("should return true if the date is in the same month and year as the date to compare", () => {
    const date = new Date();
    const dateToCompare = new Date();
    expect(dateIsInCurrentMonth(date, dateToCompare)).toBe(true);
  });

  test("should return false if the date is not in the same month as the date to compare", () => {
    const date = new Date();
    const dateToCompare = new Date(2023, 9, 1); // October 1, 2023
    expect(dateIsInCurrentMonth(date, dateToCompare)).toBe(false);
  });

  test("should return false if the date is in the same month but different year as the date to compare", () => {
    const date = new Date();
    const dateToCompare = new Date();
    expect(
      dateIsInCurrentMonth(
        date,
        setYear(dateToCompare, dateToCompare.getFullYear() + 1),
      ),
    ).toBe(false);
  });
});

describe("isValidDate", () => {
  test("should return true for a valid date", () => {
    const date = new Date(2023, 9, 15); // October 15, 2023
    expect(isValidDate(date)).toBe(true);
  });

  test("should return false for an invalid date", () => {
    const date = new Date("invalid date");
    expect(isValidDate(date)).toBe(false);
  });

  test("should return false for a date with year less than 1000", () => {
    const date = new Date(999, 9, 15); // October 15, 999
    expect(isValidDate(date)).toBe(false);
  });

  test("should return false for undefined", () => {
    expect(isValidDate(undefined)).toBe(false);
  });
});
