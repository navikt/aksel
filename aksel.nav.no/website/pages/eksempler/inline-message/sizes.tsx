import { InlineMessage, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-16">
      <InlineMessage status="warning" size="medium">
        Ingen registrert postadresse for bruker, sjekk kontaktinformasjon
      </InlineMessage>
      <InlineMessage status="warning" size="small">
        Ingen registrert postadresse for bruker, sjekk kontaktinformasjon
      </InlineMessage>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
