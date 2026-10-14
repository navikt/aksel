import { Badge, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack align="center" gap="space-8">
      <Badge count={5} />
      <Badge count={5} data-color="accent" />
      <Badge count={5} data-color="neutral" />
      <Badge count={5} data-color="warning" />
    </HStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 5,
  desc: "Du kan endre farge med `data-color`.",
};
