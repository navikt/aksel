import { BodyLong, Box, Button, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box asChild background="neutral-soft" padding="space-16" borderWidth="1">
      <HStack gap="space-16" justify="space-between">
        <BodyLong>Box og HStack rendres som ett element</BodyLong>
        <Button>Knapp</Button>
      </HStack>
    </Box>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 8,
  desc: "Vi anbefaler å bruke `asChild`-propen der mulig. Dette reduserer antall DOM-noder og forenkler output. [Les mer om asChild her](https://aksel.nav.no/grunnleggende/kode/komponent-api#613715c234c8).",
};
