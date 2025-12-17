import { BodyLong, Button, Dialog } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button variant="secondary" data-color="danger">
          Slett dokument
        </Button>
      </Dialog.Trigger>
      <Dialog.Popup role="alertdialog" closeOnOutsideClick={false}>
        <Dialog.Header withClosebutton={false}>
          <Dialog.Title>Er du sikker?</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <BodyLong>
            Du er i ferd med å slette dokumentet. Denne handlingen kan ikke
            angres.
          </BodyLong>
        </Dialog.Body>
        <Dialog.Footer>
          <Dialog.CloseTrigger>
            <Button variant="danger" onClick={() => alert("Slettet!")}>
              Ja, slett
            </Button>
          </Dialog.CloseTrigger>
          <Dialog.CloseTrigger>
            <Button variant="secondary" data-color="neutral">
              Avbryt
            </Button>
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
  index: 6,
};
