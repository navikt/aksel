import { Bleed, BodyLong, Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Box background="surface-alt-3" padding="5" borderRadius="large">
      <Box background="surface-subtle" padding="5" borderRadius="medium">
        <VStack gap="4">
          <Bleed marginInline="10" asChild reflectivePadding>
            <Box className="p" background="surface-alt-3-subtle">
              <BodyLong>
                reflectivePadding lar innhold/tekst forbli der den ville vært
                uten Bleed
              </BodyLong>
            </Box>
          </Bleed>
          <Bleed marginInline="10" asChild>
            <Box className="p" background="surface-alt-3-subtle">
              <BodyLong>Uten reflectivePadding</BodyLong>
            </Box>
          </Bleed>
        </VStack>
      </Box>
    </Box>
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
  index: 2,
};
