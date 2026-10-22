import { differenceInDays } from "date-fns";
import type { PeriodProps } from "../Timeline.types";
import type { Spatial } from "./types.internal";

interface Positioned {
  horizontalPosition: number;
  direction: "left" | "right";
}

const isVisible = ({ horizontalPosition }: Positioned): boolean => {
  return horizontalPosition <= 96 && horizontalPosition >= 0;
};

const getFirstDate = (periods: any) => {
  return periods.sort(
    (a: PeriodProps, b: PeriodProps) => a.start.getTime() - b.start.getTime(),
  )[0].start;
};

const getLastDate = (periods: any) => {
  return periods.sort(
    (a: PeriodProps, b: PeriodProps) => a.end.getTime() - b.end.getTime(),
  )[periods.length - 1].end;
};

const withinADay = (date1: Date, date2: Date): boolean =>
  differenceInDays(date1, date2) <= 1;

const invisiblePeriods = ({
  horizontalPosition,
  width,
}: Positioned & Spatial) =>
  horizontalPosition >= 0 && horizontalPosition <= 100 && width > 0;

export { isVisible, getFirstDate, getLastDate, withinADay, invisiblePeriods };
export type { Positioned };
