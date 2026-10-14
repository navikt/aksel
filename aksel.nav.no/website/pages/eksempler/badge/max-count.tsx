import { Badge, HStack } from "@navikt/ds-react";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack align="center" gap="space-8">
      <Badge count={5} />
      <Badge count={999} />
      <Badge count={10} maxCount={8} />
      <Badge count={200} maxCount={140} />
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
  index: 4,
  desc: "Prop `maxCount` endrer maksimal verdi som vises i badgen (standard er 99). Hvis `count` overstiger `maxCount`, vises det som `maxCount+`.",
};
