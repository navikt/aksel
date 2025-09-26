import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
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
    <div>
      <button onClick={() => alert("after")}>Before overlay</button>
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
      <button onClick={() => alert("after")}>after overlay</button>
    </div>
  ),
};

export const NestedDrawers: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("after")}>Before overlay</button>
      <Overlay>
        <OverlayTrigger>Open Overlay</OverlayTrigger>
        <OverlayPortal>
          <OverlayBackdrop className="backdropCSS" />
          <OverlayDrawer className="drawerCSS">
            Drawer content
            <OverlayClose>Close</OverlayClose>
            <Overlay>
              <OverlayTrigger>Open Overlay nested</OverlayTrigger>
              <OverlayPortal>
                <OverlayBackdrop className="backdropCSS" />
                <OverlayDrawer className="drawerCSS">
                  Drawer content
                  <OverlayClose>Close</OverlayClose>
                </OverlayDrawer>
              </OverlayPortal>
            </Overlay>
          </OverlayDrawer>
        </OverlayPortal>
      </Overlay>
      <button onClick={() => alert("after")}>after overlay</button>
    </div>
  ),
};

/**
 * We need to know that closing without trigger autofocuses the right element on close
 */
export const NonTriggerImplementation: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <button onClick={() => alert("after")}>Before overlay</button>
        <button id="trigger" onClick={() => setOpen((x) => !x)}>
          Toggle drawer
        </button>
        <Overlay open={open} onOpenChange={(x) => setOpen(x)}>
          <OverlayPortal>
            <OverlayBackdrop className="backdropCSS" />
            <OverlayDrawer className="drawerCSS">
              Drawer content
              <OverlayClose>Close</OverlayClose>
            </OverlayDrawer>
          </OverlayPortal>
        </Overlay>
        <button onClick={() => alert("after")}>after overlay</button>
      </div>
    );
  },
};

export const TrapFocusOutsideClick: Story = {
  render: () => {
    const [count, setCount] = useState(0);

    return (
      <div style={{ height: "150vh" }}>
        <button id="counter" onClick={() => setCount((x) => x + 1)}>
          Counter: {count}
        </button>
        <Overlay>
          <OverlayTrigger>Open Overlay</OverlayTrigger>
          <OverlayPortal>
            <OverlayDrawer
              className="drawerCSS"
              modal="trap-focus"
              closeOnOutsideClick={false}
            >
              Drawer content
              <OverlayClose>Close</OverlayClose>
            </OverlayDrawer>
          </OverlayPortal>
        </Overlay>
      </div>
    );
  },
};

export const NestedTrapFocusOutsideClick: Story = {
  render: () => {
    const [count, setCount] = useState(0);

    return (
      <div style={{ height: "150vh" }}>
        <button id="counter" onClick={() => setCount((x) => x + 1)}>
          Counter: {count}
        </button>
        <Overlay>
          <OverlayTrigger>Open Overlay</OverlayTrigger>
          <OverlayPortal>
            <OverlayDrawer className="drawerCSS" modal="trap-focus">
              <Overlay>
                <OverlayTrigger>Open Overlay2</OverlayTrigger>
                <OverlayPortal>
                  <OverlayDrawer className="drawerCSS" modal="trap-focus">
                    Drawer content2
                    <OverlayClose>Close2</OverlayClose>
                  </OverlayDrawer>
                </OverlayPortal>
              </Overlay>
              <OverlayClose>Close</OverlayClose>
            </OverlayDrawer>
          </OverlayPortal>
        </Overlay>
      </div>
    );
  },
};

export const IgnoreOutsideClick: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("after")}>Before overlay</button>
      <Overlay>
        <OverlayTrigger>Open Overlay</OverlayTrigger>
        <OverlayPortal>
          <OverlayBackdrop className="backdropCSS" />
          <OverlayDrawer className="drawerCSS" closeOnOutsideClick={false}>
            Drawer content
            <OverlayClose>Close</OverlayClose>
          </OverlayDrawer>
        </OverlayPortal>
      </Overlay>
      <button onClick={() => alert("after")}>after overlay</button>
    </div>
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


    &[data-entering-style], &[data-exiting-style] {
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

    &[data-entering-style], &[data-exiting-style] {
      transform: translateX(100%);
    }
  }
  `}
  </style>
);
