import React from "react";

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
  end: Date;
  isActive?: boolean;
  statusLabel?: string;
  restProps?: any;
  ref?: React.Ref<HTMLDivElement | HTMLButtonElement>;
}

interface PositionedPeriod extends Period, Positioned {
  width: number;
  active?: boolean;
  cropped?: "left" | "right" | "both";
  disabled?: boolean;
  className?: string;
  hoverLabel?: React.ReactNode;
  infoPin?: boolean;
  start: Date;
}

interface Spatial {
  width: number;
}

interface AxisLabel extends Positioned, Spatial {
  label: string;
  date: Date;
}

interface InternalSimpleTimeline {
  id: string;
  periods: PositionedPeriod[];
}

interface SimplePeriod {
  /**
   * Startdato for perioden, mao. periodens høyre kant.
   */
  start: Date;
  /**
   * Sluttdato for perioden, mao. periodens venstre kant.
   */
  end: Date;
}

type AxisLabelTemplates = {
  day?: string;
  month?: string;
  year?: string;
};

export type {
  PeriodStatus,
  Percentage,
  Positioned,
  Period,
  PositionedPeriod,
  Spatial,
  AxisLabel,
  InternalSimpleTimeline,
  SimplePeriod,
  AxisLabelTemplates,
};
