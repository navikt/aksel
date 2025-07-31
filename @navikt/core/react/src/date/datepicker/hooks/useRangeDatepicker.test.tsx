import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, test } from "vitest";
import { DatePicker } from "../DatePicker";
import { useRangeDatepicker } from "./useRangeDatepicker";

const RangeDemo = () => {
  const { datepickerProps, fromInputProps, selectedRange, toInputProps } =
    useRangeDatepicker({
      fromDate: new Date("Aug 23 2019"),
    });

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <DatePicker {...datepickerProps}>
        <DatePicker.Input {...fromInputProps} label="Fra" />
        <DatePicker.Input {...toInputProps} label="Til" />
      </DatePicker>
      <div title="res">{JSON.stringify(selectedRange)}</div>
    </div>
  );
};

describe("Writing in input sets correct values", () => {
  test("useRangeDatepicker same date", async () => {
    render(<RangeDemo />);

    const fraInput = screen.getByRole("textbox", { name: "Fra" });
    const tilInput = screen.getByRole("textbox", { name: "Til" });
    await userEvent.type(fraInput, "03.08.2022");
    await userEvent.type(tilInput, "03.08.2022");
    const res = screen.getByTitle("res");
    expect(res.innerHTML).toEqual(
      JSON.stringify({
        from: "2022-08-03T00:00:00.000Z",
        to: "2022-08-03T00:00:00.000Z",
      }),
    );
  });

  test("useRangeDatepicker before after to", async () => {
    render(<RangeDemo />);

    const fraInput = screen.getByRole("textbox", { name: "Fra" });
    const tilInput = screen.getByRole("textbox", { name: "Til" });
    await userEvent.type(fraInput, "03.08.2022");
    await userEvent.type(tilInput, "02.08.2022");
    const res = screen.getByTitle("res");
    expect(res.innerHTML).toEqual(
      JSON.stringify({
        from: "2022-08-03T00:00:00.000Z",
      }),
    );
  });
});
