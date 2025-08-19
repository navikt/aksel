import { BodyShort, Box, Heading, VStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  const lorem = "Hva kan vi hjelpe deg med?";

  return (
    <VStack gap="space-16">
      <div>
        <Descriptor>Default</Descriptor>
        <Heading textColor="default" size="medium">
          {lorem}
        </Heading>
      </div>
      <Divider />
      <div>
        <Descriptor>Subtle</Descriptor>
        <Heading textColor="subtle" size="medium">
          {lorem}
        </Heading>
      </div>
    </VStack>
  );
};

function Descriptor({ children }) {
  return (
    <BodyShort size="large" weight="semibold">
      {children}
    </BodyShort>
  );
}

function Divider() {
  return <Box as="hr" borderWidth="0 0 1 0" width="100%" />;
}

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
};
