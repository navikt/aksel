import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Listbox } from "./Listbox";

const meta = {
  title: "Listbox",
} satisfies Meta<typeof Listbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  render: () => <Listbox />,
};
