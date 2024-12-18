import { renderHook } from "@testing-library/react";
import { addDays, isSameDay } from "date-fns";
import { describe, expect, test } from "vitest";
import {
  useEarliestDate,
  useLatestDate,
  useTimelineRows,
} from "../hooks/useTimelineRows";

describe("useEarliestDate", () => {
  test("returns the provided startDate if it exists", () => {
    const startDate = new Date(2023, 0, 1);
    const { result } = renderHook(() =>
      useEarliestDate({ startDate, rows: [] }),
    );
    expect(result.current).toEqual(startDate);
  });

  test("returns the earliest date from the rows if startDate is not provided", () => {
    const rows = [
      [{ start: new Date(2023, 0, 1) }],
      [{ start: new Date(2022, 0, 1) }],
    ];

    const { result } = renderHook(() => useEarliestDate({ rows }));
    expect(result.current).toEqual(new Date(2022, 0, 1));
  });

  test("returns the earliest date from the rows if startDate is not provided and date is later than todays date", () => {
    const earliestDate = addDays(new Date(), 400);
    const rows = [
      [{ start: earliestDate }],
      [{ start: addDays(earliestDate, 40) }],
    ];

    const { result } = renderHook(() => useEarliestDate({ rows }));
    expect(result.current).toEqual(earliestDate);
  });

  test("returns the current date if no startDate and rows are empty", () => {
    const { result } = renderHook(() => useEarliestDate({ rows: [] }));
    expect(isSameDay(result.current, new Date())).toBeTruthy();
  });
});

describe("useLatestDate", () => {
  test("returns the provided endDate if it exists", () => {
    const endDate = new Date(2023, 0, 1);
    const { result } = renderHook(() => useLatestDate({ endDate, rows: [] }));
    expect(result.current).toEqual(endDate);
  });

  test("returns the latest date from the rows plus one day if endDate is not provided", () => {
    const rows = [
      [{ start: new Date(2023, 0, 1), end: new Date(2023, 0, 10) }],
      [{ start: new Date(2022, 0, 1), end: new Date(2022, 0, 5) }],
    ];
    const { result } = renderHook(() => useLatestDate({ rows }));
    expect(result.current).toEqual(addDays(new Date(2023, 0, 10), 1));
  });

  test("returns the current date plus one day if no endDate and rows are empty", () => {
    const { result } = renderHook(() => useLatestDate({ rows: [] }));
    expect(result.current).toEqual(addDays(new Date(0), 1));
  });
});

describe("useTimelineRows", () => {
  const rows = [
    {
      label: "Row 1",
      periods: [
        {
          start: new Date(2023, 0, 1),
          end: new Date(2023, 0, 10),
          status: "active",
        },
        {
          start: new Date(2023, 0, 15),
          end: new Date(2023, 0, 20),
          status: "inactive",
        },
      ],
    },
    {
      label: "Row 2",
      periods: [
        {
          start: new Date(2022, 0, 1),
          end: new Date(2022, 0, 5),
          status: "active",
        },
      ],
    },
  ];

  test("returns the correct timeline rows", () => {
    const startDate = new Date(2022, 0, 1);
    const endDate = new Date(2023, 0, 31);
    const direction = "left";
    const { result } = renderHook(() =>
      useTimelineRows(rows, startDate, endDate, direction),
    );

    expect(result.current).toHaveLength(2);
    expect(result.current[0].periods).toHaveLength(2);
    expect(result.current[1].periods).toHaveLength(1);
  });

  test("handles empty rows", () => {
    const startDate = new Date(2022, 0, 1);
    const endDate = new Date(2023, 0, 31);
    const direction = "left";
    const { result } = renderHook(() =>
      useTimelineRows([], startDate, endDate, direction),
    );

    expect(result.current).toHaveLength(0);
  });

  test("handles different directions", () => {
    const startDate = new Date(2022, 0, 1);
    const endDate = new Date(2023, 0, 31);
    const direction = "right";
    const { result } = renderHook(() =>
      useTimelineRows(rows, startDate, endDate, direction),
    );

    expect(result.current[0].periods[0].start).toEqual(new Date(2023, 0, 15));
  });
});
