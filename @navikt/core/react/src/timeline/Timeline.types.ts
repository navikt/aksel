import type { TimelinePeriodProps } from "./period/TimelinePeriod";

interface PeriodProps {
  start: Date;
  end: Date;
  status: Exclude<TimelinePeriodProps["status"], undefined>;
  cropped: string;
  direction: string;
  width: number;
  left: number;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  statusLabel?: string;
  restProps?: any;
}

export type { PeriodProps };
