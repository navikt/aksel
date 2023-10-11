import { Bleed, BodyLong, Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="2">
      <Box background="surface-alt-1-subtle" padding="5">
        <Box background="surface-alt-2-subtle" padding="5">
          <Bleed marginInline="10 0">
            <Box padding="3" className="p" background="surface-success-subtle">
              <BodyLong>marginInline=&quot;10 0&quot;</BodyLong>
            </Box>
          </Bleed>
        </Box>
      </Box>
      <Box background="surface-alt-1-subtle" padding="5">
        <Box background="surface-alt-2-subtle" padding="5">
          <Bleed marginInline="0 10">
            <Box padding="3" className="p" background="surface-success-subtle">
              <BodyLong>marginInline=&quot;0 10&quot;</BodyLong>
            </Box>
          </Bleed>
        </Box>
      </Box>
      <Box background="surface-alt-1-subtle" padding="5">
        <Box background="surface-alt-2-subtle" padding="5">
          <Bleed marginBlock="10 0">
            <Box padding="3" className="p" background="surface-success-subtle">
              <BodyLong>marginBlock=&quot;10 0&quot;</BodyLong>
            </Box>
          </Bleed>
        </Box>
      </Box>
      <Box background="surface-alt-1-subtle" padding="5">
        <Box background="surface-alt-2-subtle" padding="5">
          <Bleed marginBlock="0 10">
            <Box padding="3" className="p" background="surface-success-subtle">
              <BodyLong>marginBlock=&quot;0 10&quot;</BodyLong>
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
  index: 0,
};
