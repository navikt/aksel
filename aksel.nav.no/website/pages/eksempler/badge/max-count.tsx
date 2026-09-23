import { HStack } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack align="center" gap="space-8">
      <Badge count={5} aria-label="5 ulest" />
      <Badge count={999} aria-label="999 ulest" />
      <Badge count={10} maxCount={8} aria-label="10 ulest" />
      <Badge count={200} maxCount={140} aria-label="200 ulest" />
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
