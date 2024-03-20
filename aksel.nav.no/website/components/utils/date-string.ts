export const dateStr = async (date: string) => {
  if (!date) {
    return "";
  }

  const [{ format }, { nb }] = await Promise.all([
    import("date-fns"),
    import("date-fns/locale"),
  ]);

  return format(new Date(date), "d. MMMM yyy", { locale: nb });
};
