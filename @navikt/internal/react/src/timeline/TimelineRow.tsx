import React, { forwardRef } from "react";
import { PeriodContext } from "./hooks/usePeriodContext";
import { useRowContext } from "./hooks/useRowContext";
import Period from "./Period";

export interface TimelineRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export type TimelineRowType = React.ForwardRefExoticComponent<
  TimelineRowProps & React.RefAttributes<HTMLDivElement>
>;

export const TimelineRow = forwardRef<HTMLDivElement, TimelineRowProps>(
  ({ label, ...rest }, ref) => {
    const { periods } = useRowContext();

    return (
      <div {...rest} ref={ref} className="navdsi-timeline__row">
        {periods &&
          periods.map((period) => {
            return (
              <PeriodContext.Provider
                key={`period-${period.id}`}
                value={{
                  periodId: period.id,
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
