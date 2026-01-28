import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataToolbar } from "./index";

const meta: Meta<typeof DataToolbar> = {
  title: "ds-react/DataToolbar",
  component: DataToolbar,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataToolbar>;

export const Default: Story = {
  render: () => (
    <DataToolbar>
      <DataToolbar.SearchField />
    </DataToolbar>
  ),
};
