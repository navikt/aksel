import React, { forwardRef } from "react";
import { PeriodContext } from "./hooks/usePeriodContext";
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
              <PeriodContext.Provider
                key={`period-${period.id}`}
                value={{
                  id: `period-${period.id}`,
                }}
              >
                <Period start={period.start} end={period.endInclusive} />
              </PeriodContext.Provider>
            );
          })}
      </div>
    );
  }
);

export default TimelineRow;
