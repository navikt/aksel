import cl from "clsx";
import { Locale, format } from "date-fns";
import React from "react";
import { CalendarDay, Modifiers } from "react-day-picker";

const DatePickerDayButton = ({
  day,
  modifiers,
  locale,
  children,
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
      className={cl(rest.className, {
        "rdp-day_disabled": modifiers.disabled,
        "rdp-day_selected": modifiers.selected,
        "rdp-day_range_start": modifiers.range_start,
        "rdp-day_range_middle": modifiers.range_middle,
        "rdp-day_range_end": modifiers.range_end,
        "rdp-day_today": modifiers.today,
        "rdp-day_outside": modifiers.outside,
      })}
    >
      {children}
    </button>
  );
};

export { DatePickerDayButton };
