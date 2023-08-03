import React, { useRef, useState } from "react";
import { FileIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Heading } from "..";
import Modal from "./Modal";

export default {
  title: "ds-react/Modal",
  component: Modal,
};

export const WithUseRef = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const ref2 = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button onClick={() => ref.current?.showModal()}>Open Modal</Button>
      <Modal
        open={ref.current ? undefined : true /* initially open */}
        ref={ref}
        header={{
          label: "Optional label",
          icon: <FileIcon aria-hidden />,
          heading: "Title",
          size: "small",
        }}
      >
        <Modal.Content>
          <BodyLong spacing>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </BodyLong>

          {/* Nested modal */}
          <Modal
            ref={ref2}
            onBeforeClose={() =>
              window.confirm("Are you sure you want to close the modal?")
            }
            aria-labelledby="heading123"
          >
            <Modal.Header>
              <Heading size="medium" level="2" id="heading123">
                Custom header
              </Heading>
            </Modal.Header>
            <Modal.Content>
              Nesting modals is not recommended, but works in most cases.
            </Modal.Content>
            <Modal.Footer>
              <Button onClick={() => ref2.current?.close()}>
                Close w/o confirm
              </Button>
            </Modal.Footer>
          </Modal>

          <BodyLong>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </BodyLong>
        </Modal.Content>
        <Modal.Footer>
          <Button>Primary</Button>
          <Button variant="secondary" onClick={() => ref2.current?.showModal()}>
            Secondary
          </Button>
          <Button variant="tertiary">Tertiary</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
WithUseRef.storyName = "With useRef";

export const WithUseState = () => {
  const [open, setOpen] = useState(true);
  const [open2, setOpen2] = useState(false);

  return (
    <div style={{ minHeight: "1000px", display: "flex", alignItems: "center" }}>
      <div style={{ display: "flex", gap: "1em" }}>
        <Button variant="secondary">Button</Button>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Button variant="secondary">Button</Button>
      </div>
      <Modal
        header={{ heading: "Simple header" }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <Modal.Content>
          This modal is quite small.
          {/* Nested modal */}
          <Modal
            open={open2}
            onClose={(e) => {
              e.stopPropagation(); // onClose wil propagate to parent modal if not stopped
              setOpen2(false);
            }}
            aria-label="Nested modal"
          >
            <Modal.Content>
              <BodyLong spacing>
                Nesting modals is not recommended, but works in most cases. This
                one does not have header or footer, but is bigger than the
                parent modal.
              </BodyLong>
              <BodyLong spacing>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </BodyLong>
              <Button onClick={() => setOpen2(false)}>Close</Button>
            </Modal.Content>
          </Modal>
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={() => setOpen2(true)}>Primary</Button>
          <Button variant="tertiary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
WithUseState.storyName = "With useState";

export const EmptyHeader = () => (
  <div style={{ minWidth: "800px", minHeight: "600px" } /* For Chromatic */}>
    <Modal open>
      <Modal.Header />
      <Modal.Content>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Modal.Content>
    </Modal>
  </div>
);
