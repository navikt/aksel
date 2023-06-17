export const dateStr = async (date: string) => {
  const format = (await import("date-fns/format")).default;
  const locale = (await import("date-fns/locale/nb")).default;
  return format(new Date(date), "d. MMMM YYY", { locale: locale });
};
