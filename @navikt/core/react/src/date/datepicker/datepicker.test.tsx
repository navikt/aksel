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
  it("Should not crash when e.target is window", async () => {
    render(<App />);

    await act(async () => {
      await userEvent.click(screen.getByText("Velg dato"));
    });
  });
});
