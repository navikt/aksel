import { ReactNode } from "react";

export type PeriodStatus =
  | "success"
  | "warning"
  | "danger"
  | "information"
  | "default";
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
}

export interface Spatial {
  width: number;
}

export interface AxisLabel extends Positioned, Spatial {
  label: string;
  date: Date;
}

export interface InternalSimpleTimeline {
  label?: string;
  id: string;
  periods: PositionedPeriod[];
  icon?: ReactNode;
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
   * Index of the row the period belongs to.
   */
  rowIndex: number;
}
