import React, { useId, useState } from "react";
import { Button } from "../..";
import { UNSAFE_useMonthpicker } from "../hooks";
import MonthPicker from "./MonthPicker";

export default {
  title: "ds-react/Monthpicker",
  component: MonthPicker,
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
  },
};

export const Default = () => {
  const { inputProps, monthpickerProps } = UNSAFE_useMonthpicker({
    disabled: [new Date("Apr 1 2022")],
  });

  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input
          label="Velg måned"
          variant="monthpicker"
          {...inputProps}
        />
      </MonthPicker>
    </div>
  );
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

export const DisabledMonths = (props) => {
  return (
    <MonthPicker.Standalone
      disabled={[
        { from: new Date("Jan 1 2022"), to: new Date("Jul  6 2022") },
        { from: new Date("Apr 2 2023"), to: new Date("Dec 4 2023") },
        new Date("Sep 5 2022"),
        new Date("Jan 5 2023"),
      ]}
    />
  );
};

export const Standalone = () => {
  return <MonthPicker.Standalone />;
};

export const UseMonthpicker = () => {
  const { inputProps, monthpickerProps } = UNSAFE_useMonthpicker({
    locale: "nb",
    defaultSelected: new Date(),
    disabled: [new Date("Apr 1 2022")],
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
  const { inputProps, monthpickerProps } = UNSAFE_useMonthpicker({
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
