import { Meta, StoryFn } from "@storybook/react-vite";
import React, { useEffect, useRef, useState } from "react";
import { FileIcon } from "@navikt/aksel-icons";
import { Button } from "../button";
import { Checkbox, CheckboxGroup } from "../form/checkbox";
import { VStack } from "../layout/stack";
import { Tooltip } from "../tooltip";
import { BodyLong, BodyShort, Heading } from "../typography";
import Modal from "./Modal";

const meta: Meta<typeof Modal> = {
  title: "ds-react/Modal",
  component: Modal,
  parameters: {
    chromatic: { pauseAnimationAtEnd: true },
  },
};
export default meta;

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`;

export const WithUseRef: StoryFn = () => {
  const ref = useRef<HTMLDialogElement>(null);
  const ref2 = useRef<HTMLDialogElement>(null);

  return (
    <div style={{ height: "200vh" }}>
      <Button onClick={() => ref.current?.showModal()}>Open Modal</Button>
      <Modal
        // eslint-disable-next-line react-hooks/refs
        open={ref.current ? undefined : true /* initially open */}
        onClose={() => null}
        ref={ref}
        header={{
          label: "Optional label",
          icon: <FileIcon aria-hidden />,
          heading: "Title",
          size: "small",
        }}
        closeOnBackdropClick
      >
        <Modal.Body>
          <BodyLong spacing>{lorem}</BodyLong>

          {/* Nested modal */}
          <Modal
            size="small"
            ref={ref2}
            onBeforeClose={() =>
              window.confirm("Are you sure you want to close the modal?")
            }
            closeOnBackdropClick
            aria-labelledby="heading123"
          >
            <Modal.Header>
              <Heading size="medium" level="2" id="heading123">
                Custom header
              </Heading>
            </Modal.Header>
            <Modal.Body>
              Nesting modals is not recommended, but works in most cases.
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => ref2.current?.close()}>
                Close w/o confirm
              </Button>
            </Modal.Footer>
          </Modal>

          <BodyLong>{lorem}</BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button>Primary</Button>
          <Button variant="secondary" onClick={() => ref2.current?.showModal()}>
            Secondary
          </Button>
          <Button variant="tertiary">Tertiary</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
WithUseRef.storyName = "With useRef";

export const WithUseState: StoryFn = () => {
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
        width={400}
      >
        <Modal.Body>
          This modal has width set to 400.
          {/* Nested modal */}
          <Modal
            open={open2}
            onClose={(e) => {
              e.stopPropagation(); // onClose wil propagate to parent modal if not stopped
              setOpen2(false);
            }}
            closeOnBackdropClick
            aria-label="Nested modal"
            width={800}
          >
            <Modal.Body>
              <BodyLong spacing>
                Nesting modals is not recommended, but works in most cases. This
                one does not have header or footer, but is bigger than the
                parent modal.
              </BodyLong>
              <BodyLong spacing>Width is set to 800.</BodyLong>
              <Button onClick={() => setOpen2(false)}>Close</Button>
            </Modal.Body>
          </Modal>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpen2(true)}>Primary</Button>
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
WithUseState.storyName = "With useState";
WithUseState.parameters = { chromatic: { disable: true } };

export const EmptyHeader: StoryFn = () => (
  <Modal open onClose={() => null} aria-label="Modal with empty header">
    <Modal.Header />
    <Modal.Body>{lorem}</Modal.Body>
  </Modal>
);

export const Small: StoryFn = () => (
  <>
    <Modal
      open
      onClose={() => null}
      width="small"
      header={{
        heading: "Simple header",
        size: "small",
      }}
      size="small"
    >
      <Modal.Body>
        <BodyLong size="small">Lorem ipsum dolor sit amet.</BodyLong>
      </Modal.Body>
      <Modal.Footer>
        <Button size="small" variant="secondary">
          Dummy button
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);
Small.storyName = "Size = Small";

export const MediumWithPortal: StoryFn = () => (
  <Modal
    open
    onClose={() => null}
    portal
    width="medium"
    header={{ heading: "Simple header" }}
  >
    <Modal.Body>
      <BodyShort size="small">Lorem ipsum dolor sit amet.</BodyShort>
    </Modal.Body>
  </Modal>
);
MediumWithPortal.storyName = "Size = Medium (with portal)";

export const Large800: StoryFn = () => (
  <Modal
    open
    onClose={() => null}
    width={800}
    header={{ heading: "Simple header" }}
  >
    <Modal.Body>Lorem ipsum dolor sit amet.</Modal.Body>
  </Modal>
);
Large800.storyName = "Size = 800px";

export const PlacementTopShort: StoryFn = () => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <style>{`#storybook-root { padding: 0 !important }`}</style>
    <Modal
      open
      onClose={() => null}
      placement="top"
      header={{ heading: "placement = top" }}
    >
      <Modal.Body>
        This modal should be top anchored, except on mobile and old browsers.
      </Modal.Body>
    </Modal>
  </div>
);
PlacementTopShort.parameters = {
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
  },
};

export const PlacementTopLong: StoryFn = () => {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <style>{`#storybook-root { padding: 0 !important }`}</style>
      <Modal
        open
        onClose={() => null}
        placement="top"
        header={{ heading: "placement = top" }}
      >
        <Modal.Body>
          <BodyLong spacing>
            This modal should be top anchored, except on mobile and old
            browsers.
          </BodyLong>
          <BodyLong spacing>{lorem}</BodyLong>
          <BodyLong>{lorem}</BodyLong>

          <Modal
            ref={ref}
            onClose={() => null}
            placement="top"
            header={{ heading: "placement = top (Nested)" }}
          >
            <Modal.Body>
              This modal should also be top anchored, except on mobile and old
              browsers.
            </Modal.Body>
          </Modal>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => ref.current?.showModal()}>
            Open nested modal
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
PlacementTopLong.parameters = {
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
  },
};

export const Scroll: StoryFn = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current || !modalRef.current) return;
    modalRef.current.showModal();
    bodyRef.current.scrollTop = 100;
  }, []);

  return (
    <Modal ref={modalRef} header={{ heading: "Scroll shadow demo" }}>
      <Modal.Body ref={bodyRef} style={{ maxHeight: "500px" }}>
        <BodyLong spacing>{lorem}</BodyLong>
        <BodyLong spacing>{lorem}</BodyLong>
        <BodyLong spacing>{lorem}</BodyLong>
        <BodyLong>{lorem}</BodyLong>
      </Modal.Body>
    </Modal>
  );
};

export const WithTooltip: StoryFn = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <Button onClick={() => ref.current?.showModal()}>Open Modal</Button>
      <Modal
        // eslint-disable-next-line react-hooks/refs
        open={ref.current ? undefined : true /* initially open */}
        onClose={() => null}
        ref={ref}
        aria-label="Tooltip test"
      >
        <Modal.Body>
          <div style={{ marginBottom: "1rem" }}>
            <Tooltip content="This_is_the_first_tooltip">
              <Button>Test 1</Button>
            </Tooltip>
          </div>
          <Tooltip content="This is the second tooltip">
            <Button>Test 2</Button>
          </Tooltip>
        </Modal.Body>
      </Modal>
    </div>
  );
};
WithTooltip.parameters = { chromatic: { disable: true } }; // The tooltip behaves unpredictably in Chromatic

export const WithSrOnlyElement: StoryFn = () => (
  <Modal
    open
    onClose={() => null}
    width={300}
    header={{ heading: "Simple header" }}
  >
    <Modal.Body>
      <VStack gap="space-64">
        <BodyLong>
          The modal body needs to have position:relative to make sr-only
          elements position themselves correctly when the modal body is
          overflowing (i.e. has a scrollbar).
        </BodyLong>
        <BodyLong>
          If the modal body (and other parents of the sr-only element inside the
          modal body) does not have position:relative (or equivalent), the
          sr-only element is pushed downwards relative to the height of the
          overflowing content.
        </BodyLong>
        <BodyLong>
          In the most extreme cases, an additional scrollbar appears bc. the
          dialog element (parent of modal body) starts overflowing. (We have
          overflow:auto on the dialog element in case you are on a small screen
          and header/footer has a lot of content.)
        </BodyLong>
        <BodyLong>Example: CheckboxGroup with a hidden legend:</BodyLong>
        <CheckboxGroup legend="What fruits do you like?" hideLegend>
          <Checkbox>Banana</Checkbox>
          <Checkbox>Apple</Checkbox>
          <Checkbox>Orange</Checkbox>
          <Checkbox>Pear</Checkbox>
        </CheckboxGroup>
        <BodyLong>
          Try to remove position:relative from the modal body and see what
          happens. (Use DevTools to find the legend element.) You might need to
          make the viewport shorter to get the full effect (double scrollbar).
        </BodyLong>
        <BodyLong>
          Note: The large amount of gap has been added on purpose to force
          overflow.
        </BodyLong>
      </VStack>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary">Dummy button</Button>
    </Modal.Footer>
  </Modal>
);

export const ChromaticViewportTesting: StoryFn = () => (
  <div style={{ width: "100vw", height: "100vh" }}>
    <style>{`#storybook-root { padding: 0 !important }`}</style>
    <Modal
      open
      onClose={() => null}
      header={{ heading: "Chromatic Viewports Testing", label: "Test" }}
    >
      <Modal.Body>
        <BodyLong spacing>
          This story is tailored for testing the breakpoints with Chromatic.
        </BodyLong>
        <BodyLong spacing>{lorem}</BodyLong>
        <BodyLong>{lorem}</BodyLong>
      </Modal.Body>
      <Modal.Footer>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="tertiary">Tertiary</Button>
      </Modal.Footer>
    </Modal>
  </div>
);
ChromaticViewportTesting.parameters = {
  chromatic: {
    modes: {
      mobile_portrait: {
        viewport: {
          width: 400,
          height: 850,
        },
      },
      mobile_landscape: {
        viewport: {
          width: 850,
          height: 400,
        },
      },
    },
  },
};

// For testing TS error messages:

/* const PropTypeTest = () => {
  return (
    <>
      <Modal header={{ heading: "Label" }}>OK</Modal>

      <Modal header={{ heading: "Label" }} aria-label="Label">
        OK
      </Modal>

      <Modal header={{ heading: "Label" }} aria-labelledby="Label">
        OK
      </Modal>

      <Modal aria-label="Label">OK</Modal>

      <Modal aria-labelledby="Label">OK</Modal>

      <Modal aria-label="Label" open onClose={() => null}>
        OK
      </Modal>

      <Modal>Mangler label</Modal>

      <Modal open>Mangler onClose eller label</Modal>

      <Modal open aria-label="Label">
        Mangler onClose
      </Modal>

      <Modal open onClose={() => null}>
        Mangler label
      </Modal>

      <Modal header={{ heading: "Label" }} open>
        Mangler onClose
      </Modal>

      <Modal
        header={{ heading: "Label" }}
        aria-label="Label"
        aria-labelledby="Label"
      >
        For mange labels
      </Modal>

      <Modal aria-label="Label" aria-labelledby="Label">
        For mange labels
      </Modal>
    </>
  );
}; */
