import { Badge, BodyShort, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-12">
      <HStack align="center" gap="space-8" as="span">
        <BodyShort as="span" weight="semibold">
          Inbox
        </BodyShort>
        <Badge count={5} data-color="neutral" />
      </HStack>
      <HStack align="center" gap="space-8" as="span">
        <BodyShort as="span" weight="semibold">
          Inbox
        </BodyShort>
        <Badge count={120} data-color="neutral" />
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
  index: 0,
  desc: "Badge kan brukes på linje med tekst for å f.eks. indikere antall uleste meldinger.",
};
