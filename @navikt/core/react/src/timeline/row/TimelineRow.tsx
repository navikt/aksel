import { format } from "date-fns";
import React, { forwardRef } from "react";
import { BodyShort } from "../../typography/BodyShort";
import { cl } from "../../utils/helpers";
import { useI18n } from "../../utils/i18n/i18n.hooks";
import { TimelinePeriod } from "../period/TimelinePeriod";
import { PeriodContext } from "../period/TimelinePeriod.context";
import {
  useTimelineKeyboardActiveRow,
  useTimelineKeyboardContext,
} from "../root/TimelineKeyboardNavProvider";
import type { PositionedPeriod } from "../utils/types.internal";
import { useRowContext } from "./TimelineRow.context";

type TimelineRowBaseProps = React.HTMLAttributes<HTMLOListElement>;

type TimelineRowProps = TimelineRowBaseProps &
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

const TimelineRowBase = forwardRef<HTMLOListElement, TimelineRowProps>(
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

        {/* oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- onKeyDown just captures events on child-elements here. Regular interaction patterns still works as expected. */}
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
                    <TimelinePeriod
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
);

const TimelineRow = Object.assign(TimelineRowBase, {
  componentType: "row" as const,
});

export { TimelineRow };
export type { TimelineRowProps };
