import { Bleed, Box, HStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

const Example = () => {
  return (
    <>
      <style>
        {`
        .circle {
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .scale {
          transform: scale(5);
        }
        `}
      </style>
      <Box padding="32">
        <HStack className="" gap="32">
          <Box
            className="circle scale"
            background="surface-success-subtle"
            borderRadius="full"
          >
            L
          </Box>
          <Box
            className="circle scale"
            background="surface-success-subtle"
            borderRadius="full"
          >
            <Bleed marginInline="0 px">L</Bleed>
          </Box>
        </HStack>
      </Box>
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
