import React from "react";
import { render } from "@testing-library/react";
import faker from "faker";
import { ConfirmationPanel } from ".";

test("omits error id from input", async () => {
  const label = faker.datatype.string();

  const { getByLabelText } = render(
    <ConfirmationPanel label={label} errorId="wat"></ConfirmationPanel>
  );

  expect(getByLabelText(label).getAttribute("errorid")).toBeNull();
});
