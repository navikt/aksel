export const nextEnabled = (
  months,
  currentIndex: number,
  key: string
): number => {
  let newIndex = currentIndex;
  if (key === "ArrowRight") {
    for (let i = currentIndex + 1; i < months.current.length; i++) {
      const month = months.current[i];
      if (!month.disabled) {
        newIndex = i;
        break;
      }
    }
  }

  if (key === "ArrowLeft") {
    for (let i = currentIndex - 1; i >= 0; i--) {
      const month = months.current[i];
      if (!month.disabled) {
        newIndex = i;
        break;
      }
    }
  }

  return newIndex;
};
