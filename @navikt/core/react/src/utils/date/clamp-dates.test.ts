import { startOfMonth, startOfYear } from "date-fns";
import { describe, expect, test } from "vitest";
import { isDateOutsideRange } from "./check-dates";
import { clampDisplayMonth, clampDisplayYear } from "./clamp-dates";

describe("clampDisplayMonth", () => {
  test("should return undefined if month is not provided", () => {
    expect(
      clampDisplayMonth({ start: new Date(), end: new Date() }),
    ).toBeUndefined();
  });

  test("should return the start of the month if month is before start", () => {
    const start = new Date(2023, 5, 1);
    const month = new Date(2023, 4, 1);
    expect(clampDisplayMonth({ month, start, end: new Date() })).toEqual(
      startOfMonth(start),
    );
  });

  test("should return the start of end month if month is after end", () => {
    const end = new Date(2023, 5, 1);
    const month = new Date(2023, 6, 1);
    expect(clampDisplayMonth({ month, start: new Date(), end })).toEqual(
      startOfMonth(end),
    );
  });

  test("should return the start of the month if month is within range", () => {
    const month = new Date(2023, 5, 1);
    expect(
      clampDisplayMonth({
        month,
        start: new Date(2023, 4, 1),
        end: new Date(2023, 6, 1),
      }),
    ).toEqual(startOfMonth(month));
  });
});

describe("clampDisplayYear", () => {
  test("should return undefined if month is not provided", () => {
    expect(
      clampDisplayYear({ start: new Date(), end: new Date() }),
    ).toBeUndefined();
  });

  test("should return the start of the year if month is before start year", () => {
    const start = new Date(2023, 0, 1);
    const month = new Date(2022, 11, 1);
    expect(clampDisplayYear({ month, start, end: new Date() })).toEqual(
      startOfYear(start),
    );
  });

  test("should return the start of the year if month is after end year", () => {
    const end = new Date(2023, 0, 1);
    const month = new Date(2024, 0, 1);
    expect(clampDisplayYear({ month, start: new Date(), end })).toEqual(
      startOfYear(end),
    );
  });

  test("should return the start of the year if month is within range", () => {
    const month = new Date(2023, 5, 1);
    expect(
      clampDisplayYear({
        month,
        start: new Date(2022, 0, 1),
        end: new Date(2024, 0, 1),
      }),
    ).toEqual(startOfYear(month));
  });
});

describe("isDateOutsideRange", () => {
  test("returns false when day is within range", () => {
    const day = new Date(2023, 5, 15);
    const fromDate = new Date(2023, 0, 1);
    const toDate = new Date(2023, 11, 31);

    expect(isDateOutsideRange({ day, fromDate, toDate })).toBe(false);
  });

  test("returns true when day is after toDate", () => {
    const day = new Date(2024, 0, 1);
    const fromDate = new Date(2023, 0, 1);
    const toDate = new Date(2023, 11, 31);

    expect(isDateOutsideRange({ day, fromDate, toDate })).toBe(true);
  });

  test("returns true when day is before fromDate", () => {
    const day = new Date(2022, 11, 31);
    const fromDate = new Date(2023, 0, 1);
    const toDate = new Date(2023, 11, 31);

    expect(isDateOutsideRange({ day, fromDate, toDate })).toBe(true);
  });

  test("returns false when fromDate and toDate are not provided", () => {
    const day = new Date(2023, 5, 15);

    expect(isDateOutsideRange({ day })).toBe(false);
  });

  test("returns true when only toDate is provided and day is after toDate", () => {
    const day = new Date(2024, 0, 1);
    const toDate = new Date(2023, 11, 31);

    expect(isDateOutsideRange({ day, toDate })).toBe(true);
  });

  test("returns false when only toDate is provided and day is before toDate", () => {
    const day = new Date(2023, 5, 15);
    const toDate = new Date(2023, 11, 31);

    expect(isDateOutsideRange({ day, toDate })).toBe(false);
  });

  test("returns true when only fromDate is provided and day is before fromDate", () => {
    const day = new Date(2022, 11, 31);
    const fromDate = new Date(2023, 0, 1);

    expect(isDateOutsideRange({ day, fromDate })).toBe(true);
  });

  test("returns false when only fromDate is provided and day is after fromDate", () => {
    const day = new Date(2023, 5, 15);
    const fromDate = new Date(2023, 0, 1);

    expect(isDateOutsideRange({ day, fromDate })).toBe(false);
  });

  test("returns false when day is identical to fromDate", () => {
    const day = new Date(2023, 0, 1);
    const fromDate = new Date(2023, 0, 1);

    expect(isDateOutsideRange({ day, fromDate })).toBe(false);
  });

  test("returns false when day is identical to toDate", () => {
    const day = new Date(2023, 11, 31);
    const toDate = new Date(2023, 11, 31);

    expect(isDateOutsideRange({ day, toDate })).toBe(false);
  });

  test("returns false when day is identical to both fromDate and toDate", () => {
    const day = new Date(2023, 5, 15);
    const fromDate = new Date(2023, 5, 15);
    const toDate = new Date(2023, 5, 15);

    expect(isDateOutsideRange({ day, fromDate, toDate })).toBe(false);
  });
});
