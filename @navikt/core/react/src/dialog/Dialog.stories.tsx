import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import {
  ClockDashedIcon,
  InboxDownIcon,
  PaperplaneIcon,
} from "@navikt/aksel-icons";
import { Button } from "../button";
import { Bleed } from "../layout/bleed";
import { HStack } from "../layout/stack";
import { Tabs } from "../tabs";
import {
  Dialog,
  DialogBackdrop,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogPortal,
  DialogTitle,
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
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default = {
  render: (args) => (
    <div>
      <button onClick={() => alert("after")}>Before dialog</button>
      <Dialog defaultOpen={args.defaultOpen} size={args.size}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPortal>
          {args.backdrop && <DialogBackdrop className="backdropCSS" />}
          <DialogPopup
            className="dialogCSS"
            aria-labelledby="ha"
            position={args.position}
            width={args.width}
            height={args.height}
            closeOnOutsideClick={args.closeOnOutsideClick}
            modal={args.modal}
          >
            <DialogHeader>
              <DialogTitle id="ha">Dialog Title</DialogTitle>
              <DialogDescription>
                This is a description of the dialog.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              <ScrollContent />
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
      <button onClick={() => alert("after")}>after dialog</button>
    </div>
  ),
  argTypes: {
    modal: {
      options: [true, "trap-focus"],
      control: { type: "radio" },
    },
    width: {
      options: ["large", "medium", "small", undefined],
      control: { type: "radio" },
    },
    size: {
      options: ["medium", "small"],
      control: { type: "radio" },
    },
    height: {
      control: { type: "text" },
    },
    position: {
      options: ["center", "bottom", "left", "right", "fullscreen"],
      control: { type: "radio" },
    },
  },
  args: {
    defaultOpen: true,
    closeOnOutsideClick: true,
    backdrop: true,
  },
};

export const AllSubComponents: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("after")}>Before dialog</button>
      <Dialog defaultOpen>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPortal>
          <DialogBackdrop className="backdropCSS" />
          <DialogPopup
            className="dialogCSS"
            aria-labelledby="ha"
            position="center"
          >
            <DialogHeader>
              <DialogTitle id="ha">Dialog Title</DialogTitle>
              <DialogDescription>
                This is a description of the dialog.
              </DialogDescription>
            </DialogHeader>
            <DialogBody>
              This is the body of the dialog. Here is where the main content
              lives. This is the body of the dialog. Here is where the main
              content lives This is the body of the dialog. Here is where the
              main content lives This is the body of the dialog. Here is where
              the main content lives This lives. This is the body of the dialog.
              Here is where the main content lives This is the body of the
              dialog. Here is where the main content lives This is the body of
              the dialog. Here is where the main content lives This is the body
              of the dialog. Here is where the main content lives
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogPopup>
        </DialogPortal>
      </Dialog>
      <button onClick={() => alert("after")}>after dialog</button>
    </div>
  ),
};

export const ComplexDrawer: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("after")}>Before dialog</button>
      <Dialog defaultOpen>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPortal>
          <DialogBackdrop className="backdropCSS" />
          <Tabs defaultValue="logg">
            <DialogPopup
              className="dialogCSS"
              aria-labelledby="ha"
              position="right"
            >
              <DialogHeader>
                <DialogTitle id="ha">Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a description of the dialog.
                </DialogDescription>
                <Bleed marginInline="space-20">
                  <Tabs.List>
                    <Tabs.Tab
                      value="logg"
                      label="Logg"
                      icon={<ClockDashedIcon aria-hidden />}
                    />
                    <Tabs.Tab
                      value="inbox"
                      label="Inbox"
                      icon={<InboxDownIcon aria-hidden />}
                    />
                    <Tabs.Tab
                      value="sendt"
                      label="Sendt"
                      icon={<PaperplaneIcon aria-hidden />}
                    />
                  </Tabs.List>
                </Bleed>
              </DialogHeader>
              <DialogBody asChild>
                <Tabs.Panel value="logg">
                  This is the body of the dialog. Here is where the main content
                  lives. This is the body of the dialog. Here is where the main
                  content lives This is the body of the dialog. Here is where
                  the main content lives This is the body of the dialog. Here is
                  where the main content lives This lives. This is the body of
                  the dialog. Here is where the main content lives This is the
                  body of the dialog. Here is where the main content lives This
                  is the body of the dialog. Here is where the main content
                  lives This is the body of the dialog. Here is where the main
                  content lives
                </Tabs.Panel>
              </DialogBody>
              <DialogBody asChild>
                <Tabs.Panel value="inbox">
                  where the main content lives This is the body of the dialog.
                  Here is where the main content lives This is the body of the
                  dialog. Here is where the main content lives
                </Tabs.Panel>
              </DialogBody>
              <DialogBody asChild>
                <Tabs.Panel value="sendt">
                  This is the body of the dialog. Here is where the main content
                  lives. This is the body of the dialog. Here is where the main
                  content lives This is the body of the dialog. Here is where
                  the main cont
                </Tabs.Panel>
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
            </DialogPopup>
          </Tabs>
        </DialogPortal>
      </Dialog>
      <button onClick={() => alert("after")}>after dialog</button>
    </div>
  ),
};

export const Position: Story = {
  render: () => {
    const [position, setPosition] =
      useState<React.ComponentProps<typeof DialogPopup>["position"]>("bottom");

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
              <DialogHeader>
                <DialogTitle id="ha">Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a description of the dialog.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                This is the body of the dialog. Here is where the main content
                lives. This is the body of the dialog. Here is where the main
                content lives This is the body of the dialog. Here is where the
                main content lives This is the body of the dialog. Here is where
                the main content lives This lives. This is the body of the
                dialog. Here is where the main content lives This is the body of
                the dialog. Here is where the main content lives This is the
                body of the dialog. Here is where the main content lives This is
                the body of the dialog. Here is where the main content lives
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
              </DialogFooter>
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
  render: () => {
    const [position, setPosition] =
      useState<React.ComponentProps<typeof DialogPopup>["position"]>("center");

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
            <DialogPopup className="dialogCSS" position={position}>
              <DialogHeader>
                <DialogTitle id="ha">Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a description of the dialog.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                This is the body of the dialog. Here is where the main content
                lives. This is the body of the dialog. Here is where the main
                content lives This is the body of the dialog. Here is where the
                main content lives This is the body of the dialog. Here is where
                the main content lives This lives. This is the body of the
                dialog. Here is where the main content lives This is the body of
                the dialog. Here is where the main content lives This is the
                body of the dialog. Here is where the main content lives This is
                the body of the dialog. Here is where the main content lives
              </DialogBody>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Close</Button>
                </DialogClose>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Open nested</Button>
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogBackdrop className="backdropCSS" />
                    <DialogPopup
                      className="dialogCSS"
                      position={position}
                      modal="trap-focus"
                    >
                      <DialogHeader>
                        <DialogTitle id="ha">LEVEL 2</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        This is the body of the dialog. Here is where the main
                        content lives. This i
                      </DialogBody>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button>Close</Button>
                        </DialogClose>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button>Open nested</Button>
                          </DialogTrigger>
                          <DialogPortal>
                            <DialogBackdrop className="backdropCSS" />
                            <DialogPopup
                              className="dialogCSS"
                              position={position}
                            >
                              <DialogHeader>
                                <DialogTitle id="ha">NESTED</DialogTitle>
                              </DialogHeader>
                              <DialogBody>
                                This is the body of the dialog. Here is where
                                the This is the body of the dialog. Here is
                                where the main content lives. This iThis is the
                                body of the dialog. Here is where the main
                                content lives. This i main content lives. This i
                              </DialogBody>
                              <DialogFooter>
                                <DialogClose asChild>
                                  <Button>Close</Button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogPopup>
                          </DialogPortal>
                        </Dialog>
                      </DialogFooter>
                    </DialogPopup>
                  </DialogPortal>
                </Dialog>
              </DialogFooter>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
      </div>
    );
  },
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

export const DomOrder: Story = {
  render: () => {
    return (
      <div>
        <Dialog defaultOpen>
          <DialogPortal>
            <DialogBackdrop className="backdropCSS" />
            <DialogPopup className="dialogCSS" position="left">
              First behind First behind First behind First behind First behind
              First behind First behind First behind First behind First behind
              First behind First behind First behind First behind First behind
              First behind First behind First behind First behind First behind
              First behind
              <Dialog defaultOpen>
                <DialogPortal>
                  <DialogPopup className="dialogCSS" position="right">
                    First-nested
                    <DialogClose>Close first nested</DialogClose>
                  </DialogPopup>
                </DialogPortal>
              </Dialog>
              <DialogClose>Close</DialogClose>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
        <Dialog defaultOpen>
          <DialogPortal>
            <DialogBackdrop className="backdropCSS" />
            <DialogPopup className="dialogCSS" position="bottom">
              thrid behind thrid behind thrid behind thrid behind thrid behind
              thrid behind thrid behind thrid behind thrid behind thrid behind
              thrid behind thrid behind thrid behind thrid behind thrid behind
              thrid behind thrid behind thrid behind thrid behind thrid behind
              thrid behind
              <DialogClose>Close</DialogClose>
            </DialogPopup>
          </DialogPortal>
        </Dialog>
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

const content = `This is the body of the dialog. Here is where the main content
              lives. This is the body of the dialog. Here is where the main
              content lives This is the body of the dialog. Here is where the
              main content lives This is the body of the dialog. Here is where
              the main content lives This lives. This is the body of the dialog.
              Here is where the main content lives This is the body of the
              dialog. Here is where the main content lives This is the body of
              the dialog. Here is where the main content lives This is the body
              of the dialog. Here is where the main content lives`;

function ScrollContent() {
  const [showScroll, setShowScroll] = useState(false);
  return (
    <div>
      <button onClick={() => setShowScroll((x) => !x)}>
        Show more content
      </button>
      {content}
      {showScroll && content}
      {showScroll && content}
      {showScroll && content}
      {showScroll && content}
    </div>
  );
}
