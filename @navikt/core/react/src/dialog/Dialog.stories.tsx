import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import {
  ClockDashedIcon,
  InboxDownIcon,
  PaperplaneIcon,
  PencilIcon,
} from "@navikt/aksel-icons";
import { Button } from "../button";
import { Select } from "../form/select";
import { Bleed } from "../layout/bleed";
import { HStack, VStack } from "../layout/stack";
import { Table } from "../table";
import { Tabs } from "../tabs";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "./index";

const meta: Meta<typeof Dialog> = {
  title: "ds-react/Dialog",
  component: Dialog,
  parameters: {
    chromatic: { disable: true },
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default = {
  render: (args) => (
    <div>
      <button onClick={() => alert("before")}>Before dialog</button>
      <Dialog defaultOpen={args.defaultOpen} size={args.size}>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPopup
          withBackdrop={args.backdrop}
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
      <button onClick={() => alert("before")}>Before dialog</button>
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>

        <DialogPopup aria-labelledby="ha" position="center">
          <DialogHeader>
            <DialogTitle id="ha">Dialog Title</DialogTitle>
            <DialogDescription>
              This is a description of the dialog.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            This is the body of the dialog. Here is where the main content
            lives. This is the body of the dialog. Here is where the main
            content lives This is the body of the dialog. Here is where the main
            content lives This is the body of the dialog. Here is where the main
            content lives This lives. This is the body of the dialog. Here is
            where the main content lives This is the body of the dialog. Here is
            where the main content lives This is the body of the dialog. Here is
            where the main content lives This is the body of the dialog. Here is
            where the main content lives
          </DialogBody>
          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogPopup>
      </Dialog>
      <button onClick={() => alert("after")}>after dialog</button>
    </div>
  ),
};

export const ComplexDrawer: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("before")}>Before dialog</button>
      <Dialog defaultOpen>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <Tabs defaultValue="logg">
          <DialogPopup aria-labelledby="ha" position="right">
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
                content lives This is the body of the dialog. Here is where the
                main content lives This is the body of the dialog. Here is where
                the main content lives This lives. This is the body of the
                dialog. Here is where the main content lives This is the body of
                the dialog. Here is where the main content lives This is the
                body of the dialog. Here is where the main content lives This is
                the body of the dialog. Here is where the main content lives
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
                content lives This is the body of the dialog. Here is where the
                main cont
              </Tabs.Panel>
            </DialogBody>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogPopup>
        </Tabs>
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

          <DialogPopup aria-labelledby="ha" position={position}>
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
        </Dialog>
      </div>
    );
  },
};

export const DemoDefaultFocusDialog: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("before")}>Before dialog focus-trap</button>
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogPopup aria-labelledby="ha">
          <h1 id="ha">Headingtekst som er h1</h1>
          <DialogClose>Close</DialogClose>
          <p>
            Dette er vanlig innhold i en dialog. Innholdet kommer etter en
            tittel (h1) og en lukkeknapp. Etter dette innholdet kommer en annen
            knapp som ikke gjør noe, men er der for å teste fokushåndtering.
          </p>
          <button>Knapp for fokushåndtering</button>
          <p>Og enda mer tekst for å fylle opp dialogen. Lorem ipsum ...</p>
        </DialogPopup>
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
        <button onClick={() => alert("before")}>
          Before dialog focus-trap
        </button>
        <Dialog>
          <DialogTrigger>Open Dialog</DialogTrigger>
          <DialogPopup aria-labelledby="ha" initialFocus={closeRef}>
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

          <DialogPopup position={position}>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Open nested</Button>
                </DialogTrigger>

                <DialogPopup position={position} modal="trap-focus">
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

                      <DialogPopup position={position}>
                        <DialogHeader>
                          <DialogTitle id="ha">NESTED</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                          This is the body of the dialog. Here is where the This
                          is the body of the dialog. Here is where the main
                          content lives. This iThis is the body of the dialog.
                          Here is where the main content lives. This i main
                          content lives. This i
                        </DialogBody>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button>Close</Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogPopup>
                    </Dialog>
                  </DialogFooter>
                </DialogPopup>
              </Dialog>
            </DialogFooter>
          </DialogPopup>
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
        <button onClick={() => alert("before")}>Before dialog</button>
        <button id="trigger" onClick={() => setOpen((x) => !x)}>
          Toggle drawer
        </button>
        <Dialog open={open} onOpenChange={(x) => setOpen(x)}>
          <DialogPopup>
            Drawer content
            <DialogClose>Close</DialogClose>
          </DialogPopup>
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
          <DialogPopup position="left">
            First behind First behind First behind First behind First behind
            First behind First behind First behind First behind First behind
            First behind First behind First behind First behind First behind
            First behind First behind First behind First behind First behind
            First behind
            <Dialog defaultOpen>
              <DialogPopup position="right">
                First-nested
                <DialogClose>Close first nested</DialogClose>
              </DialogPopup>
            </Dialog>
            <DialogClose>Close</DialogClose>
          </DialogPopup>
        </Dialog>
        <Dialog defaultOpen>
          <DialogPopup position="bottom">
            thrid behind thrid behind thrid behind thrid behind thrid behind
            thrid behind thrid behind thrid behind thrid behind thrid behind
            thrid behind thrid behind thrid behind thrid behind thrid behind
            thrid behind thrid behind thrid behind thrid behind thrid behind
            thrid behind
            <DialogClose>Close</DialogClose>
          </DialogPopup>
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
          <DialogPopup
            modal="trap-focus"
            closeOnOutsideClick={false}
            withBackdrop={false}
          >
            Drawer content
            <DialogClose>Close</DialogClose>
          </DialogPopup>
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

          <DialogPopup modal="trap-focus" withBackdrop={false}>
            <Dialog>
              <DialogTrigger>Open Dialog2</DialogTrigger>

              <DialogPopup modal="trap-focus" withBackdrop={false}>
                Drawer content2
                <DialogClose>Close2</DialogClose>
              </DialogPopup>
            </Dialog>
            <DialogClose>Close</DialogClose>
          </DialogPopup>
        </Dialog>
      </div>
    );
  },
};

export const IgnoreOutsideClick: Story = {
  render: () => (
    <div>
      <button onClick={() => alert("before")}>Before dialog</button>
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>

        <DialogPopup closeOnOutsideClick={false}>
          Drawer content
          <DialogClose>Close</DialogClose>
        </DialogPopup>
      </Dialog>
      <button onClick={() => alert("after")}>after dialog</button>
    </div>
  ),
};

const TableData = [
  {
    id: 1,
    firstName: "Jean-Luc",
    lastName: "Picard",
    role: "Kaptein",
  },
  {
    id: 2,
    firstName: "William",
    lastName: "Riker",
    role: "Kommandør",
  },
  {
    id: 3,
    firstName: "Geordi",
    lastName: "La Forge",
    role: "Sjefsingeniør",
  },
];

export const ImplementationDemo = {
  render: () => {
    const [editingRow, setEditingRow] = useState<number | null>(null);
    const [hasBackdrop, setHasBackdrop] = useState(true);
    const [modalMode, setModalMode] = useState<true | "trap-focus">(true);
    const [position, setPosition] =
      useState<React.ComponentProps<typeof DialogPopup>["position"]>("right");

    const currentData = TableData.find((data) => data.id === editingRow);

    return (
      <div>
        <VStack gap="space-16" marginBlock="space-16" align="start">
          <Button onClick={() => setHasBackdrop((x) => !x)}>
            Backdrop: {hasBackdrop ? "On" : "Off"}
          </Button>
          <Button
            onClick={() =>
              setModalMode((x) => (x === true ? "trap-focus" : true))
            }
          >
            Modal Mode: {modalMode === true ? "true" : "trap-focus"}
          </Button>
          <Select
            label="Position"
            hideLabel
            value={position}
            onChange={(e) => setPosition(e.target.value as any)}
          >
            <option value="right">Right</option>
            <option value="left">Left</option>
            <option value="bottom">Bottom</option>
            <option value="center">Center</option>
            <option value="fullscreen">Fullscreen</option>
          </Select>
        </VStack>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell aria-hidden />
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>Fornavn</Table.HeaderCell>
              <Table.HeaderCell textSize="medium">Etternavn</Table.HeaderCell>
              <Table.HeaderCell textSize="small">Rolle</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {TableData.map((data) => (
              <Table.Row key={data.id} shadeOnHover={false}>
                <Table.DataCell>
                  <Button
                    variant="tertiary"
                    data-color="neutral"
                    size="small"
                    icon={<PencilIcon title="Rediger rad" />}
                    onClick={() => setEditingRow(data.id)}
                  />
                </Table.DataCell>
                <Table.HeaderCell>{data.id}</Table.HeaderCell>
                <Table.DataCell>{data.firstName}</Table.DataCell>
                <Table.DataCell>{data.lastName}</Table.DataCell>
                <Table.DataCell>{data.role}</Table.DataCell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <Dialog
          open={editingRow !== null}
          onOpenChange={() => setEditingRow(null)}
        >
          <DialogPopup
            width="small"
            withBackdrop={hasBackdrop}
            modal={modalMode}
            position={position}
          >
            {editingRow !== null && (
              <>
                <DialogHeader>
                  <DialogTitle>Edit: {currentData?.firstName}</DialogTitle>
                </DialogHeader>
                <DialogBody>This is the body of the dialog.</DialogBody>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button>Close</Button>
                  </DialogClose>
                </DialogFooter>
              </>
            )}
          </DialogPopup>
        </Dialog>
      </div>
    );
  },
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
