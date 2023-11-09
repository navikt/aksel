import { withDsExample } from "@/web/examples/withDsExample";
import { HStack } from "@navikt/ds-react";

const Example = () => {
  return (
    <HStack gap="4" wrap={false}>
      <Placeholder />
      <Placeholder />
      <Placeholder />
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
  index: 1,
  desc: "Som standard er 'wrap' satt til 'true'.",
};

const Placeholder = () => {
  return <div className="aspect-square h-12 rounded bg-teal-500" />;
};
