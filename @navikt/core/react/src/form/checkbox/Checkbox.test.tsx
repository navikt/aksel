import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import faker from "faker";
import { Checkbox, CheckboxGroup } from ".";

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

const firstArgumentOfFirstCall = (fn: jest.Mock) => fn.mock.calls[0][0];
