import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import Lookup from "./Lookup";

export default {
  title: "ds-react/Lookup/tests",
  component: Lookup,
  parameters: {
    chromatic: { disable: true },
  },
} satisfies Meta<typeof Lookup>;

type Story = StoryObj<typeof Lookup>;

const defaultProps = {
  word: "Lookup",
  heading: "«Lookup»",
  children: "A text explanation of the lookup word.",
};

export const OpenOnClick: Story = {
  render: () => <Lookup {...defaultProps} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(document.body);

    const trigger = canvas.getByRole("button", { name: "Lookup" });
    expect(page.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.click(trigger);

    const dialog = page.getByRole("dialog");
    await waitFor(() => expect(dialog).toBeVisible());

    expect(page.getByText("lookup")).toBeInTheDocument();
    expect(
      page.getByText("A text explanation of the lookup word."),
    ).toBeInTheDocument();
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
