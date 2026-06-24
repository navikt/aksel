import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, fireEvent, userEvent, waitFor, within } from "storybook/test";
import Lookup from "./Lookup";

export default {
  title: "ds-react/Lookup/tests",
  component: Lookup,
  parameters: {
    chromatic: { disable: true },
  },
  tags: ["play-fn"],
} satisfies Meta<typeof Lookup>;

type Story = StoryObj<typeof Lookup>;

const defaultProps = {
  word: "Lookup",
  children: "A text explanation of the lookup word.",
};

export const OpenOnClick: Story = {
  render: () => <Lookup {...defaultProps} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);

    const trigger = canvas.getByRole("button", { name: "Lookup" });
    expect(trigger.tagName).toBe("SPAN");
    expect(page.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(trigger);

    const dialog = page.getByRole("dialog");
    await waitFor(() => expect(dialog).toBeVisible());

    expect(within(dialog).getByText("Lookup")).toBeInTheDocument();
    expect(
      page.getByText("A text explanation of the lookup word."),
    ).toBeInTheDocument();
  },
};

export const DefaultOpenRendersPopover: Story = {
  render: () => <Lookup {...defaultProps} defaultOpen />,
  play: async () => {
    const page = within(document.body);
    await waitFor(() => expect(page.getByRole("dialog")).toBeVisible());
  },
};

export const ControlledOpenRendersPopover: Story = {
  render: () => <Lookup {...defaultProps} open onOpenChange={() => {}} />,
  play: async () => {
    const page = within(document.body);
    await waitFor(() => expect(page.getByRole("dialog")).toBeVisible());
  },
};

export const KeyboardActivationMatchesButton: Story = {
  render: () => <Lookup {...defaultProps} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);

    const trigger = canvas.getByRole("button", { name: "Lookup" });

    await fireEvent.keyDown(trigger, { key: "Enter" });
    await waitFor(() => expect(page.getByRole("dialog")).toBeVisible());

    await userEvent.keyboard("{Escape}");
    await waitFor(() =>
      expect(page.queryByRole("dialog")).not.toBeInTheDocument(),
    );

    await fireEvent.keyDown(trigger, { key: " " });
    expect(page.queryByRole("dialog")).not.toBeInTheDocument();

    await fireEvent.keyUp(trigger, { key: " " });
    await waitFor(() => expect(page.getByRole("dialog")).toBeVisible());
  },
};

export const DisabledDoesNotOpen: Story = {
  render: () => <Lookup {...defaultProps} disabled />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);

    const trigger = canvas.getByRole("button", { name: "Lookup" });
    expect(trigger).toHaveAttribute("aria-disabled", "true");
    expect(trigger).toHaveAttribute("tabindex", "-1");

    await userEvent.click(trigger);
    expect(page.queryByRole("dialog")).not.toBeInTheDocument();
  },
};

export const HideOnEscape: Story = {
  render: () => <Lookup {...defaultProps} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);

    const trigger = canvas.getByRole("button", { name: "Lookup" });
    await userEvent.click(trigger);

    await waitFor(() => expect(page.getByRole("dialog")).toBeVisible());

    await userEvent.keyboard("{Escape}");

    await waitFor(() =>
      expect(page.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  },
};

export const HideOnCloseButtonClick: Story = {
  render: () => <Lookup {...defaultProps} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);

    const trigger = canvas.getByRole("button", { name: "Lookup" });
    await userEvent.click(trigger);

    const dialog = page.getByRole("dialog");
    await waitFor(() => expect(dialog).toBeVisible());

    const closeButton = within(dialog).getByRole("button");
    await userEvent.click(closeButton);

    await waitFor(() =>
      expect(page.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(trigger).toHaveFocus();
  },
};
