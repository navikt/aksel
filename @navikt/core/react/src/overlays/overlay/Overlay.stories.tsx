import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import {
  Overlay,
  OverlayBackdrop,
  OverlayClose,
  OverlayDrawer,
  OverlayPortal,
  OverlayTrigger,
} from "./index";

const meta: Meta<typeof Overlay> = {
  title: "ds-react/Overlay",
  component: Overlay,
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [
    (Story) => (
      <div data-style-wrapper>
        {BackDropStyle}
        {DrawerStyle}
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Overlay>;

export const Default: Story = {
  render: () => (
    <Overlay>
      <OverlayTrigger>Open Overlay</OverlayTrigger>
      <OverlayPortal>
        <OverlayBackdrop className="backdropCSS" />
        <OverlayDrawer className="drawerCSS">
          Drawer content
          <OverlayClose>Close</OverlayClose>
        </OverlayDrawer>
      </OverlayPortal>
    </Overlay>
  ),
};

const BackDropStyle = (
  <style>
    {`
  .backdropCSS {
    position: fixed;
    inset: 0;
    background-color: red;
    opacity: 0.2;
    transition: opacity 300ms cubic-bezier(0.45, 1.005, 0, 1.005);


    &[data-starting-style],
    &[data-ending-style] {
      opacity: 0;
    }
    }
  `}
  </style>
);

const DrawerStyle = (
  <style>
    {`
  .drawerCSS {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    bottom: 0;
    right:0;
    width: 24rem;
    max-width: 100vw;
    padding: 1.5rem;
    border-radius: 0.5rem;
    background-color: var(--ax-bg-neutral-soft);
    transition: all 300ms;
    padding: 4rem;

    &[data-starting-style], &[data-ending-style] {
      transform: translateX(100%);
    }
  }
  `}
  </style>
);
