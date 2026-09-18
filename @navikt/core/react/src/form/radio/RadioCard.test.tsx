import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { expect, test, vi } from "vitest";
import { RadioCard, RadioCardGroup } from ".";

test("handles selection through RadioGroup", async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();

  render(
    <RadioCardGroup legend="Leveringsmåte" onChange={onChange}>
      <RadioCard value="digital" description="Sendes til innboksen din.">
        Digital levering
      </RadioCard>
      <RadioCard value="post">Post</RadioCard>
    </RadioCardGroup>,
  );

  await user.click(screen.getByRole("radio", { name: "Digital levering" }));

  expect(onChange).toHaveBeenCalledWith("digital");
  expect(screen.getByText("Sendes til innboksen din.")).toBeInTheDocument();
});

test("sets horizontal orientation on the group", () => {
  render(
    <RadioCardGroup legend="Leveringsmåte" orientation="horizontal">
      <RadioCard value="digital">Digital levering</RadioCard>
    </RadioCardGroup>,
  );

  expect(screen.getByRole("radiogroup")).toHaveAttribute(
    "data-orientation",
    "horizontal",
  );
});
