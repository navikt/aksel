import { Locale } from "date-fns";
import { Labels, NavButtonLabel } from "react-day-picker";

const labelNext: NavButtonLabel = (date, options) => {
  switch (options?.locale?.code) {
    case "nb":
      return "Gå til neste måned";
    case "nn":
      return "Gå til neste månad";
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
      return "Gå til førre månad";
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
      return "Måned";
    case "nn":
      return "Månad";
    case "en":
      return "Month";
    default:
      return "Måned";
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
      return "Gå til førre år";
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

export const labelWeekNumber = ({
  localeCode,
  week,
}: {
  localeCode?: string;
  week: number;
}): string => {
  switch (localeCode) {
    case "nb":
      return `Uke ${week}`;
    case "nn":
      return `Veke ${week}`;
    case "en-GB":
      return `Week ${week}`;
    default:
      return `Uke ${week}`;
  }
};

export const labelWeekNumberButton = ({
  localeCode,
  week,
}: {
  localeCode?: string;
  week: number;
}): string => {
  switch (localeCode) {
    case "nb":
      return `Velg uke ${week}`;
    case "nn":
      return `Vel veke ${week}`;
    case "en-GB":
      return `Pick week ${week}`;
    default:
      return `Velg uke ${week}`;
  }
};

export const labelWeek = (localeCode?: string): string => {
  switch (localeCode) {
    case "nb":
      return `Uke:`;
    case "nn":
      return `Veke:`;
    case "en-GB":
      return `Week:`;
    default:
      return `Uke:`;
  }
};

const modalLabelSingle = (localeCode?: string): string => {
  switch (localeCode) {
    case "nb":
      return `Velg dato`;
    case "nn":
      return `Vel dato`;
    case "en-GB":
      return `Pick a date`;
    default:
      return `Velg dato`;
  }
};

const modalLabelMultiple = (localeCode?: string): string => {
  switch (localeCode) {
    case "nb":
      return `Velg datoer`;
    case "nn":
      return `Vel datoar`;
    case "en-GB":
      return `Pick dates`;
    default:
      return `Velg datoer`;
  }
};

const modalLabelRanged = (localeCode?: string): string => {
  switch (localeCode) {
    case "nb":
      return `Velg start- og sluttdato`;
    case "nn":
      return `Vel start- og sluttdato`;
    case "en-GB":
      return `Pick a start and end date`;
    default:
      return `Velg start- og sluttdato`;
  }
};

const modalLabelMonth = (localeCode?: string): string => {
  switch (localeCode) {
    case "nb":
      return `Velg måned`;
    case "nn":
      return `Vel månad`;
    case "en-GB":
      return `Pick a month`;
    default:
      return `Velg måned`;
  }
};

export const modalLabel = (
  localeCode: string,
  variant: "single" | "multiple" | "range" | "month",
) => {
  switch (variant) {
    case "single":
      return modalLabelSingle(localeCode);
    case "multiple":
      return modalLabelMultiple(localeCode);
    case "range":
      return modalLabelRanged(localeCode);
    case "month":
      return modalLabelMonth(localeCode);
    default:
      return modalLabelSingle(localeCode);
  }
};

export const modalCloseButtonLabel = (localeCode?: string): string => {
  switch (localeCode) {
    case "nb":
      return `Lukk`;
    case "nn":
      return `Lukk`;
    case "en-GB":
      return `Close`;
    default:
      return `Lukk`;
  }
};
