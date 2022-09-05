import { dateIsInCurrentMonth } from "../check-dates";

describe("Returns if date is in current month", () => {
  const selectedDate = new Date("Aug 13 2022");
  test("Date should be within current month (true)", () => {
    expect(
      dateIsInCurrentMonth(new Date("Aug 2 2022"), selectedDate)
    ).toBeTruthy();
    expect(
      dateIsInCurrentMonth(new Date("Aug 1 2022"), selectedDate)
    ).toBeTruthy();
    expect(
      dateIsInCurrentMonth(new Date("Aug 31 2022"), selectedDate)
    ).toBeTruthy();
  });

  test("Date should not be within current month (false)", () => {
    expect(
      dateIsInCurrentMonth(new Date("Sep 2 2022"), selectedDate)
    ).toBeFalsy();
    expect(
      dateIsInCurrentMonth(new Date("Sep 1 2022"), selectedDate)
    ).toBeFalsy();
    expect(
      dateIsInCurrentMonth(new Date("Sep 30 2022"), selectedDate)
    ).toBeFalsy();
  });
});
