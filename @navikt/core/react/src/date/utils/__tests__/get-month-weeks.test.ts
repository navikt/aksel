/* https://github.com/gpbl/react-day-picker/blob/main/src/components/Table/utils/getMonthWeeks.test.ts */
import { nb, enGB } from "date-fns/locale";

import { getMonthWeeks } from "../get-month-weeks";

describe('when using the "nB" locale', () => {
  const locale = nb;
  describe("when getting the weeks for January 2022", () => {
    const date = new Date(2022, 0);
    const weeks = getMonthWeeks(date, { locale });
    test("the first week should be the last of the previous year", () => {
      const weekNumbers = weeks.map((week) => week.weekNumber);
      expect(weekNumbers[0]).toEqual(52);
    });
    test("the first week should contain days from previous year", () => {
      expect(weeks[0].dates.map((date) => date.getDate())).toEqual([
        27, 28, 29, 30, 31, 1, 2,
      ]);
    });
    test("the last week should be the last of January", () => {
      const weekNumbers = weeks.map((week) => week.weekNumber);
      expect(weekNumbers[weekNumbers.length - 1]).toEqual(5);
    });
  });
});

describe('when using the "enGB" locale', () => {
  const locale = enGB;
  describe("when using fixed weeks", () => {
    const useFixedWeeks = true;
    describe("when getting the weeks for December 2022", () => {
      const date = new Date(2022, 11);
      const weeks = getMonthWeeks(date, { useFixedWeeks, locale });
      test("should return 48 - 1 week numbers", () => {
        const weekNumbers = weeks.map((week) => week.weekNumber);
        const expectedResult = [48, 49, 50, 51, 52, 1];
        expect(weekNumbers).toEqual(expectedResult);
      });
      test("the last week should be the one in the next year", () => {
        const lastWeek = weeks[weeks.length - 1];
        const lastWeekDates = lastWeek.dates.map((date) => date.getDate());
        const expectedResult = [2, 3, 4, 5, 6, 7, 8];
        expect(lastWeekDates).toEqual(expectedResult);
      });
    });
    describe("when getting the weeks for December 2021", () => {
      const weeks = getMonthWeeks(new Date(2021, 11), {
        useFixedWeeks,
        locale,
      });
      test("should return 48 - 1 week numbers", () => {
        const weekNumbers = weeks.map((week) => week.weekNumber);
        const expectedResult = [48, 49, 50, 51, 52, 1];
        expect(weekNumbers).toEqual(expectedResult);
      });
      test("week 1 contains the first day of the new year", () => {
        expect(weeks[4].dates.map((date) => date.getDate())).toEqual([
          27, 28, 29, 30, 31, 1, 2,
        ]);
      });
    });
  });
});

describe('when using the "nb" locale', () => {
  const locale = nb;
  describe("when using fixed weeks", () => {
    const useFixedWeeks = true;
    describe("when getting the weeks for December 2022", () => {
      const date = new Date(2022, 11);
      const weeks = getMonthWeeks(date, { useFixedWeeks, locale });
      test("should return 48 - 1 week numbers", () => {
        const weekNumbers = weeks.map((week) => week.weekNumber);
        const expectedResult = [48, 49, 50, 51, 52, 1];
        expect(weekNumbers).toEqual(expectedResult);
      });
      test("the last week should be the one in the next year", () => {
        const lastWeek = weeks[weeks.length - 1];
        const lastWeekDates = lastWeek.dates.map((date) => date.getDate());
        const expectedResult = [2, 3, 4, 5, 6, 7, 8];
        expect(lastWeekDates).toEqual(expectedResult);
      });
    });
    describe("when getting the weeks for December 2021", () => {
      const weeks = getMonthWeeks(new Date(2021, 11), {
        useFixedWeeks,
        locale,
      });
      test("should return 48 - 1 week numbers", () => {
        const weekNumbers = weeks.map((week) => week.weekNumber);
        const expectedResult = [48, 49, 50, 51, 52, 1];
        expect(weekNumbers).toEqual(expectedResult);
      });
      test("week 1 contains the first day of the new year", () => {
        expect(weeks[4].dates.map((date) => date.getDate())).toEqual([
          27, 28, 29, 30, 31, 1, 2,
        ]);
      });
    });
  });
});

describe("getMonthWeeks should calculate week-number corectly", () => {
  const locale = nb;
  describe("when getting the weeks for September 2022", () => {
    const date = new Date(2022, 8);
    const weeks = getMonthWeeks(date, { locale });
    test("the last week should have number 39", () => {
      const weekNumbers = weeks.map((week) => week.weekNumber);
      expect(weekNumbers[weekNumbers.length - 1]).toEqual(39);
    });
  });
});
