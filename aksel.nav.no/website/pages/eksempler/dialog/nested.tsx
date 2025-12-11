import { BodyLong, Button, Dialog } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button>Åpne dialog</Button>
      </Dialog.Trigger>
      <Dialog.Popup>
        <Dialog.Header>
          <Dialog.Title>Hovedinnstillinger</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <BodyLong spacing>
            Dette er hovedinnstillingene. Du kan åpne en nestet dialog for
            avanserte innstillinger.
          </BodyLong>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>
            <Button>Lukk</Button>
          </Dialog.CloseTrigger>
          <Dialog>
            <Dialog.Trigger>
              <Button variant="secondary">Avanserte innstillinger</Button>
            </Dialog.Trigger>
            <Dialog.Popup>
              <Dialog.Header>
                <Dialog.Title>Avanserte innstillinger</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <BodyLong>
                  Dette er en nestet dialog. Når du lukker denne, kommer du
                  tilbake til hovedinnstillingene.
                </BodyLong>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.CloseTrigger>
                  <Button>Lukk</Button>
                </Dialog.CloseTrigger>
              </Dialog.Footer>
            </Dialog.Popup>
          </Dialog>
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
  index: 9,
};
