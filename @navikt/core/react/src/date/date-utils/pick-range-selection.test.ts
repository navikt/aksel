import { describe, expect, it } from "vitest";
import { pickRangeSelection } from "./pick-range-selection";

const d = (day: number) => new Date(2024, 0, day);
const base = { newSelection: undefined as any };

describe("pickRangeSelection - caller: from", () => {
  it("sets from when no to exists", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(5) },
        newDate: d(10),
        caller: "from",
      }),
    ).toEqual({ from: d(10), to: undefined });
  });

  it("sets from and keeps valid to", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(5), to: d(20) },
        newDate: d(10),
        caller: "from",
      }),
    ).toEqual({ from: d(10), to: d(20) });
  });

  it("creates single-day range when new from equals to", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(5), to: d(20) },
        newDate: d(20),
        caller: "from",
      }),
    ).toEqual({ from: d(20), to: d(20) });
  });

  it("clears to when new from is after to", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(5), to: d(10) },
        newDate: d(15),
        caller: "from",
      }),
    ).toEqual({ from: d(15), to: undefined });
  });
});

describe("pickRangeSelection - caller: to", () => {
  it("falls back to setting from when no from exists", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: undefined },
        newDate: d(10),
        caller: "to",
      }),
    ).toEqual({ from: d(10), to: undefined });
  });

  it("sets to and keeps valid from", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(5), to: d(10) },
        newDate: d(20),
        caller: "to",
      }),
    ).toEqual({ from: d(5), to: d(20) });
  });

  it("creates single-day range when new to equals from", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(10), to: d(20) },
        newDate: d(10),
        caller: "to",
      }),
    ).toEqual({ from: d(10), to: d(10) });
  });

  it("resets with new date as from when new to is before existing from", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(15), to: d(20) },
        newDate: d(5),
        caller: "to",
      }),
    ).toEqual({ from: d(5), to: undefined });
  });
});

describe("pickRangeSelection - no caller", () => {
  it("sets from when no to exists", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(5) },
        newDate: d(10),
      }),
    ).toEqual({ from: d(10), to: undefined });
  });

  it("creates single-day range when new date equals existing from (no to)", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(10) },
        newDate: d(10),
      }),
    ).toEqual({ from: d(10), to: d(10) });
  });

  it("returns undefined when new date equals to", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(5), to: d(20) },
        newDate: d(20),
      }),
    ).toBeUndefined();
  });

  it("updates from when new date is before to", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(5), to: d(20) },
        newDate: d(10),
      }),
    ).toEqual({ from: d(10), to: d(20) });
  });

  it("swaps from/to when new date is after to", () => {
    expect(
      pickRangeSelection({
        ...base,
        currentSelection: { from: d(5), to: d(10) },
        newDate: d(20),
      }),
    ).toEqual({ from: d(10), to: d(20) });
  });
});
