import { Button, VStack } from "@navikt/ds-react";

export default function Example() {
  return (
    <VStack gap="space-32" marginBlock="space-72 0" align="center">
      <p>Du aktiverte lenken!</p>
      <Button onClick={() => history.back()}>Tilbake</Button>
    </VStack>
  );
}
