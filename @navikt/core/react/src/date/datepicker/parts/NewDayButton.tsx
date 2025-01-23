import { Locale, format } from "date-fns";
import React from "react";
import { CalendarDay, Modifiers } from "react-day-picker";

const DayButton = ({
  day,
  modifiers,
  locale,
  ...rest
}: {
  day: CalendarDay;
  modifiers: Modifiers;
  locale: Locale;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  if (modifiers.hidden) {
    return <></>;
  }
  const dateTime = format(day.date, "cccc d", {
    locale,
  });

  return (
    <button
      {...rest}
      aria-hidden={day.outside}
      aria-pressed={modifiers.selected}
      aria-label={dateTime}
      data-pressed={modifiers.selected}
    >
      123
    </button>
  );
};

export { DayButton };
