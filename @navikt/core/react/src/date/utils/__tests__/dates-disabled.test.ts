import { disableDate } from "..";

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

  test("Should be disabled using Array with range (true)", () => {
    const dateToDisable = [
      { from: new Date("Jul 05 2018"), to: new Date("Sept 09 2020") },
      { from: new Date("Sep 18 2020"), to: new Date("Des 09 2020") },
      new Date("Nov 2 2019"),
    ];
    expect(disableDate(dateToDisable, new Date("Jul 18 2018"))).toBe(true);
  });

  test("Should not be disabled using Array with range (false)", () => {
    const dateToDisable = [
      { from: new Date("Jul 05 2018"), to: new Date("Sept 09 2020") },
      new Date("Nov 2 2019"),
    ];
    expect(disableDate(dateToDisable, new Date("Jul 4 2018"))).toBe(false);
  });
});
