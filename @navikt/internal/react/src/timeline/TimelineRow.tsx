import React, { forwardRef } from "react";
import { PeriodContext } from "./hooks/usePeriodContext";
import { useRowContext } from "./hooks/useRowContext";
import Period from "./period/Period";

export interface TimelineRowProps
  extends React.HTMLAttributes<HTMLOListElement> {
  label?: string;
}

export interface TimelineRowType
  extends React.ForwardRefExoticComponent<
    TimelineRowProps & React.RefAttributes<HTMLOListElement>
  > {
  componentType: string;
}

export const TimelineRow = forwardRef<HTMLOListElement, TimelineRowProps>(
  ({ label, ...rest }, ref) => {
    const { periods } = useRowContext();

    return (
      <div className="navdsi-timeline__row">
        <ol {...rest} ref={ref} className="navdsi-timeline__row__periods">
          {periods &&
            periods.map((period) => {
              return (
                <li key={`period-${period.id}`}>
                  <PeriodContext.Provider
                    value={{
                      periodId: period.id,
                    }}
                  >
                    <Period
                      start={period.start}
                      end={period.endInclusive}
                      icon={period.icon}
                    />
                  </PeriodContext.Provider>
                </li>
              );
            })}
        </ol>
      </div>
    );
  }
) as TimelineRowType;

TimelineRow.componentType = "row";

export default TimelineRow;
