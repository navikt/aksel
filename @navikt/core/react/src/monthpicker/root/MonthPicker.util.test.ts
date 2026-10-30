import { isSameMonth } from "date-fns";
import { describe, expect, test, vi } from "vitest";
import { nextEnabled } from "./MonthPicker.util";

const months = Array.from({ length: 12 }, (_, i) => new Date(2024, i, 1));
const june2024 = new Date(2024, 5, 1);

/* Disables every month except `enabled`. Throws instead of hanging if the search becomes unbounded. */
const onlyEnabled = (...enabled: Date[]) => {
  let calls = 0;
  return (date: Date) => {
    calls += 1;
    if (calls > 5000) {
      throw new Error("Month search did not terminate");
    }
    return !enabled.some((month) => isSameMonth(month, date));
  };
};

const search = (
  key: string,
  disabled: (date: Date) => boolean,
  options: { dropdownCaption?: boolean; fromDate?: Date; toDate?: Date } = {},
) => {
  const setYearState = vi.fn();
  const result = nextEnabled(
    months,
    key,
    [disabled],
    june2024,
    setYearState,
    june2024,
    options.dropdownCaption ?? false,
    options.fromDate,
    options.toDate,
  );
  return { result, setYearState };
};

describe("nextEnabled", () => {
  test.each(["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"])(
    "keeps focus when no month is enabled in direction (%s, no bounds)",
    (key) => {
      const { result, setYearState } = search(key, onlyEnabled(june2024));

      expect(result).toEqual(june2024);
      expect(setYearState).not.toHaveBeenCalled();
    },
  );

  test.each([false, true])(
    "stops at fromDate/toDate years (dropdownCaption: %s)",
    (dropdownCaption) => {
      const bounds = {
        dropdownCaption,
        fromDate: new Date(2023, 0, 1),
        toDate: new Date(2025, 11, 1),
      };
      const disabled = onlyEnabled(
        june2024,
        new Date(2022, 5, 1),
        new Date(2026, 5, 1),
      );

      for (const key of ["ArrowRight", "ArrowLeft"]) {
        const { result, setYearState } = search(key, disabled, bounds);
        expect(result).toEqual(june2024);
        expect(setYearState).not.toHaveBeenCalled();
      }
    },
  );

  test("skips disabled runs and moves to the next enabled year", () => {
    const target = new Date(2027, 2, 1);
    const { result, setYearState } = search(
      "ArrowRight",
      onlyEnabled(june2024, target),
    );

    expect(result).toEqual(target);
    expect(setYearState).toHaveBeenCalledTimes(1);
    expect(setYearState.mock.calls[0][0].getFullYear()).toBe(2027);
  });

  test("finds previous enabled month within bounds", () => {
    const target = new Date(2023, 10, 1);
    const { result, setYearState } = search(
      "ArrowLeft",
      onlyEnabled(june2024, target),
      { fromDate: new Date(2023, 0, 1) },
    );

    expect(result).toEqual(target);
    expect(setYearState.mock.calls[0][0].getFullYear()).toBe(2023);
  });

  test("searches at most 100 years without bounds", () => {
    const within = new Date(2124, 0, 1);
    expect(search("ArrowRight", onlyEnabled(june2024, within)).result).toEqual(
      within,
    );

    const beyond = new Date(2125, 0, 1);
    expect(search("ArrowRight", onlyEnabled(june2024, beyond)).result).toEqual(
      june2024,
    );
  });
});
