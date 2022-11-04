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
  label?: string;
  start: Date;
  endInclusive: Date;
  status?: PeriodStatus;
  onSelectPeriod?: () => void;
  icon?: ReactNode;
  children?: ReactNode;
  end: Date;
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
  start: Date;
}

export interface Spatial {
  width: number;
}

export interface AxisLabel extends Positioned, Spatial {
  label: string;
  date: Date;
}

export interface InternalSimpleTimeline {
  id: string;
  periods: PositionedPeriod[];
}

export interface SimplePeriod {
  /**
   * Startdato for perioden, mao. periodens høyre kant.
   */
  start: Date;
  /**
   * Sluttdato for perioden, mao. periodens venstre kant.
   */
  end: Date;
}
