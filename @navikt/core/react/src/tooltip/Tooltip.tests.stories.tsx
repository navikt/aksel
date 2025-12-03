import { Meta, type StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Provider } from "../provider";
import Tooltip from "./Tooltip";

export default {
  title: "ds-react/Tooltip/tests",
  component: Tooltip,
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [
    (Story) => {
      const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
      return (
        <Provider rootElement={anchorEl ?? undefined}>
          <div ref={setAnchorEl}>
            <Story />
          </div>
        </Provider>
      );
    },
  ],
} satisfies Meta<typeof Tooltip>;

type Story = StoryObj<typeof Tooltip>;

export const OpenOnFocus: Story = {
  render: () => (
    <Tooltip content="Hello World">
      <button>Hello World</button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button");

    await button.focus();
    const tooltip = canvas.getByRole("tooltip");
    await waitFor(async () => expect(tooltip).toBeVisible());
  },
};

export const CloseOnFocusLoss: Story = {
  render: () => (
    <div>
      <Tooltip content="Hello World">
        <button>Hello World</button>
      </Tooltip>
      <button>Outside button</button>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button", { name: "Hello World" });

    await button.focus();
    const tooltip = canvas.getByRole("tooltip");
    await waitFor(async () => expect(tooltip).toBeVisible());

    await userEvent.tab();
    await waitFor(async () => expect(tooltip).not.toBeVisible());
  },
};

export const HideOnOutsideClick: Story = {
  render: () => (
    <Tooltip content="Hello World" defaultOpen>
      <button>Hello World</button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tooltip = canvas.getByRole("tooltip");
    await waitFor(async () => expect(tooltip).toBeVisible());

    await userEvent.click(document.body);
    await waitFor(async () => expect(tooltip).not.toBeVisible());
  },
};

export const HideOnEscape: Story = {
  render: () => (
    <Tooltip content="Hello World" defaultOpen>
      <button>Hello World</button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tooltip = canvas.getByRole("tooltip");
    await waitFor(async () => expect(tooltip).toBeVisible());

    await userEvent.keyboard("{Escape}");
    await waitFor(async () => expect(tooltip).not.toBeVisible());
  },
};

export const KeepOpenOnTooltipClick: Story = {
  render: () => (
    <Tooltip content="Hello World" defaultOpen>
      <button>Hello World</button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const tooltip = canvas.getByRole("tooltip");
    await waitFor(async () => expect(tooltip).toBeVisible());

    await userEvent.click(tooltip);
    await waitFor(async () => expect(tooltip).toBeVisible());
  },
};

export const OpenDelay: Story = {
  render: () => (
    <Tooltip content="Hello World" delay={300}>
      <button>Hello World</button>
    </Tooltip>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button");

    await userEvent.hover(button);

    await waitFor(
      async () => expect(canvas.queryByRole("tooltip")).not.toBeInTheDocument(),
      { timeout: 250 },
    );
    await waitFor(
      async () => expect(canvas.getByRole("tooltip")).toBeVisible(),
      { timeout: 500 },
    );
  },
};
