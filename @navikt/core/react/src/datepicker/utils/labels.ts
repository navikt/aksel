import { Labels, NavButtonLabel } from "react-day-picker";

const labelNext: NavButtonLabel = (date, options) => {
  switch (options?.locale?.code) {
    case "nb":
      return "Gå til neste måned";
    case "nn":
      return "Gå til neste måned";
    case "en":
      return "Go to next month";
    default:
      return "Gå til neste måned";
  }
};

const labelPrevious: NavButtonLabel = (date, options) => {
  switch (options?.locale?.code) {
    case "nb":
      return "Gå til forrige måned";
    case "nn":
      return "Gå til forrige måned";
    case "en":
      return "Go to previous month";
    default:
      return "Gå til forrige måned";
  }
};

export const labelYearDropdown = (locale: Locale) => {
  switch (locale?.code) {
    case "nb":
      return "År";
    case "nn":
      return "År";
    case "en":
      return "Year";
    default:
      return "År";
  }
};

export const labelMonthDropdown = (locale: Locale) => {
  switch (locale?.code) {
    case "nb":
      return "Månede";
    case "nn":
      return "Månede";
    case "en":
      return "Month";
    default:
      return "Månede";
  }
};

export const labels: Partial<Labels> = {
  labelNext,
  labelPrevious,
};
