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
      return "måned";
    case "nn":
      return "måned";
    case "en":
      return "Month";
    default:
      return "måned";
  }
};

export const labelNextYear = (localeCode: string | undefined) => {
  switch (localeCode) {
    case "nb":
      return "Gå til neste år";
    case "nn":
      return "Gå til neste år";
    case "en-GB":
      return "Go to next year";
    default:
      return "Gå til neste måned";
  }
};

export const labelPrevYear = (localeCode: string | undefined): string => {
  switch (localeCode) {
    case "nb":
      return "Gå til forrige år";
    case "nn":
      return "Gå til forrige år";
    case "en-GB":
      return "Go to next year";
    default:
      return "Gå til neste år";
  }
};

export const labels: Partial<Labels> = {
  labelNext,
  labelPrevious,
};
