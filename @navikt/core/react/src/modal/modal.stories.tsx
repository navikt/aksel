import React, { useEffect, useState } from "react";
import { BodyLong, Button, Heading } from "..";
import Modal from "./Modal";

export default {
  title: "ds-react/Modal",
  component: Modal,
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const Default = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement?.("#root");
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="header123"
        {...props}
      >
        <Modal.Content>
          <Heading spacing id="header123" level="1" size="large">
            Header
          </Heading>
          <Heading spacing level="2" size="medium">
            Header
          </Heading>
          <BodyLong>Voluptate laboris mollit dolore qui. Magna elit.</BodyLong>
        </Modal.Content>
      </Modal>
    </>
  );
};

Default.args = {
  shouldCloseOnOverlayClick: true,
  closeButton: true,
};

export const ParentSelector = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    Modal.setAppElement?.("#root");
  }, []);

  const parentEl = document.getElementById("custom-container");

  return (
    <>
      <div id="custom-container" />
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="header123"
        parentSelector={parentEl ? () => parentEl : undefined}
      >
        <Modal.Content>
          <Heading spacing id="header123" level="1" size="large">
            Header
          </Heading>
          <Heading spacing level="2" size="medium">
            Header
          </Heading>
          <BodyLong>Voluptate laboris mollit dolore qui. Magna elit.</BodyLong>
        </Modal.Content>
      </Modal>
    </>
  );
};
