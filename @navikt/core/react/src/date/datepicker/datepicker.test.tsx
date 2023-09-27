import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { DatePicker, useDatepicker } from "..";

const App = () => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
  });

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input {...inputProps} label="Velg dato" />
    </DatePicker>
  );
};

describe("Render datepicker", () => {
  // eslint-disable-next-line jest/expect-expect
  it("Should not crash when e.target is window", async () => {
    render(<App />);

    // eslint-disable-next-line testing-library/no-unnecessary-act -- https://kentcdodds.com/blog/fix-the-not-wrapped-in-act-warning
    await act(async () => {
      await userEvent.click(screen.getByText("Velg dato"));
    });
  });
});
