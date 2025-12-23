import { Box, HStack, Spacer } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <Box background="brand-blue-moderate">
      <HStack gap="space-12" wrap={false}>
        <Placeholder />
        <Spacer />
        <Placeholder />
      </HStack>
    </Box>
  );
};

const Placeholder = () => (
  <Box
    background="brand-blue-strong"
    height="2rem"
    width="2rem"
    borderRadius="4"
  />
);

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, {
  variant: "full",
  showBreakpoints: true,
});

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 99,
  desc: "Spacer lar deg lett legge inn automatisk stretch mellom elementer. Dette kan være nyttig når man f.eks. skal plassere knapper i 'InternalHeader'.",
};
