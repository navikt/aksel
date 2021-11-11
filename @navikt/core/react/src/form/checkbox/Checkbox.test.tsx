import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import { Checkbox, CheckboxGroup } from ".";

const firstArgumentOfFirstCall = (fn: jest.Mock) => fn.mock.calls[0][0];

test("checkbox group chains onChange calls", () => {
  const onGroupChange = jest.fn();
  const onChange = jest.fn();
  const value = faker.datatype.string();
  const label = faker.datatype.string();

  render(
    <CheckboxGroup legend="legend" onChange={onGroupChange}>
      <Checkbox onChange={onChange} value={value}>
        {label}
      </Checkbox>
    </CheckboxGroup>
  );

  userEvent.click(screen.getByLabelText(label));

  expect(onGroupChange).toBeCalledTimes(1);
  expect(onGroupChange).toBeCalledWith([value]);
  expect(onChange).toBeCalledTimes(1);
  expect(firstArgumentOfFirstCall(onChange).target.checked).toBe(true);
});

describe("Checkbox handles controlled-state correctly", () => {
  const CheckboxComponent = ({ onChange = () => null, value }) => (
    <CheckboxGroup legend="legend" onChange={onChange} value={value}>
      <Checkbox value={"value1"}>label1</Checkbox>
      <Checkbox value={"value2"}>label2</Checkbox>
    </CheckboxGroup>
  );

  test("Checkbox is still checked after click when controlled", () => {
    render(<CheckboxComponent value={["value1", "value2"]} />);
    userEvent.click(screen.getByLabelText("label1"));
    userEvent.click(screen.getByLabelText("label2"));

    expect((screen.getByLabelText("label1") as HTMLInputElement).checked).toBe(
      true
    );
    expect((screen.getByLabelText("label2") as HTMLInputElement).checked).toBe(
      true
    );
  });

  test("onChange called with expected values", () => {
    const onGroupChange = jest.fn();

    render(
      <CheckboxComponent
        onChange={onGroupChange}
        value={["value1", "value2"]}
      />
    );

    userEvent.click(screen.getByLabelText("label1"));

    expect(onGroupChange).lastCalledWith(["value2"]);

    userEvent.click(screen.getByLabelText("label2"));

    expect(onGroupChange).lastCalledWith(["value1"]);
  });

  test("Checkboxes updates after value-prop change", () => {
    const { rerender } = render(<CheckboxComponent value={[]} />);

    expect((screen.getByLabelText("label1") as HTMLInputElement).checked).toBe(
      false
    );
    expect((screen.getByLabelText("label2") as HTMLInputElement).checked).toBe(
      false
    );

    rerender(<CheckboxComponent value={["value1", "value2"]} />);

    expect((screen.getByLabelText("label1") as HTMLInputElement).checked).toBe(
      true
    );
    expect((screen.getByLabelText("label2") as HTMLInputElement).checked).toBe(
      true
    );
  });
});
