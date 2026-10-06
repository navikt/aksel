import { setYear } from "date-fns";
import { describe, expect, test } from "vitest";
import {
  dateIsInCurrentMonth,
  isNavigableYear,
  isValidDate,
} from "./check-dates";

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

describe("isNavigableYear", () => {
  const today = new Date(2025, 5, 1);

  test("should allow years within ±150 years of today", () => {
    expect(isNavigableYear({ day: new Date(1925, 0, 1), today })).toBe(true);
    expect(isNavigableYear({ day: new Date(2125, 11, 31), today })).toBe(true);
  });

  test("should not allow years more than 150 years from today", () => {
    expect(isNavigableYear({ day: new Date(1824, 11, 31), today })).toBe(false);
    expect(isNavigableYear({ day: new Date(4582, 8, 7), today })).toBe(false);
  });

  test("should use fromDate and toDate as bounds when set", () => {
    const fromDate = new Date(1900, 0, 1);
    const toDate = new Date(2030, 0, 1);

    expect(
      isNavigableYear({ day: new Date(1910, 0, 1), today, fromDate, toDate }),
    ).toBe(true);
    expect(
      isNavigableYear({ day: new Date(2031, 0, 1), today, fromDate, toDate }),
    ).toBe(false);
  });
});
