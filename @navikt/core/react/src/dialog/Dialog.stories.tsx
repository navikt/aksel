import type { Meta, StoryObj } from "@storybook/react-vite";
import React, { useState } from "react";
import { PencilIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Select } from "../form/select";
import { VStack } from "../layout/stack";
import { Table } from "../table";
import {
  Dialog,
  DialogBody,
  DialogCloseTrigger,
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
        <DialogTrigger>
          <Button>Open Dialog</Button>
        </DialogTrigger>
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
            <DialogCloseTrigger>
              <Button>Close</Button>
            </DialogCloseTrigger>
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

export const PositionCenter: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogPopup position="center">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quas
          debitis ad soluta excepturi reprehenderit veritatis aut nesciunt,
          alias adipisci deserunt laudantium asperiores repellat voluptatum vero
          aliquam eius accusantium consectetur.
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger>
            <Button>Close</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
  parameters: {
    chromatic: {
      modes: {
        mobile: {
          viewport: {
            width: 400,
            height: 400,
          },
        },
        desktop: {
          viewport: {
            width: 1024,
            height: 600,
          },
        },
      },
      disable: false,
    },
  },
};

export const PositionRight: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogPopup position="right">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quas
          debitis ad soluta excepturi reprehenderit veritatis aut nesciunt,
          alias adipisci deserunt laudantium asperiores repellat voluptatum vero
          aliquam eius accusantium consectetur.
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger>
            <Button>Close</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};

export const PositionLeft: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogPopup position="left">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quas
          debitis ad soluta excepturi reprehenderit veritatis aut nesciunt,
          alias adipisci deserunt laudantium asperiores repellat voluptatum vero
          aliquam eius accusantium consectetur.
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger>
            <Button>Close</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};

export const PositionBottom: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogPopup position="bottom">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quas
          debitis ad soluta excepturi reprehenderit veritatis aut nesciunt,
          alias adipisci deserunt laudantium asperiores repellat voluptatum vero
          aliquam eius accusantium consectetur.
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger>
            <Button>Close</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};

export const PositionFullscreen: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogPopup position="fullscreen">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quas
          debitis ad soluta excepturi reprehenderit veritatis aut nesciunt,
          alias adipisci deserunt laudantium asperiores repellat voluptatum vero
          aliquam eius accusantium consectetur.
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger>
            <Button>Close</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};

export const NoBackdrop: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogPopup withBackdrop={false}>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quas
          debitis ad soluta excepturi reprehenderit veritatis aut nesciunt,
          alias adipisci deserunt laudantium asperiores repellat voluptatum vero
          aliquam eius accusantium consectetur.
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger>
            <Button>Close</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};

export const SizeSmall: Story = {
  render: () => (
    <Dialog defaultOpen size="small">
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quas
          debitis ad soluta excepturi reprehenderit veritatis aut nesciunt,
          alias adipisci deserunt laudantium asperiores repellat voluptatum vero
          aliquam eius accusantium consectetur.
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger>
            <Button>Close</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
  parameters: {
    chromatic: { disable: false },
  },
};

export const CustomWidthHeight: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogPopup width="300px" height="300px">
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>
            This is a description of the dialog.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quas
          debitis ad soluta excepturi reprehenderit veritatis aut nesciunt,
          alias adipisci deserunt laudantium asperiores repellat voluptatum vero
          aliquam eius accusantium consectetur.
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger>
            <Button>Close</Button>
          </DialogCloseTrigger>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  ),
  parameters: {
    chromatic: { disable: false },
  },
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
                  <DialogCloseTrigger>
                    <Button>Close</Button>
                  </DialogCloseTrigger>
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
