import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { Radio, RadioGroup } from ".";

const value1 = "My first value";
const label1 = "World's best radio label";
const value2 = "Life changing value";
const label2 = "Radio label of the year";

const Group = (props) => (
  <RadioGroup {...props} legend="legend">
    <Radio value={value1}>{label1}</Radio>
    <Radio value={value2}>{label2}</Radio>
  </RadioGroup>
);

describe("Controlled RadioGroup", () => {
  const originalError = console.error;
  const mockError = vi.fn();
  beforeEach(() => {
    console.error = mockError;
  });

  afterEach(() => {
    console.error = originalError;
  });

  test("doesnt console.error", () => {
    const { rerender } = render(<Group value={value1} />);
    rerender(<Group value={value2} />);

    expect(mockError).toHaveBeenCalledTimes(0);
  });
});

describe("Uncontrolled RadioGroup", () => {
  test("handles state correctly", async () => {
    const user = userEvent.setup();

    render(<Group />);

    const input1 = screen.getByLabelText(label1) as HTMLInputElement;
    const input2 = screen.getByLabelText(label2) as HTMLInputElement;

    expect(input1.checked).toBe(false);
    expect(input2.checked).toBe(false);

    await user.click(screen.getByLabelText(label2));

    expect(input1.checked).toBe(false);
    expect(input2.checked).toBe(true);
  });

  test("handles defaultValue correctly", async () => {
    const user = userEvent.setup();
    render(<Group defaultValue={value1} />);

    const input1 = screen.getByLabelText(label1) as HTMLInputElement;
    const input2 = screen.getByLabelText(label2) as HTMLInputElement;

    expect(input1.checked).toBe(true);
    expect(input2.checked).toBe(false);

    await user.click(screen.getByLabelText(label2));

    expect(input1.checked).toBe(false);
    expect(input2.checked).toBe(true);
  });
});
