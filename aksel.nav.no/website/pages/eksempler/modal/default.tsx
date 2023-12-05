import { useRef } from "react";
import { BodyLong, Button, Modal } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div className="py-16">
      <Button onClick={() => ref.current?.showModal()}>Åpne modal</Button>

      <Modal ref={ref} header={{ heading: "Overskrift" }}>
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
        <Modal.Footer>
          <Button type="button" onClick={() => ref.current?.close()}>
            Primær
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => ref.current?.close()}
          >
            Sekundær
          </Button>
          <Button
            type="button"
            variant="tertiary"
            onClick={() => ref.current?.close()}
          >
            Tertiær
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};
