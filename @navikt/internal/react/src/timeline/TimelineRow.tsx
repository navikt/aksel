import { format } from "date-fns";
import React, { forwardRef, ReactNode } from "react";
import { PeriodContext } from "./hooks/usePeriodContext";
import { useRowContext } from "./hooks/useRowContext";
import { useTimelineContext } from "./hooks/useTimelineContext";
import Period from "./period/Period";

export interface TimelineRowProps
  extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * Label for the timeline row
   */
  label: string;
  /**
   * Heading level for the label e.g h1, h2, h3...
   * @default "h3"
   */
  headingTag?: "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * Icon which will be displayed next to label
   */
  icon?: ReactNode;
}

export interface TimelineRowType
  extends React.ForwardRefExoticComponent<
    TimelineRowProps & React.RefAttributes<HTMLOListElement>
  > {
  componentType: string;
}

export const TimelineRow = forwardRef<HTMLOListElement, TimelineRowProps>(
  ({ label, headingTag, ...rest }, ref) => {
    const { periods, id } = useRowContext();
    const { setActiveRow } = useTimelineContext();

    const latest = periods.reduce((a, b) => {
      return a.end > b.end ? a : b;
    });

    const earliest = periods.reduce((a, b) => {
      return a.end < b.end ? a : b;
    });

    const firstFocusable = periods.find(
      (p) => !!p.children || !!p.onSelectPeriod
    );

    return (
      <div className="navdsi-timeline__row">
        <ol
          {...rest}
          ref={ref}
          aria-describedby={label ? `label-${id}` : undefined}
          aria-label={`${format(earliest.start, "dd.MM.yyyy")} til ${format(
            latest.end,
            "dd.MM.yyyy"
          )}`}
          className="navdsi-timeline__row-periods"
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              setActiveRow(e.key);
            }
          }}
        >
          {periods &&
            periods.map((period) => {
              return (
                <li key={`period-${period.id}`}>
                  <PeriodContext.Provider
                    value={{
                      periodId: period.id,
                      firstFocus: firstFocusable?.id === period.id,
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
