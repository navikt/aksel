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
  label?: string;
  start: Date;
  endInclusive: Date;
  status?: PeriodStatus;
  onSelectPeriod?: () => void;
  icon?: ReactNode;
}

export interface PositionedPeriod extends Period, Positioned {
  id: string;
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

export interface Period extends SimplePeriod {
  /**
   * Brukes for å unikt identifisere perioden, f.eks. om du ønsker å identifisere
   * perioden du klikker på med `onSelectPeriod`-funksjonen.
   */
  id?: string;
  /**
   * Gjør at periodeknappen ikke kaller `onSelectPeriod` når den klikkes.
   */
  disabled?: boolean;
  /**
   * Legges på periodeknappen og kan brukes for å stilsette knappen, f.eks. om
   * man ønsker forskjellige ikoner på knappene for å visuelt identifisere
   * forskjellige typer periods.
   */
  className?: string;
  /**
   * Bestemmer om perioden skal markeres som aktiv.
   */
  active?: boolean;
  /**
   * Dersom perioden har hoverLabel satt, vises en tooltip med hoverLabel-innholdet på hover over periodeknappen
   */
  hoverLabel?: ReactNode;
  /**
   * Indikerer om det skal rendres en blå markering over perioden.
   */
  infoPin?: boolean;
}
