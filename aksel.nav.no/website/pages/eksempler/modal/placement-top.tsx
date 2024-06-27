import { useRef } from "react";
import { BodyLong, Button, Modal } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div className="py-32">
      <Button onClick={() => ref.current?.showModal()}>Åpne modal</Button>

      <Modal ref={ref} header={{ heading: "Overskrift" }} placement="top">
        <Modal.Body>
          <BodyLong>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua.
          </BodyLong>
        </Modal.Body>
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
  index: 6,
  desc: "Bruk placement='top' hvis høyden kan endre seg (dynamisk innhold).",
};
