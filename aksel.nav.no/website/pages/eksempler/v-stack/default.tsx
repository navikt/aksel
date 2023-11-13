import { withDsExample } from "@/web/examples/withDsExample";
import { VStack } from "@navikt/ds-react";

const Example = () => {
  return (
    <VStack gap="4">
      <Placeholder />
      <Placeholder />
      <Placeholder />
      <Placeholder />
    </VStack>
  );
};

const Placeholder = () => {
  return <div className="aspect-square h-12 rounded bg-teal-500" />;
};

export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "VStack er en enkel layout-komponent for flexbox med flex-direction: column.",
};
