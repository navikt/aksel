import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { HStack } from "../layout/stack";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
  DialogTrigger,
} from "./index";

const meta: Meta<typeof Dialog> = {
  title: "ds-react/Dialog",
  component: Dialog,
  parameters: {
    chromatic: { disable: true },
  },
  decorators: [
    (Story) => (
      <div data-style-wrapper>
        {BackDropStyle}
        {DialogStyle}
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("after")}>Before dialog</button>
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPortal>
          <DialogBackdrop className="backdropCSS" />
          <DialogPopup className="dialogCSS" aria-labelledby="ha">
            <h1 id="ha">Heading text</h1>
            <DialogClose>Close</DialogClose>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
      <button onClick={() => alert("after")}>after dialog</button>
    </div>
  ),
};

export const Position: Story = {
  render: () => {
    const [position, setPosition] =
      useState<React.ComponentProps<typeof DialogPopup>["position"]>("right");

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
        <Dialog defaultOpen>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogPortal>
            <DialogBackdrop className="backdropCSS" />
            <DialogPopup
              className="dialogCSS"
              aria-labelledby="ha"
              position={position}
            >
              <h1 id="ha">Heading text</h1>
              <DialogClose>Close</DialogClose>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </div>
    );
  },
};

export const PositionResponsive: Story = {
  render: () => {
    return (
      <div>
        <Dialog defaultOpen>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogPortal>
            <DialogBackdrop className="backdropCSS" />
            <DialogPopup
              className="dialogCSS"
              aria-labelledby="ha"
              position="bottom"
            >
              <h1 id="ha">Heading text</h1>
              <DialogClose>Close</DialogClose>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </div>
    );
  },
};

export const DemoDefaultFocusDialog: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("after")}>Before dialog focus-trap</button>
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPortal>
          <DialogBackdrop className="backdropCSS" />
          <DialogPopup className="dialogCSS" aria-labelledby="ha">
            <h1 id="ha">Headingtekst som er h1</h1>
            <DialogClose>Close</DialogClose>
            <p>
              Dette er vanlig innhold i en dialog. Innholdet kommer etter en
              tittel (h1) og en lukkeknapp. Etter dette innholdet kommer en
              annen knapp som ikke gjør noe, men er der for å teste
              fokushåndtering.
            </p>
            <button>Knapp for fokushåndtering</button>
            <p>Og enda mer tekst for å fylle opp dialogen. Lorem ipsum ...</p>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
      <button onClick={() => alert("after")}>after dialog focus-trap</button>
    </div>
  ),
};

export const DemoCloseButtonFocusDialog: Story = {
  render: () => {
    const closeRef = React.useRef<HTMLButtonElement>(null);
    return (
      <div>
        <button onClick={() => alert("after")}>Before dialog focus-trap</button>
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogPortal>
            <DialogBackdrop className="backdropCSS" />
            <DialogPopup
              className="dialogCSS"
              aria-labelledby="ha"
              onOpenAutoFocus={closeRef}
            >
              <h1 id="ha">Headingtekst som er h1</h1>
              <DialogClose ref={closeRef}>Close</DialogClose>
              <p>
                Denne skiller seg litt ut da autofokus var satt på lukkeknappen
                som er etter heading. Dette er vanlig innhold i en dialog.
                Innholdet kommer etter en tittel (h1) og en lukkeknapp. Etter
                dette innholdet kommer en annen knapp som ikke gjør noe, men er
                der for å teste fokushåndtering.
              </p>
              <button>Knapp for fokushåndtering</button>
              <p>Og enda mer tekst for å fylle opp dialogen. Lorem ipsum ...</p>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
        <button onClick={() => alert("after")}>after dialog focus-trap</button>
      </div>
    );
  },
};

export const NestedDrawers: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("after")}>Before dialog</button>
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPortal>
          <DialogBackdrop className="backdropCSS" />
          <DialogPopup className="dialogCSS">
            Drawer content
            <DialogClose>Close</DialogClose>
            <Dialog>
              <DialogTrigger>Open Dialog nested</DialogTrigger>
              <DialogPortal>
                <DialogBackdrop className="backdropCSS" />
                <DialogPopup className="dialogCSS">
                  Drawer content
                  <DialogClose>Close</DialogClose>
                </DialogPopup>
              </DialogPortal>
            </Dialog>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
      <button onClick={() => alert("after")}>after dialog</button>
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
        <button onClick={() => alert("after")}>Before dialog</button>
        <button id="trigger" onClick={() => setOpen((x) => !x)}>
          Toggle drawer
        </button>
        <Dialog open={open} onOpenChange={(x) => setOpen(x)}>
          <DialogPortal>
            <DialogBackdrop className="backdropCSS" />
            <DialogPopup className="dialogCSS">
              Drawer content
              <DialogClose>Close</DialogClose>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
        <button onClick={() => alert("after")}>after dialog</button>
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
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogPortal>
            <DialogPopup
              className="dialogCSS"
              modal="trap-focus"
              closeOnOutsideClick={false}
            >
              Drawer content
              <DialogClose>Close</DialogClose>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
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
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogPortal>
            <DialogPopup className="dialogCSS" modal="trap-focus">
              <Dialog>
                <DialogTrigger>Open Dialog2</DialogTrigger>
                <DialogPortal>
                  <DialogPopup className="dialogCSS" modal="trap-focus">
                    Drawer content2
                    <DialogClose>Close2</DialogClose>
                  </DialogPopup>
                </DialogPortal>
              </Dialog>
              <DialogClose>Close</DialogClose>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </div>
    );
  },
};

export const IgnoreOutsideClick: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("after")}>Before dialog</button>
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPortal>
          <DialogBackdrop className="backdropCSS" />
          <DialogPopup className="dialogCSS" closeOnOutsideClick={false}>
            Drawer content
            <DialogClose>Close</DialogClose>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
      <button onClick={() => alert("after")}>after dialog</button>
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

const DialogStyle = (
  <style>
    {`
  .dialogCSS {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    height: 100vh;
    width: 300px;
    background-color: white;
    transition: opacity 300ms cubic-bezier(0.45, 1.005, 0, 1.005);

    &[data-entering-style], &[data-exiting-style] {
      opacity: 0;
    }
  }
  `}
  </style>
);
