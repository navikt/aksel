import Holidays, { HolidaysTypes } from "date-holidays";

const norwegianHolidays = new Holidays("no");

export const isNorwegianPublicHoliday = (
  date: Date
): boolean | HolidaysTypes.Holiday[] => {
  return norwegianHolidays.isHoliday(date);
};

export const getNorwegianHolidays = () => {
  const publicHolidays = norwegianHolidays
    .getHolidays()
    .filter((holiday) => holiday.type === "public");
  console.log(publicHolidays);
};
