import { FloatingPortal } from "@floating-ui/react-dom-interactions";
import { Left, Right } from "@navikt/ds-icons";
import {
  isSameYear,
  setMonth,
  setYear,
  startOfMonth,
  startOfYear,
} from "date-fns";
import NB from "date-fns/locale/nb";
import React, {
  createContext,
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker";
import { mergeRefs, Popover, Select, Button } from "..";
import DatePickerInput, { DatePickerInputType } from "./DatePickerInput";

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

const DatePickerCaption = (props) => {
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
    <div className="navds-datepicker__caption">
      <Button
        variant={"tertiary"}
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        icon={<Left aria-hidden />}
        className="navds-datepicker__caption-button"
      />

      <Select
        label="velg månede"
        hideLabel
        className="navds-datepicker__caption__month"
      >
        {dropdownMonths.map((m) => (
          <option key={m.getMonth()} value={m.getMonth()}>
            {formatMonthCaption(m, { locale })}
          </option>
        ))}
      </Select>
      <Select label="velg år" hideLabel>
        {years.map((year) => (
          <option key={year.getFullYear()} value={year.getFullYear()}>
            {formatYearCaption(year, { locale })}
          </option>
        ))}
      </Select>

      <Button
        icon={<Right aria-hidden />}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        variant={"tertiary"}
        className="navds-datepicker__caption-button"
      />
    </div>
  );
};

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  ({ children }, ref) => {
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const mergedRef = useMemo(() => mergeRefs([wrapperRef, ref]), [ref]);

    const [selected, setSelected] = React.useState<Date>(new Date());

    /* TMP for dev */
    useEffect(() => {
      setOpen(true);
    }, []);

    return (
      <DatePickerContext.Provider
        value={{ open, onOpen: () => setOpen((x) => !x) }}
      >
        <div ref={mergedRef}>{children}</div>
        <FloatingPortal>
          {open && (
            <Popover
              arrow={false}
              anchorEl={wrapperRef.current}
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
                  Caption: DatePickerCaption,
                }}
                className="navds-date__calendar"
                toYear={2022}
                fromMonth={new Date("Aug 23 2019")}
                classNames={{ vhidden: "navds-sr-only" }}
              />
            </Popover>
          )}
        </FloatingPortal>
      </DatePickerContext.Provider>
    );
  }
) as DatePickerComponent;

DatePicker.Input = DatePickerInput;

export default DatePicker;
