import { Bleed, BodyLong, Box, HStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <Box background="surface-alt-3" padding="5" borderRadius="large">
      <Box background="surface-subtle" padding="5" borderRadius="medium">
        <Bleed marginInline="10" asChild>
          <Box padding="3" className="p" background="surface-alt-3-subtle">
            <HStack justify="center">
              <BodyLong>marginInline</BodyLong>
            </HStack>
          </Box>
        </Bleed>
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
  index: 0,
};
