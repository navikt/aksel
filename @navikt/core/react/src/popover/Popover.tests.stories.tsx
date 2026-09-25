import type { StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
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
      <button type="button" ref={setAnchorEl} onClick={() => setOpen(true)}>
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
      extraElements={<button type="button">Outside-element</button>}
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

function PopoverPlacementTestRender({
  anchorTop,
  popoverHeight,
}: {
  anchorTop: string;
  popoverHeight: string;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <div style={{ paddingTop: anchorTop }}>
      <button type="button" ref={setAnchorEl}>
        anchor
      </button>
      <Popover
        open
        anchorEl={anchorEl}
        onClose={() => null}
        placement="bottom-start"
        data-testid="popover"
      >
        <div style={{ height: popoverHeight }}>This is a popover</div>
      </Popover>
    </div>
  );
}

export const FlipToTopWhenBottomOverflows: Story = {
  render: () => (
    <PopoverPlacementTestRender
      anchorTop="calc(100vh - 6rem)"
      popoverHeight="8rem"
    />
  ),
  play: async ({ canvasElement }) => {
    const popover = within(canvasElement).getByTestId("popover");

    await waitFor(() =>
      expect(popover).toHaveAttribute("data-placement", "top-start"),
    );
  },
};

export const KeepBottomWhenNeitherSideFits: Story = {
  render: () => (
    <PopoverPlacementTestRender anchorTop="60vh" popoverHeight="150vh" />
  ),
  play: async ({ canvasElement }) => {
    const popover = within(canvasElement).getByTestId("popover");

    await waitFor(() =>
      expect(popover).toHaveAttribute("data-placement", "bottom-start"),
    );
  },
};
