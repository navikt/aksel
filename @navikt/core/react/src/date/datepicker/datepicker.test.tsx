/* eslint-disable react/jsx-pascal-case */
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { UNSAFE_DatePicker, UNSAFE_useDatepicker } from "..";

const App = () => {
  const { datepickerProps, inputProps } = UNSAFE_useDatepicker({
    fromDate: new Date("Aug 23 2019"),
    onDateChange: console.log,
  });

  return (
    <UNSAFE_DatePicker {...datepickerProps}>
      <UNSAFE_DatePicker.Input {...inputProps} label="Velg dato" />
    </UNSAFE_DatePicker>
  );
};

describe("Render datepicker", () => {
  it("Should not crash when e.target is window", async () => {
    const utils = render(<App />);

    await act(async () => {
      await userEvent.click(utils.getByText("Velg dato"));
    });
  });
});
