import { format } from "date-fns";
import React, { forwardRef } from "react";
import { BodyShort } from "../typography/BodyShort";
import { cl } from "../utils/helpers";
import { useI18n } from "../utils/i18n/i18n.hooks";
import { PeriodContext } from "./hooks/usePeriodContext";
import { useRowContext } from "./hooks/useRowContext";
import { useTimelineContext } from "./hooks/useTimelineContext";
import Period from "./period";
import {
  PositionedPeriod,
  TimelineComponentTypes,
} from "./utils/types.internal";

type TimelineRowBaseProps = React.HTMLAttributes<HTMLOListElement>;

export type TimelineRowProps = TimelineRowBaseProps &
  (
    | {
        /**
         * Label for the timeline row as either `string` or `React.ReactNode`
         *
         *
         * **Note**: When using `React.ReactNode`, `icon` and `headingTag` props are not available
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
    | {
        label: Exclude<React.ReactNode, string>;
        headingTag?: never;
        icon?: never;
      }
  );

export interface TimelineRowType extends React.ForwardRefExoticComponent<
  TimelineRowProps & React.RefAttributes<HTMLOListElement>
> {
  componentType: TimelineComponentTypes;
}

export const TimelineRow = forwardRef<HTMLOListElement, TimelineRowProps>(
  ({ label, className, headingTag = "h3", icon, ...rest }, ref) => {
    const { periods, active } = useRowContext();
    const { setActiveRow } = useTimelineContext();
    const translate = useI18n("Timeline");

    const latest = periods.reduce((a, b) => {
      return a.end > b.end ? a : b;
    }, {} as PositionedPeriod);

    const earliest = periods.reduce((a, b) => {
      return a.end < b.end ? a : b;
    }, {} as PositionedPeriod);

    const firstFocusable = periods.find(
      (p) => !!p.children || !!p.onSelectPeriod,
    );

    return (
      <>
        {label &&
          (typeof label === "string" ? (
            <BodyShort
              as={headingTag}
              className="aksel-timeline__row-label"
              size="small"
            >
              {icon}
              {label}
            </BodyShort>
          ) : (
            <div className="aksel-timeline__row-label">{label}</div>
          ))}
        <div
          className={cl("aksel-timeline__row", {
            "aksel-timeline__row--active": active,
          })}
        >
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <ol
            {...rest}
            tabIndex={-1}
            ref={ref}
            aria-label={
              periods.length === 0
                ? translate("Row.noPeriods")
                : translate("Row.period", {
                    start: format(earliest.start, translate("dateFormat")),
                    end: format(latest.end, translate("dateFormat")),
                  })
            }
            className={cl("aksel-timeline__row-periods", className)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                e.preventDefault();
                setActiveRow(e.key);
              }
            }}
          >
            {periods?.map((period) => {
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
  },
) as TimelineRowType;

TimelineRow.componentType = "row";

export default TimelineRow;
