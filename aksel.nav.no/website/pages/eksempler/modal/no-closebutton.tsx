import { withDsExample } from "@/web/examples/withDsExample";
import { BodyLong, Button, Modal } from "@navikt/ds-react";
import { useState } from "react";

const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Åpne modal</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        header={{
          heading: "Er du sikker?",
          size: "small",
          closeButton: false,
        }}
        width="small"
      >
        <Modal.Body>
          <BodyLong>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
            incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt duis
            laborum.
          </BodyLong>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" variant="danger" onClick={() => setOpen(false)}>
            Ja, jeg er sikker
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setOpen(false)}
          >
            Avbryt
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 2,
  desc: "Lukkeknappen i headeren kan skjules, men da må du ha en annen knapp som lukker modalen.",
};
