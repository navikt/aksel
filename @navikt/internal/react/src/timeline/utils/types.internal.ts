import { ReactNode } from "react";

export type PeriodStatus =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export type Percentage = number;

export interface Positioned {
  horizontalPosition: number;
  direction: "left" | "right";
}

export interface Period {
  id: string;
  start: Date;
  endInclusive: Date;
  status?: PeriodStatus;
  onSelectPeriod?: () => void;
  icon?: ReactNode;
  children?: ReactNode;
  isActive?: boolean;
}

export interface PositionedPeriod extends Period, Positioned {
  width: number;
  active?: boolean;
  cropped?: "left" | "right" | "both";
  disabled?: boolean;
  className?: string;
  hoverLabel?: ReactNode;
  infoPin?: boolean;
  end: Date;
  statusLabel?: string;
  restProps?: any;
  ref?: any;
}

export interface Spatial {
  width: number;
}

export interface AxisLabel extends Positioned, Spatial {
  label: string;
  date: Date;
}

export interface InternalSimpleTimeline {
  label: string;
  id: string;
  periods: PositionedPeriod[];
  icon?: ReactNode;
  headingTag: "h2" | "h3" | "h4" | "h5" | "h6";
  restProps: any;
  ref: any;
}

export interface SelectedPeriod {
  /**
   * Start of the period.
   */
  start: Date;
  /**
   * End of the period.
   */
  end: Date;
  /**
   * Period id
   */
  id: string;
}
