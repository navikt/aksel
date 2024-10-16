import { VStack } from "@navikt/ds-react";
import { Placeholder } from "@/web/examples/__parts/StackPlaceholder";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap={{ xs: "2", sm: "6", md: "10", lg: "14", xl: "18" }}>
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 3,
  desc: "På noen props, feks. gap, kan du sette ulike verdier per brekkpunkt. Implementasjonen er mobile-first, slik at 'sm: 8' vil også gjelde for 'md', 'lg' og 'xl'.",
};
