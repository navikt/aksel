import {
  updateWithoutYearSelector,
  updateWithYearSelector,
  hasNextYear,
} from "../handle-selected";

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
