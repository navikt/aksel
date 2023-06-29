import { BodyLong, Button, Heading, Modal } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";
import { useRef } from "react";

const Example = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button onClick={() => ref.current?.showModal()}>Åpne modal</Button>
      <Modal aria-label="Modal demo" aria-labelledby="modal-heading" ref={ref}>
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

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
