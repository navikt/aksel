export type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

export type DateBefore = {
  before: Date;
};

export type DateAfter = {
  after: Date;
};

export function isDateAfterType(value: unknown): value is DateAfter {
  return Boolean(value && typeof value === "object" && "after" in value);
}

export function isDateBeforeType(value: unknown): value is DateBefore {
  return Boolean(value && typeof value === "object" && "before" in value);
}

export function isDateRange(value: unknown): value is DateRange {
  return Boolean(value && typeof value === "object" && "from" in value);
}

export type Matcher =
  | ((date: Date) => boolean)
  | Date
  | Date[]
  | DateRange
  | DateBefore
  | DateAfter;
