import { BodyShort, HStack, VStack } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-8">
      <HStack align="center" gap="space-6">
        <BodyShort as="span" weight="semibold">
          Inbox
        </BodyShort>
        <Badge count={5} data-color="neutral" aria-label="5 ulest" />
      </HStack>
      <HStack align="center" gap="space-6">
        <BodyShort as="span" weight="semibold">
          Inbox
        </BodyShort>
        <Badge count={120} data-color="neutral" aria-label="120 ulest" />
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
  desc: "Badge kan settes brukes på linje med tekst for å f.eks indikere antall uleste meldinger. Husk å alltid inkludere en hjelpetekst for å forklare hva tallet representerer.",
};
