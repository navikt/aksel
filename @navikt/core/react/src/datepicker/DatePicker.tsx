import {
  format,
  isSameYear,
  setMonth,
  setYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import React, { createContext, forwardRef, useState } from "react";
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker";
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

const TestDropdown = (props) => {
  console.log(props);
  return (
    <div>
      <Select label="velg månede" hideLabel style={{ width: "14ch" }}>
        {props.children}
      </Select>
    </div>
  );
};
const TestCaption = (props) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  const {
    fromDate,
    toDate,
    formatters: { formatYearCaption, formatMonthCaption },
    locale,
  } = useDayPicker();

  if (!fromDate) return <></>;
  if (!toDate) return <></>;
  const years: Date[] = [];
  const fromYear = fromDate.getFullYear();
  const toYear = toDate.getFullYear();
  for (let year = fromYear; year <= toYear; year++) {
    years.push(setYear(startOfYear(new Date()), year));
  }

  const dropdownMonths: Date[] = [];

  if (isSameYear(fromDate, toDate)) {
    // only display the months included in the range
    const date = startOfMonth(fromDate);
    for (let month = fromDate.getMonth(); month <= toDate.getMonth(); month++) {
      dropdownMonths.push(setMonth(date, month));
    }
  } else {
    // display all the 12 months
    const date = startOfMonth(new Date()); // Any date should be OK, as we just need the year
    for (let month = 0; month <= 11; month++) {
      dropdownMonths.push(setMonth(date, month));
    }
  }

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
        {dropdownMonths.map((m) => (
          <option key={m.getMonth()} value={m.getMonth()}>
            {formatMonthCaption(m, { locale })}
          </option>
        ))}
      </Select>
      <Select label="velg år" hideLabel style={{ width: "12ch" }}>
        {years.map((year) => (
          <option key={year.getFullYear()} value={year.getFullYear()}>
            {formatYearCaption(year, { locale })}
          </option>
        ))}
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
            toYear={2022}
            fromMonth={new Date("Aug 23 2019")}
          />
        </Popover>
      </DatePickerContext.Provider>
    );
  }
) as DatePickerComponent;

DatePicker.Input = DatePickerInput;

export default DatePicker;
