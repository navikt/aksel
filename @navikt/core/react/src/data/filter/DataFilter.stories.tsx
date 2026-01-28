import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DataFilter } from "./index";

const meta: Meta<typeof DataFilter> = {
  title: "ds-react/DataFilter",
  component: DataFilter,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof DataFilter>;

export const Default: Story = {
  render: () => (
    <DataFilter>
      <DataFilter.Item />
      <DataFilter.Item />
      <DataFilter.Item />
    </DataFilter>
  ),
};
