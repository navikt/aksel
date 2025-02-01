import { nb } from "date-fns/locale";
import { describe, expect, test } from "vitest";
import { getMonthOptions, getYearOptions } from "./dropdown-options";

describe("getYearOptions", () => {
  test("should return undefined if navStart is undefined", () => {
    const result = getYearOptions(undefined, new Date(), nb);
    expect(result).toBeUndefined();
  });

  test("should return undefined if navEnd is undefined", () => {
    const result = getYearOptions(new Date(), undefined, nb);
    expect(result).toBeUndefined();
  });

  test("should return the correct year options within the interval", () => {
    const navStart = new Date(2020, 0, 1); // Januar 1, 2020
    const navEnd = new Date(2022, 11, 31); // Desember 31, 2022
    const result = getYearOptions(navStart, navEnd, nb);

    const expected = [
      { value: 2020, label: "2020", disabled: false },
      { value: 2021, label: "2021", disabled: false },
      { value: 2022, label: "2022", disabled: false },
    ];

    expect(result).toEqual(expected);
  });

  test("should return the correct year options for a single year", () => {
    const navStart = new Date(2021, 0, 1); // Januar 1, 2021
    const navEnd = new Date(2021, 11, 31); // Desember 31, 2021
    const result = getYearOptions(navStart, navEnd, nb);

    const expected = [{ value: 2021, label: "2021", disabled: false }];

    expect(result).toEqual(expected);
  });

  test("should return the correct year options when navStart and navEnd are the same date", () => {
    const navStart = new Date(2021, 0, 1); // Januar 1, 2021
    const navEnd = new Date(2021, 0, 1); // Januar 1, 2021
    const result = getYearOptions(navStart, navEnd, nb);

    const expected = [{ value: 2021, label: "2021", disabled: false }];

    expect(result).toEqual(expected);
  });
});

describe("getMonthOptions", () => {
  test("should return the correct month options for the given year", () => {
    const displayMonth = new Date(2021, 0, 1); // Januar 1, 2021
    const result = getMonthOptions(displayMonth, undefined, undefined, nb);

    const expected = [
      { value: 0, label: "januar", disabled: false },
      { value: 1, label: "februar", disabled: false },
      { value: 2, label: "mars", disabled: false },
      { value: 3, label: "april", disabled: false },
      { value: 4, label: "mai", disabled: false },
      { value: 5, label: "juni", disabled: false },
      { value: 6, label: "juli", disabled: false },
      { value: 7, label: "august", disabled: false },
      { value: 8, label: "september", disabled: false },
      { value: 9, label: "oktober", disabled: false },
      { value: 10, label: "november", disabled: false },
      { value: 11, label: "desember", disabled: false },
    ];

    expect(result).toEqual(expected);
  });

  test("should disable months before navStart", () => {
    const displayMonth = new Date(2021, 0, 1); // Januar 1, 2021
    const navStart = new Date(2021, 5, 1); // Juni 1, 2021
    const result = getMonthOptions(displayMonth, navStart, undefined, nb);

    const expected = [
      { value: 0, label: "januar", disabled: true },
      { value: 1, label: "februar", disabled: true },
      { value: 2, label: "mars", disabled: true },
      { value: 3, label: "april", disabled: true },
      { value: 4, label: "mai", disabled: true },
      { value: 5, label: "juni", disabled: false },
      { value: 6, label: "juli", disabled: false },
      { value: 7, label: "august", disabled: false },
      { value: 8, label: "september", disabled: false },
      { value: 9, label: "oktober", disabled: false },
      { value: 10, label: "november", disabled: false },
      { value: 11, label: "desember", disabled: false },
    ];

    expect(result).toEqual(expected);
  });

  test("should disable months after navEnd", () => {
    const displayMonth = new Date(2021, 0, 1); // Januar 1, 2021
    const navEnd = new Date(2021, 5, 1); // Juni 1, 2021
    const result = getMonthOptions(displayMonth, undefined, navEnd, nb);

    const expected = [
      { value: 0, label: "januar", disabled: false },
      { value: 1, label: "februar", disabled: false },
      { value: 2, label: "mars", disabled: false },
      { value: 3, label: "april", disabled: false },
      { value: 4, label: "mai", disabled: false },
      { value: 5, label: "juni", disabled: false },
      { value: 6, label: "juli", disabled: true },
      { value: 7, label: "august", disabled: true },
      { value: 8, label: "september", disabled: true },
      { value: 9, label: "oktober", disabled: true },
      { value: 10, label: "november", disabled: true },
      { value: 11, label: "desember", disabled: true },
    ];

    expect(result).toEqual(expected);
  });

  test("should disable months before navStart and after navEnd", () => {
    const displayMonth = new Date(2021, 0, 1); // Januar 1, 2021
    const navStart = new Date(2021, 3, 1); // April 1, 2021
    const navEnd = new Date(2021, 8, 1); // September 1, 2021
    const result = getMonthOptions(displayMonth, navStart, navEnd, nb);

    const expected = [
      { value: 0, label: "januar", disabled: true },
      { value: 1, label: "februar", disabled: true },
      { value: 2, label: "mars", disabled: true },
      { value: 3, label: "april", disabled: false },
      { value: 4, label: "mai", disabled: false },
      { value: 5, label: "juni", disabled: false },
      { value: 6, label: "juli", disabled: false },
      { value: 7, label: "august", disabled: false },
      { value: 8, label: "september", disabled: false },
      { value: 9, label: "oktober", disabled: true },
      { value: 10, label: "november", disabled: true },
      { value: 11, label: "desember", disabled: true },
    ];

    expect(result).toEqual(expected);
  });
});
