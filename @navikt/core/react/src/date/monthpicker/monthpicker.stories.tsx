import { Meta, StoryFn } from "@storybook/react";
import React, { useId, useState } from "react";
import { Button, DateInputProps } from "../..";
import { useMonthpicker } from "../hooks";
import MonthPicker, { MonthPickerProps } from "./MonthPicker";

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
      <MonthPicker {...monthpickerProps}>
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

export const dropdownCaption = () => {
  return (
    <MonthPicker.Standalone
      dropdownCaption
      fromDate={new Date("Jan 1 2019")}
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
