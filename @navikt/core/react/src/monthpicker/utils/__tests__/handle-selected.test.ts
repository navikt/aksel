import {
  updateWithoutYearSelector,
  updateWithYearSelector,
  hasNextYear,
} from "../handle-selected";

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

describe("Returns date with updated year without selector", () => {
  test("Date should be incremented with 1 year (Date)", () => {
    expect(updateWithoutYearSelector(new Date(), 1).getFullYear()).toEqual(
      2023
    );
  });
  test("Date should be decremented with 1 year (Date)", () => {
    expect(updateWithoutYearSelector(new Date(), -1).getFullYear()).toEqual(
      2021
    );
  });
});

describe("Returns updated sekected date with selector", () => {
  test("Date should be incremented with 1 years (2024)", () => {
    expect(
      updateWithYearSelector(
        new Date("Aug 5 2023"),
        new Date("Aug 5 2023"),
        years,
        1
      ).getFullYear()
    ).toEqual(2024);
  });
  test("Date should be incremented with 5 years (2028)", () => {
    expect(
      updateWithYearSelector(
        new Date("Aug 5 2023"),
        new Date("Aug 5 2023"),
        years,
        5
      ).getFullYear()
    ).toEqual(2028);
  });
  test("Date should be decremented with 5 years (Date)", () => {
    expect(
      updateWithYearSelector(
        new Date("Aug 5 2028"),
        new Date("Aug 5 2023"),
        years,
        -5
      ).getFullYear()
    ).toEqual(2023);
  });
  test("Date should be incremented with 1 years (Date)", () => {
    expect(
      updateWithYearSelector(
        new Date("Aug 5 2023"),
        new Date("Aug 5 2023"),
        years,
        -1
      ).getFullYear()
    ).toEqual(2022);
  });
});

describe("Returns if year is at start or end of range", () => {
  test("Should have next year (true)", () => {
    expect(hasNextYear(new Date(), years, 1)).toBeTruthy();
  });
  test("Should have previous year (true)", () => {
    expect(hasNextYear(new Date("Aug 3 2023"), years, -1)).toBeTruthy();
  });
  test("Should not have next year (false)", () => {
    expect(hasNextYear(new Date("Aug 3 2029"), years, 1)).toBeFalsy();
  });
  test("Should not have previous year (false)", () => {
    expect(hasNextYear(new Date(), years, -1)).toBeFalsy();
  });
});
