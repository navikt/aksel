import { HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack gap="4">
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </HStack>
  );
};

const Placeholder = () => {
  return <div className="aspect-square h-12 rounded bg-teal-500" />;
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
