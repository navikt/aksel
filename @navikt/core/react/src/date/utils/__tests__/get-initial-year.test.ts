import { isSameYear } from "date-fns";
import { getInitialYear } from "..";

describe("Returns initial year for monthpicker", () => {
  test("Default selected should be valid (true)", () => {
    expect(
      isSameYear(
        new Date("Oct 4 2021"),
        getInitialYear({
          defaultMonth: new Date("Aug 4 2021"),
        })
      )
    ).toBeTruthy();
  });
  test("Default selected should not be valid (false)", () => {
    expect(
      isSameYear(
        new Date("Oct 4 2021"),
        getInitialYear({
          defaultMonth: new Date("Aug 4 2020"),
        })
      )
    ).toBeFalsy();
  });
  test("Default selected should not be valid (false)", () => {
    expect(
      isSameYear(
        new Date("Oct 4 2021"),
        getInitialYear({
          defaultMonth: new Date("Aug 4 2020"),
          /* toDate: new Date("Oct 4 2021"), */
          /* fromDate: new Date("Oct 4 2021"), */
        })
      )
    ).toBeFalsy();
  });
  test("Default selected should be valid with fromDate", () => {
    expect(
      isSameYear(
        new Date("Oct 4 2021"),
        getInitialYear({
          defaultMonth: new Date("Aug 4 2021"),
          /* toDate: new Date("Oct 4 2021"), */
          fromDate: new Date("Oct 4 2021"),
        })
      )
    ).toBeTruthy();
  });
  test("Default selected should be valid with toDate", () => {
    expect(
      isSameYear(
        new Date("Oct 4 2021"),
        getInitialYear({
          defaultMonth: new Date("Aug 4 2021"),
          toDate: new Date("Jun 4 2021"),
        })
      )
    ).toBeTruthy();
  });
  test("Default selected should be moved to toDate", () => {
    expect(
      isSameYear(
        new Date("Oct 4 2020"),
        getInitialYear({
          defaultMonth: new Date("Aug 4 2021"),
          toDate: new Date("Jun 4 2020"),
        })
      )
    ).toBeTruthy();
  });
  test("Default selected should be moved to fromDate", () => {
    expect(
      isSameYear(
        new Date("Oct 4 2022"),
        getInitialYear({
          defaultMonth: new Date("Aug 4 2021"),
          fromDate: new Date("Jun 4 2022"),
        })
      )
    ).toBeTruthy();
  });
  test("Default selected should be moved to fromDate, not toDate", () => {
    expect(
      isSameYear(
        new Date("Oct 4 2022"),
        getInitialYear({
          defaultMonth: new Date("Aug 4 2021"),
          toDate: new Date("Oct 4 2023"),
          fromDate: new Date("Jun 4 2022"),
        })
      )
    ).toBeTruthy();
  });
});
