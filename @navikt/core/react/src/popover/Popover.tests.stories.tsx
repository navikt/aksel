import type { StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import Popover from "./Popover";

export default {
  title: "ds-react/Popover/tests",
  component: Popover,
  parameters: {
    chromatic: { disable: true },
  },
};

type Story = StoryObj<typeof Popover>;

function PopoverTestRender({
  initialOpen = false,
  extraElements,
}: {
  initialOpen?: boolean;
  extraElements?: React.ReactNode;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [open, setOpen] = useState(initialOpen);

  return (
    <div>
      {extraElements}
      <button ref={setAnchorEl} onClick={() => setOpen(true)}>
        open
      </button>
      <Popover open={open} anchorEl={anchorEl} onClose={() => setOpen(false)}>
        This is a popover
      </Popover>
    </div>
  );
}

export const ShowHidePopover: Story = {
  render: () => <PopoverTestRender initialOpen={false} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popover = canvas.getByText("This is a popover");
    const button = canvas.getByRole("button", { name: "open" });

    expect(popover).not.toBeVisible();

    await userEvent.click(button);
    expect(popover).toBeVisible();

    await userEvent.click(document.body);
    expect(popover).not.toBeVisible();
  },
};

export const HideOnOutsideClick: Story = {
  render: () => (
    <PopoverTestRender
      initialOpen={true}
      extraElements={<button>Outside-element</button>}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popover = canvas.getByText("This is a popover");

    expect(popover).toBeVisible();

    await userEvent.click(canvas.getByText("Outside-element"));
    expect(popover).not.toBeVisible();
  },
};

export const HideOnEscape: Story = {
  render: () => <PopoverTestRender initialOpen={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popover = canvas.getByText("This is a popover");

    expect(popover).toBeVisible();

    await userEvent.keyboard("{Escape}");
    expect(popover).not.toBeVisible();
  },
};

export const KeepOpenOnPopoverClick: Story = {
  render: () => <PopoverTestRender initialOpen={true} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const popover = canvas.getByText("This is a popover");

    expect(popover).toBeVisible();

    await userEvent.click(popover);
    expect(popover).toBeVisible();
  },
};
