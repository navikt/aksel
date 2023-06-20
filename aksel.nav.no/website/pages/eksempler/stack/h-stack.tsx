import { HStack } from "@navikt/ds-react";
import { withDsExample } from "components/website-modules/examples/withDsExample";

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

export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args = {
  index: 0,
};

const Placeholder = () => {
  return <div className="aspect-square h-12 rounded bg-teal-500" />;
};
