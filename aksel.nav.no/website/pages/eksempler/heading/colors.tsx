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
      <Divider />
      <div>
        <Descriptor>Contrast</Descriptor>
        <Box background="neutral-strong">
          <Heading textColor="contrast" size="medium">
            {lorem}
          </Heading>
        </Box>
      </div>
      <Divider />
      <div>
        <Descriptor>Default + data-color</Descriptor>
        <Heading textColor="default" data-color="accent" size="medium">
          {lorem}
        </Heading>
      </div>
      <Divider />
      <div>
        <Descriptor>Subtle + data-color</Descriptor>
        <Heading textColor="subtle" data-color="accent" size="medium">
          {lorem}
        </Heading>
      </div>
      <Divider />
      <div>
        <Descriptor>Contrast + data-color</Descriptor>
        <Box background="neutral-strong">
          <Heading textColor="contrast" data-color="accent" size="medium">
            {lorem}
          </Heading>
        </Box>
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
