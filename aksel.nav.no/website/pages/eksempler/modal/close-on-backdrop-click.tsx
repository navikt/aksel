import { withDsExample } from "@/web/examples/withDsExample";
import { BodyLong, Button, Modal } from "@navikt/ds-react";
import { useRef } from "react";

const Example = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div className="py-16">
      <Button onClick={() => ref.current?.showModal()}>Åpne modal</Button>

      <Modal ref={ref} header={{ heading: "Overskrift" }} closeOnBackdropClick>
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
    </div>
  );
};

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 5,
  desc: "Husk at det er lett å klikke utenfor ved et uhell. Ikke bruk 'closeOnBackdropClick' hvis det kan føre til at brukeren mister data eller går glipp av viktig informasjon.",
};
