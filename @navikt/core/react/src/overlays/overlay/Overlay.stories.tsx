import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Overlay,
  OverlayBackdrop,
  OverlayClose,
  OverlayDrawer,
  OverlayPortal,
  OverlayTrigger,
} from "./Overlay";

const meta: Meta<typeof Overlay> = {
  title: "ds-react/Overlay",
  component: Overlay,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
  render: () => (
    <Overlay>
      <OverlayTrigger>Open Overlay</OverlayTrigger>
      <OverlayPortal>
        <OverlayBackdrop />
        <OverlayDrawer>
          Drawer content
          <OverlayClose>Close</OverlayClose>
        </OverlayDrawer>
      </OverlayPortal>
    </Overlay>
  ),
};
