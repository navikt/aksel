import isSaturday from "date-fns/isSaturday";
import React, { useId, useState } from "react";
import { UNSAFE_useDatepicker, UNSAFE_useRangeDatepicker } from "..";
import { Button } from "../..";
import DatePicker from "./DatePicker";

const disabledDays = [
  new Date("Oct 10 2022"),
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

  const rangeCtx = UNSAFE_useRangeDatepicker({
    fromDate: new Date("Aug 23 2020"),
    toDate: new Date("Aug 23 2023"),
  });

  const singleCtx = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2020"),
    toDate: new Date("Aug 23 2023"),
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
        dropdownCaption={props?.dropdownCaption}
        disableWeekends={props?.disableWeekends}
        showWeekNumber={props.showWeekNumber}
        mode={props.mode}
        {...(props.mode === "single"
          ? singleCtx.datepickerProps
          : props.mode === "range"
          ? rangeCtx.datepickerProps
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
  dropdownCaption: false,
  disableWeekends: false,
  showWeekNumber: false,
  inputfield: true,
  standalone: false,
  openOnFocus: true,
};

export const DropdownCaption = () => (
  <DatePicker.Standalone
    dropdownCaption
    fromDate={new Date("Aug 23 2018")}
    toDate={new Date("Aug 23 2022")}
  />
);

export const DisabledDays = () => (
  <DatePicker.Standalone disabled={disabledDays} disableWeekends />
);

export const ShowWeekNumber = () => <DatePicker.Standalone showWeekNumber />;

export const UseDatepicker = () => {
  const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
    locale: "en",
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps}>
        <DatePicker.Input {...inputProps} label="Velg dato" />
      </DatePicker>
    </div>
  );
};

export const UseRangedDatepicker = () => {
  const { datepickerProps, fromInputProps, toInputProps } =
    UNSAFE_useRangeDatepicker({
      fromDate: new Date("Aug 23 2019"),
      onRangeChange: console.log,
    });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <DatePicker.Input
            {...fromInputProps}
            label="Fra"
            onFocus={(e) => e.preventDefault()}
          />
          <DatePicker.Input {...toInputProps} label="Til" />
        </div>
      </DatePicker>
    </div>
  );
};

export const NB = () => <DatePicker.Standalone locale="nb" />;
export const NN = () => <DatePicker.Standalone locale="nn" />;
export const EN = () => <DatePicker.Standalone locale="en" />;

export const Standalone = () => <DatePicker.Standalone />;

export const StandaloneRange = () => <DatePicker.Standalone mode="range" />;
export const StandaloneMultiple = () => (
  <DatePicker.Standalone mode="multiple" />
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
        <Button aria-controls={id} onClick={() => setOpen((x) => !x)}>
          Legg til dager
        </Button>
      </DatePicker>
    </div>
  );
};

export const Validering = () => {
  const { datepickerProps, selectedDay, inputProps } = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2019"),
  });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps}>
        <DatePicker.Input
          error={
            selectedDay && isSaturday(selectedDay)
              ? "NAV-kontoret er ikke åpent på lørdager. Velg en annen dag."
              : undefined
          }
          {...inputProps}
          label="Velg dato"
        />
      </DatePicker>
    </div>
  );
};

export const DisabledInput = () => {
  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker>
        <DatePicker.Input disabled label="Velg dato" />
      </DatePicker>
    </div>
  );
};
