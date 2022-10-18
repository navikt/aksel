import React, { forwardRef } from "react";

export interface TimelineRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export type TimelineRowType = React.ForwardRefExoticComponent<
  TimelineRowProps & React.RefAttributes<HTMLDivElement>
>;

export const TimelineRow = forwardRef<HTMLDivElement, TimelineRowProps>(
  ({ children, label, ...rest }, ref) => {
    return (
      <div {...rest} ref={ref} className="navdsi-timeline__row">
        {label}
        {children}
      </div>
    );
  }
);

export default TimelineRow;
