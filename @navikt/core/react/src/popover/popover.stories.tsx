import React, { useEffect, useRef, useState } from "react";
import { Button } from "../button";
import { Dropdown } from "../dropdown";
import { Modal } from "../modal";
import Popover from "./Popover";

const placements = [
  "top",
  "bottom",
  "right",
  "left",
  "top-start",
  "top-end",
  "bottom-start",
  "bottom-end",
  "right-start",
  "right-end",
  "left-start",
  "left-end",
];
export default {
  title: "ds-react/Popover",
  component: Popover,
  parameters: {
    chromatic: { disable: true },
  },
  argTypes: {
    open: {
      control: { type: "boolean" },
    },
    arrow: {
      control: { type: "boolean" },
    },
    offset: {
      control: { type: "number" },
    },
    strategy: {
      defaultValue: "absolute",
      options: ["fixed", "absolute"],
      control: { type: "radio" },
    },
    placement: {
      defaultValue: "right",
      options: placements,
      control: { type: "radio" },
    },
  },
};

export const Default = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <div tabIndex={-1}>
      <Button ref={setAnchorEl} onClick={() => setOpen((x) => !x)}>
        Open
      </Button>
      <Popover open={open} anchorEl={anchorEl} onClose={() => setOpen(false)}>
        <Popover.Content>
          Velit in consequat <button>testknapp</button>
        </Popover.Content>
      </Popover>
      &nbsp;
      <Button variant="secondary">Another button</Button>
    </div>
  );
};

const Template = (props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <>
      <Button
        ref={(el) => {
          setAnchorEl(el);
        }}
      >
        X
      </Button>
      <Popover {...props} open anchorEl={anchorEl}>
        <Popover.Content>
          Velit in consequat Lorem
          <br />
          {props.placement}
        </Popover.Content>
      </Popover>
    </>
  );
};

function TestElement() {
  const [modalOpen, setModalOpen] = useState(false);
  console.log("TestElement rendered");

  useEffect(() => {
    console.log("TestElement mounted");
    return () => {
      console.log("TestElement unmounted");
    };
  }, []);

  return (
    <div>
      <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
      {modalOpen && (
        <Modal
          open
          portal
          onClose={() => null}
          header={{
            label: "Optional label",
            heading: "Title",
            size: "small",
          }}
          closeOnBackdropClick
        >
          MODAL
        </Modal>
      )}
    </div>
  );
}

export const DialogTest = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen((x) => !x)} ref={setAnchorEl}>
        OPEN
      </Button>
      <Popover anchorEl={anchorEl} open={open} onClose={() => setOpen(false)}>
        <Popover.Content>
          <ÅpneModalKnapp />
        </Popover.Content>
      </Popover>
    </>
  );
};

const ÅpneModalKnapp = () => {
  const [visModal, settVisModal] = useState(false);

  console.log("visModal", visModal);

  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
    };
  }, []);

  return (
    <div>
      <Dropdown.Menu.List.Item
        onClick={() => {
          console.info("opening modal");
          settVisModal(true);
        }}
      >
        Åpne modal
      </Dropdown.Menu.List.Item>
      {visModal && (
        <Modal
          open
          portal
          header={{
            heading: "Modal header",
            size: "medium",
          }}
          onClose={() => {
            console.info("closing modal");
            settVisModal(false);
          }}
        >
          <Modal.Body>Dette er en modal</Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export const Example = () => {
  return (
    <Dropdown>
      <Button as={Dropdown.Toggle}>Toggle</Button>
      <Dropdown.Menu>
        <Dropdown.Menu.List>
          <ÅpneModalKnapp />
        </Dropdown.Menu.List>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export const Placement = () => {
  return (
    <div className="colgap" style={{ gap: "12rem" }}>
      {placements.map((placement) => (
        <Template key={placement} placement={placement} />
      ))}
    </div>
  );
};

/* TODO: All stories with Arrow can be removed after darkside update */
export const Arrow = () => {
  return (
    <div className="colgap" style={{ gap: "12rem" }}>
      <Template arrow />
      <Template arrow={false} />
    </div>
  );
};

export const Offset = () => {
  return (
    <div className="colgap" style={{ gap: "12rem" }}>
      <Template arrow offset={30} />
      <Template arrow={false} offset={30} />
    </div>
  );
};
