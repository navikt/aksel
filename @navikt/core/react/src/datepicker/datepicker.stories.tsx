import { isSameDay } from "date-fns";
import React, { useEffect, useId, useState } from "react";
import { Button } from "../button";
import DatePicker from "./DatePicker";
import { useDatepicker } from "./useDatepicker";
import { useRangeDatepicker } from "./useRangeDatepicker";
import { isValidDate } from "./utils/util";

const disabledDays = [
  new Date("Aug 10 2022"),
  { from: new Date("Aug 31 2022"), to: new Date("Sep 8 2022") },
];

export default {
  title: "ds-react/Datepicker",
  component: DatePicker,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["medium", "small"],
      },
    },
    locale: {
      control: {
        type: "radio",
        options: ["nb", "nn", "en"],
      },
    },
    mode: {
      control: {
        type: "radio",
        options: ["single", "multiple", "range"],
      },
    },
  },
};

export const Default = (props) => {
  const [open, setOpen] = useState(false);

  const rangeCtx = useRangeDatepicker({
    fromDate: new Date("Aug 23 2020"),
    toDate: new Date("Aug 23 2023"),
  });

  const singleCtx = useDatepicker({
    fromDate: new Date("Aug 23 2020"),
    toDate: new Date("Aug 23 2023"),
  });

  const newProps = {
    ...(!props.inputfield || props.mode === "multiple"
      ? {
          popoverOptions: {
            open,
            onClose: () => setOpen(false),
            usePopover: props.usePopover,
          },
        }
      : { popoverOptions: { usePopover: props.usePopover } }),
  };

  return (
    <div style={{ height: "30rem" }}>
      <DatePicker
        locale={props?.locale}
        yearSelector={props?.yearSelector}
        disableWeekends={props?.disableWeekends}
        focusOnOpen={props?.focusOnOpen}
        mode={props.mode}
        {...newProps}
        {...(props.mode === "single"
          ? singleCtx.dayPickerProps
          : props.mode === "range"
          ? rangeCtx.dayPickerProps
          : {})}
      >
        {props.usePopover && (
          <>
            {props.inputfield && props.mode !== "multiple" ? (
              <>
                {props.mode === "range" ? (
                  <div style={{ display: "flex", gap: "1rem" }}>
                    <DatePicker.Input
                      label="Fra"
                      size={props?.size}
                      {...rangeCtx.fromInputProps}
                    />
                    <DatePicker.Input
                      label="Til"
                      size={props?.size}
                      {...rangeCtx.toInputProps}
                    />
                  </div>
                ) : (
                  <>
                    <DatePicker.Input
                      label="Velg dato"
                      size={props?.size}
                      {...singleCtx.inputProps}
                    />
                  </>
                )}
              </>
            ) : (
              <Button onClick={() => setOpen((x) => !x)}>
                Åpne datovelger
              </Button>
            )}
          </>
        )}
      </DatePicker>
    </div>
  );
};

Default.args = {
  yearSelector: false,
  disableWeekends: false,
  focusOnOpen: true,
  showWeekNumber: false,
  inputfield: true,
  usePopover: true,
};

export const Dropdown = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker yearSelector>
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const NoDropdown = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker>
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const LocaleNB = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker yearSelector locale="nb">
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const LocaleNN = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker yearSelector locale="nn">
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const LocaleEN = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker yearSelector locale="en">
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const DisabledDays = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker disabled={disabledDays} disableWeekends locale="en">
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const ShowWeekNumber = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker showWeekNumber>
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const UseDatepicker = () => {
  const { dayPickerProps, selectedDay, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    locale: "en",
  });

  useEffect(() => {
    selectedDay && isValidDate(selectedDay) && console.log(selectedDay);
  }, [selectedDay]);

  return (
    <div style={{ height: "30rem", display: "flex", gap: "1rem" }}>
      <DatePicker {...dayPickerProps}>
        <DatePicker.Input
          error={
            isSameDay(selectedDay, new Date()) ? "Invalid date" : undefined
          }
          {...inputProps}
          label="Velg dato"
        />
      </DatePicker>
    </div>
  );
};

export const UseRangedDatepicker = () => {
  const { dayPickerProps, fromInputProps, toInputProps, selectedRange } =
    useRangeDatepicker({
      fromDate: new Date("Aug 23 2019"),
    });

  useEffect(() => {
    selectedRange && console.log(selectedRange);
  }, [selectedRange]);

  return (
    <div style={{ height: "30rem", display: "flex", gap: "1rem" }}>
      <DatePicker {...dayPickerProps}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <DatePicker.Input {...fromInputProps} label="Fra" />
          <DatePicker.Input {...toInputProps} label="Til" />
        </div>
      </DatePicker>
    </div>
  );
};

export const SelectedDate = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker
      defaultSelected={new Date("Sept 8 2022")}
      onSelect={console.log}
    >
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const SelectedMultiple = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker
      defaultSelected={[
        new Date(),
        new Date("Sept 5 2022"),
        new Date("Sept 14 2022"),
      ]}
      onSelect={console.log}
      mode="multiple"
    >
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const SelectedRange = (props) => (
  <div style={{ height: "30rem" }}>
    <DatePicker
      onSelect={console.log}
      defaultSelected={{ from: new Date(), to: undefined }}
      mode="range"
    >
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const NoPopover = () => (
  <div style={{ height: "30rem" }}>
    <DatePicker popoverOptions={{ usePopover: false }} />
  </div>
);

export const UserControlled = () => {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div style={{ height: "30rem" }}>
      <DatePicker
        mode="multiple"
        popoverOptions={{
          open,
          onClose: () => setOpen(false),
        }}
        id={id}
      >
        <Button
          aria-controls={id}
          aria-haspopup="grid"
          onClick={() => setOpen((x) => !x)}
        >
          Legg til dager
        </Button>
      </DatePicker>
    </div>
  );
};
