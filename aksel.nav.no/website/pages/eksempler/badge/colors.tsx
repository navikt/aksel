import { HStack } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack align="center" gap="space-8">
      <Badge count={5} aria-label="5 ulest" />
      <Badge count={5} data-color="accent" aria-label="5 ulest" />
      <Badge count={5} data-color="neutral" aria-label="5 ulest" />
      <Badge count={5} data-color="warning" aria-label="5 ulest" />
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
