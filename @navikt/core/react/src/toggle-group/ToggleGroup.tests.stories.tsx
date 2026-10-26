import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { ToggleGroup } from "./index";

const meta: Meta<typeof ToggleGroup> = {
  title: "ds-react/ToggleGroup/Tests",
  component: ToggleGroup,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof ToggleGroup>;

const Items = () => (
  <>
    <ToggleGroup.Item value="ulest" label="Uleste" />
    <ToggleGroup.Item value="ny" label="Ny" />
    <ToggleGroup.Item value="lest" label="Leste" />
    <ToggleGroup.Item value="sendt" label="Sendt" />
  </>
);

export const PlayControlled: Story = {
  render: () => {
    const [activeValue, setActiveValue] = useState("ny");

    return (
      <ToggleGroup value={activeValue} onChange={setActiveValue}>
        <Items />
      </ToggleGroup>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const initialToggle = canvas.getByRole("radio", { name: "Ny" });

    expect(initialToggle).toHaveAttribute("aria-checked", "true");
    expect(initialToggle).toHaveAttribute("tabindex", "0");
    initialToggle.focus();
    expect(initialToggle).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");
    const nextToggle = canvas.getByRole("radio", { name: "Leste" });
    expect(nextToggle).toHaveFocus();
    expect(nextToggle).toHaveAttribute("aria-checked", "false");
    expect(nextToggle).toHaveAttribute("tabindex", "0");

    expect(initialToggle).toHaveAttribute("aria-checked", "true");
    expect(initialToggle).toHaveAttribute("tabindex", "-1");

    await userEvent.keyboard("{Enter}");
    expect(nextToggle).toHaveAttribute("aria-checked", "true");

    await userEvent.keyboard("{ArrowLeft}");
    await userEvent.keyboard("{ArrowLeft}");
    const firstToggle = canvas.getByRole("radio", { name: "Uleste" });
    expect(firstToggle).toHaveFocus();
    expect(firstToggle).toHaveAttribute("aria-checked", "false");
    expect(firstToggle).toHaveAttribute("tabindex", "0");

    expect(nextToggle).toHaveAttribute("aria-checked", "true");
    expect(nextToggle).toHaveAttribute("tabindex", "-1");
  },
};

export const PlayUnControlled: Story = {
  render: () => (
    <ToggleGroup defaultValue="ny" onChange={() => null}>
      <Items />
    </ToggleGroup>
  ),
  play: PlayControlled.play,
};
