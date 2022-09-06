import { isSaturday } from "date-fns";
import React, { useEffect, useId, useState } from "react";
import { DatePicker, useDatepicker, useRangeDatepicker } from "..";
import { Button } from "../..";
import { isValidDate } from "./utils";

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
      defaultValue: "single",
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
    openOnFocus: props.openOnFocus,
  });

  const singleCtx = useDatepicker({
    fromDate: new Date("Aug 23 2020"),
    toDate: new Date("Aug 23 2023"),
    openOnFocus: props.openOnFocus,
  });

  const newProps = {
    ...(!props.inputfield || props.mode === "multiple"
      ? {
          open,
          onClose: () => setOpen(false),
          fromDate: new Date("Aug 23 2020"),
          toDate: new Date("Aug 23 2023"),
        }
      : {}),
  };

  const Comp = !props.standalone ? DatePicker : DatePicker.Standalone;

  return (
    <div>
      <Comp
        locale={props?.locale}
        yearSelector={props?.yearSelector}
        disableWeekends={props?.disableWeekends}
        showWeekNumber={props.showWeekNumber}
        mode={props.mode}
        {...(props.mode === "single"
          ? singleCtx.dayPickerProps
          : props.mode === "range"
          ? rangeCtx.dayPickerProps
          : {})}
        {...newProps}
      >
        {!props.standalone && (
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
      </Comp>
    </div>
  );
};

Default.args = {
  yearSelector: false,
  disableWeekends: false,
  showWeekNumber: false,
  inputfield: true,
  standalone: false,
  openOnFocus: true,
};

export const YearSelector = (props) => (
  <div>
    <DatePicker
      yearSelector
      fromDate={new Date("Aug 23 2018")}
      toDate={new Date("Aug 23 2022")}
    >
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const DisabledDays = (props) => (
  <div>
    <DatePicker disabled={disabledDays} disableWeekends locale="en">
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const ShowWeekNumber = (props) => (
  <div>
    <DatePicker showWeekNumber>
      <DatePicker.Input label="Velg dato" size={props.size}></DatePicker.Input>
    </DatePicker>
  </div>
);

export const UseDatepicker = () => {
  const { dayPickerProps, selectedDay, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    locale: "en",
    openOnFocus: true,
  });

  useEffect(() => {
    selectedDay && isValidDate(selectedDay) && console.log(selectedDay);
  }, [selectedDay]);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...dayPickerProps}>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
    </div>
  );
};

export const UseRangedDatepicker = () => {
  const { dayPickerProps, fromInputProps, toInputProps, selectedRange } =
    useRangeDatepicker({
      fromDate: new Date("Aug 23 2019"),
      openOnFocus: true,
    });

  useEffect(() => {
    selectedRange && console.log(selectedRange);
  }, [selectedRange]);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...dayPickerProps}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <DatePicker.Input {...fromInputProps} label="Fra" />
          <DatePicker.Input {...toInputProps} label="Til" />
        </div>
      </DatePicker>
    </div>
  );
};

export const NoPopover = () => (
  <div>
    <DatePicker.Standalone />
  </div>
);

export const UserControlled = () => {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div>
      <DatePicker
        mode="multiple"
        open={open}
        onClose={() => setOpen(false)}
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

export const Validering = () => {
  const { dayPickerProps, selectedDay, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
  });

  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedDay || !isValidDate(selectedDay)) return;
    isSaturday(selectedDay)
      ? setErrorState(
          "NAV-kontoret er ikke åpent på lørdager. Velg en annen dag."
        )
      : setErrorState(null);
  }, [selectedDay]);

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...dayPickerProps}>
        <DatePicker.Input
          error={errorState}
          {...inputProps}
          label="Velg dato"
        />
      </DatePicker>
    </div>
  );
};
