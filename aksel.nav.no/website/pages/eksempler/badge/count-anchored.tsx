import { Button, HStack, VStack } from "@navikt/ds-react";
import { Badge } from "@navikt/ds-react/PREVIEW";
import { withDsExample } from "@/web/examples/withDsExample";

const Example = () => {
  return (
    <VStack gap="space-8">
      <HStack align="center" gap="space-6">
        <Badge count={5}>
          <Button variant="secondary" aria-label="5 uleste meldinger">
            Meldinger
          </Button>
        </Badge>
      </HStack>
      <HStack align="center" gap="space-6">
        <Badge count={120}>
          <Button variant="secondary" aria-label="120 uleste meldinger">
            Meldinger
          </Button>
        </Badge>
      </HStack>
    </VStack>
  );
};

// EXAMPLES DO NOT INCLUDE CONTENT BELOW THIS LINE
export default withDsExample(Example);

/* Storybook story */
export const Demo = {
  render: Example,
};

export const args: ExampleArgsT = {
  index: 2,
};
