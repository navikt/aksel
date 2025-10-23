import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { HStack } from "../../layout/stack";
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
          <OverlayDrawer className="drawerCSS" aria-labelledby="ha">
            <h1 id="ha">Heading text</h1>
            <OverlayClose>Close</OverlayClose>
          </OverlayDrawer>
        </OverlayPortal>
      </Overlay>
      <button onClick={() => alert("after")}>after overlay</button>
    </div>
  ),
};

export const Position: Story = {
  render: () => {
    const [position, setPosition] =
      useState<React.ComponentProps<typeof OverlayDrawer>["position"]>("right");

    return (
      <div>
        <h2> {`Position: ${position}`}</h2>
        <HStack gap="space-8" marginBlock="space-8">
          <button onClick={() => setPosition("right")}>Right</button>
          <button onClick={() => setPosition("left")}>Left</button>
          <button onClick={() => setPosition("bottom")}>bottom</button>
          <button onClick={() => setPosition("center")}>center</button>
          <button onClick={() => setPosition("fullscreen")}>fullscreen</button>
        </HStack>
        <Overlay defaultOpen>
          <OverlayTrigger>Open Overlay</OverlayTrigger>
          <OverlayPortal>
            <OverlayBackdrop className="backdropCSS" />
            <OverlayDrawer
              className="drawerCSS"
              aria-labelledby="ha"
              position={position}
            >
              <h1 id="ha">Heading text</h1>
              <OverlayClose>Close</OverlayClose>
            </OverlayDrawer>
          </OverlayPortal>
        </Overlay>
      </div>
    );
  },
};

export const PositionResponsive: Story = {
  render: () => {
    return (
      <div>
        <Overlay defaultOpen>
          <OverlayTrigger>Open Overlay</OverlayTrigger>
          <OverlayPortal>
            <OverlayBackdrop className="backdropCSS" />
            <OverlayDrawer
              className="drawerCSS"
              aria-labelledby="ha"
              position={{ md: "fullscreen", lg: "bottom", "2xl": "right" }}
            >
              <h1 id="ha">Heading text</h1>
              <OverlayClose>Close</OverlayClose>
            </OverlayDrawer>
          </OverlayPortal>
        </Overlay>
      </div>
    );
  },
};

export const DemoDefaultFocusDialog: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("after")}>Before overlay focus-trap</button>
      <Overlay>
        <OverlayTrigger>Open Overlay</OverlayTrigger>
        <OverlayPortal>
          <OverlayBackdrop className="backdropCSS" />
          <OverlayDrawer className="drawerCSS" aria-labelledby="ha">
            <h1 id="ha">Headingtekst som er h1</h1>
            <OverlayClose>Close</OverlayClose>
            <p>
              Dette er vanlig innhold i en dialog. Innholdet kommer etter en
              tittel (h1) og en lukkeknapp. Etter dette innholdet kommer en
              annen knapp som ikke gjør noe, men er der for å teste
              fokushåndtering.
            </p>
            <button>Knapp for fokushåndtering</button>
            <p>Og enda mer tekst for å fylle opp dialogen. Lorem ipsum ...</p>
          </OverlayDrawer>
        </OverlayPortal>
      </Overlay>
      <button onClick={() => alert("after")}>after overlay focus-trap</button>
    </div>
  ),
};

export const DemoCloseButtonFocusDialog: Story = {
  render: () => {
    const closeRef = React.useRef<HTMLButtonElement>(null);
    return (
      <div>
        <button onClick={() => alert("after")}>
          Before overlay focus-trap
        </button>
        <Overlay>
          <OverlayTrigger>Open Overlay</OverlayTrigger>
          <OverlayPortal>
            <OverlayBackdrop className="backdropCSS" />
            <OverlayDrawer
              className="drawerCSS"
              aria-labelledby="ha"
              onOpenAutoFocus={closeRef}
            >
              <h1 id="ha">Headingtekst som er h1</h1>
              <OverlayClose ref={closeRef}>Close</OverlayClose>
              <p>
                Denne skiller seg litt ut da autofokus var satt på lukkeknappen
                som er etter heading. Dette er vanlig innhold i en dialog.
                Innholdet kommer etter en tittel (h1) og en lukkeknapp. Etter
                dette innholdet kommer en annen knapp som ikke gjør noe, men er
                der for å teste fokushåndtering.
              </p>
              <button>Knapp for fokushåndtering</button>
              <p>Og enda mer tekst for å fylle opp dialogen. Lorem ipsum ...</p>
            </OverlayDrawer>
          </OverlayPortal>
        </Overlay>
        <button onClick={() => alert("after")}>after overlay focus-trap</button>
      </div>
    );
  },
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
    background-color: black;
    opacity: 0.2;
    transition: opacity 300ms cubic-bezier(0.45, 1.005, 0, 1.005);


    &[data-entering-style], &[data-exiting-style] {
      opacity: 0;
    }
    }
  `}
  </style>
);
