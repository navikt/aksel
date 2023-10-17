import { Bleed, BodyLong, Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="4">
      <Box background="surface-alt-3" padding="5" borderRadius="large">
        <Box background="surface-subtle" padding="5" borderRadius="medium">
          <Bleed marginInline="10 0" asChild>
            <Box padding="3" className="p" background="surface-alt-3-subtle">
              <HStack justify="center">
                <BodyLong>marginInline start</BodyLong>
              </HStack>
            </Box>
          </Bleed>
        </Box>
      </Box>
      <Box background="surface-alt-3" padding="5" borderRadius="large">
        <Box background="surface-subtle" padding="5" borderRadius="medium">
          <Bleed marginInline="0 10" asChild>
            <Box padding="3" className="p" background="surface-alt-3-subtle">
              <HStack justify="center">
                <BodyLong>marginInline end</BodyLong>
              </HStack>
            </Box>
          </Bleed>
        </Box>
      </Box>
      <Box background="surface-alt-3" padding="5" borderRadius="large">
        <Box background="surface-subtle" padding="5" borderRadius="medium">
          <Bleed marginBlock="10 0" asChild>
            <Box padding="3" className="p" background="surface-alt-3-subtle">
              <HStack justify="center">
                <BodyLong>marginBlock start</BodyLong>
              </HStack>
            </Box>
          </Bleed>
        </Box>
      </Box>
      <Box background="surface-alt-3" padding="5" borderRadius="large">
        <Box background="surface-subtle" padding="5" borderRadius="medium">
          <Bleed marginBlock="0 10" asChild>
            <Box padding="3" className="p" background="surface-alt-3-subtle">
              <HStack justify="center">
                <BodyLong>marginBlock end</BodyLong>
              </HStack>
            </Box>
          </Bleed>
        </Box>
      </Box>
    </VStack>
  );
};

export default withDsExample(Example, {
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 1,
};
