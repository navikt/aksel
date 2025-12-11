import { BodyLong, Button, Dialog } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Åpne dialog</Button>
      </Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Header withClosebutton={false}>
          <Dialog.Title>Uten lukkeknapp</Dialog.Title>
          <Dialog.Description>
            Denne dialogen har ingen lukkeknapp i headeren.
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
            <Button>Bekreft</Button>
          </Dialog.CloseTrigger>
          <Dialog.CloseTrigger>
            <Button variant="secondary">Avbryt</Button>
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
  index: 3,
  desc: "Du kan fjerne lukkeknappen i headeren ved å sette `withClosebutton=false` på Dialog.Header. Husk at brukeren fortsatt må kunne lukke dialogen på andre måter (klikk utenfor er ikke et gyldig alternativ alene).",
};
