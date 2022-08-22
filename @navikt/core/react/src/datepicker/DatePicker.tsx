import { format } from "date-fns";
import React, { createContext, forwardRef, useState } from "react";
import { DayPicker, useNavigation } from "react-day-picker";
import { Popover, Select } from "..";
import DatePickerInput, { DatePickerInputType } from "./DatePickerInput";
import NB from "date-fns/locale/nb";
import { Back, Left, Next, Right } from "@navikt/ds-icons";

export interface DatePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface DatePickerComponent
  extends React.ForwardRefExoticComponent<DatePickerProps> {
  Input: DatePickerInputType;
}

interface DatePickerContextProps {
  open: boolean;
  onOpen: () => void;
}

export const DatePickerContext = createContext<DatePickerContextProps>({
  open: false,
  onOpen: () => null,
});

const TestCaption = (props) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div style={{ display: "flex", gap: "0.5rem" }}>
      <button
        className="navds-datepicker__caption-button"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        <Left aria-hidden />
      </button>

      <Select label="velg månede" hideLabel style={{ width: "14ch" }}>
        <option value="1">Januar</option>
        <option value="2">Februar</option>
      </Select>
      <Select label="velg år" hideLabel style={{ width: "12ch" }}>
        <option value="1">2022</option>
        <option value="2">2021</option>
        <option value="3">2020</option>
        <option value="4">2019</option>
      </Select>

      {/* {format(props.displayMonth, "MMM yyy")} */}

      <button
        className="navds-datepicker__caption-button"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        <Right aria-hidden />
      </button>
    </div>
  );
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ children }, ref) => {
    const [open, setOpen] = useState(true);
    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);

    const [selected, setSelected] = React.useState<Date>();

    return (
      <DatePickerContext.Provider
        value={{ open, onOpen: () => setOpen((x) => !x) }}
      >
        <div ref={setWrapperRef}>{children}</div>
        <Popover
          arrow={false}
          anchorEl={wrapperRef}
          open={open}
          onClose={() => null}
          placement="bottom-start"
        >
          <DayPicker
            locale={NB}
            mode="single"
            selected={selected}
            onSelect={setSelected}
            components={{
              Caption: TestCaption,
            }}
            className="navds-datepicker-calendar"
          />
        </Popover>
      </DatePickerContext.Provider>
    );
  }
) as DatePickerComponent;

DatePicker.Input = DatePickerInput;

export default DatePicker;
