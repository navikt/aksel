import { hasNextYear } from "..";

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
