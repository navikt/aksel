import { DateRange } from "react-day-picker";

export const getInitialSelected = (
  mode: string,
  selected: Date | Date[] | DateRange | undefined
): Date | Date[] | DateRange | undefined => {
  switch (mode) {
    case "single" || "range":
      return selected ? selected : undefined;
    case "multiple":
      return selected ? selected : [];
    default:
      return undefined;
  }
};
