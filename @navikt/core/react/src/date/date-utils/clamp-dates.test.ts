import { startOfMonth, startOfYear } from "date-fns";
import { describe, expect, test } from "vitest";
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
