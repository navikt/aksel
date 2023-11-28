import { withDsExample } from "@/web/examples/withDsExample";
import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import { useState } from "react";

const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Åpne modal</Button>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-heading"
      >
        <Modal.Header>
          <Heading level="1" size="large" id="modal-heading">
            Laborum proident id ullamco
          </Heading>
        </Modal.Header>
        <Modal.Body>
          <BodyLong>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
            incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt duis
            laborum. Proident aute culpa qui nostrud velit adipisicing minim.
            Consequat aliqua aute dolor do sit Lorem nisi mollit velit. Aliqua
            exercitation non minim minim pariatur sunt laborum ipsum.
            Exercitation nostrud est laborum magna non non aliqua qui esse.
          </BodyLong>
        </Modal.Body>
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
  index: 3,
  desc: "Headeren tilbys som en egen komponent for de tilfellene du trenger mer fleksiblitet enn header-propen gir deg. Begge varianter har mulighet for å skjule lukkeknappen.",
};
