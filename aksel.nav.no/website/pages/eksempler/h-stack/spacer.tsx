import { Box, HStack, Spacer } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box background="surface-alt-3-subtle">
      <HStack gap="3" wrap={false}>
        <Placeholder />
        <Spacer />
        <Placeholder />
      </HStack>
    </Box>
  );
};

const Placeholder = () => (
  <Box
    background="surface-alt-3"
    height="2rem"
    width="2rem"
    borderRadius="medium"
  />
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "full",
  showBreakpoints: true,
  legacyOnly: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 99,
  desc: "Spacer lar deg lett legge inn automatisk stretch mellom elementer. Dette kan være nyttig når man f.eks. skal plassere knapper i 'InternalHeader'.",
};
