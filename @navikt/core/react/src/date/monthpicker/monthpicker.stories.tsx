import React, { useId, useState } from "react";
import { Button } from "../..";
import { useMonthPicker } from "../hooks";
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

export const Default = (props) => {
  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker selected={new Date("Jun 4 2022")}>
        <MonthPicker.Input label="Velg måned" />
      </MonthPicker>
    </div>
  );
};

export const dropdownCaption = (props) => {
  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker
        dropdownCaption
        fromDate={new Date("Jan 1 2019")}
        toDate={new Date("Sep 27 2032")}
      >
        <MonthPicker.Input label="Velg måned" />
      </MonthPicker>
    </div>
  );
};

export const DisabledMonths = (props) => {
  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker
        disabled={[
          { from: new Date("Jan 1 2022"), to: new Date("Jul  6 2022") },
          { from: new Date("Apr 2 2023"), to: new Date("Dec 4 2023") },
          new Date("Sep 5 2022"),
          new Date("Jan 5 2023"),
        ]}
      >
        <MonthPicker.Input label="Velg måned" />
      </MonthPicker>
    </div>
  );
};

export const Standalone = (props) => {
  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker.Standalone />
    </div>
  );
};

export const UseMonthPicker = (props) => {
  const { inputProps, monthpickerProps } = useMonthPicker({
    locale: "en",
    openOnFocus: true,
    selected: new Date(),
    disabled: [new Date("Apr 1 2022")],
  });

  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input {...inputProps} label="Velg måned" />
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
        <Button
          aria-controls={id}
          aria-haspopup="grid"
          onClick={() => setOpen((x) => !x)}
        >
          Velg måned
        </Button>
      </MonthPicker>
    </div>
  );
};
