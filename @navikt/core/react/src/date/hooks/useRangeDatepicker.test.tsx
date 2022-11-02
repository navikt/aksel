/* eslint-disable react/jsx-pascal-case */
import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { UNSAFE_DatePicker, UNSAFE_useRangeDatepicker } from "..";

const RangeDemo = () => {
  const { datepickerProps, fromInputProps, selectedRange, toInputProps } =
    UNSAFE_useRangeDatepicker({
      fromDate: new Date("Aug 23 2019"),
    });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <UNSAFE_DatePicker {...datepickerProps}>
        <UNSAFE_DatePicker.Input {...fromInputProps} label="Fra" />
        <UNSAFE_DatePicker.Input {...toInputProps} label="Til" />
      </UNSAFE_DatePicker>
      <div title="res">{JSON.stringify(selectedRange)}</div>
    </div>
  );
};

describe("Writing in input sets correct values", () => {
  it("useRangeDatepicker same date", async () => {
    const utils = render(<RangeDemo />);

    const fraInput = utils.getByRole("textbox", { name: "Fra" });
    const tilInput = utils.getByRole("textbox", { name: "Til" });
    await act(async () => {
      await userEvent.type(fraInput, "03.08.2022");
      await userEvent.type(tilInput, "03.08.2022");
    });
    const res = utils.getByTitle("res");
    expect(res.innerHTML).toEqual(
      JSON.stringify({
        from: "2022-08-03T00:00:00.000Z",
        to: "2022-08-03T00:00:00.000Z",
      })
    );
  });

  it("useRangeDatepicker before after to ", async () => {
    const utils = render(<RangeDemo />);

    const fraInput = utils.getByRole("textbox", { name: "Fra" });
    const tilInput = utils.getByRole("textbox", { name: "Til" });
    await act(async () => {
      await userEvent.type(fraInput, "03.08.2022");
      await userEvent.type(tilInput, "02.08.2022");
    });
    const res = utils.getByTitle("res");
    expect(res.innerHTML).toEqual(
      JSON.stringify({
        from: "2022-08-03T00:00:00.000Z",
      })
    );
  });
});
