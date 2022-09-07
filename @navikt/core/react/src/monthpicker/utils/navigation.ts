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
  } else if (key === "ArrowLeft") {
    for (let i = currentIndex - 1; i >= 0; i--) {
      const month = months.current[i];
      if (!month.disabled) {
        newIndex = i;
        break;
      }
    }
  } else if (key === "ArrowUp" || key === "ArrowDown") {
    const steps = key === "ArrowDown" ? 4 : -4;
    if (
      months.current[currentIndex + steps] &&
      !months.current[currentIndex + steps].disabled
    ) {
      newIndex = currentIndex + steps;
    } else if (
      months.current[currentIndex + steps * 2] &&
      !months.current[currentIndex + steps * 2].disabled
    ) {
      newIndex = currentIndex + steps * 2;
    }
  }

  return newIndex;
};
