import { disableDate } from "../dates-disabled";

describe("Returns if date should be disabled", () => {
  test("Should be disabled using Date (true)", () => {
    const dateToDisable = new Date("Aug 3 2022");
    expect(disableDate(dateToDisable, new Date("Aug 3 2022"))).toBe(true);
  });

  test("Should not be disabled using Date (false)", () => {
    const dateToDisable = new Date("Aug 3 2022");
    expect(disableDate(dateToDisable, new Date("Okt 11 2019"))).toBe(false);
  });

  test("Should be disabled using Array (true)", () => {
    const dateToDisable = [
      new Date("Nov 2 2019"),
      new Date("Aug 13 2021"),
      new Date("Jul 17 2018"),
    ];
    expect(disableDate(dateToDisable, new Date("Jul 17 2018"))).toBe(true);
  });

  test("Should not be disabled using Array (false)", () => {
    const dateToDisable = [
      new Date("Nov 2 2019"),
      new Date("Aug 13 2021"),
      new Date("Jul 17 2018"),
    ];
    expect(disableDate(dateToDisable, new Date("Jul 18 2018"))).toBe(false);
  });
});
