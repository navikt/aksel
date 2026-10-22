import React from "react";

type TimelineComponentTypes = "row" | "pin" | "period";

type PeriodStatus = "success" | "warning" | "danger" | "info" | "neutral";

type Percentage = number;

interface Positioned {
  horizontalPosition: number;
  direction: "left" | "right";
}

interface Period {
  id: string;
  start: Date;
  endInclusive: Date;
  status?: PeriodStatus;
  onSelectPeriod?: (
    e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>,
  ) => void;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  isActive?: boolean;
}

interface PositionedPeriod extends Period, Positioned {
  width: number;
  active?: boolean;
  cropped?: "left" | "right" | "both";
  disabled?: boolean;
  className?: string;
  hoverLabel?: React.ReactNode;
  infoPin?: boolean;
  end: Date;
  statusLabel?: string;
  restProps?: any;
  ref?: any;
}

interface Spatial {
  width: number;
}

interface AxisLabel extends Positioned, Spatial {
  label: string;
  date: Date;
}

interface InternalSimpleTimeline {
  label: string;
  id: string;
  periods: PositionedPeriod[];
  icon?: React.ReactNode;
  headingTag: "h2" | "h3" | "h4" | "h5" | "h6";
  restProps: any;
  ref: any;
}

interface SelectedPeriod {
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

export type {
  TimelineComponentTypes,
  PeriodStatus,
  Percentage,
  Positioned,
  Period,
  PositionedPeriod,
  Spatial,
  AxisLabel,
  InternalSimpleTimeline,
  SelectedPeriod,
};
