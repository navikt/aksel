import cl from "clsx";

export const getConditionalClasses = (cropped: string, direction: string) => {
  return cl("navdsi-timeline__period", {
    "navdsi-timeline__period--connectedBoth": cropped === "both",
    "navdsi-timeline__period--connectedRight":
      (cropped === "right" && direction === "left") ||
      (cropped === "left" && direction === "right"),
    "navdsi-timeline__period--connectedLeft":
      (cropped === "left" && direction === "left") ||
      (cropped === "right" && direction === "right"),
  });
};

export const getBgColor = (status: string) => {
  switch (status) {
    case "success":
      return "var(--navds-global-color-green-50)";
    case "warning":
      return "yellow";
    case "danger":
      return "var(--navds-global-color-red-50)";
    default:
      return "grey";
  }
};

export const getBorderColor = (status: string) => {
  switch (status) {
    case "success":
      return "var(--navds-global-color-green-500)";
    case "warning":
      return "yellow";
    case "danger":
      return "var(--navds-global-color-red-500)";
    default:
      return "grey";
  }
};
