import { addYears } from "date-fns/addYears";
import { endOfMonth } from "date-fns/endOfMonth";
import { endOfYear } from "date-fns/endOfYear";
import { startOfDay } from "date-fns/startOfDay";
import { startOfMonth } from "date-fns/startOfMonth";
import { startOfYear } from "date-fns/startOfYear";
import { describe, expect, test } from "vitest";
import { calendarRange } from "./calendar-range";

describe("calendarRange", () => {
  test("should return start and end of the given months", () => {
    const startMonth = new Date(2023, 0, 15);
    const endMonth = new Date(2023, 11, 15);
    const result = calendarRange({ startMonth, endMonth });

    expect(result[0]).toEqual(startOfDay(startOfMonth(startMonth)));
    expect(result[1]).toEqual(startOfDay(endOfMonth(endMonth)));
  });

  test("should return start of the year 100 years ago and end of the current year if captionLayout is dropdown", () => {
    const today = new Date(2023, 6, 15);
    const result = calendarRange({ captionLayout: "dropdown", today });

    expect(result[0]).toEqual(startOfDay(startOfYear(addYears(today, -100))));
    expect(result[1]).toEqual(startOfDay(endOfYear(today)));
  });

  test("should return undefined if no startMonth and endMonth are provided", () => {
    const today = new Date(2023, 6, 15);
    const result = calendarRange({ today });

    expect(result[0]).toBeUndefined();
    expect(result[1]).toBeUndefined();
  });

  test("should handle undefined today date", () => {
    const result = calendarRange({ captionLayout: "dropdown" });

    const today = new Date();
    expect(result[0]).toEqual(startOfDay(startOfYear(addYears(today, -100))));
    expect(result[1]).toEqual(startOfDay(endOfYear(today)));
  });

  test("should handle undefined captionLayout", () => {
    const startMonth = new Date(2023, 0, 15);
    const endMonth = new Date(2023, 11, 15);
    const result = calendarRange({ startMonth, endMonth });

    expect(result[0]).toEqual(startOfDay(startOfMonth(startMonth)));
    expect(result[1]).toEqual(startOfDay(endOfMonth(endMonth)));
  });
});
