/* eslint-disable jsx-a11y/no-static-element-interactions */
import { format } from "date-fns";
import React, { forwardRef } from "react";
import { BodyShort } from "../typography/BodyShort";
import { cl } from "../utils/helpers";
import { useI18n } from "../utils/i18n/i18n.hooks";
import {
  useTimelineKeyboardActiveRow,
  useTimelineKeyboardContext,
} from "./hooks/TimelineKeyboardNavProvider";
import { PeriodContext } from "./hooks/usePeriodContext";
import { useRowContext } from "./hooks/useRowContext";
import Period from "./period";
import type {
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
    const { periods } = useRowContext();
    const { updateActiveRow, handleRowKeyDown } = useTimelineKeyboardContext();
    const { activeRow } = useTimelineKeyboardActiveRow();
    const translate = useI18n("Timeline");

    const [elementRefState, setElementRefState] =
      React.useState<HTMLDivElement | null>(null);

    const latest = periods.reduce((a, b) => {
      return a.end > b.end ? a : b;
    }, {} as PositionedPeriod);

    const earliest = periods.reduce((a, b) => {
      return a.end < b.end ? a : b;
    }, {} as PositionedPeriod);

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

        {/** biome-ignore lint/a11y/noStaticElementInteractions: onKeyDown just captures events on child-elements here. Regular interaction patterns still works as expected. */}
        <div
          className={cl("aksel-timeline__row", {
            "aksel-timeline__row--active": activeRow === elementRefState,
          })}
          ref={setElementRefState}
          tabIndex={-1}
          onFocusCapture={() => updateActiveRow(elementRefState)}
          onKeyDown={handleRowKeyDown}
          data-timeline-row
        >
          <ol
            {...rest}
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
          >
            {periods?.map((period) => {
              return (
                <li key={`period-${period.id}`}>
                  <PeriodContext.Provider
                    value={{
                      periodId: period.id,
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
