import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { RectangleSectionsIcon } from "@navikt/aksel-icons";
import { DataToolbar } from "./index";

const meta: Meta<typeof DataToolbar> = {
  title: "ds-react/Data/DataToolbar",
  component: DataToolbar,
  parameters: {
    chromatic: { disable: true },
    layout: "padded",
  },
};

export default meta;

type Story = StoryObj<typeof DataToolbar>;

export const Default: Story = {
  render: () => (
    <DataToolbar>
      <DataToolbar.SearchField label="Tekstfilter" />
      <DataToolbar.ToggleButton>
        <RectangleSectionsIcon />
      </DataToolbar.ToggleButton>
    </DataToolbar>
  ),
};
