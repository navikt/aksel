import { useRef } from "react";
import { BodyLong, Box, Button, Modal, ReadMore } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <Box paddingBlock="space-128">
      <Button onClick={() => ref.current?.showModal()}>Åpne modal</Button>

      <Modal
        placement="top"
        ref={ref}
        header={{ heading: "Overskrift" }}
        width="small"
      >
        <Modal.Body>
          <BodyLong>Culpa aliquip ut cupidatat laborum minim quis ex.</BodyLong>
          <ReadMore header="Qui incididunt dolor do ad ut.">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt
            debitis deleniti corrupti dolore perspiciatis. Tempora vero numquam
            ullam aliquam ipsum quo, animi aspernatur facere voluptatum aperiam
            cum, repellat velit repudiandae.
          </ReadMore>
        </Modal.Body>
      </Modal>
    </Box>
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
