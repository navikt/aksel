import { Bleed, BodyLong, Box, VStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <>
      <VStack gap="2">
        <Box background="surface-alt-1-subtle" padding={{ xs: "5", md: "10" }}>
          <Box
            background="surface-alt-2-subtle"
            padding={{ xs: "5", md: "10" }}
          >
            <Bleed marginInline={{ xs: "10 0", md: "20 0" }}>
              <Box
                padding={{ xs: "3", md: "7" }}
                background="surface-success-subtle"
              >
                <BodyLong>
                  {'marginInline={{ xs: "10 0", md: "20 0" }}'}
                </BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding={{ xs: "5", md: "10" }}>
          <Box
            background="surface-alt-2-subtle"
            padding={{ xs: "5", md: "10" }}
          >
            <Bleed marginInline={{ xs: "0 10", md: "0 20" }}>
              <Box
                padding={{ xs: "3", md: "7" }}
                background="surface-success-subtle"
              >
                <BodyLong>
                  {'marginInline={{ xs: "0 10", md: "0 20" }}'}
                </BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding={{ xs: "5", md: "10" }}>
          <Box
            background="surface-alt-2-subtle"
            padding={{ xs: "5", md: "10" }}
          >
            <Bleed marginBlock={{ xs: "10 0", md: "20 0" }}>
              <Box
                padding={{ xs: "3", md: "7" }}
                background="surface-success-subtle"
              >
                <BodyLong>
                  {'marginBlock={{ xs: "10 0", md: "20 0" }}'}
                </BodyLong>
              </Box>
            </Bleed>
          </Box>
        </Box>
        <Box background="surface-alt-1-subtle" padding={{ xs: "5", md: "10" }}>
          <Box
            background="surface-alt-2-subtle"
            padding={{ xs: "5", md: "10" }}
          >
            <Bleed marginBlock={{ xs: "0 10", md: "0 20" }}>
              <Box
                padding={{ xs: "3", md: "7" }}
                background="surface-success-subtle"
              >
                <BodyLong>
                  {'marginBlock={{ xs: "0 10", md: "0 20" }}'}
                </BodyLong>
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
