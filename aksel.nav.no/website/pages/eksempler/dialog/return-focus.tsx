import { useRef } from "react";
import { CogIcon } from "@navikt/aksel-icons";
import { BodyLong, Button, Dialog, HStack, TextField } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <HStack gap="space-4" align="end">
      <TextField ref={inputRef} label="Søkefelt" />
      <Dialog>
        <Dialog.Trigger>
          <Button
            variant="secondary"
            icon={<CogIcon title="Innstillinger" />}
          />
        </Dialog.Trigger>
        <Dialog.Popup returnFocusTo={inputRef}>
          <Dialog.Header>
            <Dialog.Title>Innstillinger</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <BodyLong>
              Når du lukker denne dialogen, vil fokus flyttes til søkefeltet i
              stedet for knappen som åpnet dialogen.
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
export default withDsExample(Example, { minHeight: "360px" });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 11,
};
