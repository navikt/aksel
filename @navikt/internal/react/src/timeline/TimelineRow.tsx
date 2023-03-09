import { BodyShort } from "@navikt/ds-react";
import { format } from "date-fns";
import React, { forwardRef } from "react";
import { PeriodContext } from "./hooks/usePeriodContext";
import { useRowContext } from "./hooks/useRowContext";
import { useTimelineContext } from "./hooks/useTimelineContext";
import Period from "./period";
import {
  PositionedPeriod,
  TimelineComponentTypes,
} from "./utils/types.internal";
import cl from "clsx";

export interface TimelineRowProps
  extends React.HTMLAttributes<HTMLOListElement> {
  /**
   * Label for the timeline row
   */
  label: string;
  /**
   * Heading level for the label e.g h2, h3...
   * @default "h3"
   */
  headingTag?: "h2" | "h3" | "h4" | "h5" | "h6";
  /**
   * Icon next to label
   */
  icon?: React.ReactNode;
}

export interface TimelineRowType
  extends React.ForwardRefExoticComponent<
    TimelineRowProps & React.RefAttributes<HTMLOListElement>
  > {
  componentType: TimelineComponentTypes;
}

export const TimelineRow = forwardRef<HTMLOListElement, TimelineRowProps>(
  ({ label, className, headingTag = "h3", icon, ...rest }, ref) => {
    const { periods, id, active } = useRowContext();
    const { setActiveRow } = useTimelineContext();

    const latest = periods.reduce((a, b) => {
      return a.end > b.end ? a : b;
    }, {} as PositionedPeriod);

    const earliest = periods.reduce((a, b) => {
      return a.end < b.end ? a : b;
    }, {} as PositionedPeriod);

    const firstFocusable = periods.find(
      (p) => !!p.children || !!p.onSelectPeriod
    );
    console.log(rest);

    return (
      <>
        {label && (
          <BodyShort
            as={headingTag}
            id={`timeline-row-${id}`}
            className="navdsi-timeline__row-label"
            size="small"
          >
            {icon}
            {label}
          </BodyShort>
        )}
        <div
          className={cl("navdsi-timeline__row", {
            "navdsi-timeline__row--active": active,
          })}
        >
          <ol
            {...rest}
            ref={ref}
            aria-label={
              periods.length === 0
                ? "Ingen perioder"
                : `${format(earliest.start, "dd.MM.yyyy")} til ${format(
                    latest.end,
                    "dd.MM.yyyy"
                  )}`
            }
            className={cl("navdsi-timeline__row-periods", className)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
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
                        restProps: period?.restProps,
                      }}
                    >
                      <Period
                        start={period.start}
                        end={period.endInclusive}
                        icon={period.icon}
                        ref={period?.ref}
                      />
                    </PeriodContext.Provider>
                  </li>
                );
              })}
          </ol>
        </div>
      </>
    );
  }
) as TimelineRowType;

TimelineRow.componentType = "row";

export default TimelineRow;
