import { useState } from "react";
import { BodyLong, Button, Dialog } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? "dialog-popup-example" : undefined}
      >
        Åpne dialog
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Popup id="dialog-popup-example">
          <Dialog.Header>
            <Dialog.Title>Kontrollert dialog</Dialog.Title>
            <Dialog.Description>
              Denne dialogen styres med ekstern state.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Body>
            <BodyLong>
              Culpa aliquip ut cupidatat laborum minim quis ex in aliqua. Qui
              incididunt dolor do ad ut. Incididunt eiusmod nostrud deserunt
              duis laborum. Proident aute culpa qui nostrud velit adipisicing
              minim.
            </BodyLong>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button variant="secondary">Avbryt</Button>
            </Dialog.CloseTrigger>
            <Button onClick={() => setOpen(false)}>Lukk</Button>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>
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
  index: 1,
  desc: "Du kan kontrollere åpen-tilstanden ved å bruke `open`- og `onOpenChange`-props på Dialog-komponenten. Dette er nyttig når du må åpne dialogen programmatisk eller reagere på tilstandsendringer.",
};
