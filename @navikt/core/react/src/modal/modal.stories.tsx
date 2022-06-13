import React, { useEffect, useState } from "react";
import { BodyLong, Button, Heading, Modal } from "../..";

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
    Modal.setAppElement("#root");
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
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

export const Open = () => {
  const [open, setOpen] = useState(null);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal
        open={open ?? true}
        onClose={() => setOpen(false)}
        aria-labelledby="header123"
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

export const CloseButton = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="header123"
        closeButton={false}
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
