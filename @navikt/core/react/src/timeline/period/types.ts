export interface PeriodProps {
  start: Date;
  end: Date;
  status: string;
  cropped: string;
  direction: string;
  width: number;
  left: number;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  statusLabel?: string;
  restProps?: any;
}
