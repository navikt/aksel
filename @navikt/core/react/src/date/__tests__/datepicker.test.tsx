import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, test } from "vitest";
import DatePicker from "../datepicker/DatePicker";
import { useDatepicker } from "../hooks";

const App = () => {
  const { datepickerProps, inputProps } = useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.info,
  });

  return (
    <DatePicker {...datepickerProps}>
      <DatePicker.Input {...inputProps} label="Velg dato" />
    </DatePicker>
  );
};

describe("Render datepicker", () => {
  // eslint-disable-next-line @vitest/expect-expect
  test("Should not crash when e.target is window", async () => {
    render(<App />);

    await userEvent.click(screen.getByText("Velg dato"));
  });
});
