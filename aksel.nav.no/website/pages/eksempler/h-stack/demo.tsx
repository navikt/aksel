import { HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";
import { Placeholder } from "../../../components/website-modules/examples/__parts/StackPlaceholder";

const Example = () => {
  return (
    <HStack gap="space-16">
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
  index: 0,
  desc: "HStack er en enkel layout-komponent for flexbox.",
};
