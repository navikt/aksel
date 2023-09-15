import React from "react";
import { render, screen } from "@testing-library/react";
import faker from "faker";
import { ConfirmationPanel } from ".";

test("omits error id from input", async () => {
  const label = faker.datatype.string();

  render(<ConfirmationPanel label={label} errorId="wat"></ConfirmationPanel>);

  const elm = screen.getByLabelText(label);
  expect(elm).toBeInTheDocument();
  expect(elm.getAttribute("errorid")).toBeNull();
});
