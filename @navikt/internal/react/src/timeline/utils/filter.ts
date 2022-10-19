import { PeriodProps } from "../Period";

export interface Positioned {
  horizontalPosition: number;
  direction: "left" | "right";
}

export const isVisible = ({ horizontalPosition }: Positioned): boolean =>
  horizontalPosition <= 100 && horizontalPosition >= 0;

export const getFirstDate = (periods: any) => {
  return periods.sort(
    (a: PeriodProps, b: PeriodProps) => a.start.getTime() - b.start.getTime()
  )[0].start;
};

export const getLastDate = (periods: any) => {
  return periods.sort(
    (a: PeriodProps, b: PeriodProps) => a.end.getTime() - b.end.getTime()
  )[periods.length - 1].end;
};
