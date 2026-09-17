import { HStack } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <HStack align="center" gap="space-6">
      <Badge count={5} aria-label="5 ulest" />
      <Badge count={999} aria-label="999 ulest" />
      <Badge count={10} maxCount={8} aria-label="10 ulest" />
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
  desc: "Prop `maxCount` lar deg sette en maksimal verdi som vises i badgen. Hvis tallet overstiger denne verdien, vises det som `maxCount+`.",
};
