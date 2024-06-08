import { format } from "date-fns";
import { nb } from "date-fns/locale";
import React from "react";

type Props = {
  /**
   * The date you want to format in accordance
   * with our guidelines for writing dates and times.
   *
   * https://aksel.nav.no/god-praksis/artikler/skriveregler-i-nav
   */
  date: Date;
} & MutexProps;

type MutexProps =
  | {
      day?: boolean;
      month?: never;
      onlyTime?: never;
    }
  | {
      day?: never;
      month?: boolean;
      onlyTime?: never;
    }
  | {
      day?: never;
      month?: never;
      onlyTime?: boolean;
    };

export const Time = ({
  date,
  day = false,
  month = false,
  onlyTime = false,
}: Props) => {
  let formatString = "d. MMMM yyyy 'kl'. hh.mm";
  if (day) {
    formatString = "d. MMMM yyyy";
  } else if (month) {
    formatString = "MMMM yyyy";
  } else if (onlyTime) {
    formatString = "'kl'. hh.mm";
  }
  const humanTime = format(date, formatString, { locale: nb });
  return <span className="navds-time">{humanTime}</span>;
};
