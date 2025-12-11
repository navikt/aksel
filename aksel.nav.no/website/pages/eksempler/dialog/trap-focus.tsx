import { BodyLong, Button, Dialog } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Åpne dialog</Button>
      </Dialog.Trigger>
      <Dialog.Popup modal="trap-focus" closeOnOutsideClick={false}>
        <Dialog.Header>
          <Dialog.Title>Dialog med trap-focus</Dialog.Title>
          <Dialog.Description>
            Fokus er låst, men scroll og interaksjon utenfor er tillatt.
          </Dialog.Description>
        </Dialog.Header>
        <Dialog.Body>
          <BodyLong>
            Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
            incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt duis
            laborum. Proident aute culpa qui nostrud velit adipisicing minim.
          </BodyLong>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>
            <Button>Lukk</Button>
          </Dialog.CloseTrigger>
        </Dialog.Footer>
      </Dialog.Popup>
    </Dialog>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: `Med modal="trap-focus" vil fokus være låst inne i dialogen, men scrolling på siden og interaksjon med elementer utenfor dialogen er fortsatt mulig. Dette er nyttig for dialoger som ikke skal blokkere hele siden. Merk at dette bare bør brukes i ekspersystemer hvor brukeren har god kontroll over konteksten utenfor dialogen.`,
};
