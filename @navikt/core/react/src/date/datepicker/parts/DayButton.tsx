import format from "date-fns/format";
import React, { useRef } from "react";
import { Button, DayProps, useDayPicker, useDayRender } from "react-day-picker";

const DayButton = (props: DayProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef);
  const { locale } = useDayPicker();
  const dateTime = format(props.date, "cccc d", { locale });

  if (dayRender.isHidden) {
    return <></>;
  }
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />;
  }

  return (
    <Button
      name="day"
      ref={buttonRef}
      {...dayRender.buttonProps}
      aria-label={dateTime}
      aria-hidden={dayRender.activeModifiers.outside}
    />
  );
};

export default DayButton;
