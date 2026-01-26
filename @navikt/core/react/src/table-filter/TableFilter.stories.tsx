import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { TableFilter } from "./index";

const meta: Meta<typeof TableFilter> = {
  title: "ds-react/TableFilter",
  component: TableFilter,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof TableFilter>;

export const Default: Story = {
  render: () => (
    <TableFilter>
      <TableFilter.Item />
      <TableFilter.Item />
      <TableFilter.Item />
    </TableFilter>
  ),
};
