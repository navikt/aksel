import { disableDate } from "../dates-disabled";

describe("Returns if date should be disabled", () => {
  test("Should be disabled (true)", () => {
    const dateToDisable = new Date("Aug 3 2022");
    expect(disableDate(dateToDisable, new Date("Aug 3 2022"))).toBe(true);
  });

  test("Should not be disabled (false)", () => {
    const dateToDisable = new Date("Aug 3 2022");
    expect(disableDate(dateToDisable, new Date("Okt 11 2019"))).toBe(false);
  });
});
