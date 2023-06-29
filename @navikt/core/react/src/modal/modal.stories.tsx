/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState } from "react";
import { BodyLong, Button, Heading } from "..";
import Modal, { ModalProps } from "./Modal";

export default {
  title: "ds-react/Modal",
  component: Modal,
  parameters: {
    chromatic: { delay: 1000 },
  },
};

export const Default = {
  render: (props: ModalProps) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          {...props}
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="header123"
        >
          <Modal.Content>
            <Heading spacing id="header123" level="1" size="large">
              Default modal
            </Heading>
            <Heading spacing level="2" size="medium">
              May be closed in three different ways:
            </Heading>
            <BodyLong>
              Close button, clicking outside of this modal, or pressing Escape.
            </BodyLong>
          </Modal.Content>
        </Modal>
      </>
    );
  },

  args: {
    shouldCloseOnEsc: true,
    shouldCloseOnOverlayClick: true,
    closeButton: true,
  },
};

export const OnlyCloseButton = {
  render: (props: ModalProps) => {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal
          {...props}
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="header123"
        >
          <Modal.Content>
            <Heading spacing id="header123" level="1" size="large">
              Force the close button
            </Heading>
            <BodyLong>
              Try clicking outside of this modal or pressing Escape.
            </BodyLong>
            <BodyLong>
              To close this modal, you must click the close button.
            </BodyLong>
          </Modal.Content>
        </Modal>
      </>
    );
  },

  args: {
    shouldCloseOnEsc: false,
    shouldCloseOnOverlayClick: false,
    closeButton: true,
  },
};

export const OpenWithRef = {
  render: (props: ModalProps) => {
    const ref = useRef<HTMLDialogElement>(null);

    return (
      <>
        <Button onClick={() => ref.current?.showModal()}>Open Modal</Button>
        <Modal {...props} aria-labelledby="header123" ref={ref}>
          <Modal.Content>
            <Heading spacing id="header123" level="1" size="large">
              Modal opened via ref
            </Heading>
            <BodyLong>
              This modal was opened by calling ref.showModal().
            </BodyLong>
            <BodyLong>Using the "open" prop is recommended.</BodyLong>
          </Modal.Content>
        </Modal>
      </>
    );
  },

  args: {
    shouldCloseOnEsc: true,
    shouldCloseOnOverlayClick: true,
    closeButton: true,
  },
};
