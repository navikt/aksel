import { BodyLong, Button, Dialog, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="space-4">
      <Dialog size="medium">
        <Dialog.Trigger>
          <Button variant="secondary">Medium (standard)</Button>
        </Dialog.Trigger>
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Medium størrelse</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <BodyLong>
              Dette er standard størrelse for dialogen med normal padding og
              tekststørrelse.
            </BodyLong>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button>Lukk</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>

      <Dialog size="small">
        <Dialog.Trigger>
          <Button variant="secondary">Small</Button>
        </Dialog.Trigger>
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Liten størrelse</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <BodyLong>
              Dette er en kompakt dialog med mindre padding og tekststørrelse.
            </BodyLong>
          </Dialog.Body>
          <Dialog.Footer>
            <Dialog.CloseTrigger>
              <Button size="small">Lukk</Button>
            </Dialog.CloseTrigger>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog>
    </HStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { minHeight: "360px" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
