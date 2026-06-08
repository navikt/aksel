import { isBefore, isSameDay } from "date-fns";
import type { DateRange } from "../Date.typeutils";

/**
 * In the case where we have:
 * - Mode: "range"
 * - selected: { from: undefined, to: Date } or
 * - selected: { from: Date, to: undefined }
 *
 *
 * RDP returns undefined for newSelection. We need to manually handle these cases.
 */
function pickRangeSelection({
  newSelection,
  currentSelection: selected,
  newDate,
  caller,
}: {
  newSelection: DateRange | undefined;
  currentSelection: DateRange | undefined;
  newDate: Date;
  caller?: "from" | "to" | null;
}): DateRange | undefined {
  const skip = !selected?.from || !selected?.to || !caller;

  if (caller === "from" && !skip) {
    const to = selected?.to;
    if (!to) {
      return { from: newDate, to: undefined };
    }
    if (isSameDay(newDate, to)) {
      return { from: newDate, to: newDate };
    }
    if (isBefore(newDate, to)) {
      return { from: newDate, to };
    }
    /* newDate is after to — invalid range, clear to */
    return { from: newDate, to: undefined };
  }

  if (caller === "to" && !skip) {
    const from = selected?.from;
    if (!from) {
      return { from: newDate, to: undefined };
    }
    if (isSameDay(newDate, from)) {
      return { from: newDate, to: newDate };
    }
    if (isBefore(from, newDate)) {
      return { from, to: newDate };
    }
    /* newDate is before from — start fresh with newDate as the new from */
    return { from: newDate, to: undefined };
  }

  if (newSelection) {
    return newSelection;
  }

  // No caller - original edge-case handling
  if (!selected?.to) {
    /**
     * If defaultSelected.from is defined, but not "to", and user selects the same date as "from",
     * we interpret this as user wanting to select a single date range (from === to).
     */
    if (selected?.from && isSameDay(selected.from, newDate)) {
      return { from: newDate, to: newDate };
    }
    return { from: newDate, to: undefined };
  }

  let range: DateRange | undefined;

  if (isSameDay(selected.to, newDate)) {
    range = undefined;
  } else if (isBefore(newDate, selected.to)) {
    range = { from: newDate, to: selected.to };
  } else {
    range = { from: selected.to, to: newDate };
  }

  return range;
}

export { pickRangeSelection };
