import {
  updateWithoutYearSelector,
  updateWithYearSelector,
  hasNextYear,
} from "../handle-selected";

describe("Returns date with updated year", () => {
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
