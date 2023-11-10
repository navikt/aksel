import { withDsExample } from "@/web/examples/withDsExample";
import { HStack } from "@navikt/ds-react";

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

export default withDsExample(Example, { showBreakpoints: true });

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
  desc: "HStack er en enkel layout-komponent for flexbox.",
};

const Placeholder = () => {
  return <div className="aspect-square h-12 rounded bg-teal-500" />;
};
