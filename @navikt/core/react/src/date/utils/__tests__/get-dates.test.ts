import { getMonths, getYears } from "..";

describe("Extracts correct months", () => {
  test("March - October (8)", () => {
    const t = {
      start: new Date(2019, 2, 22),
      end: new Date(2019, 9, 22),
      current: new Date(2019, 6, 22),
      res: 8,
    };
    expect(getMonths(t.start, t.end, t.current).length).toEqual(t.res);
  });

  test("Only first 7 months", () => {
    const t = {
      start: new Date(2019, 0, 22),
      end: new Date(2022, 7, 22),
      current: new Date(2022, 6, 22),
      res: 8,
    };
    expect(getMonths(t.start, t.end, t.current).length).toEqual(t.res);
  });

  test("All of 2019 when only 2019 avaliable (12)", () => {
    const t = {
      start: new Date(2019, 0, 22),
      end: new Date(2019, 11, 22),
      current: new Date(2019, 6, 22),
      res: 12,
    };
    expect(getMonths(t.start, t.end, t.current).length).toEqual(t.res);
  });
  test("All of 2019 when start + current is 2019 and end is later(12)", () => {
    const t = {
      start: new Date(2019, 0, 22),
      end: new Date(2022, 7, 22),
      current: new Date(2019, 6, 22),
      res: 12,
    };
    expect(getMonths(t.start, t.end, t.current).length).toEqual(t.res);
  });
  test("All of 2020 when between 2019 and 2022 (12)", () => {
    const t = {
      start: new Date(2019, 0, 22),
      end: new Date(2022, 7, 22),
      current: new Date(2020, 6, 22),
      res: 12,
    };
    expect(getMonths(t.start, t.end, t.current).length).toEqual(t.res);
  });
  test("Tail part of 2019, including starting month (12)", () => {
    const t = {
      start: new Date(2019, 5, 22),
      end: new Date(2022, 7, 22),
      current: new Date(2019, 6, 22),
      res: 7,
    };
    expect(getMonths(t.start, t.end, t.current).length).toEqual(t.res);
  });
  test("End part of 2022, including starting month (12)", () => {
    const t = {
      start: new Date(2019, 5, 22),
      end: new Date(2022, 7, 22),
      current: new Date(2022, 7, 22),
      res: 8,
    };
    expect(getMonths(t.start, t.end, t.current).length).toEqual(t.res);
  });
  test("Adds out of range month to list (13)", () => {
    const t = {
      start: new Date(2019, 5, 22),
      end: new Date(2022, 7, 22),
      current: new Date(2022, 9, 22),
      res: 9,
    };
    console.log(getMonths(t.start, t.end, t.current));
    expect(getMonths(t.start, t.end, t.current).length).toEqual(t.res);
  });
});

describe("Extracts correct years", () => {
  test("Same year (1)", () => {
    const t = {
      start: new Date(2019, 2, 22),
      end: new Date(2019, 9, 22),
      current: 2019,
      res: 1,
    };
    expect(getYears(t.start, t.end, t.current).length).toEqual(t.res);
  });

  test("Multiple years (11)", () => {
    const t = {
      start: new Date(2019, 2, 22),
      end: new Date(2029, 9, 22),
      current: 2022,
      res: 11,
    };
    expect(getYears(t.start, t.end, t.current).length).toEqual(t.res);
  });

  test("Displaymonth outside range: after (11)", () => {
    const t = {
      start: new Date(2019, 2, 22),
      end: new Date(2029, 9, 22),
      current: 2040,
      res: 12,
    };
    expect(getYears(t.start, t.end, t.current).length).toEqual(t.res);
  });

  test("Displaymonth outside range: before (11)", () => {
    const t = {
      start: new Date(2019, 2, 22),
      end: new Date(2029, 9, 22),
      current: 2001,
      res: 12,
    };
    expect(getYears(t.start, t.end, t.current).length).toEqual(t.res);
  });
});
