import { HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
import { Placeholder } from "../../../components/website-modules/examples/__parts/StackPlaceholder";

const Example = () => {
  return (
    <HStack
      gap={{
        xs: "space-8",
        sm: "space-24",
        md: "space-40",
        lg: "space-56",
        xl: "space-72",
      }}
    >
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </HStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 4,
  desc: "På noen props, feks. gap, kan du sette ulike verdier per brekkpunkt. Implementasjonen er mobile-first, slik at 'sm: 8' vil også gjelde for 'md', 'lg' og 'xl'.",
};
