import React, { forwardRef, ReactNode } from "react";

interface PeriodProps extends React.HTMLAttributes<HTMLDivElement> {
  start: Date;
  end: Date;
  icon?: ReactNode;
}

export type PeriodType = React.ForwardRefExoticComponent<
  PeriodProps & React.RefAttributes<HTMLDivElement>
>;

export const Period = forwardRef<HTMLDivElement, PeriodProps>(
  ({ start, end, icon, ...rest }, ref) => {
    return <div className="navdsi-timeline__period">period</div>;
  }
);

export default Period;
