import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../../button";
import DataActionBar from "./root/DataActionBarRoot";

const meta: Meta<typeof DataActionBar> = {
  title: "ds-react/Data/DataActionBar",
  component: DataActionBar,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataActionBar>;

export const Default: Story = {
  render: () => (
    <>
      <DataActionBar numOfSelectedRows={2} onClear={() => alert("Cleared!")}>
        <Button variant="secondary" size="small">
          Handling 1
        </Button>
        <Button variant="secondary" size="small">
          Handling 2
        </Button>
      </DataActionBar>
    </>
  ),
};
