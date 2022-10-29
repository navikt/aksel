import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useEffect, useState } from "react";

const Example = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    Modal.setAppElement("#__next");
  }, []);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Åpne modal</Button>
      <Modal
        open={open}
        aria-label="Modal demo"
        onClose={() => setOpen((x) => !x)}
        closeButton={false}
        aria-labelledby="modal-heading"
      >
        <Modal.Content>
          <Heading spacing level="1" size="large" id="modal-heading">
            Laborum proident id ullamco
          </Heading>
          <Heading spacing level="2" size="medium">
            Excepteur labore nostrud incididunt exercitation.
          </Heading>
          <BodyLong spacing>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
            incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt duis
            laborum. Proident aute culpa qui nostrud velit adipisicing minim.
            Consequat aliqua aute dolor do sit Lorem nisi mollit velit. Aliqua
            exercitation non minim minim pariatur sunt laborum ipsum.
            Exercitation nostrud est laborum magna non non aliqua qui esse.
          </BodyLong>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default withDsExample(Example);

export const args = {
  index: 1,
};
