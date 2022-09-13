import { Calender } from "@navikt/ds-icons";
import React, { forwardRef, useContext } from "react";
import { Button } from "../button";
import { MonthPickerContext } from "./MonthPicker";

export interface DatePickerInputProps {
  /**
   * Changes padding and font-sizes
   * @default medium
   */
  size?: "medium" | "small";
  /**
   * @private
   */
  wrapperRef?: React.RefObject<HTMLDivElement>;
}

export type MonthPickerInputType = React.ForwardRefExoticComponent<
  DatePickerInputProps & React.RefAttributes<HTMLInputElement>
>;

export const MonthPickerInput: MonthPickerInputType = forwardRef<
  HTMLInputElement,
  DatePickerInputProps
>((props, ref) => {
  const { onOpen, buttonRef, open } = useContext(MonthPickerContext);

  return (
    <div ref={props?.wrapperRef}>
      <Button
        ref={buttonRef}
        variant="tertiary"
        type="button"
        size="small"
        onClick={() => onOpen()}
        className="navds-month__field-button"
        icon={
          <Calender title={open ? "Lukk månedsvelger" : "Åpne månedsvelger"} />
        }
        aria-haspopup="grid"
      />
    </div>
  );
});

export default MonthPickerInput;
