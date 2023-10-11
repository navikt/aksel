import { Bleed, BodyLong, Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <>
      <VStack gap="2" align="center">
        <Box background="surface-alt-1-subtle" padding="10">
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginInline="full">
              <Box background="surface-success-subtle">
                <BodyLong>marginInline=&quot;full&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="10">
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginInline="full 0">
              <Box background="surface-success-subtle">
                <BodyLong>marginInline=&quot;full 0&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding="10">
          <Box background="surface-alt-2-subtle" padding="10">
            <Bleed marginInline="0 full">
              <Box background="surface-success-subtle">
                <BodyLong>marginInline=&quot;0 full&quot;</BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
      </VStack>
    </>
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
  index: 0,
};
