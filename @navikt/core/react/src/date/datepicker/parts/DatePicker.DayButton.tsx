import { Locale, format } from "date-fns";
import React, { useEffect, useRef } from "react";
import { CalendarDay, Modifiers } from "react-day-picker";
import { useRenameCSS } from "../../../theme/Theme";

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
  const { cn } = useRenameCSS();
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) {
      ref.current?.focus();
    }
  }, [modifiers.focused]);

  if (modifiers.hidden) {
    return <></>;
  }

  return (
    <button
      {...rest}
      ref={ref}
      aria-hidden={day.outside}
      aria-pressed={!!modifiers.selected}
      aria-label={format(day.date, "cccc d", {
        locale,
      })}
      data-pressed={modifiers.selected}
      data-today={modifiers.today || undefined}
      className={cn(rest.className, {
        "rdp-day_disabled": modifiers.disabled,
        "rdp-day_selected": modifiers.selected,
        "rdp-day_range_start": modifiers.range_start,
        "rdp-day_range_middle": modifiers.range_middle,
        "rdp-day_range_end": modifiers.range_end,
        "rdp-day_today": modifiers.today,
        "rdp-day_outside": modifiers.outside,
        "rdp-day__weekend": modifiers.weekend,
      })}
    >
      {children}
    </button>
  );
};

export { DatePickerDayButton };
