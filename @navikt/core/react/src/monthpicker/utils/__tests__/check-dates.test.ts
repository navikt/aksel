import { dateIsInCurrentMonth, dateIsSelected } from "../check-dates";

const selectedDate = new Date("Feb 1 1994");

describe("Returns if date is in current month", () => {
  test("Date should be within current month (true)", () => {
    expect(dateIsInCurrentMonth(new Date(), new Date())).toBeTruthy();
  });

  test("Date should not be within current month (false)", () => {
    expect(
      dateIsInCurrentMonth(new Date("Sep 2 2021"), selectedDate)
    ).toBeFalsy();
    expect(
      dateIsInCurrentMonth(new Date("Sep 1 2021"), selectedDate)
    ).toBeFalsy();
    expect(
      dateIsInCurrentMonth(new Date("Sep 30 2021"), selectedDate)
    ).toBeFalsy();
  });
});

describe("Returns if date is selected", () => {
  test("Date should be selected (true)", () => {
    expect(dateIsSelected(new Date("Feb 1 1994"), selectedDate)).toBeTruthy();
  });
  test("Date should not be selected (false)", () => {
    expect(dateIsSelected(new Date("Mar 1 1994"), selectedDate)).toBeFalsy();
    expect(
      dateIsInCurrentMonth(new Date("Des 15 2018"), selectedDate)
    ).toBeFalsy();
    expect(dateIsSelected(new Date("Jul 9 2033"), selectedDate)).toBeFalsy();
  });
});
