import { Meta, StoryFn } from "@storybook/react-vite";
import { setYear } from "date-fns";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "../../button";
import { useId } from "../../util";
import { renderStoriesForChromatic } from "../../util/renderStoriesForChromatic";
import { DateInputProps } from "../Date.Input";
import MonthPicker from "./MonthPicker";
import { MonthPickerProps } from "./MonthPicker.types";
import { useMonthpicker } from "./hooks/useMonthPicker";

const year = new Date().getFullYear();

export default {
  title: "ds-react/Monthpicker",
  component: MonthPicker,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof MonthPicker>;

export const Default: StoryFn<{
  size: DateInputProps["size"];
  locale: MonthPickerProps["locale"];
}> = (props) => {
  const { inputProps, monthpickerProps } = useMonthpicker({
    disabled: [new Date("Apr 1 2022")],
    locale: props.locale,
    onMonthChange: console.log,
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

export const DropdownCaption = () => {
  return (
    <MonthPicker.Standalone
      onMonthSelect={console.log}
      dropdownCaption
      fromDate={new Date(`Feb 10 ${year - 5}`)}
      toDate={new Date(`Sep 27 ${year + 10}`)}
    />
  );
};

export const NB = () => <MonthPicker.Standalone locale="nb" />;
export const NN = () => <MonthPicker.Standalone locale="nn" />;
export const EN = () => <MonthPicker.Standalone locale="en" />;

export const DisabledMonths = () => (
  <MonthPicker.Standalone
    disabled={[
      { from: new Date(`Jan 1 ${year}`), to: new Date(`Jul 6 ${year}`) },
      {
        from: new Date(`Apr 2 ${year + 1}`),
        to: new Date(`Dec 4 ${year + 1}`),
      },
      new Date(`Sep 5 ${year}`),
      new Date(`Jan 5 ${year + 1}`),
    ]}
  />
);

export const Standalone = () => {
  return <MonthPicker.Standalone defaultSelected={new Date(`Jan 1 ${year}`)} />;
};

export const UseMonthpicker = () => {
  const { inputProps, monthpickerProps } = useMonthpicker({
    disabled: [new Date(`Apr 1 ${year - 1}`)],
    onMonthChange: console.log,
    fromDate: new Date(`Jan 1 ${year - 1}`),
    toDate: new Date(`Sep 27 ${year + 1}`),
    defaultSelected: new Date(`Dec 1 ${year}`),
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
    onMonthChange: console.log,
    inputFormat: "MM.yyyy",
    defaultSelected: new Date(`Jun 1 ${year}`),
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

export const Required = {
  render: () => {
    const { monthpickerProps } = useMonthpicker({
      defaultSelected: new Date(`Apr 10 ${year}`),
      required: true,
    });

    return (
      <div style={{ height: "20rem" }}>
        <MonthPicker.Standalone {...monthpickerProps} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const buttonApr = canvas.getByRole("button", { pressed: true });

    await userEvent.click(buttonApr);

    expect(buttonApr.ariaPressed).toBe("true");

    const buttonSep = canvas.getByText("september").closest("button");

    expect(buttonSep?.ariaPressed).toBe("false");

    buttonSep && (await userEvent.click(buttonSep));

    expect(buttonSep?.ariaPressed).toBe("true");
    expect(buttonApr.ariaPressed).toBe("false");
  },
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
      fromDate: new Date(`Aug 23 ${year - 5}`),
      toDate: new Date(`Aug 23 ${year + 5}`),
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

export const Chromatic = renderStoriesForChromatic({
  Standalone,
  DropdownCaption,
  NB,
  NN,
  EN,
  DisabledMonths,
  UseMonthpicker,
  UseMonthpickerFormat,
  UserControlled,
  CurrentMonthSelected: () => (
    <MonthPicker.Standalone defaultSelected={new Date()} />
  ),
});
