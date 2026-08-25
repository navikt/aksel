import { render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";
import { ConfirmationPanel } from ".";

test("omits error id from input", async () => {
  const label = "My label";

  render(<ConfirmationPanel label={label} errorId="wat"></ConfirmationPanel>);

  const elm = screen.getByLabelText(label);
  expect(elm).toBeInTheDocument();
  expect(elm.getAttribute("errorid")).toBeNull();
});
