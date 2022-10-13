import { isMatch } from "..";

const disabled = [
  new Date("Sep 8 2022"),
  [new Date("Aug 4 2018"), new Date("Dec 1 2011")],
  { from: new Date("Sep 4 2023"), to: new Date("Sep 15 2023") },
];

describe("Returns if date is disabled", () => {
  test("Date should be disabled type Date (true)", () => {
    expect(isMatch(new Date("Sep 4 2022"), disabled)).toBeTruthy();
  });
  test("Date should be disabled type Date[] (true)", () => {
    expect(isMatch(new Date("Dec 4 2011"), disabled)).toBeTruthy();
  });
  test("Date should be disabled type Range (true)", () => {
    expect(isMatch(new Date("Sep 5 2023"), disabled)).toBeTruthy();
  });
  test("Date should be disabled type Range (true)", () => {
    expect(isMatch(new Date("Sep 3 2023"), disabled)).toBeTruthy();
  });
  test("Date should be disabled type After (true)", () => {
    expect(
      isMatch(new Date("Aug 5 2018"), [{ after: new Date("Aug 2 2018") }])
    ).toBeTruthy();
  });
  test("Date should be disabled type After (true)", () => {
    expect(
      isMatch(new Date("Oct 5 2018"), [{ after: new Date("Aug 2 2018") }])
    ).toBeTruthy();
  });
  test("Date should be disabled type Before (true)", () => {
    expect(
      isMatch(new Date("Aug 1 2018"), [{ before: new Date("Aug 2 2018") }])
    ).toBeTruthy();
  });
  test("Date should be disabled type Before (true)", () => {
    expect(
      isMatch(new Date("Jul 1 2018"), [{ before: new Date("Aug 2 2018") }])
    ).toBeTruthy();
  });
});
