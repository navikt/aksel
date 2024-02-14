import { Meta, StoryFn } from "@storybook/react";
import { setYear } from "date-fns";
import React, { useId, useState } from "react";
import { Button } from "../../button";
import { useMonthpicker } from "../hooks";
import { DateInputProps } from "../parts/DateInput";
import MonthPicker from "./MonthPicker";
import { MonthPickerProps } from "./types";

export default {
  title: "ds-react/Monthpicker",
  component: MonthPicker,
} satisfies Meta<typeof MonthPicker>;

export const Default: StoryFn<{
  size: DateInputProps["size"];
  locale: MonthPickerProps["locale"];
}> = (props) => {
  const { inputProps, monthpickerProps } = useMonthpicker({
    disabled: [new Date("Apr 1 2022")],
    locale: props.locale,
  });

  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker {...monthpickerProps} onMonthSelect={console.log}>
        <MonthPicker.Input
          label="Velg måned"
          variant="monthpicker"
          size={props.size}
          {...inputProps}
        />
      </MonthPicker>
    </div>
  );
};
Default.argTypes = {
  size: {
    options: ["medium", "small"],
    control: { type: "radio" },
  },
  locale: {
    options: ["nb", "nn", "en"],
    control: { type: "radio" },
  },
};

export const DropdownCaption = () => {
  return (
    <MonthPicker.Standalone
      onMonthSelect={console.log}
      dropdownCaption
      fromDate={new Date("Feb 10 2019")}
      toDate={new Date("Sep 27 2032")}
    />
  );
};

export const NB = () => <MonthPicker.Standalone locale="nb" />;
export const NN = () => <MonthPicker.Standalone locale="nn" />;
export const EN = () => <MonthPicker.Standalone locale="en" />;

export const DisabledMonths = () => (
  <MonthPicker.Standalone
    disabled={[
      { from: new Date("Jan 1 2022"), to: new Date("Jul  6 2022") },
      { from: new Date("Apr 2 2023"), to: new Date("Dec 4 2023") },
      new Date("Sep 5 2022"),
      new Date("Jan 5 2023"),
    ]}
  />
);

export const Standalone = () => {
  return <MonthPicker.Standalone />;
};

export const UseMonthpicker = () => {
  const { inputProps, monthpickerProps } = useMonthpicker({
    disabled: [new Date("Apr 1 2022")],
    onMonthChange: console.log,
    fromDate: new Date("Jan 1 2022"),
    toDate: new Date("Sep 27 2025"),
  });

  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker {...monthpickerProps} dropdownCaption>
        <MonthPicker.Input
          {...inputProps}
          label="Velg måned"
          variant="monthpicker"
        />
      </MonthPicker>
    </div>
  );
};

export const UseMonthpickerFormat = () => {
  const { inputProps, monthpickerProps } = useMonthpicker({
    disabled: [new Date("Apr 1 2022")],
    onMonthChange: console.log,
    inputFormat: "MM.yyyy",
  });

  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input
          {...inputProps}
          label="Velg måned"
          variant="monthpicker"
        />
      </MonthPicker>
    </div>
  );
};

export const Required = () => {
  const { inputProps, monthpickerProps } = useMonthpicker({
    locale: "nb",
    defaultSelected: new Date(),
    disabled: [new Date("Apr 1 2022")],
    required: true,
  });

  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input
          {...inputProps}
          label="Velg måned"
          variant="monthpicker"
        />
      </MonthPicker>
    </div>
  );
};

export const UserControlled = () => {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div>
      <MonthPicker open={open} onClose={() => setOpen(false)} id={id}>
        <Button aria-controls={id} onClick={() => setOpen((x) => !x)}>
          Velg måned
        </Button>
      </MonthPicker>
    </div>
  );
};

export const FollowYear = () => {
  const { monthpickerProps, inputProps, selectedMonth, setSelected } =
    useMonthpicker({
      fromDate: new Date("Aug 23 2019"),
      toDate: new Date("Aug 23 2025"),
      onMonthChange: console.log,
    });

  const customYearChange = (yearDate?: Date) => {
    monthpickerProps.onYearChange?.(yearDate);
    if (selectedMonth && yearDate) {
      setSelected(setYear(selectedMonth, yearDate.getFullYear()));
    }
  };

  return (
    <div className="min-h-96">
      <MonthPicker {...monthpickerProps} onYearChange={customYearChange}>
        <MonthPicker.Input {...inputProps} label="Velg måned" />
      </MonthPicker>
      {selectedMonth && <div className="pt-4">{selectedMonth.getMonth()}</div>}
    </div>
  );
};
