import cl from "clsx";
import { format } from "date-fns";

export const getConditionalClasses = (
  cropped: string,
  direction: string,
  status: string
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

const translateStatus = (status: string): string => {
  switch (status) {
    case "success":
      return "Suksess";
    case "warning":
      return "Advarsel";
    case "danger":
      return "Fare";
    case "info":
      return "Info";
    case "neutral":
      return "Nøytral";
    default:
      return status;
  }
};

export const ariaLabel = (
  startDate: Date,
  endDate: Date,
  status: string,
  statusLabel?: string
): string => {
  const start = format(startDate, "dd.MM.yyyy");
  const end = format(endDate, "dd.MM.yyyy");
  return `${
    statusLabel ? statusLabel : translateStatus(status)
  } fra ${start} til ${end}`;
};
