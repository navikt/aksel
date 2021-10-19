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

test("checkbox group handles controlled sate", () => {
  const onGroupChange = jest.fn();
  const value1 = "value1";
  const value2 = "value2";
  const label1 = faker.datatype.string();
  const label2 = faker.datatype.string();

  const { rerender } = render(
    <CheckboxGroup
      legend="legend"
      onChange={onGroupChange}
      value={[value1, value2]}
    >
      <Checkbox value={value1}>{label1}</Checkbox>
      <Checkbox value={value2}>{label2}</Checkbox>
    </CheckboxGroup>
  );

  userEvent.click(screen.getByLabelText(label1));
  expect(onGroupChange).lastCalledWith([value2]);

  expect((screen.getByLabelText(label1) as HTMLInputElement).checked).toBe(
    true
  );

  userEvent.click(screen.getByLabelText(label2));
  expect(onGroupChange).lastCalledWith([value1]);

  expect((screen.getByLabelText(label2) as HTMLInputElement).checked).toBe(
    true
  );

  rerender(
    <CheckboxGroup legend="legend" onChange={onGroupChange} value={[]}>
      <Checkbox value={value1}>{label1}</Checkbox>
      <Checkbox value={value2}>{label2}</Checkbox>
    </CheckboxGroup>
  );

  userEvent.click(screen.getByLabelText(label1));
  expect(onGroupChange).lastCalledWith([value1]);

  expect((screen.getByLabelText(label1) as HTMLInputElement).checked).toBe(
    false
  );

  userEvent.click(screen.getByLabelText(label2));
  expect(onGroupChange).lastCalledWith([value2]);

  expect((screen.getByLabelText(label2) as HTMLInputElement).checked).toBe(
    false
  );
});
