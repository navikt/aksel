import type { TimelinePeriodProps } from ".";

export interface PeriodProps {
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
