import { dateIsInCurrentMonth } from "../check-dates";

describe("Returns if date is in current month", () => {
  test("Date should be within current month (true)", () => {
    expect(dateIsInCurrentMonth(new Date(), new Date())).toBeTruthy();
  });

  test("Date should not be within current month (false)", () => {
    const selectedDate = new Date("Feb 1 1994");
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
