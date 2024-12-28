import cl from "clsx";
import { format } from "date-fns";
import type { TFunction } from "../../util/i18n/i18n.types";
import type { PeriodProps } from "../period/types";

export const getConditionalClasses = (
  cropped: string,
  direction: string,
  status: string,
) => {
  return cl(`navds-timeline__period navds-timeline__period--${status}`, {
    "navds-timeline__period--connected-both": cropped === "both",
    "navds-timeline__period--connected-right":
      (cropped === "right" && direction === "left") ||
      (cropped === "left" && direction === "right"),
    "navds-timeline__period--connected-left":
      (cropped === "left" && direction === "left") ||
      (cropped === "right" && direction === "right"),
  });
};

export const ariaLabel = (
  startDate: Date,
  endDate: Date,
  status: PeriodProps["status"],
  statusLabel: string | undefined,
  translate: TFunction<"Timeline">,
): string => {
  const dateFormat = translate("dateFormat");
  const start = format(startDate, dateFormat);
  const end = format(endDate, dateFormat);
  return translate("Period.period", {
    status: statusLabel || translate(`Period.${status}`),
    start,
    end,
  });
};
