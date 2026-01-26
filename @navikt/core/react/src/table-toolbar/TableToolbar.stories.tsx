import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import TableToolbar from "./root/TableToolbarRoot";

const meta: Meta<typeof TableToolbar> = {
  title: "ds-react/TableToolbar",
  component: TableToolbar,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof TableToolbar>;

export const Default: Story = {
  render: () => (
    <TableToolbar>
      <TableToolbar.SearchField />
    </TableToolbar>
  ),
};
