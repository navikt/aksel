import cl from "clsx";
import { format } from "date-fns";

export const getConditionalClasses = (
  cropped: string,
  direction: string,
  status: string
) => {
  return cl(`navdsi-timeline__period navdsi-timeline__period--${status}`, {
    "navdsi-timeline__period--connectedBoth": cropped === "both",
    "navdsi-timeline__period--connectedRight":
      (cropped === "right" && direction === "left") ||
      (cropped === "left" && direction === "right"),
    "navdsi-timeline__period--connectedLeft":
      (cropped === "left" && direction === "left") ||
      (cropped === "right" && direction === "right"),
  });
};

export const ariaLabel = (
  startDate: Date,
  endDate: Date,
  status: String
): string => {
  const start = format(startDate, "dd.MM.yyyy");
  const end = format(endDate, "dd.MM.yyyy");
  return `${status} fra ${start} til ${end}`;
};
