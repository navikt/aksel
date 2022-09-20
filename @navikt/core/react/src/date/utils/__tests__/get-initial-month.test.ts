import { isSameMonth } from "date-fns";
import { getDefaultSelected } from "..";

describe("Returns initial month for monthpicker", () => {
  const dropdown = true;

  test("Default selected should be valid (true)", () => {
    expect(
      isSameMonth(
        new Date("Oct 4 2021"),
        getDefaultSelected(
          [new Date("Sep 2 2021")],
          !dropdown,
          new Date(),
          new Date("Oct 4 2021")
        )
      )
    ).toBeTruthy();
  });
  test("Default selected should not be valid (false)", () => {
    expect(
      isSameMonth(
        new Date("Oct 4 2021"),
        getDefaultSelected(
          [new Date("Oct 2 2021")],
          !dropdown,
          new Date(),
          new Date("Oct 4 2021")
        )
      )
    ).toBeFalsy();
  });
  test("Default selected should not be valid in range (true)", () => {
    expect(
      isSameMonth(
        new Date("Mar 4 2020"),
        getDefaultSelected(
          [new Date("Dec 2 2020")],
          dropdown,
          new Date("Jan 2020"),
          new Date("Mar 4 2020"),
          new Date("Jul 3 2020")
        )
      )
    ).toBeTruthy();
  });
  test("Default selected should not be valid because out of range (false)", () => {
    expect(
      isSameMonth(
        new Date("Oct 4 2021"),
        getDefaultSelected(
          [new Date("Dec 2 2020")],
          dropdown,
          new Date("Jan 2020"),
          new Date("Oct 4 2020"),
          new Date("Jul 3 2020")
        )
      )
    ).toBeFalsy();
  });
  test("Default selected should not be valid in range but disabled (false)", () => {
    expect(
      isSameMonth(
        new Date("Mar 4 2020"),
        getDefaultSelected(
          [new Date("Mar 2 2020")],
          dropdown,
          new Date("Jan 2020"),
          new Date("Mar 4 2020"),
          new Date("Jul 3 2020")
        )
      )
    ).toBeFalsy();
  });
  test("Default selected should not be valid, returning first available date in next year (true)", () => {
    expect(
      isSameMonth(
        new Date("Feb 4 2021"),
        getDefaultSelected(
          [{ from: new Date("Mar 2 2020"), to: new Date("Jan 6 2021") }],
          dropdown,
          new Date("Jan 2020"),
          new Date("May 4 2020"),
          new Date("Jul 3 2021")
        )
      )
    ).toBeTruthy();
  });
});
