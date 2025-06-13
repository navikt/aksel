import { Button, VStack } from "@navikt/ds-react";

export default function Example() {
  return (
    <VStack gap="8" marginBlock="18 0" align="center">
      <p>Du aktiverte lenken!</p>
      <Button onClick={() => history.back()}>Tilbake</Button>
    </VStack>
  );
}
