import React, { useEffect } from "react";
import MonthPicker from "./MonthPicker";
import { useMonthPicker } from "./hooks/useMonthPicker";
import { isValidDate } from "../datepicker/utils";

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
  },
};

export const Default = (props) => {
  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker defaultSelected={new Date("Jun 4 2022")}>
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
        disabled={[
          { from: new Date("Jan 1 2022"), to: new Date("Jul  6 2022") },
          { from: new Date("Apr 2 2023"), to: new Date("Dec 4 2023") },
          { from: new Date("Jan 2 2032"), to: new Date("Aug 4 2032") },
          new Date("Sep 5 2022"),
          new Date("Jan 5 2019"),
        ]}
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
  const { selectedMonth, inputProps, monthpickerProps } = useMonthPicker({
    locale: "en",
    openOnFocus: true,
    defaultSelected: new Date(),
    disabled: [new Date("Apr 1 2022")],
  });

  useEffect(() => {
    selectedMonth && isValidDate(selectedMonth) && console.log(selectedMonth);
  }, [selectedMonth]);

  return (
    <div style={{ height: "20rem" }}>
      <MonthPicker {...monthpickerProps}>
        <MonthPicker.Input {...inputProps} label="Velg måned" />
      </MonthPicker>
    </div>
  );
};
