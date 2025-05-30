import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test, vi } from "vitest";
import { Checkbox, CheckboxGroup } from ".";

const firstArgumentOfFirstCall = (fn: ReturnType<typeof vi.fn>) =>
  fn.mock.calls[0][0];

test("checkbox group chains onChange calls", async () => {
  const onGroupChange = vi.fn();
  const onChange = vi.fn();
  const value = "Checkbox value";
  const label = "My pretty label";

  render(
    <CheckboxGroup legend="legend" onChange={onGroupChange}>
      <Checkbox onChange={onChange} value={value}>
        {label}
      </Checkbox>
    </CheckboxGroup>,
  );

  fireEvent.click(screen.getByLabelText(label));

  expect(onGroupChange).toHaveBeenCalledTimes(1);
  expect(onGroupChange).toHaveBeenCalledWith([value]);
  expect(onChange).toHaveBeenCalledTimes(1);
  expect(firstArgumentOfFirstCall(onChange).target.checked).toBe(true);
});

describe("Checkbox handles controlled-state correctly", () => {
  const CheckboxComponent = ({ onChange = () => null, value }) => (
    <CheckboxGroup legend="legend" onChange={onChange} value={value}>
      <Checkbox value="value1">label1</Checkbox>
      <Checkbox value="value2">label2</Checkbox>
    </CheckboxGroup>
  );

  test("Checkbox is still checked after click when controlled", async () => {
    render(<CheckboxComponent value={["value1", "value2"]} />);

    fireEvent.click(screen.getByLabelText("label1"));
    fireEvent.click(screen.getByLabelText("label2"));

    expect((screen.getByLabelText("label1") as HTMLInputElement).checked).toBe(
      true,
    );

    expect((screen.getByLabelText("label2") as HTMLInputElement).checked).toBe(
      true,
    );
  });

  test("onChange called with expected values", async () => {
    const onGroupChange = vi.fn();

    render(
      <CheckboxComponent
        onChange={onGroupChange}
        value={["value1", "value2"]}
      />,
    );

    fireEvent.click(screen.getByLabelText("label1"));
    expect(onGroupChange).toHaveBeenLastCalledWith(["value2"]);

    fireEvent.click(screen.getByLabelText("label2"));
    expect(onGroupChange).toHaveBeenLastCalledWith(["value1"]);
  });

  test("Checkboxes updates after value-prop change", () => {
    const { rerender } = render(<CheckboxComponent value={[]} />);

    expect((screen.getByLabelText("label1") as HTMLInputElement).checked).toBe(
      false,
    );
    expect((screen.getByLabelText("label2") as HTMLInputElement).checked).toBe(
      false,
    );

    rerender(<CheckboxComponent value={["value1", "value2"]} />);

    expect((screen.getByLabelText("label1") as HTMLInputElement).checked).toBe(
      true,
    );
    expect((screen.getByLabelText("label2") as HTMLInputElement).checked).toBe(
      true,
    );
  });
});
