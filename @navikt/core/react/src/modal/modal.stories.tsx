import React, { useEffect, useState } from "react";
import { BodyLong, Button, Heading } from "../..";
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
      <p>
        We can also custom style the modal by passing in a react-modal style
        object. Here the backdrop is red.
      </p>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="header123"
        style={{
          overlay: { backgroundColor: "#ff0000aa" },
        }}
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
