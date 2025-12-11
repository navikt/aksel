import { BodyLong, Button, Dialog, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-4">
      <Dialog>
        <Dialog.Trigger>
          <Button variant="secondary">Small</Button>
        </Dialog.Trigger>
        <Dialog.Popup width="small">
          <Dialog.Header>
            <Dialog.Title>Width small dialog</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <BodyLong>En mindre dialog for enkelt innhold.</BodyLong>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button>Lukk</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>

      <Dialog>
        <Dialog.Trigger>
          <Button variant="secondary">Medium (standard)</Button>
        </Dialog.Trigger>
        <Dialog.Popup width="medium">
          <Dialog.Header>
            <Dialog.Title>Width medium dialog</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <BodyLong>Standard bredde for de fleste brukstilfeller.</BodyLong>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button>Lukk</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>

      <Dialog>
        <Dialog.Trigger>
          <Button variant="secondary">Large</Button>
        </Dialog.Trigger>
        <Dialog.Popup width="large">
          <Dialog.Header>
            <Dialog.Title>Width large dialog</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <BodyLong>
              En bredere dialog for mer komplekst innhold som tabeller eller
              skjemaer.
            </BodyLong>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button>Lukk</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>
    </HStack>
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
};
