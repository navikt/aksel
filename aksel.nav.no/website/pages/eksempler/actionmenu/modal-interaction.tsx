import { useRef } from "react";
import { ChevronDownIcon } from "@navikt/aksel-icons";
import { ActionMenu, BodyLong, Button, Modal } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const ref = useRef<HTMLDialogElement>(null);

  return (
    <div>
      <ActionMenu>
        <ActionMenu.Trigger>
          <Button
            variant="secondary-neutral"
            icon={<ChevronDownIcon aria-hidden />}
            iconPosition="right"
          >
            Meny
          </Button>
        </ActionMenu.Trigger>
        <ActionMenu.Content>
          <ActionMenu.Item onSelect={() => ref.current?.showModal()}>
            Åpne modal
          </ActionMenu.Item>
        </ActionMenu.Content>
      </ActionMenu>
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
            Lukk
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { variant: "static" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 9,
};
