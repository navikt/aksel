import React, { forwardRef } from "react";
import { useRowContext } from "./hooks/useRowContext";
import Period from "./Period";
import { PositionedPeriod } from "./utils/types.external";

export interface TimelineRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  periods?: PositionedPeriod[];
}

export type TimelineRowType = React.ForwardRefExoticComponent<
  TimelineRowProps & React.RefAttributes<HTMLDivElement>
>;

export const TimelineRow = forwardRef<HTMLDivElement, TimelineRowProps>(
  ({ periods, label, ...rest }, ref) => {
    const { id } = useRowContext();
    console.log(id);
    return (
      <div {...rest} ref={ref} className="navdsi-timeline__row">
        {label}
        {periods &&
          periods.map((period) => {
            return (
              <Period
                key={`period-${period.id}`}
                start={period.start}
                end={period.endInclusive}
              />
            );
          })}
      </div>
    );
  }
);

export default TimelineRow;
