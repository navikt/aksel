import React, { forwardRef } from "react";
import { PeriodContext } from "./hooks/usePeriodContext";
import { useRowContext } from "./hooks/useRowContext";
import Period from "./Period";

export interface TimelineRowProps
  extends React.HTMLAttributes<HTMLOListElement> {
  label?: string;
}

export type TimelineRowType = React.ForwardRefExoticComponent<
  TimelineRowProps & React.RefAttributes<HTMLOListElement>
>;

export const TimelineRow = forwardRef<HTMLOListElement, TimelineRowProps>(
  ({ label, ...rest }, ref) => {
    const { periods } = useRowContext();

    return (
      <ol {...rest} ref={ref} className="navdsi-timeline__row">
        {periods &&
          periods.map((period) => {
            return (
              <li key={`period-${period.id}`}>
                <PeriodContext.Provider
                  value={{
                    periodId: period.id,
                  }}
                >
                  <Period start={period.start} end={period.endInclusive} />
                </PeriodContext.Provider>
              </li>
            );
          })}
      </ol>
    );
  }
);

export default TimelineRow;
