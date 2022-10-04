export const hasNextYear = (year: Date, years: Date[], val: any): boolean => {
  return years.some((x) => year.getFullYear() + val === x.getFullYear());
};
