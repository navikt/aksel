import {
  DateAfter,
  DateBefore,
  DateRange,
} from "../monthpicker/MonthPicker.types";

export function isDateAfterType(value: unknown): value is DateAfter {
  return Boolean(value && typeof value === "object" && "after" in value);
}

export function isDateBeforeType(value: unknown): value is DateBefore {
  return Boolean(value && typeof value === "object" && "before" in value);
}

export function isDateRange(value: unknown): value is DateRange {
  return Boolean(value && typeof value === "object" && "from" in value);
}
