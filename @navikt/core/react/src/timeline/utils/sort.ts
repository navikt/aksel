import { differenceInMilliseconds } from "date-fns/differenceInMilliseconds";
import type { Period, PositionedPeriod } from "./types.internal";

const lastDate = (a: Date, b: Date): number => differenceInMilliseconds(a, b);

const lastPeriod = (a: PositionedPeriod, b: PositionedPeriod): number =>
  a.horizontalPosition - b.horizontalPosition;

const lastSinglePeriod = (a: Period, b: Period): number =>
  differenceInMilliseconds(b.endInclusive, a.endInclusive);

export { lastDate, lastPeriod, lastSinglePeriod };
