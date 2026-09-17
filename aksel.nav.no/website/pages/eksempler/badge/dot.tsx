import { BodyShort, HStack, VStack } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-8">
      <HStack align="center" gap="space-6">
        <Badge data-color="accent" aria-label="Uleste meldinger" />
        <BodyShort as="span" weight="semibold">
          Inbox
        </BodyShort>
      </HStack>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 1,
  desc: "Badge kan brukes som en enkel prikk for å indikere uleste meldinger eller en ny hendelse. Husk å fjerne prikken når brukeren har lest meldingene eller håndtert hendelsen.",
};
