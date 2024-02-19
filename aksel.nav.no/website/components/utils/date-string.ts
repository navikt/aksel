export const dateStr = async (date: string) => {
  if (!date) {
    return "";
  }
  const { format } = await import("date-fns");
  const { nb } = await import("date-fns/locale");
  return format(new Date(date), "d. MMMM yyy", { locale: nb });
};
