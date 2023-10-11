import { Bleed, BodyLong, Box, HStack, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <>
      <style>
        {`
      .navds-bleed {
        background-color: var(--a-surface-success-subtle);
        width: fit-content;
      }
      `}
      </style>
      <HStack gap="3">
        <VStack gap="2">
          <p>CSS string</p>
          <Box background="surface-alt-1-subtle" padding="5">
            <Box background="surface-alt-2-subtle" padding="5">
              <Bleed asChild>
                <BodyLong>before Bleed</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box background="surface-alt-1-subtle" padding="5">
            <Box background="surface-alt-2-subtle" padding="5">
              <Bleed marginInline="10 0" asChild>
                <BodyLong>without reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box background="surface-alt-1-subtle" padding="5">
            <Box background="surface-alt-2-subtle" padding="5">
              <Bleed marginInline="10 0" reflectivePadding asChild>
                <BodyLong>with reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
        </VStack>

        <VStack gap="2">
          <p>breakpoints</p>
          <Box
            background="surface-alt-1-subtle"
            padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
          >
            <Box
              background="surface-alt-2-subtle"
              padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
            >
              <Bleed asChild>
                <BodyLong>before Bleed</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box
            background="surface-alt-1-subtle"
            padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
          >
            <Box
              background="surface-alt-2-subtle"
              padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
            >
              <Bleed
                marginInline={{
                  xs: "4 0",
                  sm: "8 0",
                  md: "12 0",
                  lg: "16 0",
                  xl: "20 0",
                }}
                asChild
              >
                <BodyLong>without reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
          <Box
            background="surface-alt-1-subtle"
            padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
          >
            <Box
              background="surface-alt-2-subtle"
              padding={{ xs: "2", sm: "4", md: "6", lg: "8", xl: "10" }}
            >
              <Bleed
                marginInline={{
                  xs: "4 0",
                  sm: "8 0",
                  md: "12 0",
                  lg: "16 0",
                  xl: "20 0",
                }}
                reflectivePadding
                asChild
              >
                <BodyLong>with reflectivePadding</BodyLong>
              </Bleed>
            </Box>
          </Box>
        </VStack>
      </HStack>
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
